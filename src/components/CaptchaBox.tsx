import React, { Fragment, ReactNode, useState } from 'react'
import { Transition } from '@headlessui/react'

import Popup from '@components/Popup'

import logo from '@assets/images/logo_48.png'
import checkmark from '@assets/images/checkmark.png'

interface CaptchaBoxProps {
  verified: boolean;
  message?: ReactNode | string;
  children?: ReactNode;
  disabled?: boolean;
}

const CaptchaBox = (props: CaptchaBoxProps) => {
  const [show, setShow] = useState(false)
  const [checkmarkStyle, setCheckmarkStyle] = useState({
    backgroundImage: 'url(' + checkmark + ')',
    backgroundPosition: '0px 0px',
    width: '38px',
    height: '30px',
    marginLeft: '-5px',
  })

  const submit = () => {
    setShow(false)

    if (props.verified) {
      setTimeout(() => {
        for (let i = 0, length = 20; i < length; i++) {
          setTimeout(() => {
            let newCheckmarkStyle = { ...checkmarkStyle }

            newCheckmarkStyle.backgroundPosition = `0px -${i * 30}px`

            setCheckmarkStyle(newCheckmarkStyle)
          })
        }
      }, 300)
    }


  }

  return (
    <>
      <div className='inline-flex items-stretch w-72 justify-between py-2 px-3 border border-gray-300 rounded-[.15rem] shadow-sm bg-[#F9F9F9]'>
        <div className='flex items-center space-x-3'>
          <div className='w-7 h-7'>
            <Transition
              as={Fragment}
              show={!show && !props.verified}
              enter='transition-all transform duration-150'
              enterFrom='rounded-none scale-0'
              enterTo='rounded-full scale-100'
              leave='transition-all transform duration-150'
              leaveFrom='rounded-full scale-100'
              leaveTo='rounded-none scale-0'
            >
              <button
                id='startCaptcha'
                onClick={() => setShow(true)}
                className='absolute border-2 w-7 h-7 border-gray-400 rounded-sm bg-white active:bg-[#EBEBEB]'
              ></button>
            </Transition>

            <Transition
              as={Fragment}
              show={show}
              enter='transition-opacity duration-150'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity duration-150'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <svg
                className='absolute spinner w-7 h-7'
                viewBox='0 0 66 66'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle
                  className='path'
                  fill='none'
                  strokeWidth='6'
                  cx='33'
                  cy='33'
                  r='30'
                ></circle>
              </svg>
            </Transition>

            <Transition
              as={Fragment}
              show={props.verified}
              enter='transition-opacity duration-150'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity duration-150'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div style={checkmarkStyle}></div>
            </Transition>
          </div>
          <label
            htmlFor='startCaptcha'
            className='flex items-center text-sm mr-5 h-full'
          >
            I'm not a robot
          </label>
        </div>

        <div className='flex flex-col items-center'>
          <img src={logo} className='w-8 h-8' alt='recaptcha logo' />
          <p className='text-[.6rem] text-gray-600'>reCAPTCHA</p>
          <p className='text-[.6rem] text-gray-600'>Privacy - Terms</p>
        </div>
      </div>

      <Popup
        show={show}
        message={props.message}
        onBlur={() => setShow(false)}
        onSubmit={() => submit()}
        disabled={props.disabled}
      >{ props.children }</Popup>
    </>
  )
}

export default CaptchaBox
