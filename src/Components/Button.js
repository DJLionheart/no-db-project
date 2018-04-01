import React from 'react';
import FontAwesome from 'react-fontawesome';
//import { Button } from 'reactbulma';

const Button = (props) => {
    switch( props.fncType ) {
        case 'targetValue':
            switch( props.btnType ) {
                case 'symbol':
                    return(
                        <button onClick={ (e) => props.btnFunction( e.target.value ) }>
                            <FontAwesome name={ props.btnContents } />
                        </button>
                    )
                default:
                    return null;
            }
        case 'basic':
            switch( props.btnType) {
                case 'symbol': 
                    return(
                        <button onClick={ () => props.btnFunction() }>
                            <FontAwesome name={ props.btnContents }/>
                        </button>
                    )
                
                case 'text':
                    return(
                        <button onClick={ (e) => props.btnFunction( e.target.value ) }>
                            { props.btnContents }
                        </button>
                    )
                default:
                    return null;
            }
        default:
            return null;        
    }
}

export default Button;


