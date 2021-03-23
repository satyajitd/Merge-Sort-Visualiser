import React from 'react'
import ArrayElement from './ArrayElement'

const Array = (props) => {
    
    const elementContainer = [];
    for(let elementIndex = 0; elementIndex < props.range; elementIndex++) {
        
        let highlight, value, yellow = false
        if(props.sortStep !== undefined && props.sortStep.hasOwnProperty("arrayElementID")) {
            highlight = props.sortStep["arrayElementID"] === elementIndex
            yellow = props.sortStep["arrayElementID"] === elementIndex
            value = props.sortStep["arrayElementID"] === elementIndex ? props.sortStep["value"] : undefined
        }
        else {
            highlight = props.sortStep === elementIndex
            value = props.elementValue !== undefined? props.elementValue : undefined
        }
    
        elementContainer.push(
            <ArrayElement 
                id={'arrayElement_' + elementIndex} 
                highlight={highlight} 
                yellow={yellow}
                value={value}
                lastLevel={props.lastLevel}
            />
        )
    }
        
    return(
        <div className='row-flex'>
            {elementContainer}
        </div>
    )
}

export default Array