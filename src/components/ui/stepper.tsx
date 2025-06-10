'use client'

import { motion } from 'framer-motion'

interface Step {
  id: string
  label: string
}

interface StepperProps {
  steps: Step[]
  activeStep: string
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  const activeStepIndex = steps.findIndex((step) => step.id === activeStep)

  return (
    <div className='flex items-center justify-center mb-8'>
      <div className='flex items-center space-x-4 text-sm'>
        {steps.map((step, index) => (
          <div key={step.id} className='flex items-center space-x-2'>
            <motion.div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                index <= activeStepIndex
                  ? 'bg-emerald-600'
                  : 'border border-gray-300 dark:border-gray-600'
              }`}
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{
                scale: index === activeStepIndex ? 1.1 : 1,
                opacity: index <= activeStepIndex ? 1 : 0.6,
              }}
              transition={{ duration: 0.3 }}
            >
              {index <= activeStepIndex && (
                <span className='text-white text-xs'>✓</span>
              )}
            </motion.div>
            <motion.span
              className={`font-medium ${
                index <= activeStepIndex
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              initial={{ y: 5, opacity: 0.6 }}
              animate={{
                y: index === activeStepIndex ? 0 : 5,
                opacity: index <= activeStepIndex ? 1 : 0.6,
              }}
              transition={{ duration: 0.3 }}
            >
              {step.label}
            </motion.span>
            {index < steps.length - 1 && (
              <motion.div
                className='w-10 h-px bg-gray-200 dark:bg-gray-700 relative'
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <motion.div
                  className='h-px bg-emerald-600'
                  initial={{ width: 0 }}
                  animate={{
                    width: index < activeStepIndex ? '100%' : 0,
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export { Stepper }