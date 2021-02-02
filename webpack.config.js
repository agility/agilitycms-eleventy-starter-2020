const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');


const isDev = process.env.NODE_ENV === 'development';

const baseFilename = isDev ? 'index' : 'index.[contenthash]';



module.exports = {
	entry: [
		path.resolve(__dirname, 'src', 'assets', 'js', 'index.js'),
		path.resolve(__dirname, 'src', 'assets', 'css', 'index.css'),
	],
	output: {
		path: path.resolve(__dirname, 'dist', 'assets'),
		filename: `${baseFilename}.js`,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ["@babel/preset-env"],
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					'postcss-loader',
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: `${baseFilename}.css` }),
		new WebpackManifestPlugin({ publicPath: '/assets/' }),
	],
};
