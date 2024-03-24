import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Guideway",
  description: `
  Guideway is the ultimate school club management platform that streamlines administrative tasks, enhances communication, and fosters a vibrant club community.Discover and join clubs, collaborate with members, and unlock the full potential of your school's organizations. Guideway empowers students, club leaders, and administrators to create a thriving and engaged club experience.`,
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} anitaliased`}>{children}</body>
    </html>
  );
}
