import React, { useRef, useState } from 'react'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import { ListItem } from '../listItem/ListItem'
import './list.scss'

export const List: React.FC = () => {
  return (
    <div className="list">
      <span className="listTitle">Continue to watch</span>
      <div className="wrapper">
        <ArrowBackIosOutlined className="sliderArrow left" />
        <div className="container">
          <ListItem index={0} />
          <ListItem index={1} />
          <ListItem index={2} />
          <ListItem index={3} />
          <ListItem index={4} />
          <ListItem index={5} />
          <ListItem index={6} />
          <ListItem index={7} />
          <ListItem index={8} />
          <ListItem index={9} />
        </div>
        <ArrowForwardIosOutlined className="sliderArrow right" />
      </div>
    </div>
  )
}
