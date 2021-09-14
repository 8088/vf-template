const path = require('path');
const baseConfig = require('./webpack.base');

baseConfig.mode = 'development';
baseConfig.output.filename = '[name].js';
baseConfig.devServer = {
    static: {
        directory: path.join(__dirname, 'dist'),
    },
    port: 8088,
    host: '0.0.0.0',
    client: {
        overlay: true,
    },
    open: true,
    // https: true,
    // allowedHosts: ['vf-engine.com', 'vf-engine.cn',],
}
module.exports = baseConfig
//global