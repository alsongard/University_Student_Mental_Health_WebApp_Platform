// app/api/auth/[...nextauth]/route.ts file
// configure nextauth to use credentials provider and JWT session
// In the Credentials() which is given to provider: [] we use this function to validate users:get useremail
// from database(mongodb) and return an user object {userId:adbe134deqqfda343124}
// we then use the jwt to include both the userRole, userId 
// use session callback to include the token 

/**
 * 
 * To initialize NextAuthjs in app router we do the following:
 * create a file: ``app/api/auth/[...nextauth]/route.ts
 * ```
 * import NextAuth from "next-auth";
 * const handler = NextAuth({
 *  ...
 * })
 * 
 * export {handler as GET, handler as POST}
 * ```
 * 
 * NEXTAUTH_SECRET
Used to encrypt the NextAuth.js JWT, and to hash email verification tokens. This is the default value 
for the secret option in NextAuth and Middleware. Alternatively, you can also set AUTH_SECRET, which is an alias, and is the preferred naming going forward.

NEXTAUTH_URL_INTERNAL
If provided, server-side calls will use this instead of NEXTAUTH_URL. Useful in environments when the server doesn't have access to the canonical URL of your site. Defaults to NEXTAUTH_URL 

from tis you will go into options upon which there is -auth
after this u need to follow on the Credentials part.

*/

import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
const handler = NextAuth(authConfig);


export {handler as GET, handler as POST}