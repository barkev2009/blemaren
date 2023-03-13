import React from 'react'
import { enums } from '../../enums';
import HeatSquare from '../plot/HeatSquare'

const CycleColumn = ({ cycleData }) => {

    const dateLabel = cycleData.date.split('.')[0] + '/' + cycleData.date.split('.')[1];

    const dayTimes = Object.keys(enums);

    return (
        <div>
            <div style={{ height: '60px', paddingTop: '6px', fontWeight: 700 }}>{dateLabel}</div>
            {
                dayTimes.map(
                    item => {
                        const checkDayTime = cycleData.data.filter(measure => measure.day_time === item);
                        if (checkDayTime.length !== 0) {
                            return <HeatSquare key={checkDayTime[0].id} rawItem={checkDayTime[0]} />
                        }
                        return <div className='heat_square empty'></div>
                    }
                )
            }
        </div>
    )
}

export default CycleColumn