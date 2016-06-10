import React from 'react';
import mapStyle from './../Global/mapStyle.js';
//import {getPoints} from './getPoints.js';
import Suitcase from 'react-icons/lib/fa/suitcase';
import Card from 'react-icons/lib/fa/credit-card';
import {Action} from './../../actions/Action.js';
import Modal from 'react-modal';
import ChainBroken from 'react-icons/lib/fa/chain-broken';
var heatMap;
const brasiliaCoordinates={  lat : -14.235004, lng : -51.92528 };
let gMap;
let time;
const _initMap=()=>{
    const mapOptions =  {
        zoom: 5,
        center: brasiliaCoordinates,
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
        Array(item['TRAB. ENVOL.']).fill(0).map(()=>{
            let point = new google.maps.LatLng(item.geometry.location.lat, item.geometry.location.lng);
            points.push(point);
        })
    });
    return points;
}
const _heatMap=(markers)=>{
    heatMap = new google.maps.visualization.HeatmapLayer({
        data: _getPoints(markers),
        map: gMap
    });
    heatMap.set('radius', 20);
}
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
            &nbsp; {marker['ANO']}
        </span>
        <BoxDetail
            fontSize='17px'
            classValue='center text-center center-block'
            value={marker['ESTABELECIMENTO']}/>
        <BoxDetail
            name='Empregador'
            icon='suitcase'
            value={marker['EMPREGADOR']}/>
        <BoxDetail
            name='Trabalhadores Libertados'
            icon='chain-broken'
            value={marker['TRAB. ENVOL.']}/>
        <BoxDetail
            name='CPF/CNPJ'
            icon='cpf'
            value={marker['CNPJ/CPF']}/>
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
    constructor(props, context) {
        super(props, context);
        this.state=  {
            center: brasiliaCoordinates,
        }
    }
    componentDidMount() {
        time=setInterval(() => {
            if (!google || !google.maps) return ;
            _initMap();
        },1000);
    }
    componentWillUnmount() {
        //window.removeEventListener(`resize`, this.handleWindowResize);
    }
    handleMarkerClick (id,center) {
        this.setState({center:center});
        Action('OpenModal','Map',{marker:id});
    }
    render(){
        if (!this.props.loadMap) return <span/>
        const markers = this.props.markers.filter((marker)=>'geometry' in marker);
        markers.map((item,id)=>{
            let marker = new google.maps.Marker({
                position:item.geometry.location,
                icon:'img/markers/slavery.png',
            });
            marker.setMap(gMap);
            marker.addListener('click', function() {
                _openModal(id);
            });
        })
        if (this.props.heatMap) _heatMap(this.props.markers);
        if (this.props.markerNow==-1) return (<span/>)
        return (
            <section>
                <InfoWindow marker={markers[this.props.markerNow]}
                    modalIsOpen={this.props.modalIsOpen}/>
            </section>
        );
    }
}
export default Local;
