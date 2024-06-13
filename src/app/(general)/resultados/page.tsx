"use client";
import React from "react";
import SearchBar from "@/app/components/searchBar/searchBar";

export default function Resultados() {
  return (
    <>
      <p>Resultados</p>
      <SearchBar onSearch={function (query: string): void {
        throw new Error("Function not implemented.");
      } } />
    </>
  );
}
