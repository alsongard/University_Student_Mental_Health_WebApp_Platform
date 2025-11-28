import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import {z} from 'zod';
import type {User} from "./app/lib/definitions"
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
});




// async function getUser(email:String): Promise<User | undefined> {
//     try
//     {
//     }
//     catch(err)
//     {

//     }

// }
