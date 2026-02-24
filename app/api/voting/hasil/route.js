// app/api/voting/hasil/route.js
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Ambil semua users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, username, nisn, role, created_at')

    if (usersError) throw usersError

    // Ambil semua votes dengan relasi ke kandidat
    const { data: votes, error: votesError } = await supabase
      .from('votes')
      .select(`
        id,
        user_id,
        kandidat_id,
        created_at,
        users:user_id (
          username,
          nisn,
          role
        ),
        kandidat:kandidat_id (
          nama,
          no_kandidat
        )
      `)

    if (votesError) {
      console.log('Tabel votes belum ada atau error:', votesError)
      
      // Return data kosong dengan struktur yang benar
      return NextResponse.json({
        success: true,
        data: {
          totalVoted: 0,
          totalEligibleVoters: users.filter(u => u.role === 'siswa').length,
          perKandidat: {},
          votes: [],
          voters: [],
          nonVoters: users.filter(u => u.role === 'siswa').map(u => ({
            id: u.id,
            username: u.username,
            nisn: u.nisn
          }))
        }
      })
    }

    // Hitung total siswa (yang berhak voting)
    const totalSiswa = users.filter(u => u.role === 'siswa').length
    
    // Dapatkan daftar user_id yang sudah voting
    const votedUserIds = new Set()
    const votesDetail = votes.map(vote => {
      votedUserIds.add(vote.user_id)
      return {
        id: vote.id,
        userId: vote.user_id,
        username: vote.users?.username || 'Unknown',
        nisn: vote.users?.nisn || '-',
        kandidatId: vote.kandidat_id,
        kandidatNama: vote.kandidat?.nama || 'Unknown',
        kandidatNo: vote.kandidat?.no_kandidat || 0,
        waktu: vote.created_at
      }
    })

    const totalVoted = votedUserIds.size

    // Hitung perolehan suara per kandidat
    const perKandidat = {}
    votes.forEach(vote => {
      if (!perKandidat[vote.kandidat_id]) {
        perKandidat[vote.kandidat_id] = {
          total: 0,
          voters: []
        }
      }
      perKandidat[vote.kandidat_id].total++
      perKandidat[vote.kandidat_id].voters.push({
        userId: vote.user_id,
        username: vote.users?.username || 'Unknown',
        nisn: vote.users?.nisn || '-',
        waktu: vote.created_at
      })
    })

    // Dapatkan daftar siswa yang belum voting
    const nonVoters = users
      .filter(u => u.role === 'siswa' && !votedUserIds.has(u.id))
      .map(u => ({
        id: u.id,
        username: u.username,
        nisn: u.nisn
      }))

    return NextResponse.json({
      success: true,
      data: {
        totalVoted,
        totalEligibleVoters: totalSiswa,
        perKandidat,
        votes: votesDetail,
        voters: Array.from(votedUserIds).map(id => {
          const user = users.find(u => u.id === id)
          return {
            id,
            username: user?.username || 'Unknown',
            nisn: user?.nisn || '-'
          }
        }),
        nonVoters
      }
    })
  } catch (error) {
    console.error('Error fetching voting results:', error)
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 })
  }
}