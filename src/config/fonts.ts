

import { Montserrat_Alternates, Open_Sans } from "next/font/google";

export const titleFonts = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const mainFont = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
