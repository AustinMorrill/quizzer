const chroma = require("chroma-js")

module.exports = {
	theme: {
		linearGradients: {
			directions: {
				// defaults to these values
				t: "to top",
				tr: "to top right",
				r: "to right",
				br: "to bottom right",
				b: "to bottom",
				bl: "to bottom left",
				l: "to left",
				tl: "to top left"
			},
			colors: {
				// defaults to {}
				red: "#f00",
				"tc": ["#27da87", "#0ecf7b"],
				"red-blue": ["#f00", "#00f"],
				"red-green-blue": ["#f00", "#0f0", "#00f"],
				"black-white-with-stops": ["#000", "#000 45%", "#fff 55%", "#fff"]
			}
		},
		radialGradients: {
			shapes: {
				// defaults to this value
				default: "ellipse"
			},
			sizes: {
				// defaults to this value
				default: "closest-side"
			},
			positions: {
				// defaults to these values
				default: "center",
				t: "top",
				tr: "top right",
				r: "right",
				br: "bottom right",
				b: "bottom",
				bl: "bottom left",
				l: "left",
				tl: "top left"
			},
			colors: {
				// defaults to {}
				red: "#f00",
				"tc": ["#27da87", "#0ecf7b"],
				"red-blue": ["#f00", "#00f"],
				"red-green-blue": ["#f00", "#0f0", "#00f"],
				"black-white-with-stops": ["#000", "#000 45%", "#fff 55%", "#fff"]
			}
		},
		repeatingLinearGradients: theme => ({
			directions: theme("linearGradients.directions"), // defaults to the same values as linearGradients’ directions
			colors: theme("linearGradients.colors"), // defaults to {}
			lengths: {
				// defaults to {}
				sm: "25px",
				md: "50px",
				lg: "100px"
			}
		}),
		repeatingRadialGradients: theme => ({
			shapes: {
				// defaults to this value
				default: "ellipse"
			},
			sizes: {
				// defaults to this value
				default: "farthest-corner"
			},
			positions: theme("radialGradients.positions"), // defaults to the same values as radialGradients’ positions
			colors: theme("radialGradients.colors"), // defaults to {}
			lengths: {
				// defaults to {}
				sm: "25px",
				md: "50px",
				lg: "100px"
			}
		}),
		fontFamily: {
			sans: ["Montserrat"],
			base2: ["Oswald"]
		},
		extend: {
			colors: {
				"tc-darkest": chroma("#0ecf7b").hex(),
				"tc-darker": chroma("#27da87").hex(),
				"tc-dark": chroma("#40e394").hex(),
				tc: chroma("#5beca3").hex(),
				"tc-light": chroma("#79f4b5").hex(),
				"tc-lighter": chroma("#9bfbc9").hex(),
				"tc-lightest": chroma("#c1ffe1").hex(),
				"tc2-darkest": chroma("#9d2400").hex(),
				"tc2-darker": chroma("#b73c00").hex(),
				"tc2-dark": chroma("#d25200").hex(),
				tc2: chroma("#ed6900").hex(),
				"tc2-light": chroma("#ff8618").hex(),
				"tc2-lighter": chroma("#ffac45").hex(),
				"tc2-lightest": chroma("#ffce67").hex()
			},
			boxShadow: {
				"inner-md": "inset 0 4px 6px 0 rgba(0,0,0,0.4)",
				"inner-lg": "inset 0 4px 6px 0 rgba(0,0,0,0.06)"
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
		willChange: ["responsive"],
		linearGradients: ["responsive"], // defaults to ['responsive']
		radialGradients: ["responsive"], // defaults to ['responsive']
		repeatingLinearGradients: ["responsive"], // defaults to ['responsive']
		repeatingRadialGradients: ["responsive"] // defaults to ['responsive']
	},
	plugins: [require("tailwindcss-transitions")(), require("tailwindcss-gradients")()]
}
