// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export const authConfig: NextAuthConfig = {
	pages: {
		signIn: '/login',
	},
	providers: [
		Credentials(
			{
				// credentials: this is the object whose values are mapped in your handleSubmit form
				credentials: {
					email: { label: 'Email', type: 'email' },
					password: { label: 'Password', type: 'password' },
					admissionNum: {label: "AdmissionNumber", type:'text'}
				},
				// authorize: used to interact with the database for checking the user
				async authorize(credentials) {
					// Validate credentials exist
					console.log(`credentials: `);
					console.log(credentials);
					
					if (!credentials?.email || !credentials?.password || !credentials?.admissionNum) {
						return null;
					}

					try 
					{
					// Connect to MongoDB
						const { db } = await connectToDatabase();
						
						// Find user by email
						const user = await db.collection('users').findOne({
							email: credentials.email,
						});
						

						console.log(`this is user`);
						console.log(user);

						// Verify user exists and password matches
						// && user.isAccountVerified === true
						if (user && await bcrypt.compare(credentials.password, user.password )) {
							// Return user object (will be stored in JWT)
							return {
								id: user._id.toString(),
								email: user.email,
								name: user.name,
								role: user.role,
							};
						}

						return null; // Authentication failed
					} 
					catch (error) 
					{
						console.error('Auth error:', error);
						return null;
					}
				},
			}
		),
	],
	callbacks: 
	{
		async jwt({ token, user }) 
		{
			console.log('jwt token');
			console.log(token)
			// Add user data to JWT token on initial sign in
			if (user) 
			{
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) 
		{
			console.log('this is session');
			console.log(session);
			console.log('this is token');
			console.log(token);
			// Add user data to session from JWT token
			if (token) {
				session.user.id = token.id as string;
				session.user.role = token.role as string;
			}
			return session;
		},
		// the below function is used for authentication: this can be seen in nextjs learn docs
		authorized({ auth, request }) 
		{
			console.log('this is auth');
			console.log(auth);
			const isLoggedIn = !!auth?.user;
			const isOnProtectedRoute = 
				request.nextUrl.pathname.startsWith('/dashboard') ||
				request.nextUrl.pathname.startsWith('/profile');

			if (isOnProtectedRoute) {
				return isLoggedIn; // Redirect to login if not authenticated
			}
			return true;
		},
	},
};