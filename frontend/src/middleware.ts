import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {cookies} from "next/headers";

const locales = ['en', 'br']
const defaultLocale = 'br'
const publicRoutes = ["/br/login", "/en/login", "/br/signup", "/en/signup"]
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublic = publicRoutes.includes(path);
    const token = (await cookies()).get("token")?.value;


    let locale = request.headers.get('language') ?? defaultLocale;
    locale = locales.includes(locale) ? locale : defaultLocale;

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL(`/${locale}/login`, request.nextUrl))
    }

    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    const cookieStore = await cookies();
    cookieStore.set("language", get_locale(pathname));

    if (pathnameHasLocale) return;

    request.nextUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(request.nextUrl)
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}

const get_locale = (path: string) => {
    const hasLocale = locales.some(
        locale => path.startsWith(`/${locale}/`) || path === `/${locale}`,
    )
    if (hasLocale) {
        return path.slice(1, 2).toLowerCase()
    }
    return "br"
}