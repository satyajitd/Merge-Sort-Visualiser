import React, { useState } from 'react'
import './css/style.css'
import Level from './components/Level'

import axios from 'axios'


const App = () => {

    const [counter, setCounter] = useState(-1)
    const [arrayData, setArrayData] = useState('')
    const [processData, setProcessedData] = useState({})

    const getSortStep = (index) => {
        const step = counter !== -1? processData['steps'][counter] : {}
        
        if(Object.keys(step).length === 0)
            return undefined;
        else if(index === step['parent']) {
            return {
                "arrayID": step["arrayID"],
                "arrayElementID": step["arrayElementID"],
                "value": step["value"]
            }
        }
        else if(index === step['parent'] + 1) {
            return {
                "childArrayIDs": step["childArrayIDs"],
                "childArrayElementIDs": step["childArrayElementIDs"]
            }
        }
        return undefined 
    }

    const getLevels = () => {
        if(Object.keys(processData).length !== 0) {
            const levels = processData['partitions'].map((subarrays, levelIndex) => {
                
                const elements = []
                processData.elements.forEach(obj => {
                    if(levelIndex === obj.level)
                        elements.push({
                            'arrayID': obj.arrayID,
                            'value': obj.value
                        })
                });

                const sortStep = getSortStep(levelIndex)
                return (
                    <Level 
                        id={'level_' + levelIndex}
                        subarrays={subarrays}
                        sortStep={sortStep}
                        elements={elements.length? elements : undefined}
                        lastLevel={levelIndex === processData.partitions.length - 1}
                    />
                )
            })
            return levels
        }
        return <></>
    }
    
    const getButtons = () => {
        if(Object.keys(processData).length !== 0) {
            return (
                <div className='row-flex center-flex'>
                    <button id="Prev" onClick={handleClick} disabled={counter === -1}>
                        Prev
                    </button>
                    <button id="Next" onClick={handleClick} disabled={counter === processData['steps'].length - 1}>
                        Next
                    </button>
                </div>
            )
        }
        return <></>
    }
    
    
    const handleChange = (event) => {
        setArrayData(event.target.value)
    }

    const handleClick = (event) => {
        event.preventDefault()
        if(event.target.id === "Next")
            setCounter(counter + 1)
        else
            setCounter(counter - 1)
    }

    const handleSumbit = (event) => {
        event.preventDefault()
        if(arrayData !== '') {
            axios.post('/process', {
                "arrayData": arrayData
            })
            .then(res => {
                setCounter(-1)
                if(Object.keys(processData).length !== 0)
                    setProcessedData({})
                setProcessedData(res.data)
                
            })
            .catch(err => alert('Incorrect Data'))
        }
        else 
            alert('Input can\'t be empty!')
    }

    return (
        <div>
            <div className="center">
                <div className='col-flex'>
                    {getLevels()}
                </div>
                <div className="bottom">
                    <h1>Merge Sort Visualizer</h1>
                    <form onSubmit={handleSumbit}>
                        <input
                            value={arrayData}
                            onChange={handleChange} 
                        />
                        <button type="submit">Generate</button>
                    </form>
                    {getButtons()}
                </div>
            </div>
            <div className="footer">
                <p>Made with <span role="img" aria-label="heart">&#129505;</span> by <a href="https://github.com/satyajitd" target="_blank" rel="noopener noreferrer">Satyajit Das</a>.</p>
            </div>
        </div>
    )
}

export default App;