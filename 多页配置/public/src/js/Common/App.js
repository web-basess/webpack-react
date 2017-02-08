/**
 * Created by zhang.futian on 2016/12/15.
 */
import React from 'react'
import {Link} from 'react-router';

const App = React.createClass({
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
});
export default  App;
