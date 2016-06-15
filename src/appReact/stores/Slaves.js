import AppDispatcher from '../flux/AppDispatcher';
import  {EventEmitter} from 'events';
import  _ from 'underscore';
const CHANGE_EVENT = 'CHANGE_SLAVES';
const zero = {
    markers:[],
    loadMap:false,
    heatMap:true,
    markerNow:-1,
    showMarkers:true,
    requests:0,
    showHeatMap:true,
    center:{  lat : -14.235004, lng : -51.92528 }
};
let _slavesApp = JSON.parse(JSON.stringify(zero));
const _cleanStore =()=>_slavesApp = JSON.parse(JSON.stringify(zero));
const  _listSlaves=()=>{
    $.ajax({
        url: `/data/2014-2016.json`,
        type: 'GET',
        success: function(data) {
            _slavesApp.markers=_slavesApp.markers.concat(data);
            _slavesApp.requests+=1;
            SlavesStore.emitChange();
        },
        error: function(xhr, errmsg, err) {
        }
    });
    $.ajax({
        url: `/data/1995-2010.json`,
        type: 'GET',
        success: function(data) {
            _slavesApp.markers=_slavesApp.markers.concat(data);
            _slavesApp.requests+=1;
            SlavesStore.emitChange();
        },
        error: function(xhr, errmsg, err) {
        }
    });
  $.ajax({
        url: `/data/2011-2014.json`,
        type: 'GET',
        success: function(data) {
            _slavesApp.markers=_slavesApp.markers.concat(data);
            _slavesApp.requests+=1;
            SlavesStore.emitChange();
        },
        error: function(xhr, errmsg, err) {
        }
    });


}
const _modal=(isOpen,id=-1)=>{
    _slavesApp.modalIsOpen=isOpen;
    _slavesApp.markerNow=id;
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
case 'ToogleMarkers_Map':
  _toogleMarkers();
break;
case 'ToogleHeatMap_Map':
  _toogleHeatmap();
break;

    default:
      // do nothing
    }
});
export default SlavesStore;
