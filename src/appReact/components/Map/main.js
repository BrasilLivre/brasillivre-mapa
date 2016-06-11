import React from 'react';
import ReactDOM from 'react-dom';
import Local from './Local.js';
import LeftNav from './LeftNav.js';
import RightNav from './RightNav.js';
import {Action} from './../../actions/Action.js';
import SlavesStore from './../../stores/Slaves.js';
let time;
class mainMap extends React.Component {
    constructor(props){
        super(props);
        this._onChange=this._onChange.bind(this);
        this.state=SlavesStore.get()
    }
    componentDidMount(){
        SlavesStore.addChangeListener(this._onChange);

        Action('List','Slaves');
        //time=setInterval(() => {
            //if (!google || !google.maps) return ;
            //Action('Load_Map');

    //clearInterval(time);
        //},1000);

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
            </span>
        )
    }
}
export default mainMap;
