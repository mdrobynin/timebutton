const merge = require('webpack-merge');
const sass = require('./sass');
const css = require('./css');

module.exports = function () {
    return merge([
        {
            mode: 'development',
            devServer: {
                port: 3000
            }
        },
        css(),
        sass()
    ]);
};
