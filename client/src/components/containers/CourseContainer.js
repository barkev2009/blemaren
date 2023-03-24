import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { deleteCourse, setCourse } from '../../redux/courseSlice';
import { MAIN_ROUTE } from '../../utils/consts';
import Modal from './Modal';

const CourseContainer = ({ course }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);

    const clickHandler = () => {
        navigate(`${MAIN_ROUTE}/${course.uuid}`, { replace: true });
    }

    return (
        <div className='card'>
            <div className='card-body' onClick={clickHandler}>

                <h5 className="card-title">{`ID курса: ${course.id}`}</h5>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <p className="card-text">{`Дата начала: ${new Date(course.start_date).toLocaleDateString()}`}</p>
                    <p className="card-text">{`Статус: ${course.course_status}`}</p>
                </div>
            </div>
            <button className="btn btn-outline-danger" onClick={() => setActive(true)}>Удалить курс</button>
            <Modal active={active} setActive={setActive}>
                <h4 style={{marginBottom: '40px'}}>Вы уверены, что хотите удалить курс?</h4>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <button className="btn btn-outline-danger" onClick={() => dispatch(deleteCourse(course.uuid))}>Удалить</button>
                    <button className="btn btn-outline-success" onClick={() => setActive(false)}>Не удалять</button>
                </div>
            </Modal>
        </div>
    )
}

export default CourseContainer