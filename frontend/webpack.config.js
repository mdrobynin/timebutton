const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const developmentConfig = require('./webpack/development');
const productionConfig = require('./webpack/production');
const images = require('./webpack/images');
const merge = require('webpack-merge');

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const commonConfig = merge([
    {
        entry: ['babel-polyfill', `${PATHS.src}/index.js`],
        output: {
            path: PATHS.build,
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: `${PATHS.src}/index.html`
            })
        ]
    },
    images()
]);

module.exports = function (env) {
    if (env === 'production') {
        return merge([commonConfig, productionConfig()]);
    }
    if (env === 'development') {
        return merge([commonConfig, developmentConfig()]);
    }
};
