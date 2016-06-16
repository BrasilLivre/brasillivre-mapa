import React from 'react';
import ReactDOM from 'react-dom';
import Local from './Local.js';
import LeftNav from './LeftNav.js';
import RightNav from './RightNav.js';
import {Action} from './../../actions/Action.js';
import SlavesStore from './../../stores/Slaves.js';
import Config from './Config.js';
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
                <LeftNav/>
                <RightNav/>
                <section
                    className='gMap'>
                    <div id='mapDiv' className='mapDiv'></div>
                </section>
                <Local {...this.state}/>
                <Config filter={this.state.filter.year}
                    config={this.state.config}
                />
            </span>
        )
    }
}
export default mainMap;
