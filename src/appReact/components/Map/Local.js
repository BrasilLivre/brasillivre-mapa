import React from 'react';
import {GoogleMapLoader,GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import mapStyle from './../Global/mapStyle.js';
import {triggerEvent} from "react-google-maps/lib/utils";
function handleWindowResize () {
    triggerEvent(this._googleMapComponent, "resize");
}
class Local extends React.Component {
    constructor(props){
        super(props);
        this.state=  {}
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
    render(){
        const { center} = this.state;
        return (
            <section>
                <GoogleMap containerProps={{
                    style: {
                        height: "90%",
                    },
                }}
                ref={it => this._googleMapComponent = it}
                defaultZoom={12}
                center={center}
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
                               </section>
        );
    }
}
export default Local;
