import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2, X, Loader2 } from 'lucide-react';
import TeacherSidebar from '../components/TeacherSidebar';
import TeacherTopbar from '../components/TeacherTopbar';

export default function Lectures() {
  const [activePage, setActivePage] = useState("lectures"); // eslint-disable-line no-unused-vars
  const [lectures, setLectures] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    subject_id: '',
    class_id: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    status: 'confirmed'
  });


  useEffect(() => {
    fetchLectures();
    fetchSubjects();
    fetchClasses();
  }, []);

  const fetchLectures = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/lectures', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setLectures(data);
      }
    } catch (error) {
      console.error('Error fetching lectures:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/subjects', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSubjects(data.data || data);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/classes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setClasses(data.data || data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateLecture = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/lectures/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Lecture created successfully');
        setShowPopup(false);
        setFormData({
          subject_id: '',
          class_id: '',
          date: '',
          time: '',
          duration: '',
          location: '',
          status: 'confirmed'
        });
        fetchLectures();
      } else {
        const errorData = await response.json();
        alert('Error creating lecture: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating lecture:', error);
      alert('Error creating lecture');
    } finally {
      setCreating(false);
    }
  };

  const handleEditLecture = (lecture) => {
    setSelectedLecture(lecture);
    setFormData({
      subject_id: lecture.subject_id,
      class_id: lecture.class_id,
      date: lecture.date ? lecture.date.split('T')[0] : '',
      time: lecture.time,
      duration: lecture.duration,
      location: lecture.location || '',
      status: lecture.status || 'confirmed'
    });
    setShowEditPopup(true);
  };

  const handleUpdateLecture = async (e) => {
    e.preventDefault();
    if (!selectedLecture) return;
    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/lectures/update/${selectedLecture.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Lecture updated successfully');
        setShowEditPopup(false);
        setSelectedLecture(null);
        setFormData({
          subject_id: '',
          class_id: '',
          date: '',
          time: '',
          duration: '',
          location: '',
          status: 'confirmed'
        });
        fetchLectures();
      } else {
        const errorData = await response.json();
        alert('Error updating lecture: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating lecture:', error);
      alert('Error updating lecture');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteLecture = async (id) => {
    if (!confirm('Are you sure you want to delete this lecture?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/lectures/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Lecture deleted successfully');
        fetchLectures();
      } else {
        const errorData = await response.json();
        alert('Error deleting lecture: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting lecture:', error);
      alert('Error deleting lecture');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-600';
      case 'cancelled':
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
            <span className="text-gray-900 font-medium">Lectures</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Lectures</h2>
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
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200" onClick={() => setShowPopup(true)}>
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200" onClick={fetchLectures}>
                  <RefreshCcw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm whitespace-nowrap">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="p-3 text-left w-10"><input type="checkbox" /></th>
                      <th className="p-3 text-left w-24">Subject Name</th>
                      <th className="p-3 text-left w-20">Class</th>
                      <th className="p-3 text-left w-24">Date</th>
                      <th className="p-3 text-left w-16">Time</th>
                      <th className="p-3 text-left w-20">Status</th>
                      <th className="p-3 text-left w-24">Duration (Minutes)</th>
                      <th className="p-3 text-left w-20">Location</th>
                      <th className="p-3 text-left w-20">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lectures.map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="p-3"><input type="checkbox" /></td>
                        <td className="p-3 text-gray-800 font-medium">{item.subject_name}</td>
                        <td className="p-3 text-gray-700">{item.class_name}</td>
                        <td className="p-3 text-gray-700">{new Date(item.date).toLocaleDateString()}</td>
                        <td className="p-3 text-gray-700">{item.time}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-3 text-gray-700">{item.duration}</td>
                        <td className="p-3 text-gray-700">{item.location || '-'}</td>
                        <td className="p-3 flex space-x-2">
                          <button 
                            onClick={() => handleEditLecture(item)}
                            className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteLecture(item.id)}
                            className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Floating Settings Button */}
            <button className="fixed right-6 top-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
              <Settings className="w-5 h-5" />
            </button>

            {/* Create Lecture Popup */}
            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Create New Lecture</h3>
                    <button onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateLecture}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                        <select
                          name="subject_id"
                          value={formData.subject_id}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select subject</option>
                          {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                        <select
                          name="class_id"
                          value={formData.class_id}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select class</option>
                          {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                              {cls.name} ({cls.class_number})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes) *</label>
                        <input
                          type="number"
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          min="1"
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="e.g., Room 101"
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
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
                            'Create Lecture'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Edit Lecture Popup */}
            {showEditPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Edit Lecture</h3>
                    <button onClick={() => {
                      setShowEditPopup(false);
                      setSelectedLecture(null);
                    }} className="text-gray-400 hover:text-gray-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleUpdateLecture}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                        <select
                          name="subject_id"
                          value={formData.subject_id}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select subject</option>
                          {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                        <select
                          name="class_id"
                          value={formData.class_id}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select class</option>
                          {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                              {cls.name} ({cls.class_number})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes) *</label>
                        <input
                          type="number"
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          min="1"
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="e.g., Room 101"
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div className="flex justify-end space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setShowEditPopup(false);
                            setSelectedLecture(null);
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
                            'Update Lecture'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
