import React from 'react';
import FontAwesome from 'react-fontawesome';
//import { Button } from 'reactbulma';
import './button.css'

const Button = (props) => {
    switch( props.fncType ) {
        case 'targetValue':
            switch( props.btnType ) {
                case 'symbol':
                    return(
                        <div className={`icon_button ${ props.btnColor}`}
                        onClick={ (e) => props.btnFunction( e.target.value ) }>
                            <FontAwesome name={ props.btnContents } />
                        </div>
                    )
                default:
                    return null;
            }
        case 'basic':
            switch( props.btnType) {
                case 'symbol': 
                    return(
                        <div className={`icon_button ${ props.btnColor}`}
                        onClick={ () => props.btnFunction() }>
                            <FontAwesome name={ props.btnContents }/>
                        </div>
                    )
                
                case 'text':
                    return(
                        <div className={`text_button ${ props.btnColor}`}
                        onClick={ () => props.btnFunction() }>
                            { props.btnContents }
                        </div>
                    )
                default:
                    return null;
            }
        default:
            return null;        
    }
}

export default Button;


