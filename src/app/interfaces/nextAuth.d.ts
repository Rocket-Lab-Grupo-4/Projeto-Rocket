import NextAuth from "next-auth";
import { UserProps } from "./user";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      image?: string;
      name: string;
      office: string;
      dateNaissance: string;
      rg: string;
      adress: string;
      ctps: string;
      issuingBody: string;
      number: string;
      cpf: string;
      cep: string;
      complement: string;
      manager: boolean;
      password?: string;
    };
  }
}
