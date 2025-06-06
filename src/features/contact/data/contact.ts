import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'

interface ContactItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  linkText: string
  href: string
  target?: string
}

const CONTACT: ContactItem[] = [
  {
    icon: MailIcon,
    title: 'Email',
    description: 'Our friendly team is here to help.',
    linkText: 'admin@reshopid.com',
    href: 'mailto:admin@reshopid.com',
  },
//   {
//     icon: MessageCircle, 
//     title: 'Live chat',
//     description: 'Our friendly team is here to help.',
//     linkText: 'Start new chat',
//     href: '#',
//   },
  {
    icon: MapPinIcon,
    title: 'Office',
    description: 'Come say hello at our office HQ.',
    linkText: 'Surabaya, Indonesia',
    href: '#map',
    target: '_blank',
  },
  {
    icon: PhoneIcon,
    title: 'Phone',
    description: 'Mon-Fri from 8am to 5pm.',
    linkText: '+62 8515 xxxx',
    href: 'tel:+628515xxxx',
  },
]

export { CONTACT }
