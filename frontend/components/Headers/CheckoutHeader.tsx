import React from 'react'

export default function CheckoutHeader({ activeStep }: { activeStep: number }) {
  return (
      <div className='p-3 flex gap-5'>
        <div className=' flex gap-2 items-center justify-center'>
          <span className={`w-8 h-8 inline-flex items-center justify-center border rounded-full ${activeStep === 1 ? 'bg-red-500 text-white' : ''}`}>1</span>
          <p>SHIPPING</p>
        </div>
        <div className=' flex gap-2 items-center justify-center'>
         <span className={`w-8 h-8 inline-flex items-center justify-center border rounded-full ${activeStep === 2 ? 'bg-red-500 text-white' : ''}`}>2</span>
          <p>PAYMENT</p>
        </div>
        <div className=' flex gap-2 items-center justify-center'>
          <span className={`w-8 h-8 inline-flex items-center justify-center border rounded-full ${activeStep === 3 ? 'bg-red-500 text-white' : ''}`}>3</span>
          <p>REVIEW</p>
        </div>

      </div>
  )
}
