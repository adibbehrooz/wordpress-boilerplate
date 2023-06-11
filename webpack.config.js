/*
	Theme Name: Boilerplate Theme
	Theme URI: https://adib.digital
	Description: The Theme Designed By Mohammad Bagher Adib Behrooz.
	Author: Mohammad Bagher Adib Behrooz
	Version: 1.0
*/
	//______________________
	//
	// 		I. Require
	//______________________

	const webpack 		= require('webpack');
	const path 			= require('path');


	//________________________
	//
	// 		II. Constants
	//________________________

	// 1. Plugins
	const MiniCssExtractPlugin 		= require('mini-css-extract-plugin');
	const CssMinimizerPlugin 		= require('css-minimizer-webpack-plugin');
	const TerserPlugin 				= require("terser-webpack-plugin");

	// 2. Misc

	//______________________
	//
	// 		III. Variables
	//______________________


	//______________________
	//
	// 		IV. Exports
	//______________________

	module.exports = {
		watch: true,
		target: 'web',
		

		// 1. Entry
		entry: {
			vendor: 	'./assets/js/src/vendor.js',
			sample: 	'./assets/js/src/sample.js',
		},

		// 2. Mode
		mode: 'development',

		// 3. Output
		output: {
			path: path.resolve(__dirname, './assets/js/dist'),
			filename: '[name].min.js',
			chunkFilename: '[name].[chunkhash].chunk.js',
			clean: true,
			publicPath:'/public',
		},

		// 4. Plugins
		plugins: [
			new MiniCssExtractPlugin({
				filename: '../../css/[name].min.css',
				chunkFilename: '[id].css',
			}),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
			}),
		],

		// 5. Development Tools
		devtool:'source-map',

		// 6. Modules
		module: {
			rules: [{

				// 6.0. Babel jsx
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							cacheDirectory: true,
							cacheCompression: false,
						}
					},
				],
				},{

				// 6.1. SCSS
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: path.resolve(__dirname, '../../css'),
						},
					},

					// 6.1.1. css Loader
					{ 	
						loader: "css-loader", 
						options: { 
							import: true, 
							sourceMap: true 
						} 
					},	

					// 6.1.2. PostCss Loader
					{
						loader: "postcss-loader", 
					},

					// 6.1.3. sass Loader
					{ 	
						loader: "sass-loader", 
						options: { 
							sourceMap: true, 
							sassOptions: {
								outputStyle: "compressed",  // "compressed" After Final Version, Default is "expanded" !IMPORTANT
							},
						} 
					},
				],
			},{
				// 6.2. FONTS
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				// generator: {
					// filename: '[path][name].[ext]',
				// },				
			},{
				// 6.3. IMAGES
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				// generator: {
					// filename: './assets/images/[name][contenthash][ext]',
				// },
			},
			],
		}, // [END] 6. Modules

		// 7. Optimization
		optimization: {
			chunkIds: 'named',
			minimize: true, // "True" After Final Version, Default is "false" !IMPORTANT
			minimizer: [
				new TerserPlugin({
					test: /\.js(\?.*)?$/i,
					parallel: true,
					terserOptions: {
						format: {
							comments: false,
						},
					},
					extractComments: false,
				}),
				new CssMinimizerPlugin({
					minimizerOptions: {
						preset: [
							"default",
							{
								discardComments: { removeAll: true },
							},
						],
					},
				}),
			],
		}, // [END] 7. Optimization

		// 8. Resolve
		resolve: {
			alias: {

				// 1. SCSS & CSS For Wordpress Core
				main: 		path.resolve(__dirname,'./assets/scss/main.scss'), // Import
				slick: 		path.resolve(__dirname,'./node_modules/slick-carousel/slick/slick.scss'),
				slickTheme: path.resolve(__dirname,'./node_modules/slick-carousel/slick/slick-theme.css'),

				// 2. JS
				
			},
			extensions: ['.js', '.jsx', '.css', '.scss']
		},
	};