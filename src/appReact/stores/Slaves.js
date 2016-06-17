import AppDispatcher from '../flux/AppDispatcher';
import  {EventEmitter} from 'events';
import  _ from 'underscore';
const workerString =[document.querySelector('[type="javascript/worker"]').textContent]
var workerBlob = new Blob(workerString, {
    type: 'text/javascript'
});
var workerUrl = URL.createObjectURL(workerBlob);
var worker = new Worker(workerUrl);
worker.addEventListener('message', function (msg) {
    if (msg.data.type == 'answerFilter') {
        _slavesApp.markers=msg.data.result;
        SlavesStore.emitChange();
        workerReduce(msg.data.result);
    }else if(msg.data.type=='answerReduce'){
       _slavesApp.slavesFree=msg.data.result;
        SlavesStore.emitChange();
    }
});
const CHANGE_EVENT = 'CHANGE_SLAVES';
const zero = {
    markers:[],
    markersData:[],
    loadMap:false,
    heatMap:true,
    markerNow:-1,
    slavesFree:0,
    showMarkers:true,
    filter:{
        year:{
            min:1995,
            max:2016
        }
    },
    about:{
        isOpen:false
    },
    config:{
        isOpen:false
    },
    showHeatMap:true,
};
let _slavesApp = JSON.parse(JSON.stringify(zero));
const _cleanStore =()=>_slavesApp = JSON.parse(JSON.stringify(zero));
const workerReduce=(markers)=>{
    var msgData = {
            type: 'reduce',
            markers: markers,
        };
        document.body.className='';
        worker.postMessage(msgData);
}
const  _listSlaves=()=>{
    $.ajax({
        url: `/data/2014-2016.json`,
        type: 'GET',
        success: function(data) {
            _slavesApp.markers=_slavesApp.markers.concat(data);
            _slavesApp.markersData=_slavesApp.markersData.concat(data);
        },
    }).complete(function(){
        $.ajax({
            url: `/data/1995-2010.json`,
            type: 'GET',
            success: function(data) {
                _slavesApp.markers=_slavesApp.markers.concat(data);
                _slavesApp.markersData=_slavesApp.markersData.concat(data);
            },
        }).complete(function(){
            $.ajax({
                url: `/data/2011-2014.json`,
                type: 'GET',
                success: function(data) {
                    _slavesApp.markers=_slavesApp.markers.concat(data);
                    workerReduce(_slavesApp.markers);
                    _slavesApp.markersData=_slavesApp.markersData.concat(data);
                    SlavesStore.emitChange();
                },
                error: function(xhr, errmsg, err) {
                }
            });
        })
    })
}
const _modal=(isOpen,id=-1)=>{
    _slavesApp.modalIsOpen=isOpen;
    _slavesApp.markerNow=id;
    SlavesStore.emitChange();
}
const _modalConfig=(isOpen)=>{
    _slavesApp.config.isOpen=isOpen;
    SlavesStore.emitChange();
}
const _modalAbout=(isOpen)=>{
    _slavesApp.about.isOpen=isOpen;
    SlavesStore.emitChange();
}
const _toogleMarkers=()=>{
    _slavesApp.showMarkers=!_slavesApp.showMarkers;
    SlavesStore.emitChange();
}
const _toogleHeatmap=()=>{
    _slavesApp.showHeatMap=!_slavesApp.showHeatMap;
    SlavesStore.emitChange();
}
const _filterYear=(min,max)=>{
    _slavesApp.markers=_slavesApp.markersData;
    _slavesApp.filter.year.max=max;
    _slavesApp.filter.year.min=min;
    var msg = {
        type: 'filter',
        markers: _slavesApp.markers,
        max:max,
        min:min
    };
    worker.postMessage(msg);
}
const _updatedMarkers=()=>{
    _slavesApp.markersUpdate=false;
    //SlavesStore.emitChange();
}
const _loadMap=()=>{
    _slavesApp.loadMap=true;
    SlavesStore.emitChange();
}
const SlavesStore = _.extend({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
        _cleanStore();
    },
    get: function() {
        return _slavesApp;
    },
});
SlavesStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch (action.type) {
      case "List_Slaves":
        _listSlaves();
      break;
    case 'Load_Map':
      _loadMap();
    break;
  case 'CloseModal_Map':
    _modal(false);
  break;
case 'OpenModal_Map':
  _modal(true,action.data.marker);
break;
  case 'CloseModal_Config':
    _modalConfig(false);
  break;
case 'OpenModal_Config':
  _modalConfig(true);
break;
  case 'CloseModal_About':
    _modalAbout(false);
  break;
case 'OpenModal_About':
  _modalAbout(true);
break;
case 'ToogleMarkers_Map':
  _toogleMarkers();
break;
case 'ToogleHeatMap_Map':
  _toogleHeatmap();
break;
case 'FilterYear_Map':
  _filterYear(action.data.min,action.data.max);
break;
case 'UpdatedMarkers_Map':
  _updatedMarkers();
break;
    default:
      // do nothing
    }
});
export default SlavesStore;
