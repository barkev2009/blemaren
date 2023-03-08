import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import { enums } from '../../enums'
import HeatSquare from '../plot/HeatSquare'
import CycleColumn from './CycleColumn';

const CanvasContainer = memo(
    () => {

        const rawData = useSelector(state => state.measures.raw);
        const cycleData = useSelector(state => [...state.measures.structuredData].sort((a, b) => a.cycle - b.cycle).map(cycle => cycle.cycleData).flat(1).reverse());

        console.log(cycleData)

        return (
            <div className='canvas_container'>
                <div style={{ height: '60px', paddingTop: '6px', paddingRight: '10px', fontWeight: 700 }}>Дата</div>
                {
                    Object.keys(enums).map(
                        item => <div style={{ height: '60px', paddingTop: '6px', paddingRight: '10px' }}>{enums[item]}</div>
                    )
                }
                {
                    cycleData.map(
                        (item, idx) => <CycleColumn key={idx} cycleData={item} />
                    )
                }
            </div>
        )
    }
)

export default CanvasContainer