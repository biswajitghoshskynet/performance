
'use server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'


export async function setToken(data) {
  cookies().set('skynetToken', data)
}

export async function getToken() {
  let token =  cookies().get('skynetToken')
   return token?.value?token.value:null
}

export async function deleteToken() {
  cookies().delete('skynetToken')
}
