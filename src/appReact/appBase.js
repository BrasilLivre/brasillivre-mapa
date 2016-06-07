import React from 'react';
import ReactDOM from 'react-dom';
import {Action} from './actions/Action.js';
class Base extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this._onChange = this._onChange.bind(this)
    }
    componentDidMount(){
    }
    _onChange(){
    }
    render(){
        return (<span> asdf</span>);
    }
}
ReactDOM.render((<Base/>) , document.getElementById('reactDiv'));
