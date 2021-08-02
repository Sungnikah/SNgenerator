const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  // https://webpack.js.org/configuration/mode/
  mode: 'development',
  // This option controls if and how source maps are generated.
  // see at: https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',
	// see at: https://webpack.js.org/concepts/entry-points/#multi-page-application
	entry: {
		index: './src/js/index.js',
    about: './src/js/about.js', 
    contact: './src/js/contact.js'
	},
  // how to write the compiled files to disk
  // see at: https://webpack.js.org/concepts/output/
  output: {
    filename: '[name].[hash:5].js',
    path: buildPath
  },
	// see at: https://webpack.js.org/configuration/dev-server/
	devServer: {
		port: 8080
	},
	// see at: https://webpack.js.org/concepts/plugins/
	plugins: [
    new CleanWebpackPlugin(buildPath),
		new HtmlWebpackPlugin({
			template: './src/pages/index.html',
			inject: true,
			chunks: ['index'],
			filename: 'index.html'
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/about.html',
			inject: true,
			chunks: ['index'],
			filename: 'about.html'
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/contacts.html',
			inject: true,
			chunks: ['index'],
			filename: 'contacts.html'
		}),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    })
	],
	// see at: https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  // see at: https://webpack.js.org/configuration/optimization/
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
};
