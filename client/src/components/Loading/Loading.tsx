import React from 'react'
import loadingImg from '../../images/misc/spinner.png'
import './loading.scss'

export const Loading: React.FC<{ smallLoader?: boolean }> = ({ smallLoader }) => {
  return (
    <div className={smallLoader ? 'smallLoader' : 'loading'}>
      <img src={loadingImg} alt="" />
    </div>
  )
}
