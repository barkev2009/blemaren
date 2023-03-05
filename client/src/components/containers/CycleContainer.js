import React, { memo } from 'react'
import AverageContainer from './AverageContainer'
import DateContainer from './DateContainer'

const CycleContainer = memo(
  ({ cycleData, cycle }) => {
    return (
      <div className='cycle_container'>
        {cycleData.map(
          (item, idx) => <DateContainer key={idx} dateData={item} />
        )}
        <AverageContainer cycle={cycle} cycleData={cycleData} />
      </div>
    )
  }
)

export default CycleContainer