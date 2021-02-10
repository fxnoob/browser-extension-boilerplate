module.exports = {
  purge: {
    enabled: true,
    content: ["src/**/**/*.js", "src/**/**/*.jsx", "dist/**/*.html"]
  },
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [
    require("@tailwindcss/ui")({
      layout: "sidebar"
    })
  ]
};
