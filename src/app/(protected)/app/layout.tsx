import "~/styles/globals.css";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
        </div>
    );
}