import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials || credentials.password != "123") {
          return null;
        }
        const ids: { [key: string]: string } = {
          Ali: "1",
          Margo: "2",
          Guest: "3",
        };
        return {
          id: ids[credentials.username],
          email: credentials.username,
          name: credentials.username,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add user data to session
      if (session?.user) {
        session.user.name = token.name;
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.id = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
