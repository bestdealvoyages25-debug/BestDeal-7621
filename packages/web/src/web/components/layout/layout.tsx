import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { Header } from "./header";
import { Footer } from "./footer";
import { WhatsAppButton } from "../whatsapp-button";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const timer = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
