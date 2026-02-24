// app/dashboard/voting/page.jsx
"use client"

import { useState, useEffect } from "react"
import { 
  CheckCircle, XCircle, Users, Vote, Clock, 
  Search, Filter, Edit2, Trash2, UserX, UserCheck,
  RefreshCw, X
} from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function VotingDetailPage() {
  const [data, setData] = useState({
    totalVoted: 0,
    totalEligibleVoters: 0,
    votes: [],
    voters: [],
    nonVoters: [],
    perKandidat: {},
    allUsers: [],
    kandidatList: []
  })
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all") // all, voted, nonvoted
  
  // State untuk modal edit user
  const [editModal, setEditModal] = useState({ open: false, user: null })
  const [editForm, setEditForm] = useState({ username: "", nisn: "" })
  const [editLoading, setEditLoading] = useState(false)
  
  // State untuk modal reset vote
  const [resetModal, setResetModal] = useState({ open: false, userId: null, userName: "" })
  const [resetLoading, setResetLoading] = useState(false)

  useEffect(() => {
    fetchVotingData()
  }, [])

  const fetchVotingData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Ambil semua users
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('*')
        .order('username', { ascending: true })
      
      if (usersError) throw usersError
      
      // Ambil semua votes
      const { data: votes, error: votesError } = await supabase
        .from('votes')
        .select('*')
      
      // Ambil semua kandidat
      const { data: kandidat, error: kandidatError } = await supabase
        .from('kandidat')
        .select('*')
        .order('no_kandidat', { ascending: true })
      
      if (kandidatError) throw kandidatError
      
      // Buat map kandidat untuk referensi cepat
      const kandidatMap = {}
      kandidat.forEach(k => {
        kandidatMap[k.id] = k
      })
      
      // Hitung total siswa
      const totalSiswa = users.filter(u => u.role === 'siswa').length
      
      // Proses data votes
      const votedUserIds = new Set()
      const votesDetail = []
      const perKandidatCount = {}
      
      if (votes && votes.length > 0) {
        votes.forEach(vote => {
          votedUserIds.add(vote.user_id)
          
          const user = users.find(u => u.id === vote.user_id)
          const kandidatInfo = kandidatMap[vote.kandidat_id]
          
          votesDetail.push({
            id: vote.id,
            user_id: vote.user_id,
            username: user?.username || 'Unknown',
            nisn: user?.nisn || '-',
            role: user?.role || 'unknown',
            kandidat_id: vote.kandidat_id,
            kandidatNama: kandidatInfo?.nama || 'Unknown',
            kandidatNo: kandidatInfo?.no_kandidat || 0,
            waktu: vote.created_at
          })
          
          // Hitung per kandidat
          if (!perKandidatCount[vote.kandidat_id]) {
            perKandidatCount[vote.kandidat_id] = {
              total: 0,
              nama: kandidatInfo?.nama || 'Unknown',
              no: kandidatInfo?.no_kandidat || 0
            }
          }
          perKandidatCount[vote.kandidat_id].total++
        })
      }
      
      // Dapatkan daftar siswa yang belum voting
      const nonVoters = users
        .filter(u => u.role === 'siswa' && !votedUserIds.has(u.id))
        .map(u => ({
          id: u.id,
          username: u.username,
          nisn: u.nisn,
          role: u.role
        }))
      
      setData({
        totalVoted: votedUserIds.size,
        totalEligibleVoters: totalSiswa,
        votes: votesDetail,
        voters: Array.from(votedUserIds).map(id => {
          const user = users.find(u => u.id === id)
          return {
            id,
            username: user?.username || 'Unknown',
            nisn: user?.nisn || '-'
          }
        }),
        nonVoters,
        perKandidat: perKandidatCount,
        allUsers: users,
        kandidatList: kandidat
      })
      
    } catch (err) {
      console.error('Error fetching voting data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Filter data berdasarkan search dan status
  const getFilteredData = () => {
    let filtered = []
    
    if (filterStatus === 'voted') {
      filtered = data.votes
    } else if (filterStatus === 'nonvoted') {
      filtered = data.nonVoters.map(u => ({
        ...u,
        isNonVoter: true
      }))
    } else {
      // Gabungkan voted dan nonvoted untuk tampilan all
      const votedWithFlag = data.votes.map(v => ({ ...v, isVoter: true }))
      const nonVotedWithFlag = data.nonVoters.map(u => ({ 
        ...u, 
        isNonVoter: true,
        // Tambahkan field dummy untuk konsistensi
        kandidatNama: '-',
        kandidatNo: '-',
        waktu: null
      }))
      filtered = [...votedWithFlag, ...nonVotedWithFlag]
    }
    
    // Filter berdasarkan search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(item => 
        (item.username?.toLowerCase().includes(term)) ||
        (item.nisn?.toLowerCase().includes(term))
      )
    }
    
    // Urutkan berdasarkan username
    return filtered.sort((a, b) => (a.username || '').localeCompare(b.username || ''))
  }

  // Handle edit user
  const handleEditUser = (user) => {
    setEditForm({
      username: user.username || '',
      nisn: user.nisn || ''
    })
    setEditModal({ open: true, user })
  }

  const saveEditUser = async () => {
    if (!editModal.user) return
    
    setEditLoading(true)
    try {
      const { error } = await supabase
        .from('users')
        .update({
          username: editForm.username.trim(),
          nisn: editForm.nisn.trim()
        })
        .eq('id', editModal.user.id)
      
      if (error) throw error
      
      // Refresh data
      await fetchVotingData()
      setEditModal({ open: false, user: null })
    } catch (err) {
      alert('Gagal mengupdate user: ' + err.message)
    } finally {
      setEditLoading(false)
    }
  }

  // Handle reset vote (hapus vote user)
  const handleResetVote = (userId, userName) => {
    setResetModal({ open: true, userId, userName })
  }

  const confirmResetVote = async () => {
    if (!resetModal.userId) return
    
    setResetLoading(true)
    try {
      // Hapus vote user
      const { error } = await supabase
        .from('votes')
        .delete()
        .eq('user_id', resetModal.userId)
      
      if (error) throw error
      
      // Refresh data
      await fetchVotingData()
      setResetModal({ open: false, userId: null, userName: '' })
    } catch (err) {
      alert('Gagal mereset vote: ' + err.message)
    } finally {
      setResetLoading(false)
    }
  }

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Error</p>
          <p className="mt-2">{error}</p>
          <button 
            onClick={fetchVotingData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  const filteredData = getFilteredData()

  return (
    <div className="space-y-6">
      {/* Modal Edit User */}
      {editModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setEditModal({ open: false, user: null })} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Edit Data User</h3>
              <button onClick={() => setEditModal({ open: false, user: null })}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NISN</label>
                <input
                  type="text"
                  value={editForm.nisn}
                  onChange={(e) => setEditForm({ ...editForm, nisn: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setEditModal({ open: false, user: null })}
                  className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                >
                  Batal
                </button>
                <button
                  onClick={saveEditUser}
                  disabled={editLoading}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {editLoading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Reset Vote */}
      {resetModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setResetModal({ open: false, userId: null, userName: '' })} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Reset Vote User</h3>
                <p className="text-sm text-gray-500">Hapus vote user yang salah</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus vote dari user{' '}
              <span className="font-semibold text-gray-900">{resetModal.userName}</span>?
              User akan bisa voting ulang.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setResetModal({ open: false, userId: null, userName: '' })}
                className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                onClick={confirmResetVote}
                disabled={resetLoading}
                className="flex-1 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
              >
                {resetLoading ? 'Memproses...' : 'Ya, Reset'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Detail Voting</h1>
        <p className="text-gray-600 mt-1">Kelola data voting dan user</p>
      </div>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Siswa</p>
              <p className="text-2xl font-bold text-gray-900">{data.totalEligibleVoters}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sudah Voting</p>
              <p className="text-2xl font-bold text-green-600">{data.totalVoted}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Belum Voting</p>
              <p className="text-2xl font-bold text-red-600">{data.nonVoters?.length || 0}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Kandidat</p>
              <p className="text-2xl font-bold text-purple-600">{data.kandidatList.length}</p>
            </div>
            <Vote className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari username atau NISN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          
          {/* Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilterStatus('voted')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'voted' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sudah Voting
            </button>
            <button
              onClick={() => setFilterStatus('nonvoted')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'nonvoted' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Belum Voting
            </button>
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={fetchVotingData}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            title="Refresh data"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabel Detail Voting */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Vote className="w-5 h-5 text-blue-500 mr-2" />
            Daftar Voting User ({filteredData.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NISN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Memilih</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waktu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={item.id || item.user_id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.username}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.nisn}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.role === 'siswa' ? 'bg-blue-100 text-blue-800' :
                      item.role === 'guru' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.role || 'siswa'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.isNonVoter ? (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        Belum Voting
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {item.kandidatNama} (No. {item.kandidatNo})
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(item.waktu)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* Edit User */}
                      <button
                        onClick={() => handleEditUser({
                          id: item.user_id || item.id,
                          username: item.username,
                          nisn: item.nisn
                        })}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit User"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      
                      {/* Reset Vote (hanya untuk yang sudah voting) */}
                      {!item.isNonVoter && (
                        <button
                          onClick={() => handleResetVote(item.user_id, item.username)}
                          className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Reset Vote"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    Tidak ada data yang sesuai dengan pencarian
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary per Kandidat */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Vote className="w-5 h-5 text-purple-500 mr-2" />
          Ringkasan Perolehan Suara per Kandidat
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(data.perKandidat).map(([id, k]) => (
            <div key={id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">No. {k.no}</span>
                <span className="text-xs text-gray-400">{k.total} suara</span>
              </div>
              <p className="text-gray-900 font-semibold">{k.nama}</p>
            </div>
          ))}
          
          {Object.keys(data.perKandidat).length === 0 && (
            <p className="text-gray-400 text-sm col-span-full text-center py-4">
              Belum ada suara masuk
            </p>
          )}
        </div>
      </div>
    </div>
  )
}