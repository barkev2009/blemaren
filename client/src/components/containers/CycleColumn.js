import React from 'react'
import HeatSquare from '../plot/HeatSquare'

const CycleColumn = ({ cycleData }) => {

    const dateLabel = cycleData.date.split('.')[0] + '/' + cycleData.date.split('.')[1]

    return (
        <div>
            <div style={{ height: '60px', paddingTop: '6px', paddingRight: '10px', fontWeight: 700 }}>{dateLabel}</div>
            {
                cycleData.data.map(
                    (item, idx) => <HeatSquare key={idx} rawItem={item} />
                )
            }
        </div>
    )
}

export default CycleColumn