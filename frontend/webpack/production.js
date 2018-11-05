const merge = require('webpack-merge');
const extractCss = require('./css.extract');

module.exports = function () {
    return merge([
        {
            mode: 'production'
        },
        extractCss()
    ]);
};
