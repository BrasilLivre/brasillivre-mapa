import React from 'react';
import {GoogleMapLoader,GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import mapStyle from './../Global/mapStyle.js';
import {triggerEvent} from "react-google-maps/lib/utils";
import { default as update } from "react-addons-update";
import { default as canUseDOM } from "can-use-dom";
import { default as _ } from "lodash";
const brasiliaCoordinates={  lat : -14.235004, lng : -51.92528 };
class Local extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 500);
        this.state={}
    }
    componentDidMount() {
        if (!canUseDOM) {
            return;
        }
        window.addEventListener(`resize`, this.handleWindowResize);
    }
    componentWillUnmount() {
        if (!canUseDOM) {
            return;
        }
        window.removeEventListener(`resize`, this.handleWindowResize);
    }
    handleWindowResize() {
        console.log(`handleWindowResize`, this._googleMapComponent);
        triggerEvent(this._googleMapComponent, `resize`);
    }
    handleMarkerClick (id,centro) {
        this.setState({marker:id});
    }
    handleCloseclick () {
        this.setState({center:this.state.center,marker:-1});
    }
    renderInfoWindow (ref, marker) {
        return (<InfoWindow
            key={`${ref}_info_window`}
            content={''}
            onCloseclick={this.handleCloseclick.bind(this)}
        >
        </InfoWindow>
               )
    }
    handleGoogleMapLoad(googleMap) {
        this._googleMapComponent = googleMap;
    }
    render(){
        //const { center} = this.state;
        //remover isso após criar um script de captura melhor
        const markers = this.props.markers.filter((marker)=>'geometry' in marker);
        return (
            <section
                className='gMap'>
                <GoogleMapLoader
                    containerElement={
                        <div
                            className='gMap'/>
                        }
                        googleMapElement={
                            <GoogleMap
                                ref={this.handleGoogleMapLoad.bind(this)}
                                defaultZoom={5}
                                defaultCenter={brasiliaCoordinates}
                                defaultOptions={{
                                    styles: mapStyle,
                                }}>
                                {markers.map((marker, index) =>{
                                    const ref=`marker_${index}`;
                                    return (<Marker position={marker.geometry.location}
                                        key={ref} ref={ref}
                                        icon={'img/markers/slavery.png'}
                                        title={(index+1).toString()}
                                    >
                                    </Marker>)
                                }
                                                       )}
                                                   </GoogleMap>
                                                   }/>
                                           </section>
        );
    }
}
export default Local;
