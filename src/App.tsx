import React, { useState } from 'react';
import checkmark from './assets/images/checkmark.png'

const App = () => {
  const [open, setOpen] = useState(false)
  const [verified, setVerified] = useState(false)
  const [checkmarkStyle, setCheckmarkStyle] = useState({
    backgroundImage: 'url(' + checkmark + ')',
    backgroundPosition: '0px 0px',
    width: '38px',
    height: '30px',
    marginLeft: '-5px',
  })

  return (
    <div>

    </div>
  )
}

export default App