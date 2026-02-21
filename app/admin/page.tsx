'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/Icon';
import { toast } from 'sonner';

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
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  approvalNote?: string;
  isClosed?: boolean;
}

interface SlotInfo {
  branch: string;
  branchName: string;
  date: string;
  time: string;
  totalCapacity: number;
  booked: number;
  available: number;
  status: 'available' | 'limited' | 'full';
}

interface DashboardSummary {
  today: number;
  pending: number;
  thisWeek: number;
  thisMonth: number;
}

type TabType = 'dashboard' | 'bookings' | 'slots' | 'reports';
type ActionType = 'approve' | 'reject' | 'close' | 'delete';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [actionReason, setActionReason] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<ActionType>('approve');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'cancelled'>('all');
  const [filterBranch, setFilterBranch] = useState<'all' | 'naran' | 'besar'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [reportData, setReportData] = useState<any>(null);

  // Fetch dashboard summary
  const fetchDashboard = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/dashboard`);
      const data = await response.json();
      if (data.success) {
        setDashboard(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    }
  };

  // Fetch bookings with filters
  const fetchBookings = async () => {
    try {
      const params = new URLSearchParams();
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (filterBranch !== 'all') params.append('branch', filterBranch);
      
      const response = await fetch(`${API_URL}/admin/bookings?${params.toString()}`);
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
      const params = new URLSearchParams();
      if (filterBranch !== 'all') params.append('branch', filterBranch);
      params.append('days', '30');
      
      const response = await fetch(`${API_URL}/admin/slots?${params.toString()}`);
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
      if (activeTab === 'dashboard') {
        await fetchDashboard();
      } else if (activeTab === 'bookings') {
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

  // Reload bookings when filters change
  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings();
    }
  }, [filterStatus, filterBranch]);

  // Reload slots when branch filter changes
  useEffect(() => {
    if (activeTab === 'slots') {
      fetchSlots();
    }
  }, [filterBranch]);

  // Handle booking actions (approve, reject, close, delete)
  const handleAction = async () => {
    if (!selectedBooking) return;

    try {
      let response;
      
      if (actionType === 'delete') {
        // DELETE request for deleting booking
        response = await fetch(`${API_URL}/admin/bookings/${selectedBooking._id}`, {
          method: 'DELETE',
        });
      } else {
        // POST request for approve, reject, or close
        const body: any = {};
        if (actionType === 'approve' || actionType === 'reject') {
          body.approvalNote = actionReason;
        }
        
        response = await fetch(`${API_URL}/admin/bookings/${selectedBooking._id}/${actionType}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
      }

      const data = await response.json();

      if (data.success) {
        // Success toast based on action type
        const messages = {
          approve: 'Booking approved successfully!',
          reject: 'Booking rejected successfully!',
          close: 'Booking closed/cancelled successfully!',
          delete: 'Booking deleted permanently!'
        };
        
        toast.success(messages[actionType], {
          description: actionType === 'delete' 
            ? 'The booking has been removed from the system.' 
            : 'The customer has been notified via email.',
          duration: 4000,
        });
        
        // Refresh bookings and dashboard
        await fetchBookings();
        if (dashboard) await fetchDashboard();
        setShowModal(false);
        setActionReason('');
        setSelectedBooking(null);
      } else {
        toast.error('Action failed', {
          description: data.error || data.message || 'Failed to process action',
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Failed to process action:', error);
      toast.error('Action failed', {
        description: 'Please check your connection and try again.',
        duration: 5000,
      });
    }
  };

  // Open modal for actions
  const openActionModal = (booking: Booking, action: ActionType) => {
    setSelectedBooking(booking);
    setActionType(action);
    setShowModal(true);
  };

  // Filter bookings (client-side for search)
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.phone.includes(searchTerm);
    return matchesSearch;
  });

  // Get branch display name
  const getBranchName = (branch: string) => {
    return branch === 'naran' ? 'Naran' : branch === 'besar' ? 'Besar' : branch.charAt(0).toUpperCase() + branch.slice(1);
  };

  // Download report
  const downloadReport = (format: 'csv' | 'json') => {
    if (!reportData) return;

    let content = '';
    let filename = `booking-report-${new Date().toISOString().split('T')[0]}`;

    if (format === 'csv') {
      // CSV format
      const headers = ['Branch', 'Total', 'Pending', 'Approved', 'Rejected', 'Cancelled'];
      content = headers.join(',') + '\n';
      
      if (reportData.branchStats) {
        Object.entries(reportData.branchStats).forEach(([branch, stats]: [string, any]) => {
          content += [
            getBranchName(branch),
            stats.total || 0,
            stats.pending || 0,
            stats.approved || 0,
            stats.rejected || 0,
            stats.cancelled || 0
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
        <div className="flex gap-4 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 font-semibold transition-colors relative flex-shrink-0 ${
              activeTab === 'dashboard'
                ? 'text-[rgb(var(--primary))]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Dashboard
            {activeTab === 'dashboard' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--primary))]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 font-semibold transition-colors relative flex-shrink-0 ${
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
            className={`px-6 py-3 font-semibold transition-colors relative flex-shrink-0 ${
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
            className={`px-6 py-3 font-semibold transition-colors relative flex-shrink-0 ${
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
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && dashboard && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Today's Bookings</p>
                        <p className="text-3xl font-bold text-[rgb(var(--primary))] mt-1">{dashboard.today}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon name="calendar" className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Pending 

</p>
                        <p className="text-3xl font-bold text-yellow-600 mt-1">{dashboard.pending}</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Icon name="clock" className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">This Week</p>
                        <p className="text-3xl font-bold text-green-600 mt-1">{dashboard.thisWeek}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Icon name="check" className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">This Month</p>
                        <p className="text-3xl font-bold text-purple-600 mt-1">{dashboard.thisMonth}</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Icon name="star" className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div>
                  {/* Filters */}
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
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
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <select
                        value={filterBranch}
                        onChange={(e) => setFilterBranch(e.target.value as any)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                      >
                        <option value="all">All Branches</option>
                        <option value="naran">Naran</option>
                        <option value="besar">Besar</option>
                      </select>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setFilterStatus('all');
                          setFilterBranch('all');
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                      >
                        Clear Filters
                      </button>
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
                                      : booking.status === 'cancelled'
                                      ? 'bg-gray-100 text-gray-800'
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
                                  <span>{getBranchName(booking.branch)}</span>
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
                                    <span className="capitalize">{booking.occasion}</span>
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
                            <div className="flex flex-col gap-2 min-w-[140px]">
                              {booking.status === 'pending' && (
                                <>
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
                                </>
                              )}
                              {!booking.isClosed && booking.status !== 'cancelled' && (
                                <button
                                  onClick={() => openActionModal(booking, 'close')}
                                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                                >
                                  Close/Cancel
                                </button>
                              )}
                              <button
                                onClick={() => openActionModal(booking, 'delete')}
                                className="px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors font-semibold"
                              >
                                Delete
                              </button>
                            </div>
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
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Booking Slots</h2>
                        <p className="text-gray-600">View all available time slots and their capacities (30 days)</p>
                      </div>
                      <select
                        value={filterBranch}
                        onChange={(e) => setFilterBranch(e.target.value as any)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                      >
                        <option value="all">All Branches</option>
                        <option value="naran">Naran (50 capacity)</option>
                        <option value="besar">Besar (40 capacity)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {slots.length === 0 ? (
                      <div className="col-span-full bg-white rounded-lg shadow-md p-12 text-center">
                        <p className="text-gray-500 text-lg">No slot data available</p>
                      </div>
                    ) : (
                      slots.map((slot, index) => (
                        <motion.div
                          key={`${slot.branch}-${slot.date}-${slot.time}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: Math.min(index * 0.02, 1) }}
                          className="bg-white rounded-lg shadow-md p-6"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-gray-900">{new Date(slot.date).toLocaleDateString()}</h3>
                                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold">
                                  {slot.branchName}
                                </span>
                              </div>
                              <p className="text-gray-600">{slot.time}</p>
                            </div>
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                slot.status === 'available'
                                  ? 'bg-green-100 text-green-800'
                                  : slot.status === 'limited'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              <span className="text-lg font-bold">{slot.available}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Total Capacity:</span>
                              <span className="font-semibold">{slot.totalCapacity}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Booked:</span>
                              <span className="font-semibold">{slot.booked}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Available:</span>
                              <span className="font-semibold">{slot.available}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Status:</span>
                              <span className={`font-semibold capitalize ${
                                slot.status === 'available' ? 'text-green-600' :
                                slot.status === 'limited' ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {slot.status}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  slot.status === 'available' ? 'bg-green-600' : 
                                  slot.status === 'limited' ? 'bg-yellow-600' : 'bg-red-600'
                                }`}
                                style={{ width: `${(slot.available / slot.totalCapacity) * 100}%` }}
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
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-600 text-sm">Total Bookings</p>
                              <p className="text-3xl font-bold text-gray-900 mt-1">{reportData.summary?.total || 0}</p>
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

                        <div className="bg-white rounded-lg shadow-md p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-600 text-sm">Cancelled</p>
                              <p className="text-3xl font-bold text-gray-600 mt-1">{reportData.summary?.cancelled || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Icon name="close" className="w-6 h-6 text-gray-600" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Branch Stats & Guest Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Branch Statistics</h3>
                          <div className="space-y-3">
                            {reportData.branchStats && Object.entries(reportData.branchStats).map(([branch, stats]: [string, any]) => (
                              <div key={branch} className="border-b border-gray-100 pb-3 last:border-0">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-semibold text-gray-900">{getBranchName(branch)}</span>
                                  <span className="font-bold text-[rgb(var(--primary))]">{stats.total || 0}</span>
                                </div>
                                <div className="text-xs text-gray-600 space-x-3">
                                  <span>✓ {stats.approved || 0}</span>
                                  <span>⏱ {stats.pending || 0}</span>
                                  <span>✗ {stats.rejected || 0}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Guest Statistics</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="text-gray-600 text-sm">Total Guests</p>
                              <p className="text-4xl font-bold text-[rgb(var(--primary))] mt-1">{reportData.guestStats?.total || 0}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-sm">Average Party Size</p>
                              <p className="text-2xl font-bold text-gray-900 mt-1">{reportData.guestStats?.average?.toFixed(1) || '0.0'}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Estimate</h3>
                          <p className="text-4xl font-bold text-green-600">${reportData.estimatedRevenue?.toLocaleString() || 0}</p>
                          <p className="text-gray-600 mt-2">Based on bookings</p>
                        </div>
                      </div>

                      {/* Occasions */}
                      {reportData.occasions && Object.keys(reportData.occasions).length > 0 && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Occasions</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {Object.entries(reportData.occasions).map(([occasion, count]: [string, any]) => (
                              <div key={occasion} className="text-center p-4 bg-gray-50 rounded-lg">
                                <p className="text-2xl font-bold text-[rgb(var(--primary))]">{count}</p>
                                <p className="text-sm text-gray-700 capitalize mt-1">{occasion}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recent & Upcoming Bookings */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {reportData.recentBookings && reportData.recentBookings.length > 0 && (
                          <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h3>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                              {reportData.recentBookings.map((booking: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{booking.name}</p>
                                    <p className="text-sm text-gray-600">{getBranchName(booking.branch)} • {new Date(booking.date).toLocaleDateString()}</p>
                                  </div>
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                    booking.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {booking.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {reportData.upcomingBookings && reportData.upcomingBookings.length > 0 && (
                          <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Bookings</h3>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                              {reportData.upcomingBookings.map((booking: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                  <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{booking.name}</p>
                                    <p className="text-sm text-gray-600">{getBranchName(booking.branch)} • {new Date(booking.date).toLocaleDateString()} • {booking.time}</p>
                                    <p className="text-xs text-gray-500">{booking.guests} guests</p>
                                  </div>
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {booking.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
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
                {actionType === 'approve' && 'Approve Booking'}
                {actionType === 'reject' && 'Reject Booking'}
                {actionType === 'close' && 'Close/Cancel Booking'}
                {actionType === 'delete' && 'Delete Booking'}
              </h2>
              <p className="text-gray-600 mb-4">
                Booking for <strong>{selectedBooking.name}</strong> on{' '}
                <strong>{new Date(selectedBooking.date).toLocaleDateString()}</strong> at{' '}
                <strong>{selectedBooking.time}</strong>
              </p>
              
              {(actionType === 'approve' || actionType === 'reject') && (
                <textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder={actionType === 'approve' ? 'Enter confirmation message (optional)...' : 'Enter rejection reason...'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] mb-4 h-32 resize-none"
                />
              )}

              {actionType === 'close' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    This will mark the booking as cancelled. The customer will be notified.
                  </p>
                </div>
              )}

              {actionType === 'delete' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-red-700 font-semibold">⚠️ Warning: This action cannot be undone!</p>
                  <p className="text-sm text-gray-700 mt-2">
                    This will permanently delete the booking from the system.
                  </p>
                </div>
              )}

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
                    actionType === 'approve' ? 'bg-green-600' :
                    actionType === 'reject' ? 'bg-red-600' :
                    actionType === 'close' ? 'bg-yellow-600' :
                    'bg-red-700'
                  }`}
                >
                  {actionType === 'approve' && 'Confirm Approval'}
                  {actionType === 'reject' && 'Confirm Rejection'}
                  {actionType === 'close' && 'Close Booking'}
                  {actionType === 'delete' && 'Delete Permanently'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
