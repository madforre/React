const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    name: 'beginner-setting',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: { // 파일을 읽어들이기 시작하는 부분.
        app: ['./src/client'], // 키: '파일경로' - 결과물이 app.js로 나온다.
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'dist/[name].js', // [name] 사용시 각각의 키별로 파일 결과물이 나온다.
        publicPath: '/' // 배포 및 빌드시 HTML, CSS 파일안의 URL들을 업데이트.
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: [
                                '> 1% in KR', 'last 2 chrome versions'
                            ]
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel'
                ]
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // index.html 탬플릿을 기반으로 빌드 결과물을 추가해줌.
            title: 'template',
            template: 'index.html',
            filename: 'index.html'
        }),
    ]
};

