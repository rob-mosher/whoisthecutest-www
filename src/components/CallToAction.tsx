import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Heart from './Heart'

interface CallToActionProps {
  animationDuration: number,
  callToActionURL: string,
  children: ReactNode,
}

type FnHandleClick = (callToActionURL: CallToActionProps['callToActionURL']) => void;

const handleClick: FnHandleClick = (url) => {
  window.location.href = url
}

const initialBoxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)'

export default function CallToAction({
  animationDuration,
  callToActionURL,
  children,
}: CallToActionProps) {
  return (
    <div className='absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2'>
      <motion.button
        animate={{ opacity: 1, rotate: -15, x: 0 }}
        className='rounded-xl bg-amber-800  px-8 py-4 text-2xl text-white hover:ring-2 hover:ring-white'
        initial={{ opacity: 0, rotate: 340, x: 100 }}
        onClick={() => handleClick(callToActionURL)}
        style={{
          boxShadow: initialBoxShadow, // Animated via whileHover
        }}
        transition={{ duration: animationDuration, ease: 'easeOut' }}
        type='button'
        whileHover={{
          scale: 1.05,
          boxShadow: '0px 25px 50px rgba(0, 0, 0, 0.25)',
        }}
        whileTap={{
          scale: 0.95,
          boxShadow: initialBoxShadow,
        }}
      >
        <div className='flex items-center gap-2'>
          <Heart />
          <span className='-translate-y-0.5 text-nowrap'>{children}</span>
          <Heart />
        </div>
      </motion.button>
    </div>
  )
}
