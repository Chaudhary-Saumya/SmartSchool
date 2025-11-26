import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2, Loader2, X } from 'lucide-react';
import TeacherSidebar from '../components/TeacherSidebar';
import TeacherTopbar from '../components/TeacherTopbar';

export default function ExamSchedule() {
  const [activePage, setActivePage] = useState("exam-schedule"); // eslint-disable-line no-unused-vars
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [examSchedules, setExamSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    subject_id: '',
    class_id: '',
    date: '',
    time: '',
    duration: '',
    room_no: '',
    total_marks: '',
    required_marks: ''
  });

  useEffect(() => {
    fetchSubjects();
    fetchClasses();
    fetchExamSchedules();
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

  const fetchExamSchedules = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/exam-schedules', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setExamSchedules(data);
      } else {
        console.error('Failed to fetch exam schedules');
      }
    } catch (error) {
      console.error('Error fetching exam schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateExamSchedule = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const token = localStorage.getItem('token');
      const url = editingId
        ? `http://localhost:3000/api/exam-schedules/update/${editingId}`
        : 'http://localhost:3000/api/exam-schedules/add';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(`Exam schedule ${editingId ? 'updated' : 'created'} successfully`);
        setShowPopup(false);
        setEditingId(null);
        setFormData({
          subject_id: '',
          class_id: '',
          date: '',
          time: '',
          duration: '',
          room_no: '',
          total_marks: '',
          required_marks: ''
        });
        fetchExamSchedules();
      } else {
        const errorData = await response.json();
        alert(`Error ${editingId ? 'updating' : 'creating'} exam schedule: ` + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error(`Error ${editingId ? 'updating' : 'creating'} exam schedule:`, error);
      alert(`Error ${editingId ? 'updating' : 'creating'} exam schedule`);
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      subject_id: item.subject_id,
      class_id: item.class_id,
      date: item.date,
      time: item.time,
      duration: item.duration,
      room_no: item.room_no,
      total_marks: item.total_marks,
      required_marks: item.required_marks
    });
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this exam schedule?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/exam-schedules/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Exam schedule deleted successfully');
        fetchExamSchedules();
      } else {
        const errorData = await response.json();
        alert('Error deleting exam schedule: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting exam schedule:', error);
      alert('Error deleting exam schedule');
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
            <span className="text-gray-900 font-medium">Exam Schedule</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Exam Schedule</h2>
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
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      subject_id: '',
                      class_id: '',
                      date: '',
                      time: '',
                      duration: '',
                      room_no: '',
                      total_marks: '',
                      required_marks: ''
                    });
                    setShowPopup(true);
                  }}
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
                  <span className="ml-2 text-gray-600">Loading exam schedules...</span>
                </div>
              ) : (
                <table className="min-w-full text-sm whitespace-nowrap">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="p-3 text-left w-10"><input type="checkbox" /></th>
                      <th className="p-3 text-left w-24">Subject</th>
                      <th className="p-3 text-left w-20">Class</th>
                      <th className="p-3 text-left w-24">Date</th>
                      <th className="p-3 text-left w-20">Time</th>
                      <th className="p-3 text-left w-24">Duration</th>
                      <th className="p-3 text-left w-20">Room No</th>
                      <th className="p-3 text-left w-24">Total Marks</th>
                      <th className="p-3 text-left w-28">Required Marks</th>
                      <th className="p-3 text-left w-20">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examSchedules.map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="p-3"><input type="checkbox" /></td>
                        <td className="p-3 text-gray-800 font-medium">{item.subject_name}</td>
                        <td className="p-3 text-gray-700">{item.class_name}</td>
                        <td className="p-3 text-gray-700">{new Date(item.date).toLocaleDateString()}</td>
                        <td className="p-3 text-gray-700">{item.time}</td>
                        <td className="p-3 text-gray-700">{item.duration}</td>
                        <td className="p-3 text-gray-700">{item.room_no}</td>
                        <td className="p-3 text-gray-700">{item.total_marks}</td>
                        <td className="p-3 text-gray-700">{item.required_marks}</td>
                        <td className="p-3 flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
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

            {/* Create Exam Schedule Popup */}
            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {editingId ? 'Edit Exam Schedule' : 'Create Exam Schedule'}
                    </h3>
                    <button onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateExamSchedule}>
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
                          placeholder="e.g., 180"
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Room No *</label>
                        <input
                          type="text"
                          name="room_no"
                          value={formData.room_no}
                          onChange={handleInputChange}
                          placeholder="e.g., 101"
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks *</label>
                        <input
                          type="number"
                          name="total_marks"
                          value={formData.total_marks}
                          onChange={handleInputChange}
                          placeholder="e.g., 100"
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Required Marks *</label>
                        <input
                          type="number"
                          name="required_marks"
                          value={formData.required_marks}
                          onChange={handleInputChange}
                          placeholder="e.g., 35"
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
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
                              Creating...
                            </>
                          ) : (
                            'Create Schedule'
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
