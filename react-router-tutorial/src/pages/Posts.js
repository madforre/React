import React from 'react';
import { Link, Route } from 'react-router-dom';
import Post from './Post';
// import queryString from 'query-string';

const Posts = ({location, match}) => {
    // console.log(location)
    // const lo = queryString.parse(location.pathname)
    console.log(match)
    return (
        <div>
            <h2>Post List</h2>
            <ul>
                <li><Link to={`${match.url}/1`}>Post #1</Link></li>
                <li><Link to={`${match.url}/2`}>Post #2</Link></li>
                <li><Link to={`${match.url}/3`}>Post #3</Link></li>
                <li><Link to={`${match.url}/4`}>Post #4</Link></li>
            </ul>
            <Route exact path={match.url} 
            // 컴포넌트 대신 인라인 렌더링
            render={()=>(<h3>Please select any post</h3>)}/>
            <br />
                현재 라우트의 주소에 :id가 붙었을 시에 Post 컴포넌트를 보여주도록 설정.
            <Route path={`${match.url}/:id`} component={Post}/>
            <p>location.pathname: {location.pathname} </p><br/>
            <p>match.path: {match.path} </p><br/>
            <p>match.url: {match.url} </p><br/>
        </div>
    );
};

export default Posts;