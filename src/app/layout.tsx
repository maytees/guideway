import "~/styles/globals.css";

import { Poppins } from "next/font/google";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { Toaster } from "~/components/ui/sonner";

const font = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans ${font.variable} anitaliased min-h-screen `}>
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
