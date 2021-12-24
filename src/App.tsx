import React, { useState } from 'react'
import CaptchaBox from '@components/CaptchaBox'

// games
import ConnectFour from '@/games/ConnectFour'

const App = () => {
  const [verified, setVerified] = useState(false)
  const [disabled, setDisabled] = useState(true)
  // && for disabling the verify button, sometimes we don't want the user to actually verify
  // so we want to allow the ability to troll them

  const handle = () => {
    setDisabled(false)

    setVerified(true)
  }

  const message = <p>l0l u suck</p>

  return (
    <CaptchaBox title="play connect 4" message={message} verified={verified} disabled={disabled}>
      <ConnectFour />
    </CaptchaBox>
  )
}

export default App
