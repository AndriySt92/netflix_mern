import React from 'react'
import { ArrowBackOutlined, ArrowDropDown } from "@material-ui/icons";
import "./watch.scss";

export const Watch = () => {
    return (
        <div className='watch'>
            <div className="back">
                <ArrowBackOutlined />
                Home
            </div>
            <video className='video' autoPlay controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"></video>
            
        </div>
    )
}
