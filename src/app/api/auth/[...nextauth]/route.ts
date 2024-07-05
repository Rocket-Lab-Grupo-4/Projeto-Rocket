import { UserProps } from "@/app/interfaces/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (
          credentials &&
          credentials.username === "john doe" &&
          credentials.password === "123456"
        ) {
          return colaborator;
        }

        if (
          credentials &&
          credentials.username === "Maria José" &&
          credentials.password === "123456"
        ) {
          return manager;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as UserProps;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };

const colaborator: UserProps = {
  id: "clxtlggn60000cvzgissdxodd",
  image:
    "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  name: "John Doe",
  office: "Developer",
  dateNaissance: "1990-01-01T00:00:00.000Z",
  rg: "123456789",
  adress: "123 Main St, City, State, Country",
  ctps: "123456789",
  issuingBody: "SSP",
  number: "123456789",
  cpf: "123456789",
  cep: "12345678",
  complement: "Apt 123",
  manager: false,
  password: "123456",
};

const manager: UserProps = {
  id: "clxtlh00m0001cvzgd7gq1tjl",
  image:
    "https://images.unsplash.com/photo-1664575600850-c4b712e6e2bf?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  name: "Maria José",
  office: "Developer",
  dateNaissance: "1990-01-01T00:00:00.000Z",
  rg: "123456789",
  adress: "123 Main St, City, State, Country",
  ctps: "123456789",
  issuingBody: "SSP",
  number: "123456789",
  cpf: "12345678910",
  cep: "12345678",
  complement: "Apt 123",
  manager: true,
  password: "123456",
};
