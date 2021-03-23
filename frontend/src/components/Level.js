import React from 'react'
import Array from './Array'

const Level = (props) => {
    
    const getSortStep = (arrayIndex) => {
        if(props.sortStep === undefined)
            return undefined
        else if(props.sortStep.hasOwnProperty('arrayID') && arrayIndex === props.sortStep['arrayID']) {
            return {
                "arrayElementID": props.sortStep["arrayElementID"],
                "value": props.sortStep["value"]
            }
        }
        else if(props.sortStep.hasOwnProperty('childArrayIDs') && props.sortStep['childArrayIDs'][0] === arrayIndex)
            return props.sortStep['childArrayElementIDs'][0]
        else if(props.sortStep.hasOwnProperty('childArrayIDs') && props.sortStep['childArrayIDs'].length > 1 && props.sortStep['childArrayIDs'][1] === arrayIndex)
            return props.sortStep['childArrayElementIDs'][1]
        
        return undefined
    }

    const arrays = props.subarrays.map((range, arrayIndex) => {
        const sortStep = getSortStep(arrayIndex)

        let elementValue = undefined
        if(props.elements !== undefined) {
            props.elements.forEach(obj => {
                if(obj.arrayID === arrayIndex)
                    elementValue = obj.value
            })
        }

        return (
            <Array 
                id={'array_' + arrayIndex} 
                range={range} 
                sortStep={sortStep} 
                elementValue={elementValue}
                lastLevel={props.lastLevel} 
            />
        )
    });
    return (
        <div className='level-row-flex'>
            {arrays}
        </div>
    )
}

export default Level