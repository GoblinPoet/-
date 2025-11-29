import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const varela = Varela_Round({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-varela"
});

// Note: ZCOOL KuaiLe might not be available in subsets directly or needs different import
// For now we use Varela as the primary rounded font
export const metadata: Metadata = {
  title: "翻斗花园 - 图图风格生活记录",
  description: "记录生活中的每一个快乐瞬间",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${varela.variable} font-sans bg-tutu-bg text-tutu-text min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

