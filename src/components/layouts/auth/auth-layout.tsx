const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          {/* <BrandIcon className='size-6 text-primary' /> */}
          <h1 className='text-xl font-medium'>ReShop</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export { AuthLayout }
