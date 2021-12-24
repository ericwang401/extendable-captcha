import React, { useState } from 'react'
import CaptchaBox from '@components/CaptchaBox'

const App = () => {
  const [verified, setVerified] = useState(false)
  const [disabled, setDisabled] = useState(true)
  // && for disabling the verify button, sometimes we don't want the user to actually verify
  // so we want to allow the ability to troll them

  const handle = () => {
    setDisabled(false)

    setVerified(true)
  }

  const message = <p>penis</p>

  return (
    <CaptchaBox title="test" message={message} verified={verified} disabled={disabled}>
      <button onClick={() => handle()}>free robux here</button>
    </CaptchaBox>
  )
}

export default App
