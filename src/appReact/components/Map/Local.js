import React from 'react';
import mapStyle from './../Global/mapStyle.js';
//import {getPoints} from './getPoints.js';
import Suitcase from 'react-icons/lib/fa/suitcase';
import Card from 'react-icons/lib/fa/credit-card';
import {Action} from './../../actions/Action.js';
import Modal from 'react-modal';
import ChainBroken from 'react-icons/lib/fa/chain-broken';
var heatMap;
let gMap;
let time;
let markersLoad=false;
let heatMapLoad=false;
let arrayMarkers=[];
let allWorkers=0;
const _initMap=(center)=>{
    const mapOptions =  {
        zoom: 5,
        center: center,
        mapTypeIds: ['mapStyle']
    };
    clearInterval(time);
    gMap = new google.maps.Map(document.getElementById('mapDiv'),mapOptions);
    Action('Load','Map');
    _stylizeMap();
}
const _stylizeMap=()=>{
    var styledMap = new google.maps.StyledMapType(mapStyle,
                                                  {name: "Mapa Brasil Livre"});
    gMap.mapTypes.set('mapStyle', styledMap);
    gMap.setMapTypeId('mapStyle');

}
const _getPoints=(markers)=>{
    let points=[];
    markers.map((item)=>{
        let trabalhadores=item['trabalhadores'];

        trabalhadores =Number(String(trabalhadores).replace('.',''))
            //Array(trabalhadores).fill(0).map(()=>{
            //let point = new google.maps.LatLng(item.geometry.location.lat+Math.random()/10, item.geometry.location.lng+Math.random()/10);
            var point = {location:new google.maps.LatLng(item.geometry.location.lat, item.geometry.location.lng),weight:trabalhadores};
            points.push(point);
        //})
    });
    return points;
}
const _heatMap=(markers)=>{
    heatMap = new google.maps.visualization.HeatmapLayer({
        data: _getPoints(markers),
        map: gMap
    });
    heatMap.set('radius', 30);
}
const _toogleHeatMap=(showHeatMap)=> heatMap.setMap(showHeatMap ? null : gMap);
const _toogleMarkers=(showMarkers)=>arrayMarkers.map((marker)=>marker.setVisible(showMarkers));
//const _toogleHeatMap=(showHeatMap)=> heatMap.setMap(showHeatMap ? null : gMap);
const Icon=(icon)=>{
    let ico = <span/>;
    ico = icon=='suitcase'? <Suitcase/>:ico;
    ico = icon=='chain-broken'? <ChainBroken/>:ico;
    ico = icon=='cpf'? <Card/>:ico;
    return ico;
}
const BoxDetail = (props)=>(
    <span className='col-xs-12'>
        {Icon(props.icon)}
        <span className='strong' style={{fontSize:props.fontSize}}>
            {props.name}
        </span>
        <span
            className={props.classValue}
            style={{fontSize:props.fontSize}}>
            &nbsp; {props.value}
        </span>
    </span>
)
BoxDetail.defaultProps={
    name:'',
    icon:'',
    classValue:'',
    fontSize:'15px'
}
const InfoBox = (props)=>{
    const marker=props.marker;
    return(
    <div className='col-xs-12 infoBox'>
        <span className='strong'>
            &nbsp; {marker['Ano']}
        </span>
        <BoxDetail
            fontSize='17px'
            classValue='center text-center center-block'
            value={marker['estabelecimento']}/>
        <BoxDetail
            name='Empregador'
            icon='suitcase'
            value={marker['empregador']}/>
        <BoxDetail
            name='Trabalhadores Libertados'
            icon='chain-broken'
            value={marker['trabalhadores']}/>
        <BoxDetail
            name='CPF/CNPJ'
            icon='cpf'
            value={marker['CPF/CNPJ']}/>
    </div>
    )
}
const _closeModal=()=>Action('CloseModal','Map');
const _openModal=(id)=>Action('OpenModal','Map',{marker:id-1});
class InfoWindow extends React.Component{
    render(){
    return(
    <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={_closeModal}
        className='col-xs-12 col-sm-7 centrar modalReact'>
        <InfoBox marker={this.props.marker}/>
        <div className='col-xs-12'>
        <button
            className='btn btn-danger center-block'
            onClick={_closeModal}>Fechar</button>
    </div>
    </Modal>
    )}
}
class Local extends React.Component {
    componentDidMount() {
        time=setInterval(() => {
            if (!google || !google.maps) return ;
            _initMap(this.props.center);
        },500);
    }
    componentWillReceiveProps(nextProps) {
        const heatMapChanged=nextProps.showHeatMap!=this.props.showHeatMap;
        const markersChanged=nextProps.showMarkers!=this.props.showMarkers;
        if (heatMapChanged) _toogleHeatMap(nextProps.showHeatMap);
        if (markersChanged) _toogleMarkers(nextProps.showMarkers);
    }
    componentDidUpdate(){

        if (!this.props.loadMap) return true;
        var whaitMap=setInterval(() => {
            document.body.className='';
         clearInterval(whaitMap);
        },1000);

     }

    render(){
        if (!this.props.loadMap || this.props.requests<3) return <span/>
        const markers = this.props.markers.filter((marker)=>'geometry' in marker);
        if(!markersLoad){
arrayMarkers=[];

        markers.map((item,id)=>{
            let marker = new google.maps.Marker({
                position:item.geometry.location,
                icon:'img/markers/slavery.png',
            });
            marker.setMap(gMap);
            marker.addListener('click', function() {
                _openModal(id);
                gMap.setCenter(marker.getPosition());
            });
            arrayMarkers.push(marker);
        });
        markersLoad=true;

        }
        if(!heatMapLoad){
            _heatMap(this.props.markers);
            heatMapLoad=true;
        }

        if (this.props.markerNow==-1) return (<span/>);

        return (
            <section>
                <InfoWindow marker={markers[this.props.markerNow]}
                    modalIsOpen={this.props.modalIsOpen}/>
            </section>
        );
    }
}
export default Local;
