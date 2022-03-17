import React from 'react'
import './error.scss'

export const Error: React.FC<{error: string}> = ({error}) => {
  return (
    <div className='errorComponent'>{error}</div>
  )
}
