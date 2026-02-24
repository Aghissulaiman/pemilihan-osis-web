import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: kandidat, error } = await supabase
      .from('kandidat')
      .select('*')
      .order('no_kandidat', { ascending: true })

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: kandidat
    })
  } catch (error) {
    console.error('Error fetching kandidat:', error)
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 })
  }
}