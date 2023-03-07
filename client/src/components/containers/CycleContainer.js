import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import AverageContainer from './AverageContainer'
import DateContainer from './DateContainer'

const CycleContainer = memo(
  ({ cycleData, cycle }) => {

    const avgOnly = useSelector(state => state.measures.avgOnly);

    return (
      <div className='cycle_container'>
        {!avgOnly && cycleData.map(
          (item, idx) => <DateContainer key={idx} dateData={item} />
        )}
        <AverageContainer cycle={cycle} cycleData={cycleData} />
      </div>
    )
  }
)

export default CycleContainer