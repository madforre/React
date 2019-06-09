const path = require('path'); // 노드에서 경로 조작하기 쉽게 해주는 모듈임.

module.exports = {
    name: 'wordchain-setting',
    mode: 'development', // 실서비스에선 production 으로 교체
    devtool: 'eval', // 개발단계 빠른 설정
    resolve: {
        extensions: ['.js', '.jsx'] // 엔트리에서 파일 찾을 때 
        // resolve에 명시한 확장자들로 찾아줌
    },

    entry: { // 입력
        app: ['./client'], // app은 키임. 설정한 키대로 결과물이 나온다.
    },

    module: {
        rules: [{
            test: /\.jsx?/, // 정규표현식. js랑 jsx 파일에
            loader: 'babel-loader', // 바벨 로더를 적용한다.
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: { // preset에 플러그인 적용.
                            browsers: [
                                '> 1% in KR', 'last 2 chrome versions'
                            ], // browserslist
                        },
                        debug: true, // 개발용 옵션
                    }],
                    '@babel/preset-react'
                ], // 바벨의 옵션들을 여기에 넣어준다.
                plugins: [
                    '@babel/plugin-proposal-class-properties', // 에러 메세지 보면 얘는 플러그인에 넣으래.
                    'react-hot-loader/babel' // 바벨 로더 플러그인에 리액트 핫 로더 추가
                ]
            }
        }]
    }, // 엔트리에 있는 파일을 읽고 모듈을 적용한 후 output에 뺀다.

    output: { // 출력
        path: path.join(__dirname, 'dist'), // 노드 설정임. 현재 상대경로 기준 위치할 폴더 지정. 이정도는 외우렴
        filename: '[name].js', // [name] 써주면 입력한 엔트리 키 이름대로 파일이 출력됨.
        publicPath: '/dist' // 번들이 생성될 가상 경로 설정. (핫로더 관련된 것도 여기에 출력됨.) express.static과 관련있음.
    }
};