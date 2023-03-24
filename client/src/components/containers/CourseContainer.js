import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setCourse } from '../../redux/courseSlice';
import { MAIN_ROUTE } from '../../utils/consts';

const CourseContainer = ({ course }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clickHandler = () => {
        navigate(`${MAIN_ROUTE}/${course.uuid}`, {replace: true});
    }

    return (
        <div className='card' onClick={clickHandler}>
            <div className='card-body'>
                <h5 className="card-title">{`ID курса: ${course.id}`}</h5>
                <p className="card-text">{`Дата начала курса: ${new Date(course.start_date).toLocaleDateString()}`}</p>
            </div>
        </div>
    )
}

export default CourseContainer