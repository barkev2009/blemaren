import React, { memo } from 'react';
import MeasureContainer from './MeasureContainer';

const DateContainer = memo(
    ({ dateData }) => {

        const getDate = (date) => {
            const day = Number(date.split('.')[0]);
            let month = Number(date.split('.')[1]) - 1;
            const year = Number(date.split('.')[2]);
            switch (month) {
                case 0:
                    month = 'января';
                    break;
                case 1:
                    month = 'февраля';
                    break;
                case 2:
                    month = 'марта';
                    break;
                case 3:
                    month = 'апреля';
                    break;
                case 4:
                    month = 'мая';
                    break;
                case 5:
                    month = 'июня';
                    break;
                case 6:
                    month = 'июля';
                    break;
                case 7:
                    month = 'августа';
                    break;
                case 8:
                    month = 'сентября';
                    break;
                case 9:
                    month = 'октября';
                    break;
                case 10:
                    month = 'ноября';
                    break;
                case 11:
                    month = 'декабря';
                    break;
                default:
                    month = 'месяца';
                    break;
            }
            return `${day}-е ${month} ${year}`
        }

        return (
            <div>
                <h4>{getDate(dateData.date)}</h4>
                <div className='date_flex'>
                    <div>
                        <h6>Время дня</h6>
                        <div>Уровень pH</div>
                        <div>Количество таблеток</div>
                    </div>
                    {dateData.data.map((item, idx) =>
                        <MeasureContainer key={item.id} measureData={item} />
                    )}
                </div>
            </div>
        )
    }
)

export default DateContainer