import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }) {
  return (
    <html lang="de" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="icon" href="/assets/img/logo-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
