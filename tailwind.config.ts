import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // shadcn semantic tokens (CSS variables)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Tea brand palette (hex vars from globals.css :root)
        tea: {
          "deep-brown": "var(--tea-deep-brown)",
          "dark-green": "var(--tea-dark-green)",
          "yellow-green": "var(--tea-yellow-green)",
          moss: "var(--tea-moss)",
          olive: "var(--tea-olive)",
          gold: "var(--tea-muted-gold)",
          ivory: "var(--tea-warm-ivory)",
          green: {
            DEFAULT: "var(--tea-dark-green)",
            dark: "var(--tea-green-900)",
            light: "var(--tea-moss)",
            50: "var(--tea-green-50)",
            600: "var(--tea-green-600)",
            700: "var(--tea-moss)",
            800: "var(--tea-dark-green)",
            900: "var(--tea-green-900)",
          },
          brown: {
            300: "var(--tea-yellow-green)",
            500: "var(--tea-brown-500)",
            700: "var(--tea-brown-700)",
            900: "var(--tea-deep-brown)",
          },
          cream: {
            DEFAULT: "var(--cream-50)",
            100: "var(--cream-100)",
          },
          ink: "var(--text-main)",
          muted: "var(--text-muted)",
        },
      },
      fontFamily: {
        display: ["var(--font-nunito)", "system-ui", "sans-serif"],
        sans: [
          "var(--font-be-vietnam)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: ["var(--font-inter)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
