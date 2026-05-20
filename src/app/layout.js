import {
  Great_Vibes,
  Playfair_Display,
  Inter,
  Chewy,
  Fredoka,
  Nunito,
} from "next/font/google";
import "./globals.css";

const fontAccent = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-accent",
  display: "swap",
});

const fontHeading = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const fontKidsAccent = Chewy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-kids-accent",
  display: "swap",
});

const fontKidsHeading = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kids-heading",
  display: "swap",
});

const fontKidsBody = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kids-body",
  display: "swap",
});

export const metadata = {
  title: "InvitlyApp",
  description: "Invitación Digital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`
          ${fontAccent.variable}
          ${fontHeading.variable}
          ${fontBody.variable}
          ${fontKidsAccent.variable}
          ${fontKidsHeading.variable}
          ${fontKidsBody.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
