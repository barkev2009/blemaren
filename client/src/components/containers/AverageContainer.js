import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import { enums } from '../../enums';

const AverageContainer = memo(
    ({ cycleData, cycle }) => {

        const avgOnly = useSelector(state => state.measures.avgOnly);

        const morning_phs = cycleData.map(item => item.data.filter(measure => measure.day_time === 'MORNING')[0]?.ph_level).filter(x => x !== undefined);
        const avg_morning_ph = (morning_phs.reduce((a, b) => a + b, 0) / morning_phs.length).toFixed(1);
        const day_phs = cycleData.map(item => item.data.filter(measure => measure.day_time === 'DAY')[0]?.ph_level).filter(x => x !== undefined);
        const avg_day_ph = (day_phs.reduce((a, b) => a + b, 0) / day_phs.length).toFixed(1);
        const evening_phs = cycleData.map(item => item.data.filter(measure => measure.day_time === 'EVENING')[0]?.ph_level).filter(x => x !== undefined);
        const avg_evening_ph = (evening_phs.reduce((a, b) => a + b, 0) / evening_phs.length).toFixed(1);

        const morning_pills = cycleData.map(item => item.data.filter(measure => measure.day_time === 'MORNING')[0]?.pill_quantity).filter(x => x !== undefined);
        const avg_morning_pills = (morning_pills.reduce((a, b) => a + b, 0) / morning_pills.length).toFixed(1);
        const day_pills = cycleData.map(item => item.data.filter(measure => measure.day_time === 'DAY')[0]?.pill_quantity).filter(x => x !== undefined);
        const avg_day_pills = (day_pills.reduce((a, b) => a + b, 0) / day_pills.length).toFixed(1);
        const evening_pills = cycleData.map(item => item.data.filter(measure => measure.day_time === 'EVENING')[0]?.pill_quantity).filter(x => x !== undefined);
        const avg_evening_pills = (evening_pills.reduce((a, b) => a + b, 0) / evening_pills.length).toFixed(1);

        const iconHandler = (phValue) => {
            if (phValue < process.env.REACT_APP_LIMIT_LOW) {
                return <i className="bi bi-arrow-up-circle-fill text-warning" style={{ fontSize: '1.5rem' }}></i>
            }
            if (phValue > process.env.REACT_APP_LIMIT_HIGH) {
                return <i className="bi bi-arrow-down-circle-fill text-warning" style={{ fontSize: '1.5rem' }}></i>
            }
            return <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '1.5rem' }}></i>
        }

        return (
            <div>
                {!avgOnly ? <h5>Средние показатели</h5> : <h5>{`${cycleData[0].date} - ${cycleData[cycleData.length - 1].date}`}</h5>}
                <div className='date_flex'>
                    <div>
                        {avgOnly && <div>Время дня</div>}
                        <div>Уровень pH</div>
                        <div>Количество таблеток</div>
                    </div>
                    <div className='morning_col'>
                        {avgOnly && <div>{enums.MORNING}</div>}
                        {avg_morning_ph !== 'NaN' && <div><b>{avg_morning_ph}</b></div>}
                        {avg_morning_pills !== 'NaN' && <div><b>{avg_morning_pills}</b></div>}
                        {cycle !== 0 && avg_evening_ph !== 'NaN' && avg_morning_ph !== 'NaN' && iconHandler(Number(avg_day_ph))}
                    </div>
                    <div className='day_col'>
                        {avgOnly && <div>{enums.DAY}</div>}
                        {avg_day_ph !== 'NaN' && <div><b>{avg_day_ph}</b></div>}
                        {avg_day_pills !== 'NaN' && <div><b>{avg_day_pills}</b></div>}
                        {cycle !== 0 && avg_morning_ph !== 'NaN' && avg_day_ph !== 'NaN' && iconHandler(Number(avg_evening_ph))}
                    </div>
                    <div className='evening_col'>
                        {avgOnly && <div>{enums.EVENING}</div>}
                        {avg_evening_ph !== 'NaN' && <div><b>{avg_evening_ph}</b></div>}
                        {avg_evening_pills !== 'NaN' && <div><b>{avg_evening_pills}</b></div>}
                        {cycle !== 0 && avg_day_ph !== 'NaN' && avg_evening_ph !== 'NaN' && iconHandler(Number(avg_morning_ph))}
                    </div>
                </div>
            </div>
        )
    }
)

export default AverageContainer