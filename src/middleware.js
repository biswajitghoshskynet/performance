import { NextResponse } from 'next/server'

import { cookies } from 'next/headers'



export function middleware(request) {
  let token = cookies().get('skynetToken')

  if (token == undefined) {
    return NextResponse.redirect(new URL('/login', request.url)) 
  }

}


export const config = {
  matcher: ['/', '/users/:path*', '/contactlist' ]
}