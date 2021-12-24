import React, { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'

interface PopupProps {
  show: boolean;
  onSubmit: Function;
  onBlur: Function;
}

const Popup = (props: PopupProps) => {
  return (
    <Transition
      as={Fragment}
      show={props.show}
      enter='transition-opacity delay-1000 duration-150'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-150'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className='absolute grid place-items-center z-10 inset-0'>
        <div
          className='absolute inset-0 bg-gray-500 opacity-40'
          onClick={() => props.onBlur()}
        ></div>
        <div className='bg-white w-full max-w-lg border border-gray-300 shadow-sm z-30'>
          <div className='px-2 mt-2 mb-2'>
            <div className='w-full p-6 text-white bg-blue-500'>
              <h1 className='text-md'>Complete the following challenge</h1>
              <h1 className='font-bold text-3xl'>checkmate a computer</h1>
              <h1 className='text-md'>
                Click verify once the opponent can't move.
              </h1>
            </div>
          </div>

          <div className='px-2 mb-2'>
          </div>

          <div className='flex justify-end p-2 border-t border-gray-300'>
            <div className='flex items-center flex-grow'>
            </div>
            <button
              className='uppercase flex-0 text-white font-bold disabled:bg-gray-300 bg-blue-500 px-7 py-3 rounded-sm'
              onClick={() => props.onSubmit(true)}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Popup
