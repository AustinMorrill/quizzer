var tailwindcss = require("tailwindcss")

module.exports = {
	plugins: [
		tailwindcss("./tailwind.js"), 
		require("autoprefixer")],
		
	theme: {
		fontFamily: {
			sans: ["Montserrat"],
			base2: ["Oswald"]
		}
	}
}
