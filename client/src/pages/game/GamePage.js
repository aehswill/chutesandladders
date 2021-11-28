import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DieComponent from './DieComponent';
import { selectTransformTo, setTransformTo} from './dieSlice';

export default function GamePage(props){
    const dispatch = useDispatch();
    const getTransform = useSelector(selectTransformTo);

    const roll= ()=>{
        dispatch(setTransformTo(Math.floor(Math.random() * (7-1) + 1)));
    }
    return(
        <div>
            <DieComponent roll={roll} transformTo={getTransform}/>
        </div>
    )
}