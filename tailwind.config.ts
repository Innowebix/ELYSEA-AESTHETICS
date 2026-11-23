import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				porcelain: "#F6EFE7",
				cream: "#FBF7F1",
				sand: "#E7DAC8",
				blush: "#F2D7CD",
				petal: "#E4B3A4",
				rose: "#C4526A",
				copper: "#B4643C",
				gild: "#C9973F",
				plum: "#3A2430",
				ink: "#211219",
				sage: "#6F8560",
				mineral: "#4E7D8C",
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
			},
			fontFamily: {
				display: ["var(--font-display)", "Georgia", "serif"],
				sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 4px)",
				sm: "calc(var(--radius) - 8px)",
			},
			boxShadow: {
				lift: "0 24px 60px -24px rgba(58,36,48,.28)",
				glow: "0 0 60px -12px rgba(201,151,63,.45)",
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
				marquee: {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(-50%)" },
				},
				"aurora-a": {
					"0%,100%": { transform: "translate(0,0) scale(1)" },
					"50%": { transform: "translate(60px,-40px) scale(1.15)" },
				},
				"aurora-b": {
					"0%,100%": { transform: "translate(0,0) scale(1.1)" },
					"50%": { transform: "translate(-70px,50px) scale(.95)" },
				},
				"spin-slow": { to: { transform: "rotate(360deg)" } },
				float: {
					"0%,100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down .3s ease-out",
				"accordion-up": "accordion-up .3s ease-out",
				marquee: "marquee 30s linear infinite",
				"aurora-a": "aurora-a 19s ease-in-out infinite",
				"aurora-b": "aurora-b 24s ease-in-out infinite",
				"spin-slow": "spin-slow 26s linear infinite",
				float: "float 7s ease-in-out infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
