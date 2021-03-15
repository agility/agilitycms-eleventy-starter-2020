// postcss.config.js


module.exports = (ctx) => ({
	plugins: {
		'@tailwindcss/jit': {},
		//autoprefixer: {},
		cssnano: ctx.env === 'production' ? {} : false
 	}
})