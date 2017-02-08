/**
 * Created by zhang.futian on 2017/2/8.
 */
import React from 'react'
import {Link} from 'react-router';
export default class App extends React.Component {
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
}
