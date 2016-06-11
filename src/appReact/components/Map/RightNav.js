import React from 'react';
import Envelope from 'react-icons/lib/fa/envelope';
class RightNav extends React.Component {
    render(){
        return (
            <section className='rightNav'>
                <div
                        className='btnCircle white'>
                        <a href='malito:devmessias@gmail.com'>
                    <Envelope
                        className='centrar'/>
                </a>

                </div>
            </section>
        );
    }
}
export default RightNav;
