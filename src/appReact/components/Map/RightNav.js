import React from 'react';
import Envelope from 'react-icons/lib/fa/envelope';
import {Action} from './../../actions/Action.js';
const _openAbout=()=>Action('OpenModal','About');
class RightNav extends React.Component {
    render(){
        return (
            <section className='rightNav'>
                <div
                    onClick={_openAbout}
                        className='btnCircle white'>
                    <Envelope
                        className='centrar'/>

                </div>
            </section>
        );
    }
}
export default RightNav;
