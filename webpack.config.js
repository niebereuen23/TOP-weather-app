const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // CSS
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // Images
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource'
      },
      // Data
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },

      // Babel, note it excludes node_modules/ folder by default. Also transpiles to support only default browsers
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }


    ]
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //       template: './src/index.html', // uses file as template, or can create html manually using properties like 'head', 'body', etc.
  //       filename: 'index.html', // name of the html output file
  //       inject: 'body' // where the js script is going to be added, at the bottom of 'body' in this case.
  //   })
  // ],
  devServer: {
    static: './dist'
  }
};