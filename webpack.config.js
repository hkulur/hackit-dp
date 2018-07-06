const path = require('path');
 
module.exports = {
  context: path.join(__dirname, 'src'),
  mode: 'development',
  entry: [
    './main.js',
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json', '.scss'],
    modules: [
      path.join(process.cwd(), 'client'),
      path.join(process.cwd(), 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader"
        ],
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url-loader?limit=100000' }
    ],
  }
};

/*
const path = require('path');
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './____SliderContainer.js',
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle_la.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json', '.scss'],
    modules: [
      path.join(process.cwd(), 'client'),
      path.join(process.cwd(), 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader"
        ],
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url-loader?limit=100000' }
    ],
  },
  externals: {
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  }
};
*/