import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE } from '../../utils/consts';

const CourseContainer = ({ course }) => {

    const navigate = useNavigate();

    return (
        <div className='card' onClick={() => navigate(`${MAIN_ROUTE}/${course.uuid}`, {replace: true})}>
            <div className='card-body'>
                <h5 className="card-title">{`ID курса: ${course.id}`}</h5>
                <p className="card-text">{`Дата начала курса: ${new Date(course.start_date).toLocaleDateString()}`}</p>
            </div>
        </div>
    )
}

export default CourseContainer