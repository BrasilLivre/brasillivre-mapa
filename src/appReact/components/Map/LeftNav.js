import React from 'react';
import ChainBroken from 'react-icons/lib/fa/chain-broken';
import Marker from 'react-icons/lib/fa/map-marker';
import Fire from 'react-icons/lib/fa/fire';
import {Action} from './../../actions/Action.js';
class LeftNav extends React.Component {
    _toogleHeatMap(){Action('ToogleHeatMap','Map')};
    _toogleMarkers(){Action('ToogleMarkers','Map')};
    render(){
        return (
            <section className='leftNav'>
                <div
                        onClick={this._toogleMarkers}
                    className='btnCircle white'>
                    <Marker
                        className='centrar'/>

                </div>
                <div

                    onClick={this._toogleHeatMap}
                    className='btnCircle red relative'>
                  <Fire
                    className='centrar'/>

                    </div>
            </section>
        );
    }
}
export default LeftNav;
