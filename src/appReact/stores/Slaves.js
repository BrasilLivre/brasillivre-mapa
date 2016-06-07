import AppDispatcher from '../flux/AppDispatcher';
import  {EventEmitter} from 'events';
import  _ from 'underscore';
const CHANGE_EVENT = 'CHANGE_SLAVES';
const zero = {
    markers:[],
};
let _slavesApp = JSON.parse(JSON.stringify(zero));
const _cleanStore =()=>_slavesApp = JSON.parse(JSON.stringify(zero));
const  _listSlaves=()=>{
    //$.ajax({
    //url: `${URL.API}reciclaveis/lista?y=${_dateFilter.y}&m=${_dateFilter.m}&d=${_dateFilter.d}`,
    //type: 'GET',
    //success: function(data) {
    //_slavesApp.markers=data;
    //SlavesStore.emitChange();
    //},
    //error: function(xhr, errmsg, err) {
    //}
    //});
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
    default:
      // do nothing
    }
});
export default SlavesStore;
