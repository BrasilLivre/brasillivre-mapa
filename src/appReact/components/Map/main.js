import React from 'react';
import ReactDOM from 'react-dom';
import Local from './Local.js';
import {Action} from './../../actions/Action.js';
class mainMap extends React.Component {
    constructor(props){
        super(props);
        this._onChange=this._onChange.bind(this);
        this.state={}
    }
    componentDidMount(){
    }
    componentWillUnmount(){
    }
    _onChange(){
    }
    render(){
        const self=this;
        return(
            <span>
                        <Local/>
            </span>
        )
    }
}
export default mainMap;
