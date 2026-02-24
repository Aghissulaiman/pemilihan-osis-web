// app/dashboard/page.jsx
"use client"

import { useState, useEffect } from "react"
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts'
import { Users, Vote, UserCheck, UserX, TrendingUp, GraduationCap, UsersRound } from "lucide-react"
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSiswa: 0,
    totalGuru: 0,
    totalAdmin: 0,
    totalVoted: 0,
    totalNotVoted: 0,
    percentageVoted: 0,
    kandidatData: [],
    votingTrend: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // 1. AMBIL DATA USERS LANGSUNG DARI SUPABASE
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('*')

      if (usersError) throw usersError

      // 2. AMBIL DATA KANDIDAT LANGSUNG DARI SUPABASE
      const { data: kandidatList, error: kandidatError } = await supabase
        .from('kandidat')
        .select('*')
        .order('no_kandidat', { ascending: true })

      if (kandidatError) throw kandidatError

      // 3. AMBIL DATA VOTES LANGSUNG DARI SUPABASE
      const { data: votes, error: votesError } = await supabase
        .from('votes')
        .select('*')

      if (votesError) {
        console.log('Tabel votes mungkin belum ada:', votesError)
        // Lanjutkan dengan data kosong
      }

      // HITUNG STATISTIK
      const totalUsers = users?.length || 0
      const totalSiswa = users?.filter(u => u.role === 'siswa').length || 0
      const totalGuru = users?.filter(u => u.role === 'guru').length || 0
      const totalAdmin = users?.filter(u => u.role === 'admin').length || 0
      
      // Hitung yang sudah voting (unique user_id dari tabel votes)
      const votedUserIds = new Set()
      const perKandidatCount = {}
      
      if (votes && votes.length > 0) {
        votes.forEach(vote => {
          votedUserIds.add(vote.user_id)
          
          // Hitung perolehan per kandidat
          if (!perKandidatCount[vote.kandidat_id]) {
            perKandidatCount[vote.kandidat_id] = 0
          }
          perKandidatCount[vote.kandidat_id]++
        })
      }

      const totalVoted = votedUserIds.size
      const totalNotVoted = Math.max(0, totalSiswa - totalVoted)
      const percentageVoted = totalSiswa > 0 ? (totalVoted / totalSiswa) * 100 : 0

      // Data untuk diagram pie per kandidat
      const kandidatVotes = kandidatList?.map(kandidat => ({
        name: kandidat.nama,
        no_kandidat: kandidat.no_kandidat,
        kelas: kandidat.kelas,
        value: perKandidatCount[kandidat.id] || 0,
        id: kandidat.id
      })).sort((a, b) => a.no_kandidat - b.no_kandidat) || []

      // Data trending (simulasi berdasarkan data voting)
      const trendingData = [
        { hari: 'Sen', pemilih: Math.floor(totalVoted * 0.1) },
        { hari: 'Sel', pemilih: Math.floor(totalVoted * 0.15) },
        { hari: 'Rab', pemilih: Math.floor(totalVoted * 0.2) },
        { hari: 'Kam', pemilih: Math.floor(totalVoted * 0.25) },
        { hari: 'Jum', pemilih: Math.floor(totalVoted * 0.3) },
        { hari: 'Sab', pemilih: Math.floor(totalVoted * 0.35) },
        { hari: 'Min', pemilih: Math.floor(totalVoted * 0.4) },
      ]

      setStats({
        totalUsers,
        totalSiswa,
        totalGuru,
        totalAdmin,
        totalVoted,
        totalNotVoted,
        percentageVoted: percentageVoted.toFixed(1),
        kandidatData: kandidatVotes,
        votingTrend: trendingData
      })

    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

  const StatCard = ({ icon: Icon, label, value, subValue, bgColor }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subValue && <p className="text-xs text-gray-500 mt-1">{subValue}</p>}
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Memuat data dashboard...</p>
        </div>
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
            onClick={fetchDashboardData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
     

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          icon={UsersRound}
          label="Total Pengguna"
          value={stats.totalUsers}
          subValue="Semua akun"
          bgColor="bg-blue-500"
        />
        <StatCard
          icon={GraduationCap}
          label="Total Siswa"
          value={stats.totalSiswa}
          subValue="Pemilih tetap"
          bgColor="bg-green-500"
        />
        <StatCard
          icon={Users}
          label="Total Guru"
          value={stats.totalGuru}
          subValue="Non-pemilih"
          bgColor="bg-purple-500"
        />
        <StatCard
          icon={Vote}
          label="Sudah Voting"
          value={stats.totalVoted}
          subValue={`${stats.percentageVoted}% dari siswa`}
          bgColor="bg-emerald-500"
        />
        <StatCard
          icon={UserX}
          label="Belum Voting"
          value={stats.totalNotVoted}
          subValue={`${(100 - stats.percentageVoted).toFixed(1)}% dari siswa`}
          bgColor="bg-orange-500"
        />
      </div>

      {/* Diagram Pie dan Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Perolehan Suara per Kandidat */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Perolehan Suara per Kandidat
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.kandidatData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.kandidatData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Detail per Kandidat */}
          <div className="mt-4 space-y-2">
            {stats.kandidatData.map((kandidat, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <div>
                    <span className="text-gray-700 font-medium">{kandidat.name}</span>
                    <span className="text-gray-500 text-xs ml-2">(No. {kandidat.no_kandidat})</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-900 font-medium">{kandidat.value} suara</span>
                  <span className="text-gray-500 w-16 text-right">
                    {stats.totalVoted > 0 
                      ? `${((kandidat.value / stats.totalVoted) * 100).toFixed(1)}%` 
                      : '0%'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Voting - Pie Chart Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Status Partisipasi Voting (Siswa)
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Sudah Voting', value: stats.totalVoted },
                    { name: 'Belum Voting', value: stats.totalNotVoted }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#10B981" /> {/* Sudah Voting - Green */}
                  <Cell fill="#F59E0B" /> {/* Belum Voting - Yellow */}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Ringkasan Status */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-green-600 font-medium">Sudah Voting</p>
              <p className="text-xl font-bold text-green-700">{stats.totalVoted}</p>
              <p className="text-xs text-green-600">siswa</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3">
              <p className="text-sm text-yellow-600 font-medium">Belum Voting</p>
              <p className="text-xl font-bold text-yellow-700">{stats.totalNotVoted}</p>
              <p className="text-xs text-yellow-600">siswa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Suara Masuk</h3>
          <p className="text-3xl font-bold">{stats.totalVoted}</p>
          <p className="text-blue-100 mt-1">dari {stats.totalSiswa} siswa</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Kandidat Teratas</h3>
          {stats.kandidatData.length > 0 ? (
            <>
              <p className="text-xl font-bold">
                {stats.kandidatData.reduce((max, item) => 
                  item.value > max.value ? item : max, stats.kandidatData[0]
                ).name}
              </p>
              <p className="text-green-100 mt-1">
                No. {stats.kandidatData.reduce((max, item) => 
                  item.value > max.value ? item : max, stats.kandidatData[0]
                ).no_kandidat} • {stats.kandidatData.reduce((max, item) => 
                  item.value > max.value ? item : max, stats.kandidatData[0]
                ).value} suara
              </p>
            </>
          ) : (
            <p className="text-green-100">Belum ada data</p>
          )}
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Target Partisipasi</h3>
          <p className="text-3xl font-bold">{stats.percentageVoted}%</p>
          <p className="text-purple-100 mt-1">
            {stats.totalNotVoted} siswa belum voting
          </p>
        </div>
      </div>
    </div>
  )
}