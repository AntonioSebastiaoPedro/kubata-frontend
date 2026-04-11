import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "@/src/assets/styles/globals.css";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kubata | Encontre o seu lar",
  description:
    "Plataforma moderna que conecta proprietários e inquilinos de forma simples e segura.",
  keywords: ["imobiliária", "aluguel", "casas", "Kubata", "Angola"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}