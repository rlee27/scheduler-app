import * as React from 'react'
import { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'

const ServerError = (props) => {
    return(
        <div style={{'marginLeft': '4em', 'marginTop': '1em'}}>
            {props.errors.map((error, index) => (
                <p className="text-danger" key={index}>{error}</p>
            ))}
        </div>
    )
}

export default ServerError