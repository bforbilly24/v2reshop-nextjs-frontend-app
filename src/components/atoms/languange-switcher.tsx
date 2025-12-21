'use client'

import { Globe } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/atoms/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu'

interface LanguageSwitcherProps {
  currentLocale: string
}

const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  id: { name: 'Bahasa Indonesia', flag: '🇮🇩' },
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLocale: string) => {
    // Ganti locale di path saat ini
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '')
    const newPath = `/${newLocale}${pathWithoutLocale}`
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='flex items-center gap-2'>
          <Globe className='h-4 w-4' />
          <span className='text-sm'>
            {languages[currentLocale as keyof typeof languages]?.flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-[160px]'>
        {Object.entries(languages).map(([locale, { name, flag }]) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={`flex items-center gap-2 cursor-pointer ${
              locale === currentLocale ? 'bg-accent' : ''
            }`}
          >
            <span>{flag}</span>
            <span className='text-sm'>{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
