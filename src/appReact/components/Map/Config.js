import React from 'react';
import {Action} from './../../actions/Action.js';
import InputRange from './InputRange/InputRange';
import Modal from 'react-modal';
import Center from 'react-center-component';
const _closeModal=()=>Action('CloseModal','Config');
const _filterYear=(input,val)=>{Action('FilterYear','Map',{min:val.min,max:val.max})};
const width=300;
const height=180;
var modalStyles={
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        width:`${width}px`,
        height:`${height}px`
    }
}
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
@Center
class Config extends React.Component{
    render(){
        const {topOffset, leftOffset} = this.props;
        modalStyles['content']['top']=this.props.topOffset-height/2;
        modalStyles['content']['left']=this.props.leftOffset-width/2;
        return(
            <Modal
                isOpen={this.props.config.isOpen}
                onRequestClose={_closeModal}
                style={modalStyles}
                className='col-xs-12 col-sm-5 modalReact'>
                <Form {...this.props.filter}/>
                <div className='col-xs-12'>
                    <button
                        style={{
                             marginTop:'20px'
                        }}
                        className='btn btn-danger center-block'
                        onClick={_closeModal}>Fechar</button>
                </div>
            </Modal>
        )
    }
}
export default Config;
