import React from 'react';
import Album from './Album/Album';

import { Box } from 'reactbulma';



const ContentPanel = (props) => {
    
    const { tracksRetrieved } = props;
    
    const albumMap = tracksRetrieved.map( (value, index) => {
        return (
            <Box key={ index }>
                <Album trackData={ value }
                addToPlaylist={ props.addToPlaylist } /> 
            </Box>
        )
    })

    return (
        <div>
            { albumMap }
        </div>
    )
}

export default ContentPanel;