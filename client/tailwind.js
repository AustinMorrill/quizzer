const chroma = require("chroma-js")

module.exports = {
	theme: {
		fontFamily: {
			sans: ["Montserrat"],
			base2: ["Oswald"]
		},
		extend: {
			colors: {
				'tc-darkest': chroma("#0ecf7b").hex(),
				'tc-darker': chroma("#27da87").hex(),
				'tc-dark': chroma("#40e394").hex(),
				'tc': chroma("#5beca3").hex(),
				'tc-light': chroma("#79f4b5").hex(),
				'tc-lighter': chroma("#9bfbc9").hex(),
				'tc-lightest': chroma("#c1ffe1").hex(),
				'tc2-darkest': chroma("#9d2400").hex(),
				'tc2-darker': chroma("#b73c00").hex(),
				'tc2-dark': chroma("#d252000").hex(),
				'tc2': chroma("#ed6900").hex(),
				'tc2-light': chroma("#ff8618").hex(),
				'tc2-lighter': chroma("#ffac45").hex(),
				'tc2-lightest': chroma("#ffce67").hex(),
			

			}
		},
		transitionProperty: {
			// defaults to these values
			none: "none",
			all: "all",
			color: "color",
			bg: "background-color",
			border: "border-color",
			colors: ["color", "background-color", "border-color"],
			opacity: "opacity",
			transform: "transform"
		},
		transitionDuration: {
			// defaults to these values
			default: "250ms",
			"0": "0ms",
			"100": "100ms",
			"250": "250ms",
			"500": "500ms",
			"750": "750ms",
			"1000": "1000ms"
		},
		transitionTimingFunction: {
			// defaults to these values
			default: "ease",
			linear: "linear",
			ease: "ease",
			"ease-in": "ease-in",
			"ease-out": "ease-out",
			"ease-in-out": "ease-in-out"
		},
		transitionDelay: {
			// defaults to these values
			default: "0ms",
			"0": "0ms",
			"100": "100ms",
			"250": "250ms",
			"500": "500ms",
			"750": "750ms",
			"1000": "1000ms"
		},
		willChange: {
			// defaults to these values
			auto: "auto",
			scroll: "scroll-position",
			contents: "contents",
			opacity: "opacity",
			transform: "transform"
		}
	},
	variants: {
		// all the following default to ['responsive']
		transitionProperty: ["responsive"],
		transitionDuration: ["responsive"],
		transitionTimingFunction: ["responsive"],
		transitionDelay: ["responsive"],
		willChange: ["responsive"]
	},
	plugins: [require("tailwindcss-transitions")()]
}
