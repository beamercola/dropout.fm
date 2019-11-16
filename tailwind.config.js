module.exports = {
  theme: {
    boxShadow: {
      default: "1px 1px 0 0 black"
    },
    fontFamily: {
      mono: ["SFMono-Regular", "monospace"]
    },
    extend: {
      colors: {
        canvas: "#E5E6D8"
      },
      spacing: {
        "72": "18rem",
        "84": "21rem",
        "96": "24rem"
      },
      screens: {
        dark: { raw: "(prefers-color-scheme: dark)" }
      }
    }
  },
  variants: {
    borderWidth: ["last"],
    padding: ["even", "responsive"]
  },
  plugins: []
};
