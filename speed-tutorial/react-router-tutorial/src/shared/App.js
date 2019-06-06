import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Posts } from '../pages';
import Menu from '../components/Menu';

class App extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Route exact path="/" component={Home}/>
                <Switch>
                    {/* 순서도 뒤집어주어야 한다. 첫번째 라우트만 보여주고 나머지는 안보여주는 방식이므로. 
                        먼저 비교할 라우트를 위에 작성하여야 한다. */}
                    <Route path="/about/:name" component={About}/>
                    <Route path="/about" component={About}/>
                </Switch>
                <Route path="/posts" component={Posts}/>
            </div>
        );
    }
}

export default App;