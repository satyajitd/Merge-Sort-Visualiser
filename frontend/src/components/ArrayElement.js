import React, { useState } from 'react'

const ArrayElement = (props) => {
    
    const [value, setValue] = useState('')
    if(props.value !== undefined && props.value !== value)
        setValue(props.value)

    let cssClasses = 'box';
    if(!props.lastLevel)
        cssClasses += ' border-color'
    if(props.highlight) 
        cssClasses += props.yellow? ' yellow' : ' pink';
    if(props.lastLevel && props.value !== undefined)
        cssClasses += ' border-color'

    return (
        <div className={cssClasses}>
            {value}
        </div>
    )
}

export default ArrayElement;