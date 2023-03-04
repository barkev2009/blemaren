import React from 'react';
import { enums } from './../../enums';

const DateContainer = ({ dateData }) => {
    return (
        <div>
            <h4>{dateData.date}</h4>
            <div className='date_flex'>
                <div>
                    <h6>Время дня</h6>
                    <div>Уровень pH</div>
                    <div>Количество таблеток</div>
                </div>
                {dateData.data.map(item =>
                    <div>
                        <h6>{enums[item.day_time]}</h6>
                        <div>{item.ph_level}</div>
                        <div>{item.pill_quantity}</div>
                    </div>)}
            </div>
        </div>
    )
}

export default DateContainer