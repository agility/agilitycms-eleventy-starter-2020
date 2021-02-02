const fs = require("fs");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";
console.log("isDev", isDev)
const manifestPath = path.resolve(__dirname, "dist", "assets", "manifest.json");

const manifest = isDev
	? {
		"main.js": "/assets/index.js",
		"main.css": "/assets/index.css",
	}
	: JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }));

module.exports = function (eleventyConfig) {

	// Add a shortcode for bundled CSS.
	eleventyConfig.addShortcode("bundledCss", function () {
		return manifest["main.css"]
			? `<link href="${manifest["main.css"]}" rel="stylesheet" />`
			: "";
	});

	// Add a shortcode for bundled JS.
	eleventyConfig.addShortcode("bundledJs", function () {
		return manifest["main.js"]
			? `<script src="${manifest["main.js"]}"></script>`
			: "";
	});

	// Copy static files directly to output.
	eleventyConfig.addPassthroughCopy({ "src/static": "/" });

	// Reload the page every time any JS/CSS files change.
	eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

	return {
		dir: {
			input: 'src',
			output: 'dist',
		},
		passthroughFileCopy: true
	};
};