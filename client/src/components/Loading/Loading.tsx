import React from 'react'
import loadingImg from '../../images/misc/spinner.png'
import './loading.scss'
;


export const Loading = () => {
  return (
    <div className="loading">
      <img src={loadingImg} alt="" />
    </div>
  )
}
