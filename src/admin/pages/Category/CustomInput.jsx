import React from 'react'

function CustomInput(props) {
  return (
    <>
    <div className='form-group mb-3 py-3'>
    <input type={props.type} name={props.name} id="" placeholder={props.placeholder} className='form-control' />
    </div>
    </>
  )
}

export default CustomInput