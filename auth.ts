
import NextAuth from 'next-auth'
import Github from "next-auth/providers/github"
import { prisma } from './lib/prisma'
import {PrismaAdapter } from '@auth/prisma-adapter'
export const {auth,handlers,signIn,signOut}=NextAuth({
providers:[Github],
 adapter:PrismaAdapter(prisma)
})