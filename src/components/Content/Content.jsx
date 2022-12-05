import React from "react";

export function Content({ children }) {
  return (
    <main className='container'>
      <h1 className='visually-hidden'>Pomadoro App</h1>
      {children}
    </main>
  );
}
