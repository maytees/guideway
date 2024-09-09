import "~/styles/globals.css";

import { unstable_noStore as noStore } from "next/cache";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/components/ui/ThemeProvider";
import { TooltipProvider } from "~/components/ui/tooltip";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

// const font = Poppins({
//   subsets: ["latin"],
//   variable: "--font-sans",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

export const metadata = {
  title: "Guideway",
  description: `
  Guideway is the ultimate school club management platform that streamlines administrative tasks, enhances communication, and fosters a vibrant club community.Discover and join clubs, collaborate with members, and unlock the full potential of your school's organizations. Guideway empowers students, club leaders, and administrators to create a thriving and engaged club experience.`,
  icons: [{ rel: "icon", url: "/logo.svg" }],
};
async function getData(userId: string | undefined) {
  noStore();
  if (userId) {
    const data = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        colorScheme: true,
      },
    });
    return data;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  const data = await getData(user?.id);

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`anitaliased  h-full min-h-screen font-sans ${data?.colorScheme ?? "theme-yellow"}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
