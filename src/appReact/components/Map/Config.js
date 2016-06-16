import React from 'react';
import {Action} from './../../actions/Action.js';
import InputRange from './InputRange/InputRange';
import Modal from 'react-modal';
const _closeModal=()=>Action('CloseModal','Config');
const _filterYear=(input,val)=>{Action('FilterYear','Map',{min:val.min,max:val.max})};
const Form=(props) =>(
    <section>
        <h4 className='text-center'>Dados de {props.min} há {props.max}</h4>
        <InputRange
            minValue={1995}
            maxValue={2015}
            value={
                {
                    min:props.min,
                    max:props.max
                }
            }
            onChange={_filterYear}
        />
    </section>
);
const Config=(props) =>(
    <Modal
        isOpen={props.config.isOpen}
        onRequestClose={_closeModal}
        className='col-xs-12 col-sm-5 centrar modalReact'>
        <Form {...props.filter}/>
        <div className='col-xs-12'>
            <button
                className='btn btn-danger center-block'
                onClick={_closeModal}>Fechar</button>
        </div>
    </Modal>
);
export default Config;
