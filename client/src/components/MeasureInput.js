import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enums } from '../enums'
import { defineDuration } from '../utils/functions';
import { createMeasure, removeError } from './../redux/tableSlice';
import CanvasContainer from './containers/CanvasContainer';

const MeasureInput = memo(
    ({courseId}) => {

        const getDateFormatted = (dateString) => {
            return `${dateString.split('.')[2]}-${dateString.split('.')[1]}-${dateString.split('.')[0]}`
        }

        const dispatch = useDispatch();
        const rawData = useSelector(state => state.measures.raw);
        const error = useSelector(state => state.measures.error);

        const [measureDate, setMeasureDate] = useState(getDateFormatted(new Date().toLocaleDateString()));
        const [dayTime, setDayTime] = useState(
            new Date().getHours() < 10 ? enums.MORNING : (new Date().getHours() > 16 ? enums.EVENING : enums.DAY)
        );
        const [phLevel, setPhLevel] = useState(5);
        const [pillQuantity, setPillQuantity] = useState(0);
        const [duration, setDuration] = useState(null);

        useEffect(
            () => {
                if (rawData.length !== 0) {
                    const lastMeasure = rawData.filter(item => item.day_time === Object.keys(enums).find(key => enums[key] === dayTime)).sort((a, b) => Number(b.id) - Number(a.id))[0]
                    setPhLevel(lastMeasure.ph_level);
                    setPillQuantity(lastMeasure.pill_quantity);
                }
            }, [rawData, dayTime]
        );

        const buttonHandler = () => {
            dispatch(createMeasure(
                {
                    measure_date: measureDate,
                    ph_level: phLevel,
                    pill_quantity: pillQuantity,
                    day_time: Object.keys(enums).filter(item => enums[item] === dayTime)[0],
                    courseId
                }
            ))
        }

        const dbDate = useSelector(state => state.course.course.start_date);

        useEffect(
            () => {
                if (!!dbDate) {
                    const curDate = new Date();
                    const startDate = new Date(dbDate);
                    setDuration(defineDuration(curDate - startDate));
                }
            }, [dbDate]
        );

        return (
            <div className='measure_input_container'>
                <form>
                    <div className="form-group">
                        <label htmlFor="dateInput">Дата измерения</label>
                        <input type="date" className="form-control" id="dateInput" onChange={e => setMeasureDate(getDateFormatted(new Date(e.target.value).toLocaleDateString()))} value={measureDate} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dayTime">Время дня</label>
                        <select className="form-control" id="dayTime" onChange={e => setDayTime(e.target.value)} value={dayTime}>
                            <option>{enums.MORNING}</option>
                            <option>{enums.DAY}</option>
                            <option>{enums.EVENING}</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phLevel">Уровень pH</label>
                        <input type="number" className="form-control" id="phLevel" min={5} max={10} step={0.1} onChange={e => setPhLevel(e.target.value)} value={phLevel} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pillQuantity">Количество таблеток</label>
                        <input type="number" className="form-control" id="pillQuantity" min={0} max={5} step={0.5} onChange={e => setPillQuantity(e.target.value)} value={pillQuantity} />
                    </div>
                </form>
                <button type="button" className="btn btn-outline-primary mt-4" onClick={buttonHandler}><i className="bi bi-database-add"></i>{`  Добавить измерение`}</button>

                <div style={{ marginTop: '10px' }}>Прошло с начала курса:</div>
                <div>{duration}</div>
                {error && <div className="alert alert-danger" role="alert" onClick={() => dispatch(removeError())}>{error.message}</div>}
                <CanvasContainer />
            </div>
        )
    }
)

export default MeasureInput