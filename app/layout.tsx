import type { Metadata } from "next";
import { Inter, Dela_Gothic_One } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const dgo = Dela_Gothic_One({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
    title: "Just For Run",
    description: "One Stop Solution for all your running needs",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
