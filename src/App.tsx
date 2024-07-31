import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import CallToAction from './components/CallToAction'

export default function App() {
  const [showCallToAction, setShowCallToAction] = useState<boolean>(false)
  const animationDuration: number = 0.5 // In seconds.
  const callToActionDelay: number = 3500 // In milliseconds.
  const callToActionURL: string = 'https://www.youtube.com/watch?v=OOscn6lrabs'

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCallToAction(true)
    }, callToActionDelay)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='flex min-h-screen items-center justify-center bg-customPurple'>
      <div className='relative bottom-[10vh] rounded-2xl '>
        <motion.h1
          animate={{ opacity: showCallToAction ? 0.3 : 1 }}
          className='z-10 text-center text-8xl font-bold uppercase text-white'
          transition={{ duration: animationDuration, ease: 'easeOut' }}
        >
          You Are!
        </motion.h1>
        {showCallToAction && (
          <CallToAction
            animationDuration={animationDuration}
            callToActionURL={callToActionURL}
          />
        )}
      </div>
    </div>
  )
}
