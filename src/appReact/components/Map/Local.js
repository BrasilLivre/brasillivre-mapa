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
        this.handleWindowResize = _.throttle(this.handleWindowResize, 500);
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
        console.log(googleMap.getZoom());
    }
    render(){
        //const { center} = this.state;
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
                                {this.props.markers.map((marker, index) =>{
                                    const ref=`marker_${index}`;
                                    const position= {
                                        lat:marker.latLng.coordinates[1],
                                        lng:marker.latLng.coordinates[0]
                                    };
                                    return (<Marker position={position}
                                        key={ref} ref={ref}
                                        icon={'img/global/marker.png'}
                                        onClick={this.handleMarkerClick.bind(this, marker.id,position)}
                                        title={(index+1).toString()}
                                    >
                                        {marker.id==this.state.markerAtual ? this.renderInfoWindow(ref, marker) : null}
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
