import React from 'react';
import ReactDOM from 'react-dom';
import {Action} from './actions/Action.js';
import Map from './components/Map/main.js';
class Base extends React.Component{
    render(){
        return (
            <Map/>
        );
    }
}
ReactDOM.render((<Base/>) , document.getElementById('reactDiv'));
