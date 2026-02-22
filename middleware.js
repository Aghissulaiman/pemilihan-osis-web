// middleware.js (di root folder)
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Ambil path yang diminta
  const path = request.nextUrl.pathname
  
  // Dapatkan user dari cookie
  const userCookie = request.cookies.get('user')?.value
  let user = null
  
  if (userCookie) {
    try {
      user = JSON.parse(userCookie)
    } catch (e) {
      console.error('Error parsing user cookie:', e)
    }
  }

  // Halaman yang bisa diakses tanpa login
  const isPublicPath = path === '/' || path === '/login'
  
  // Halaman landing page
  const isLandingPage = path === '/'
  
  // Halaman login
  const isLoginPage = path === '/login'
  
  // Halaman home (untuk siswa & guru)
  const isHomePage = path === '/home'
  
  // Halaman dashboard (khusus admin)
  const isDashboardPage = path.startsWith('/dashboard')
  
  // ============================================
  // KONDISI 1: TIDAK ADA USER (BELUM LOGIN)
  // ============================================
  if (!user) {
    // Jika mencoba akses halaman publik (landing page atau login), boleh
    if (isPublicPath) {
      return NextResponse.next()
    }
    
    // Jika mencoba akses halaman lain (home, dashboard, dll), redirect ke landing page
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // ============================================
  // KONDISI 2: SUDAH LOGIN (USER ADA)
  // ============================================
  
  // Jika sudah login dan mencoba akses landing page, redirect sesuai role
  if (isLandingPage) {
    if (user.role === 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
      // Untuk siswa dan guru
      return NextResponse.redirect(new URL('/home', request.url))
    }
  }
  
  // Jika sudah login dan mencoba akses halaman login, redirect sesuai role
  if (isLoginPage) {
    if (user.role === 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
      return NextResponse.redirect(new URL('/home', request.url))
    }
  }
  
  // ============================================
  // PROTEKSI BERDASARKAN ROLE
  // ============================================
  
  // Jika user adalah SISWA
  if (user.role === 'siswa') {
    // Siswa HANYA boleh akses halaman home
    if (!isHomePage) {
      // Jika mencoba akses selain home (termasuk dashboard), tampilkan 404
      return NextResponse.rewrite(new URL('/404', request.url))
    }
    // Jika akses home, lanjutkan
    return NextResponse.next()
  }
  
  // Jika user adalah GURU
  if (user.role === 'guru') {
    // Guru HANYA boleh akses halaman home
    if (!isHomePage) {
      // Jika mencoba akses selain home (termasuk dashboard), tampilkan 404
      return NextResponse.rewrite(new URL('/404', request.url))
    }
    // Jika akses home, lanjutkan
    return NextResponse.next()
  }
  
  // Jika user adalah ADMIN
  if (user.role === 'admin') {
    // Admin HANYA boleh akses halaman dashboard
    if (!isDashboardPage) {
      // Jika mencoba akses selain dashboard (termasuk home), tampilkan 404
      return NextResponse.rewrite(new URL('/404', request.url))
    }
    // Jika akses dashboard, lanjutkan
    return NextResponse.next()
  }
  
  // Fallback: jika role tidak dikenal, redirect ke landing page
  return NextResponse.redirect(new URL('/', request.url))
}

// Konfigurasi path yang diproses middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}