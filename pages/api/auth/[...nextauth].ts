import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import { postLogin } from "services/auth";
import { responseLoginType } from "types/auth.type";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@gmail.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        console.log('credentials', credentials)
        if (credentials) {
          const res = await postLogin({ email: credentials?.email, password: credentials?.password }) as responseLoginType;
          if (res.message === 'success' && res) {
            return { id: res.data.Id, token: res.data.Token, name: res.data.Name, email: res.data.Email };
          } else {
            return null
          };
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
