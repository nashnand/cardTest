const Dotenv = require('dotenv-webpack');

module.exports = {
    plugins: [
        new Dotenv()
      ],
    entry: {login:'./js/login.js',main:'./js/main.js'},
    mode: 'development',
    output: {
      path: `${__dirname}/dist`,
      filename: "[name].js",
    },
  };