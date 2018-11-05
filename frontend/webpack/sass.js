const autoprefixer = require('autoprefixer');

module.exports = function (paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    return [autoprefixer('ie >= 8', 'last 4 version')];
                                }
                            }
                        },
                        'sass-loader'
                    ]
                }
            ]
        }
    };
};
