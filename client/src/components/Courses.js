import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCoursesByLogin } from '../redux/courseSlice';
import CourseContainer from './containers/CourseContainer';

const Courses = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.app.user);
    const courses = useSelector(state => state.course.courses);

    useEffect(
        () => {
            if (!!user.login) {
                dispatch(getCoursesByLogin(user.login));
            }
        }, [user, dispatch]
    );

    return (
        <div className='App'>
            {
                courses.length !== 0 && courses.map(
                    course => <CourseContainer key={course.id} course={course} />
                )
            }
        </div>
    )
}

export default Courses