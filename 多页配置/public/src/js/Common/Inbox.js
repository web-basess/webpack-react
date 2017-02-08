/**
 * Created by zhang.futian on 2016/12/15.
 */
import React from 'react'
const Inbox = React.createClass({
    render() {
        return (
            <div>
                <h2>Inbox</h2>
                {this.props.children || "Welcome to your Inbox"}
            </div>
        )
    }
})


export default Inbox;