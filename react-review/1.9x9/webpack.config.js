const path = require('path');
const webpack = require('webpack'); // 플러그인 사용을 위한 웹팩 불러오기

module.exports = {
    name: "9x9-setting",
    mode: "development",
    devtool: "eval",
    resolve: {
        extensions: ['.jsx', '.js'],
    },

    entry: {
        app: './client',
    },

    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: { // preset에 플러그인 적용.
                            browsers: ['> 1% in KR', 'last 2 chrome versions'], // browserslist
                        },
                        // debug: true, // 개발용 옵션
                    }],
                    '@babel/preset-react',
                ],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }]
    },
    plugins: [ // 추가적으로 무언가를 하고 싶다면 플러그인을 추가한다.
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ],
    output: { 
        filename: '[name].js',
        path: path.join(__dirname, "dist"),
    }
};