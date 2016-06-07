var AppDispatcher = require('../flux/AppDispatcher');
export function Action(tipo,nome,data=false){
    AppDispatcher.handleServerAction({
            type: `${tipo}_${nome}`,
            data:data
        });
};
