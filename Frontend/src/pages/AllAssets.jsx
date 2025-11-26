import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import TeacherSidebar from '../components/TeacherSidebar';
import Topbar from '../components/Topbar';

export default function AllAssets() {
  const [activePage, setActivePage] = useState("all-assets"); // eslint-disable-line no-unused-vars
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/library', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAssets(data);
      } else {
        setError('Failed to fetch library assets');
      }
    } catch (err) {
      setError('Error fetching library assets');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAsset = () => {
    navigate('/add-library');
  };

  const handleEditAsset = (id) => {
    navigate(`/edit-library/${id}`);
  };

  const handleDeleteAsset = async (id) => {
    if (!confirm('Are you sure you want to delete this asset?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/library/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Asset deleted successfully');
        fetchAssets(); // Refresh the list
      } else {
        alert('Failed to delete asset');
      }
    } catch (err) {
      alert('Error deleting asset');
      console.error('Error:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-600';
      case 'borrowed':
        return 'bg-yellow-100 text-yellow-600';
      case 'damaged':
        return 'bg-red-100 text-red-600';
      case 'lost':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc]">
      {role === "admin" ? (
        <AdminSidebar setActivePage={setActivePage} logoutHandler={logoutHandler} />
      ) : role === "teacher" ? (
        <TeacherSidebar setActivePage={setActivePage} logoutHandler={logoutHandler} />
      ) : null}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-gray-500 mb-6 text-sm">
            <span>🏠 Front</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Library Books</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Library Books</h2>
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
                <button onClick={handleAddAsset} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
                <button onClick={fetchAssets} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <RefreshCcw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-280">
              <table className="min-w-full text-sm whitespace-nowrap">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="p-3 text-left w-10"><input type="checkbox" /></th>
                    <th className="p-3 text-left w-20">Book Number</th>
                    <th className="p-3 text-left w-32">Title</th>
                    <th className="p-3 text-left w-24">Subject</th>
                    <th className="p-3 text-left w-24">Purchase Date</th>
                    <th className="p-3 text-left w-24">Department</th>
                    <th className="p-3 text-left w-20">Type</th>
                    <th className="p-3 text-left w-20">Status</th>
                    <th className="p-3 text-left w-20">Shelf Location</th>
                    <th className="p-3 text-left w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="12" className="p-8 text-center text-gray-500">
                        Loading library assets...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="12" className="p-8 text-center text-red-500">
                        {error}
                      </td>
                    </tr>
                  ) : assets.length === 0 ? (
                    <tr>
                      <td colSpan="12" className="p-8 text-center text-gray-500">
                        No library assets found. Click the + button to add your first asset.
                      </td>
                    </tr>
                  ) : (
                    assets.map((asset) => (
                      <tr key={asset.id} className="border-b hover:bg-gray-50">
                        <td className="p-3"><input type="checkbox" /></td>
                        <td className="p-3 text-gray-800 font-medium">#{asset.id}</td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            
                            <span className="text-gray-800 font-medium">{asset.title}</span>
                          </div>
                        </td>
                        <td className="p-3 text-gray-700">{asset.subject_name || 'N/A'}</td>
                        <td className="p-3 text-gray-700">
                          {new Date(asset.purchase_date).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-gray-700">N/A</td>
                        <td className="p-3 text-gray-700 capitalize">{asset.asset_type}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(asset.status)}`}>
                            {asset.status}
                          </span>
                        </td>
                      
                        <td className="p-3 text-gray-700">{asset.shelf_location || 'N/A'}</td>
                        <td className="p-3 flex space-x-2">
                          <button
                            onClick={() => handleEditAsset(asset.id)}
                            className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAsset(asset.id)}
                            className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

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
