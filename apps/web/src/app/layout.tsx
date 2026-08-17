import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "AC Fitness — fundação em curso",
  description:
    "A base para personais prescreverem, acompanharem e evoluírem treinos com histórico.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
