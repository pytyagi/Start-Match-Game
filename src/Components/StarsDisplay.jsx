import React from 'react'
import utils from './utils'

function StarsDisplay({stars}) {
    return (
        <React.Fragment>
        {utils.range(1,stars).map((startId)=> 
            <div key ={startId} className="star"></div>    
        )}
        </React.Fragment>
    )
}
export default StarsDisplay