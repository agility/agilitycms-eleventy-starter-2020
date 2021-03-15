const fs = require("fs");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";

module.exports = function (eleventyConfig) {

	// Copy static files directly to output.
	eleventyConfig.addPassthroughCopy({ "src/static": "/" });

	// Reload the page every time any JS/CSS files change.
	//eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

	return {
		dir: {
			input: 'src',
			output: 'dist',
		},
		passthroughFileCopy: true
	};
};