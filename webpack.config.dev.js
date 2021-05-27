const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  entry: ['react-hot-loader/patch', './src/index.js'], // En este caso agregamos dos puntos de entrada para este caso solo para Desarrollo
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.js', '.jsx'],
    // Añadimos alias - Los Alias nos permiten otorgar nombres paths específicos evitando los paths largos
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@containers': path.resolve(__dirname, 'src/containers/'),
      '@context': path.resolve(__dirname, 'src/context/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@routes': path.resolve(__dirname, 'src/routes/'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'), // 👈 New Alias
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css|.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.(png|jpg)$/, // 👈 Extenciones de los archivos que voy a usar
        type: 'asset', // 👈 Indicamos el tipo
      },
      {
        test: /\.tsx?$/, // 👈 Extenciones de los archivos que voy a usar
        use: 'ts-loader', // 👈 Indicamos la libreria a utilizar
        exclude: '/node_modules/',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'), // 👈 Inidicamos la direccion de nuestro proyecto
    compress: true, // 👈 Indicamos que si se realizara compresion
    port: 3005, // 👈 Puerto
    hot: true, // 👈 Activamos el Hot Reload
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    new ImageMinimizerPlugin({
      // 👈 New Plugin
      minimizerOptions: {
        plugins: [['optipng', { optimizationLevel: 5 }]], // indicamos el nombre de recurso y el nivel de optimizacion
      },
    }),
  ],
};
