const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  entry: {
    home: './src/index.js', // Entrada para Home
    header: './src/Header/index.js', // Entrada para el Header
  }, // En este caso agregamos dos puntos de entrada
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js', // Nombre de los elementos o pequeñas piezas de codigo
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
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    new CleanWebpackPlugin(), // 👈 Aegramos un nuevo Plugin
    new ImageMinimizerPlugin({
      // 👈 New Plugin
      minimizerOptions: {
        plugins: [['optipng', { optimizationLevel: 5 }]], // indicamos el nombre de recurso y el nivel de optimizacion
      },
    }),
  ],
  optimization: {
    // 👈 Implementamos y configuramos la optimización
    minimize: true,
    minimizer: [new CSSMinimizerPlugin(), new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      // 👈 Implementamos cacheGroups para poder separar en diferentes grupos
      cacheGroups: {
        default: false, // indicamos que no utilizaremos los valores por defecto
        // commons: 👈 Elegimos los elementos comunes de toda la aplicacion de los cuales seran: react y react-dom
        commons: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: 'all',
          name: 'commons', //Como se llamara
          filename: 'assets/common.[chunkhash].js', // Nombre singular con un hash
          reuseExistingChunk: true, // Reutilizamos si existe
          enforce: true,
          priority: 20,
        },
        // vendors: 👈 Agregamos todas las demas librerias y recursos que utilizaremos en nuestra aplicacion
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendors', //Como se llamara
          filename: 'assets/vendor.[chunkhash].js', // Nombre singular con un hash
          reuseExistingChunk: true, // Reutilizamos si existe
          enforce: true,
          priority: 10,
        },
      },
    },
  },
};
