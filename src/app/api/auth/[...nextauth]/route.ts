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
          credentials.username === "Maria Aline" &&
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
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };

const colaborator: UserProps = {
  id: "caksljddjaskld",
  image:
    "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
  name: "john doe",
  office: "developer",
  dateNaissance: "07/07/1997",
  rg: "9999999",
  adress: "Rua das flores, 123",
  ctps: "1234567890",
  issuingBody: "SSP",
  number: "1234567890",
  cpf: "1234567890-00",
  cep: "12345-678",
  complement: "apto 123",
  manager: false,
  password: "123456",
};

const manager: UserProps = {
  id: "caksljddjaskld",
  image:
    "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
  name: "Maria Aline",
  office: "Maneger",
  dateNaissance: "06/06/1996 ",
  rg: "9999999",
  adress: "Rua das lagos, 123",
  ctps: "1234567890",
  issuingBody: "SDS",
  number: "1234567890",
  cpf: "1234567890-00",
  cep: "12345-678",
  complement: "apto 321",
  manager: true,
  password: "123456",
};
