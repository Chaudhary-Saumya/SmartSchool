import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCcw, Settings, Check, X as XIcon, Loader2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import Topbar from '../components/Topbar';

export default function AdminLeaveRequests() {
  const [activePage, setActivePage] = useState("admin-leave-requests"); // eslint-disable-line no-unused-vars
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const role = localStorage.getItem("role") || "";

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/leaves', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLeaveRequests(data);
      } else {
        console.error('Failed to fetch leave requests');
      }
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'rejected':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm('Are you sure you want to approve this leave request?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/leaves/approve/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Leave request approved successfully');
        fetchLeaveRequests();
      } else {
        const errorData = await response.json();
        alert('Error approving leave request: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error approving leave request:', error);
      alert('Error approving leave request');
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please enter a rejection reason');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/leaves/reject/${selectedLeaveId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rejection_reason: rejectionReason })
      });

      if (response.ok) {
        alert('Leave request rejected successfully');
        setShowRejectPopup(false);
        setRejectionReason('');
        setSelectedLeaveId(null);
        fetchLeaveRequests();
      } else {
        const errorData = await response.json();
        alert('Error rejecting leave request: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error rejecting leave request:', error);
      alert('Error rejecting leave request');
    }
  };

  const openRejectPopup = (id) => {
    setSelectedLeaveId(id);
    setShowRejectPopup(true);
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc]">
      {role === "admin" ? (
        <AdminSidebar setActivePage={setActivePage} logoutHandler={logoutHandler} />
      ) : null}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-gray-500 mb-6 text-sm">
            <span>🏠 Admin</span>
            <span>/</span>
            <span>Human Resources</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Leave Requests</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Leave Requests Management</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search leave requests"
                    className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Filter className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={fetchLeaveRequests}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <RefreshCcw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Loading leave requests...</span>
                </div>
              ) : (
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="p-3 text-left">Employee</th>
                      <th className="p-3 text-left">Leave Type</th>
                      <th className="p-3 text-left">Start Date</th>
                      <th className="p-3 text-left">End Date</th>
                      <th className="p-3 text-left">Total Days</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Submitted Date</th>
                      <th className="p-3 text-left">Reason</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-gray-800 font-medium">{item.student_name}</td>
                        <td className="p-3 text-gray-700">{item.leave_type}</td>
                        <td className="p-3 text-gray-700">{new Date(item.start_date).toLocaleDateString()}</td>
                        <td className="p-3 text-gray-700">{new Date(item.end_date).toLocaleDateString()}</td>
                        <td className="p-3 text-gray-700">{item.total_days}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-3 text-gray-700">{new Date(item.created_at).toLocaleDateString()}</td>
                        <td className="p-3 text-gray-700">{item.reason || 'N/A'}</td>
                        <td className="p-3 flex space-x-2">
                          {item.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(item.id)}
                                className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openRejectPopup(item.id)}
                                className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                title="Reject"
                              >
                                <XIcon className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {item.status === 'approved' && (
                            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                              Approved
                            </span>
                          )}
                          {item.status === 'rejected' && (
                            <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                              Rejected
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Reject Reason Popup */}
            {showRejectPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Reject Leave Request</h3>
                    <button
                      onClick={() => {
                        setShowRejectPopup(false);
                        setRejectionReason('');
                        setSelectedLeaveId(null);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rejection Reason *
                      </label>
                      <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Enter reason for rejection"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowRejectPopup(false);
                          setRejectionReason('');
                          setSelectedLeaveId(null);
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleReject}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Reject Leave
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Floating Settings Button */}
            <button className="fixed right-6 top-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
