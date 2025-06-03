// import Image from 'next/image'

const HeroLeftCard = () => {
  return (
    <div className='absolute -bottom-10 left-20 z-10 h-fit inline-flex w-56 items-start rounded-lg justify-center bg-white/70 p-8 backdrop-blur-lg lg:top-40 lg:w-[26rem]'>
      <div className='relative inline-flex flex-col items-start justify-center gap-4'>
        {/* <div className='absolute top-8 left-20 lg:-top-40'>
          <Image
            alt='pattern-2'
            src='/images/patterns/pattern-2.svg'
            width={100}
            height={116}
            className='h-[58px] w-[50px] lg:h-28 lg:w-24'
          />
        </div> */}
        <h3 className='w-full text-xl text-emerald-800 lg:text-5xl'>
          From Waste to Worth
        </h3>
        <div className='w-full'>
          <p className='text-base text-muted-foreground lg:text-lg'>
            &quot;At Re-Shop, waste becomes an opportunity. Turn raw wood into
            an elegant table, used bottles into art. Let&apos;s start the change
            from the things around us.&quot;
          </p>
        </div>
      </div>
    </div>
  )
}
export { HeroLeftCard }
