const fs = require("fs");
const path = require("path");
const Image = require("@11ty/eleventy-img");

const isDev = process.env.NODE_ENV === "development";
const manifestPath = path.resolve(__dirname, "dist", "assets", "manifest.json");

const manifest = isDev
	? {
		"main.js": "/assets/index.js",
		"main.css": "/assets/index.css",
	}
	: JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }));


async function imageShortcode(src, alt, sizes) {
	let metadata = await Image(src, {
		widths: [300, 600],
		formats: ["avif", "jpeg"]
	});

	let imageAttributes = {
		alt,
		sizes,
		loading: "lazy",
		decoding: "async",
	};

	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	return Image.generateHTML(metadata, imageAttributes);
}


module.exports = function (eleventyConfig) {

	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

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