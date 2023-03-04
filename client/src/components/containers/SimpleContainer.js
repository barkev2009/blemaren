import React from 'react';
import {enums} from './../../enums'

const SimpleContainer = ({data}) => {
  return (
    <article>
        <h3>{new Date(data.measure_date).toLocaleDateString()}</h3>
        <p>{`Уровень pH: ${data.ph_level}`}</p>
        <p>{`Время дня: ${enums[data.day_time]}`}</p>
        <p>{`Количество таблеток: ${data.pill_quantity}`}</p>
    </article>
  )
}

export default SimpleContainer