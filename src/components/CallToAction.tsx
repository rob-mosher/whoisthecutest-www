import { motion } from 'framer-motion'

interface CallToActionProps {
  animationDuration: number,
  callToActionURL: string
}

type FnHandleClick = (callToActionURL: CallToActionProps['callToActionURL']) => void;

const handleClick: FnHandleClick = (url) => {
  window.location.href = url
}

export default function CallToAction({ animationDuration, callToActionURL }: CallToActionProps) {
  return (
    <div className='absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2'>
      <motion.button
        animate={{ opacity: 1, rotate: -15, x: 0 }}
        className='rounded-xl bg-white px-8 py-4 text-2xl hover:bg-amber-400 focus:bg-amber-400'
        initial={{ opacity: 0, rotate: 340, x: 100 }}
        onClick={() => handleClick(callToActionURL)}
        transition={{ duration: animationDuration, ease: 'easeOut' }}
        type='button'
      >
        Show Me!
      </motion.button>
    </div>
  )
}
