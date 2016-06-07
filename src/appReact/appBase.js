import React from 'react';
import ReactDOM from 'react-dom';
import {Action} from './actions/Action.js';
import Map from './components/Map/main.js';
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
        return (<Map/>);
    }
}
ReactDOM.render((<Base/>) , document.getElementById('reactDiv'));
