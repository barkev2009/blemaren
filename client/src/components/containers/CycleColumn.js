import React from 'react'
import DateColumn from './DateColumn'

const CycleColumn = ({ cycleData }) => {

    return (
        <div className='cycle_column'>
            {
                [...cycleData.cycleData].reverse().map(
                    (item, idx) => <DateColumn key={`dc_${idx}`} cycleData={item} />
                )
            }
        </div>
    )
}

export default CycleColumn