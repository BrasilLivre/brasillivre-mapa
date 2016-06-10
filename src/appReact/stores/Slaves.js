import AppDispatcher from '../flux/AppDispatcher';
import  {EventEmitter} from 'events';
import  _ from 'underscore';
const CHANGE_EVENT = 'CHANGE_SLAVES';
const zero = {
    markers:[],
    loadMap:false,
    heatMap:true,
    markerNow:-1,
    center:{  lat : -14.235004, lng : -51.92528 }
};
let _slavesApp = JSON.parse(JSON.stringify(zero));
const _cleanStore =()=>_slavesApp = JSON.parse(JSON.stringify(zero));
const  _listSlaves=()=>{
    $.ajax({
        url: `/data/2014-2016.json`,
        type: 'GET',
        success: function(data) {
            _slavesApp.markers=data;
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
    default:
      // do nothing
    }
});
export default SlavesStore;
