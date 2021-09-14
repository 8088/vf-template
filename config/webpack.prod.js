const path = require('path');
const baseConfig = require('./webpack.base');

baseConfig.mode = 'production';
baseConfig.devtool = undefined;
baseConfig.output.filename = '[name].min.js';

module.exports = baseConfig