import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jogo de Dados",
  description: "Jogo de dados para 2 jogadores em 5 rodadas",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
