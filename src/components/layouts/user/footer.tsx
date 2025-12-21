    'use client'

    import { ECOMMERCE_FOOTER_DATA } from '@/constant'
    import Image from 'next/image'
    import Link from 'next/link'

    const Footer: React.FC = () => {
    const currentYear: number = new Date().getFullYear()

    return (
        <footer
        id='footer'
        className='bg-white dark:bg-primary border-t mx-auto container'
        >
        <div className='relative mx-auto flex w-full flex-col items-center justify-center border-t border-border bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.black/8%),transparent)] px-4 pb-8 pt-16 dark:bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] md:pb-0 lg:px-8 lg:pt-32'>
            <div className='absolute left-1/2 right-1/2 top-0 h-1.5 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground' />

            <div className='flex flex-col items-center w-full justify-center gap-y-8'>
            {/* Main Footer Content */}
            <div className='grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12'>
                {/* Logo */}
                <div className='lg:col-span-1 flex flex-col items-start'>
                <div className='w-fit flex items-center justify-center'>
                    <Image
                    src={ECOMMERCE_FOOTER_DATA.logo.src}
                    alt={ECOMMERCE_FOOTER_DATA.logo.alt}
                    width={ECOMMERCE_FOOTER_DATA.logo.width}
                    height={ECOMMERCE_FOOTER_DATA.logo.height}
                    />
                </div>
                </div>

                {/* Contact */}
                <div className='lg:col-span-1 flex flex-col items-start text-left'>
                <h3 className='text-xl lg:text-2xl font-light text-primary mb-6'>
                    Contact
                </h3>
                <div className='space-y-4 text-sm text-muted-foreground uppercase tracking-wide w-full'>
                    <p className='leading-relaxed'>
                    {ECOMMERCE_FOOTER_DATA.contact.address}
                    </p>
                    <div>
                    <Link
                        href={ECOMMERCE_FOOTER_DATA.contact.email.url}
                        className='hover:text-primary transition-colors'
                    >
                        {ECOMMERCE_FOOTER_DATA.contact.email.label}
                    </Link>
                    </div>
                    <div>
                    <Link
                        href={ECOMMERCE_FOOTER_DATA.contact.phone.url}
                        className='hover:text-priamry transition-colors'
                    >
                        {ECOMMERCE_FOOTER_DATA.contact.phone.label}
                    </Link>
                    </div>
                </div>
                </div>

                {/* Link Groups */}
                {ECOMMERCE_FOOTER_DATA.groups.map((group) => (
                <div key={group.title} className='lg:col-span-1 flex flex-col items-start text-left'>
                    <h3 className='text-xl lg:text-2xl font-light text-primary mb-6'>
                    {group.title}
                    </h3>
                    <ul className='space-y-2 w-full'>
                    {group.items.map((item) => (
                        <li key={item.id}>
                        <Link
                            href={item.url}
                            className='text-sm text-muted-foreground uppercase tracking-wide hover:text-emerald-500 hover:pl-3 transition-all duration-300'
                        >
                            {item.title}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>
                ))}
            </div>

            {/* Footer Bottom */}
            <div className='border-t border-gray-200 py-8 w-full'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>
                {/* Copyright */}
                <div className='text-center md:text-left'>
                    <div className='flex items-center justify-center md:justify-start text-sm text-muted-foreground flex-wrap gap-1'>
                    <span>© {currentYear}</span>
                    <span>by</span>
                    <span className='font-bold text-emerald-500'>ReShop</span>
                    </div>
                </div>

                {/* Social Links */}
                <div className='text-center'>
                    <ul className='flex justify-center space-x-6'>
                    {ECOMMERCE_FOOTER_DATA.social.map((social) => (
                        <li key={social.id}>
                        <Link
                            href={social.url}
                            target={social.external ? '_blank' : undefined}
                            rel={
                            social.external ? 'noopener noreferrer' : undefined
                            }
                            className='text-sm text-muted-foreground uppercase tracking-wide hover:text-emerald-500 transition-colors'
                        >
                            {social.title}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>

                {/* Language Selector */}
                <div className='text-center md:text-right'>
                    <ul className='flex justify-center md:justify-end space-x-6'>
                    {ECOMMERCE_FOOTER_DATA.languages.map((lang) => (
                        <li key={lang.id}>
                        <Link
                            href={lang.url}
                            className='text-sm text-muted-foreground uppercase tracking-wide hover:text-emerald-500 transition-colors'
                        >
                            {lang.title}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
        </footer>
    )
    }

    export { Footer }
