import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    const activeStyle = {
        color: 'green',
        fontSize: '2rem'
    };

    return (
        <div>
            <ul>
                <h4>Link 컴포넌트</h4>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/about/foo">About Foo</Link></li>

                <h4>NavLink 컴포넌트</h4>
                {/* URL 이 활성화 되면 특정 스타일 혹은 클래스를 지정 */}
                <li><NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink></li>
                <li><NavLink exact to="/about" activeStyle={activeStyle}>About</NavLink></li>
                <li><NavLink to="/about/foo" activeStyle={activeStyle}>About Foo</NavLink></li>
                <li><NavLink to="/posts" activeStyle={activeStyle}>Posts</NavLink></li>
                중첩될수도 있는 라우트들은 exact 로 설정을 해야 한다.
                활성화 되었을 때 특정 클래스를 설정하고 싶다면 activeClassName 을 설정하면 된다.
            </ul>
            <hr/>
        </div>
    );
};

export default Menu;