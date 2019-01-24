import React from 'react';
import queryString from 'query-string';

// 라우트에서 미리 params 를 지정해놓고 match props 로 전달받음
// URL query 사용 시에는 location props로 전달받음. (query-string 라이브러리 사용)
const About = ({location, match}) => {
    const query = queryString.parse(location.search)
    // console.log(query);
    const detail = query.detail === 'true';
    return (
        <div>
            <h2>About {match.params.name} </h2>
            {detail && 'detail: blahblah'}
        </div>
    );
};

export default About;