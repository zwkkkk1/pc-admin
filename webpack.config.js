var path = require('path')
var { url, port } = require('./utils/config')

module.exports = {
  entry: path.join(__dirname, './app/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
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
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
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
    port: 8080,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: false,
    proxy: {
      '/api': {
        target: `${url}:${port}`,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  devtool: 'source-map'
}