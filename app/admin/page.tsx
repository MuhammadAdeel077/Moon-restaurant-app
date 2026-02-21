'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/Icon';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  approvalNote?: string;
}

interface SlotInfo {
  date: string;
  time: string;
  available: number;
  booked: number;
  capacity: number;
}

type TabType = 'bookings' | 'slots' | 'reports';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [actionReason, setActionReason] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [reportData, setReportData] = useState<any>(null);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/bookings`);
      const data = await response.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  // Fetch available slots
  const fetchSlots = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/slots`);
      const data = await response.json();
      if (data.success) {
        setSlots(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch slots:', error);
    }
  };

  // Fetch report data
  const fetchReportData = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/reports`);
      const data = await response.json();
      if (data.success) {
        setReportData(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch report data:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (activeTab === 'bookings') {
        await fetchBookings();
      } else if (activeTab === 'slots') {
        await fetchSlots();
      } else if (activeTab === 'reports') {
        await fetchReportData();
      }
      setLoading(false);
    };
    loadData();
  }, [activeTab]);

  // Handle booking approval/rejection
  const handleAction = async () => {
    if (!selectedBooking) return;

    try {
      const response = await fetch(`${API_URL}/admin/bookings/${selectedBooking._id}/${actionType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: actionReason,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh bookings
        await fetchBookings();
        setShowModal(false);
        setActionReason('');
        setSelectedBooking(null);
      } else {
        alert(data.error || 'Failed to process action');
      }
    } catch (error) {
      console.error('Failed to process action:', error);
      alert('Failed to process action. Please try again.');
    }
  };

  // Open modal for approve/reject
  const openActionModal = (booking: Booking, action: 'approve' | 'reject') => {
    setSelectedBooking(booking);
    setActionType(action);
    setShowModal(true);
  };

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  // Download report
  const downloadReport = (format: 'csv' | 'json') => {
    if (!reportData) return;

    let content = '';
    let filename = `booking-report-${new Date().toISOString().split('T')[0]}`;

    if (format === 'csv') {
      // CSV format
      const headers = ['Date', 'Total Bookings', 'Pending', 'Approved', 'Rejected', 'Total Guests', 'Revenue Estimate'];
      content = headers.join(',') + '\n';
      
      if (reportData.daily) {
        reportData.daily.forEach((day: any) => {
          content += [
            day.date,
            day.totalBookings,
            day.pending,
            day.approved,
            day.rejected,
            day.totalGuests,
            `$${day.revenueEstimate}`
          ].join(',') + '\n';
        });
      }
      
      filename += '.csv';
    } else {
      // JSON format
      content = JSON.stringify(reportData, null, 2);
      filename += '.json';
    }

    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-[rgb(var(--primary))] text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Super Admin Dashboard</h1>
          <p className="text-white/90">Manage bookings, view slots, and generate reports</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === 'bookings'
                ? 'text-[rgb(var(--primary))]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Bookings
            {activeTab === 'bookings' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--primary))]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('slots')}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === 'slots'
                ? 'text-[rgb(var(--primary))]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Available Slots
            {activeTab === 'slots' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--primary))]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === 'reports'
                ? 'text-[rgb(var(--primary))]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Reports
            {activeTab === 'reports' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--primary))]"
              />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--primary))]"></div>
            </div>
          ) : (
            <>
              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div>
                  {/* Filters */}
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                      />
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  {/* Bookings List */}
                  <div className="space-y-4">
                    {filteredBookings.length === 0 ? (
                      <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <p className="text-gray-500 text-lg">No bookings found</p>
                      </div>
                    ) : (
                      filteredBookings.map((booking) => (
                        <motion.div
                          key={booking._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-lg shadow-md p-6"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-xl font-bold text-gray-900">{booking.name}</h3>
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    booking.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : booking.status === 'approved'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {booking.status.toUpperCase()}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Icon name="envelope" className="w-4 h-4" />
                                  <span>{booking.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Icon name="phone" className="w-4 h-4" />
                                  <span>{booking.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Icon name="location" className="w-4 h-4" />
                                  <span>{booking.branch}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Icon name="calendar" className="w-4 h-4" />
                                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Icon name="clock" className="w-4 h-4" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Icon name="users" className="w-4 h-4" />
                                  <span>{booking.guests} guests</span>
                                </div>
                                {booking.occasion && (
                                  <div className="flex items-center gap-2">
                                    <Icon name="party" className="w-4 h-4" />
                                    <span>{booking.occasion}</span>
                                  </div>
                                )}
                              </div>
                              {booking.message && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                  <p className="text-sm text-gray-700">{booking.message}</p>
                                </div>
                              )}
                              {booking.approvalNote && (
                                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <p className="text-sm text-blue-900"><strong>Admin Note:</strong> {booking.approvalNote}</p>
                                </div>
                              )}
                            </div>
                            {booking.status === 'pending' && (
                              <div className="flex flex-col gap-2">
                                <button
                                  onClick={() => openActionModal(booking, 'approve')}
                                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => openActionModal(booking, 'reject')}
                                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Slots Tab */}
              {activeTab === 'slots' && (
                <div>
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Booking Slots</h2>
                    <p className="text-gray-600 mb-6">View all available time slots and their capacities</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {slots.length === 0 ? (
                      <div className="col-span-full bg-white rounded-lg shadow-md p-12 text-center">
                        <p className="text-gray-500 text-lg">No slot data available</p>
                      </div>
                    ) : (
                      slots.map((slot, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-white rounded-lg shadow-md p-6"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{new Date(slot.date).toLocaleDateString()}</h3>
                              <p className="text-gray-600">{slot.time}</p>
                            </div>
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                slot.available > 5
                                  ? 'bg-green-100 text-green-800'
                                  : slot.available > 0
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              <span className="text-lg font-bold">{slot.available}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Capacity:</span>
                              <span className="font-semibold">{slot.capacity}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Booked:</span>
                              <span className="font-semibold">{slot.booked}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Available:</span>
                              <span className="font-semibold">{slot.available}</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  slot.available > 5 ? 'bg-green-600' : slot.available > 0 ? 'bg-yellow-600' : 'bg-red-600'
                                }`}
                                style={{ width: `${(slot.available / slot.capacity) * 100}%` }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Reports Tab */}
              {activeTab === 'reports' && (
                <div>
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Backend Reports</h2>
                        <p className="text-gray-600">Detailed analytics and statistics</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => downloadReport('csv')}
                          className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
                        >
                          Download CSV
                        </button>
                        <button
                          onClick={() => downloadReport('json')}
                          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
                        >
                          Download JSON
                        </button>
                      </div>
                    </div>
                  </div>

                  {reportData ? (
                    <div className="space-y-6">
                      {/* Summary Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-600 text-sm">Total Bookings</p>
                              <p className="text-3xl font-bold text-gray-900 mt-1">{reportData.summary?.totalBookings || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Icon name="calendar" className="w-6 h-6 text-blue-600" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-600 text-sm">Pending</p>
                              <p className="text-3xl font-bold text-yellow-600 mt-1">{reportData.summary?.pending || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                              <Icon name="clock" className="w-6 h-6 text-yellow-600" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-600 text-sm">Approved</p>
                              <p className="text-3xl font-bold text-green-600 mt-1">{reportData.summary?.approved || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                              <Icon name="check" className="w-6 h-6 text-green-600" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-600 text-sm">Rejected</p>
                              <p className="text-3xl font-bold text-red-600 mt-1">{reportData.summary?.rejected || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                              <Icon name="close" className="w-6 h-6 text-red-600" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">By Branch</h3>
                          <div className="space-y-3">
                            {reportData.byBranch && Object.entries(reportData.byBranch).map(([branch, count]: any) => (
                              <div key={branch} className="flex justify-between items-center">
                                <span className="text-gray-700">{branch}</span>
                                <span className="font-bold text-gray-900">{count}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Total Guests</h3>
                          <p className="text-4xl font-bold text-[rgb(var(--primary))]">{reportData.summary?.totalGuests || 0}</p>
                          <p className="text-gray-600 mt-2">Across all bookings</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Avg. Party Size</h3>
                          <p className="text-4xl font-bold text-[rgb(var(--primary))]">
                            {reportData.summary?.avgPartySize?.toFixed(1) || '0'}
                          </p>
                          <p className="text-gray-600 mt-2">Guests per booking</p>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      {reportData.recentActivity && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                          <div className="space-y-3">
                            {reportData.recentActivity.map((activity: any, index: number) => (
                              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className={`w-2 h-2 rounded-full ${
                                  activity.type === 'approved' ? 'bg-green-600' :
                                  activity.type === 'rejected' ? 'bg-red-600' : 'bg-blue-600'
                                }`} />
                                <span className="flex-1 text-gray-700">{activity.description}</span>
                                <span className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                      <p className="text-gray-500 text-lg">No report data available</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Approval/Rejection Modal */}
      <AnimatePresence>
        {showModal && selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {actionType === 'approve' ? 'Approve' : 'Reject'} Booking
              </h2>
              <p className="text-gray-600 mb-4">
                Booking for <strong>{selectedBooking.name}</strong> on{' '}
                <strong>{new Date(selectedBooking.date).toLocaleDateString()}</strong> at{' '}
                <strong>{selectedBooking.time}</strong>
              </p>
              <textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder={`Enter ${actionType === 'approve' ? 'confirmation message' : 'rejection reason'}...`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] mb-4 h-32 resize-none"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAction}
                  className={`flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold ${
                    actionType === 'approve' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
