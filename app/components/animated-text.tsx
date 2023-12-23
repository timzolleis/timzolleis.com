import { animate, delay, useMotionValue, useTransform, motion } from 'framer-motion'
import { useEffect } from 'react'

export const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  const index = useMotionValue(0)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest))
  useEffect(() => {
    animate(count, 100, {
      type: 'tween',
      duration: 1,
      ease: 'easeIn',
      onUpdate(latest) {
        index.set(index.get() + 1)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <motion.p className={className}>{displayText}</motion.p>
}
