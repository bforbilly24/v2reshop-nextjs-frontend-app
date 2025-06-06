import { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { ArrowDownIcon } from 'lucide-react'
import Link from 'next/link'

interface HeroRightCardProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> {
  href: string
  children?: ReactNode
}

const HeroRightCard: React.FC<HeroRightCardProps> = ({
  href,
  children,
  ...props
}) => {
  const handleScroll = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      })
    }
  }

  return (
    <Link href={href} onClick={handleScroll} {...props}>
      <div className='absolute -bottom-5 right-0 z-30 lg:right-0'>
        <div className='relative flex h-16 w-16 items-center justify-center bg-white/70 group rounded-lg backdrop-blur-3xl lg:h-32 lg:w-32 hover:bg-white/40 transition-all duration-300'>
          {children || (
            <ArrowDownIcon className='size-10 text-muted-foreground group-hover:text-white' />
          )}
        </div>
      </div>
    </Link>
  )
}

export { HeroRightCard }
