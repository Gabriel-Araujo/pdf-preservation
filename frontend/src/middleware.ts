import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'br']
const defaultLocale = 'br'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    let locale = request.headers.get('language') ?? defaultLocale;
    locale = locales.includes(locale) ? locale : defaultLocale;

    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return;

    request.nextUrl.pathname = `/${locale}${pathname}`

    return NextResponse.redirect(request.nextUrl)
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/((?!_next).*)',
}