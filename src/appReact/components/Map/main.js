import React from 'react';
import ReactDOM from 'react-dom';
import Local from './Local.js';
import {Action} from './../../actions/Action.js';
import SlavesStore from './../../stores/Slaves.js';
class mainMap extends React.Component {
    constructor(props){
        super(props);
        this._onChange=this._onChange.bind(this);
        this.state=SlavesStore.get()
    }
    componentDidMount(){
        SlavesStore.addChangeListener(this._onChange);
        Action('List','Slaves');
    }
    componentWillUnmount(){
        SlavesStore.removeChangeListener(this._onChange);
    }
    _onChange(){
        this.setState( SlavesStore.get())
    }
    render(){
        return(
            <span>
                        <Local {...this.state}/>
            </span>
        )
    }
}
export default mainMap;
