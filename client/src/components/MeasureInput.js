import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enums } from '../enums'
import { createMeasure } from './../redux/tableSlice';
import CanvasContainer from './containers/CanvasContainer';

const MeasureInput = memo(
    () => {

        const dispatch = useDispatch();
        const rawData = useSelector(state => state.measures.raw);

        const [measureDate, setMeasureDate] = useState(new Date());
        const [dayTime, setDayTime] = useState(
            new Date().getHours() < 10 ? enums.MORNING : (new Date().getHours() > 16 ? enums.EVENING : enums.DAY)
        );
        const [phLevel, setPhLevel] = useState(5);
        const [pillQuantity, setPillQuantity] = useState(0);

        useEffect(
            () => {
                if (rawData.length !== 0) {
                    const lastMeasure = rawData.filter(item => item.day_time === Object.keys(enums).find(key => enums[key] === dayTime)).sort((a, b) => Number(b.id) - Number(a.id))[0]
                    const lastPill = [...rawData].sort((a, b) => Number(b.id) - Number(a.id))[0];
                    setPhLevel(lastMeasure.ph_level);
                    setPillQuantity(lastPill.pill_quantity);
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
                    courseId: 6
                }
            ))
        }

        return (
            <div className='measure_input_container'>
                <form>
                    <div className="form-group">
                        <label htmlFor="dateInput">Дата измерения</label>
                        <input disabled type="text" className="form-control" id="dateInput" value={measureDate.toLocaleDateString()} />
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
                <CanvasContainer />
            </div>
        )
    }
)

export default MeasureInput