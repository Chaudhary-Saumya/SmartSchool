import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2, Loader2, X, Check, X as XIcon } from 'lucide-react';
import TeacherSidebar from '../components/TeacherSidebar';
import TeacherTopbar from '../components/TeacherTopbar';

export default function LeaveRequests() {
  const [activePage, setActivePage] = useState("leave-requests"); // eslint-disable-line no-unused-vars
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [creating, setCreating] = useState(false);

  const [formData, setFormData] = useState({
    leave_type: '',
    start_date: '',
    end_date: '',
    reason: ''
  });

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
      case 'Approved':
        return 'bg-green-100 text-green-600';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'Rejected':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc]">
      <TeacherSidebar setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col">
        <TeacherTopbar />
        <div className="flex-1 overflow-y-auto p-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-gray-500 mb-6 text-sm">
            <span>🏠 Teacher</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Leave Requests</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Leave Requests</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Filter className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setShowPopup(true)}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <RefreshCcw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-280">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Loading leave requests...</span>
                </div>
              ) : (
                <table className="min-w-full text-sm whitespace-nowrap">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="p-3 text-left w-10"><input type="checkbox" /></th>
                      <th className="p-3 text-left w-24">Student</th>
                      <th className="p-3 text-left w-24">Leave Type</th>
                      <th className="p-3 text-left w-24">Start Date</th>
                      <th className="p-3 text-left w-24">End Date</th>
                      <th className="p-3 text-left w-20">Total Days</th>
                      <th className="p-3 text-left w-20">Status</th>
                      <th className="p-3 text-left w-28">Date Submitted</th>
                      <th className="p-3 text-left w-32">Reason</th>
                      <th className="p-3 text-left w-24">Created By</th>
                      <th className="p-3 text-left w-32">Rejection Reason</th>
                      <th className="p-3 text-left w-20">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="p-3"><input type="checkbox" /></td>
                        <td className="p-3 text-gray-800 font-medium">{item.student_name}</td>
                        <td className="p-3 text-gray-700">{item.leave_type}</td>
                        <td className="p-3 text-gray-700">{new Date(item.start_date).toLocaleDateString()}</td>
                        <td className="p-3 text-gray-700">{new Date(item.end_date).toLocaleDateString()}</td>
                        <td className="p-3 text-gray-700">{item.total_days}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 text-gray-700">{new Date(item.created_at).toLocaleDateString()}</td>
                        <td className="p-3 text-gray-700">{item.reason}</td>
                        <td className="p-3 text-gray-700">{item.created_by_name}</td>
                        <td className="p-3 text-gray-700">{item.rejection_reason}</td>
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
                                onClick={() => handleReject(item.id)}
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

            {/* Create Leave Request Popup */}
            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Apply for Teacher Leave</h3>
                    <button onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateLeaveRequest}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type *</label>
                        <select
                          name="leave_type"
                          value={formData.leave_type}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select leave type</option>
                          <option value="Sick Leave">Sick Leave</option>
                          <option value="Annual Leave">Annual Leave</option>
                          <option value="Maternity Leave">Maternity Leave</option>
                          <option value="Casual Leave">Casual Leave</option>
                          <option value="Emergency Leave">Emergency Leave</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                        <input
                          type="date"
                          name="start_date"
                          value={formData.start_date}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                        <input
                          type="date"
                          name="end_date"
                          value={formData.end_date}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                        <textarea
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          placeholder="Optional reason for leave"
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="3"
                        />
                      </div>

                      <div className="flex justify-end space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowPopup(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={creating}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                          {creating ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin mr-2 inline" />
                              Applying...
                            </>
                          ) : (
                            'Apply Teacher Leave'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
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

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleCreateLeaveRequest(e) {
    e.preventDefault();
    setCreating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/leaves/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Teacher leave request submitted successfully');
        setShowPopup(false);
        setFormData({
          leave_type: '',
          start_date: '',
          end_date: '',
          reason: ''
        });
        fetchLeaveRequests();
      } else {
        const errorData = await response.json();
        alert('Error submitting teacher leave request: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error submitting teacher leave request:', error);
      alert('Error submitting teacher leave request');
    } finally {
      setCreating(false);
    }
  }

  async function handleApprove(id) {
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
  }

  async function handleReject(id) {
    const reason = prompt('Enter rejection reason:');
    if (reason === null) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/leaves/reject/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rejection_reason: reason })
      });

      if (response.ok) {
        alert('Leave request rejected successfully');
        fetchLeaveRequests();
      } else {
        const errorData = await response.json();
        alert('Error rejecting leave request: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error rejecting leave request:', error);
      alert('Error rejecting leave request');
    }
  }
}
