import React from 'react'
import styled from './style.module.scss'
const index = () => {
  return (
    <div className={styled.loader_body}>
      <div className={styled.lds_roller }><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default index