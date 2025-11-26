import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2, Loader2, X } from 'lucide-react';
import TeacherSidebar from '../components/TeacherSidebar';
import TeacherTopbar from '../components/TeacherTopbar';

export default function SubjectsTaught() {
  const [activePage, setActivePage] = useState("subjects-taught"); // eslint-disable-line no-unused-vars
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    class_ids: []
  });

  useEffect(() => {
    fetchSubjects();
    fetchClasses();
  }, []);

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/subjects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSubjects(data);
      } else {
        console.error('Failed to fetch subjects');
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/classes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      } else {
        console.error('Failed to fetch classes');
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClassSelection = (e) => {
    const { value, checked } = e.target;
    const classId = parseInt(value);
    setFormData(prev => ({
      ...prev,
      class_ids: checked
        ? [...prev.class_ids, classId]
        : prev.class_ids.filter(id => id !== classId)
    }));
  };

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/subjects/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Subject created successfully');
        setShowPopup(false);
        setFormData({
          name: '',
          description: '',
          class_id: ''
        });
        fetchSubjects();
      } else {
        const errorData = await response.json();
        alert('Error creating subject: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating subject:', error);
      alert('Error creating subject');
    } finally {
      setCreating(false);
    }
  };

  const handleEditSubject = (subject) => {
    setSelectedSubject(subject);
    setFormData({
      name: subject.name,
      description: subject.description || '',
      class_ids: subject.class_ids || []
    });
    setShowEditPopup(true);
  };

  const handleUpdateSubject = async (e) => {
    e.preventDefault();
    if (!selectedSubject) return;
    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/subjects/update/${selectedSubject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Subject updated successfully');
        setShowEditPopup(false);
        setSelectedSubject(null);
        setFormData({
          name: '',
          description: '',
          class_id: ''
        });
        fetchSubjects();
      } else {
        const errorData = await response.json();
        alert('Error updating subject: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating subject:', error);
      alert('Error updating subject');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteSubject = async (id) => {
    if (!confirm('Are you sure you want to delete this subject?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/subjects/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Subject deleted successfully');
        fetchSubjects();
      } else {
        const errorData = await response.json();
        alert('Error deleting subject: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
      alert('Error deleting subject');
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
            <span className="text-gray-900 font-medium">Subjects Taught</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Subjects Taught</h2>
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
                <button
                  onClick={fetchSubjects}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
                >
                  <RefreshCcw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-280">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Loading subjects...</span>
                </div>
              ) : (
                <table className="min-w-full text-sm whitespace-nowrap">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="p-3 text-left w-10"><input type="checkbox" /></th>
                      <th className="p-3 text-left w-32">Subject Name</th>
                      <th className="p-3 text-left w-32">Class</th>
                      <th className="p-3 text-left w-28">Total Students</th>
                      <th className="p-3 text-left w-20">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="p-3"><input type="checkbox" /></td>
                        <td className="p-3 text-gray-800 font-medium">{item.name}</td>
                        <td className="p-3 text-gray-700">{item.class_names || 'No classes assigned'}</td>
                        <td className="p-3 text-gray-700">{item.total_students || 0}</td>
                        <td className="p-3 flex space-x-2">
                          <button
                            onClick={() => handleEditSubject(item)}
                            className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSubject(item.id)}
                            className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Create Subject Popup */}
            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Create New Subject</h3>
                    <button onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateSubject}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                        <select
                          name="class_id"
                          value={formData.class_id}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select class (optional)</option>
                          {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                              {cls.name} ({cls.class_number})
                            </option>
                          ))}
                        </select>
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
                              Creating...
                            </>
                          ) : (
                            'Create Subject'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Edit Subject Popup */}
            {showEditPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Edit Subject</h3>
                    <button onClick={() => {
                      setShowEditPopup(false);
                      setSelectedSubject(null);
                    }} className="text-gray-400 hover:text-gray-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleUpdateSubject}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                        <select
                          name="class_id"
                          value={formData.class_id}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select class (optional)</option>
                          {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                              {cls.name} ({cls.class_number})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex justify-end space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setShowEditPopup(false);
                            setSelectedSubject(null);
                          }}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={updating}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                          {updating ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin mr-2 inline" />
                              Updating...
                            </>
                          ) : (
                            'Update Subject'
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
}
