const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env'],
            }
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {loader: "style-loader"},
            MiniCssExtractPlugin.loader,
            {loader:"css-loader"},
            {loader:"resolve-url-loader"},
            {
              loader:"sass-loader",
              options: {
                sourceMap: true,
                sourceMapContents: false
              }
            }
          ]
        },
        {
          test: /\.(png|jp(e*)g)$/,
          use: [{
              loader: 'url-loader',
              options: {
                  name: 'images/[hash]-[name].[ext]',
                  outputPath: 'images/'
              }
          }]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/'
              }
          }]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "style.css"
      }),
      new HtmlWebPackPlugin ({
        template: "src/index.html",
        filename: "./index.html"
      })
    ],
    watch: true
  };