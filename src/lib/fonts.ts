import { Be_Vietnam_Pro, Nunito } from "next/font/google";

export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const nunito = Nunito({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const fontVariables = `${beVietnamPro.variable} ${nunito.variable}`;
