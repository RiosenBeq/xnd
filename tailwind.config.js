/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./js/**/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Core Brand Colors ─────────────────────────────────────
        // Deep navy base
        "surface":                  "#080c14",
        "surface-dim":              "#060a11",
        "surface-bright":           "#111827",
        "surface-container-lowest": "#050912",
        "surface-container-low":    "#0d1525",
        "surface-container":        "#111a2e",
        "surface-container-high":   "#172034",
        "surface-container-highest":"#1e2a42",
        "surface-variant":          "#1c2438",

        // On-surface
        "on-surface":         "#e8e6f0",
        "on-surface-variant": "#9aa4be",
        "on-background":      "#e8e6f0",
        "background":         "#080c14",

        // ── Gold / Amber Primary  ────────────────────────────────
        "primary":              "#c9a84c",
        "primary-dim":          "#b8963f",
        "primary-container":    "#3a2c0d",
        "on-primary":           "#080c14",
        "on-primary-container": "#f0d98a",
        "primary-fixed":        "#f5e7b2",
        "primary-fixed-dim":    "#e8d08a",
        "inverse-primary":      "#7a5e1a",
        "surface-tint":         "#c9a84c",
        "on-primary-fixed":     "#2a1e00",
        "on-primary-fixed-variant": "#5a3f0e",

        // ── Blue Accent / Secondary ─────────────────────────────
        "secondary":              "#8fa8f5",
        "secondary-container":    "#1c2e5e",
        "on-secondary":           "#080c14",
        "on-secondary-container": "#c4d0f7",
        "secondary-fixed":        "#d6dfff",
        "secondary-fixed-dim":    "#a5b5f0",
        "on-secondary-fixed":     "#0a1030",
        "on-secondary-fixed-variant": "#2a3c78",

        // ── Tertiary / Teal accent ──────────────────────────────
        "tertiary":              "#6bd4c8",
        "tertiary-container":    "#0d3530",
        "on-tertiary":           "#020f0e",
        "on-tertiary-container": "#a8ede7",
        "tertiary-fixed":        "#b8f0ea",
        "tertiary-fixed-dim":    "#6bd4c8",
        "on-tertiary-fixed":     "#001e1b",
        "on-tertiary-fixed-variant": "#1a4f49",

        // ── Outline / Border ────────────────────────────────────
        "outline":         "#2e3d5a",
        "outline-variant": "#1e2f4a",

        // ── Inverse ─────────────────────────────────────────────
        "inverse-surface":    "#e8e6f0",
        "inverse-on-surface": "#1a202e",

        // ── Error ───────────────────────────────────────────────
        "error":             "#f28b82",
        "error-container":   "#4a0a0a",
        "on-error":          "#2a0000",
        "on-error-container":"#ffd6d6",
      },

      fontFamily: {
        "headline":      ["Plus Jakarta Sans", "sans-serif"],
        "body":          ["Plus Jakarta Sans", "sans-serif"],
        "label":         ["Plus Jakarta Sans", "sans-serif"],
        "plus-jakarta":  ["Plus Jakarta Sans", "sans-serif"],
      },

      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg":      "1rem",
        "xl":      "1.5rem",
        "2xl":     "2rem",
        "3xl":     "2.5rem",
        "full":    "9999px",
      },

      animation: {
        "scroll":   "scroll 45s linear infinite",
        "float":    "floatY 6s ease-in-out infinite",
        "gold":     "goldShimmer 4s linear infinite",
      },
    },
  },
  plugins: [],
}
