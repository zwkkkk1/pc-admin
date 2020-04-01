const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { url, port } = require('./utils/config')

module.exports = {
  entry: {
    app: path.join(__dirname, './app/index.js')
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
      cacheGroups: {
        vendors: {
          test: /(react|react-dom|react-dom-router|redux|react-redux)/,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'app/index.html')
    })
  ],
  stats: {
    builtAt: false,
    modules: false,
    entrypoints: false
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory=true']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'app/components/'),
      pages: path.resolve(__dirname, 'app/pages/'),
      utils: path.resolve(__dirname, 'app/utils/'),
      models: path.resolve(__dirname, 'app/models/'),
      images: path.resolve(__dirname, 'app/assets/images/'),
      styles: path.resolve(__dirname, 'app/styles/'),
      services: path.resolve(__dirname, 'app/services/')
    },
    extensions: ['.js', '.scss', '.css']
  },
  devServer: {
    port: 8225,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: false,
    inline: false,
    proxy: {
      '/api': {
        target: `${url}:${port}`,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  devtool: 'source-map'
}
