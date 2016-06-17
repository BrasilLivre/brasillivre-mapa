import React from 'react';
import {Action} from './../../actions/Action.js';
import Modal from 'react-modal';
import Facebook from 'react-icons/lib/fa/facebook';
import Globe from 'react-icons/lib/fa/globe';
const _closeModal=()=>Action('CloseModal','About');
const About = (props)=>(
    <Modal
        isOpen={props.about.isOpen}
        onRequestClose={_closeModal}
        className='col-xs-12 col-sm-5 modalReact centrar'>
        <div className='col-xs-12'>
            <a href='malito:devmessias@gmail.com'>
                <h3 className='text-center'>
                    contato:devmessias@gmail.com
                </h3>
            </a>
            <a href='https://www.facebook.com/messias.physics'>
                <Facebook className='h1 center-block'/>
            </a>
            <a href='http://brunomessias.com'>
                <Globe className='h1 center-block'/>
            </a>
        </div>
    </Modal>
)
export default About;
