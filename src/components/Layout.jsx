import React, { useRef } from "react";
import { Footer, Header } from ".";

export const Layout = ({ children }) => {
  const layoutRef = useRef(null);

  return (
    <div className="relative" ref={layoutRef}>
      <Header />
      <section className="bg-slate-100  min-h-screen top-16 mt-3 relative   p-2 sm:p-4 md:mb-0 mb-36 ">
        {children}
      </section>
      <Footer />
    </div>
  );
};
