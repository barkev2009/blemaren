import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {enums} from '../enums'
import {getMeasures} from './../redux/tableSlice';

const MeasureInput = () => {

    const [measureDate, setMeasureDate] = useState(new Date());
    const [phLevel, setPhLevel] = useState(5);
    const [dayTime, setDayTime] = useState(enums.MORNING);
    const [pillQuantity, setPillQuantity] = useState(0);

    const dispatch = useDispatch();

    const buttonHandler = () => {
        axios.post(
            'http://localhost:5000/api/measure/',
            {
                measure_date: String(measureDate.getFullYear()) + '-' + String(measureDate.getMonth() + 1).padStart(2, '0') + '-' + String(measureDate.getDate()).padStart(2, '0'),
                ph_level: phLevel,
                pill_quantity: pillQuantity,
                day_time: Object.keys(enums).filter(item => enums[item] === dayTime)[0],
                courseId: 6
            }
        ).then(resp => dispatch(getMeasures()))
    }

    return (
        <div className='measure_input_container'>
            <form>
                <div className="form-group">
                    <label htmlFor="dateInput">Дата измерения</label>
                    <input disabled type="text" className="form-control" id="dateInput"
                        value={
                            String(measureDate.getDate()).padStart(2, '0') + '.'
                            + String(measureDate.getMonth() + 1).padStart(2, '0') + '.'
                            + String(measureDate.getFullYear())
                        } />
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
                    <input type="number" className="form-control" id="pillQuantity" min={0} max={5} step={0.5} onChange={e => setPillQuantity(e.target.value)} value={pillQuantity}/>
                </div>
            </form>
            <button type="button" className="btn btn-primary mt-4" onClick={buttonHandler}>Отправить измерение</button>
        </div>
    )
}

export default MeasureInput