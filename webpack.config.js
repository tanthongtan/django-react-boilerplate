const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleTracker = require("webpack-bundle-tracker");

module.exports = {
  context: __dirname,
  entry: './frontend/index.tsx',  // path to our input file
  output: {
    filename: '[name]-[contenthash].js',  // output bundle file name
    path: path.resolve(__dirname, './static'),  // path to our Django static directory
    publicPath: "auto", // necessary for CDNs/S3/blob storages
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript"
              ]
            }
          },
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,  // Exclude modules here
            use: [MiniCssExtractPlugin.loader, 'css-loader']
          },
          {
            test: /\.module\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                  }
                }
              }
            ]
          },
          {
            test: /\.(svg|png|webp|gif|woff2?)$/,
            type: "asset/resource",
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new BundleTracker({ path: __dirname, filename: "webpack-stats.json" }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};