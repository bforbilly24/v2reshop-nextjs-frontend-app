'use client'

import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar'
import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/dialog'
import { Icon } from '@/components/atoms/icon'
import { Separator } from '@/components/atoms/separator'
import { getCurrentUser } from '@/features/auth/actions'
import type { UserProfile } from '@/features/auth/types'

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchUserProfile()
    }
  }, [isOpen])

  const fetchUserProfile = async () => {
    setIsLoading(true)
    try {
      const response = await getCurrentUser()
      if (response.status) {
        setUser(response.user)
      }
    } catch (error) {
      toast.error('Failed to load profile', {
        description: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false,
        callbackUrl: '/auth/login',
      })

      if (typeof window !== 'undefined') {
        localStorage.clear()
        sessionStorage.clear()
      }

      toast.success('Logged Out', {
        description: 'You have been logged out successfully.',
      })
      onClose()

      window.location.href = '/auth/login'
    } catch {
      toast.error('Logout Failed', {
        description: 'Failed to logout. Please try again.',
      })
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className='flex flex-col items-center justify-center py-8 space-y-4'>
            <div className='h-20 w-20 bg-muted rounded-full animate-pulse' />
            <div className='space-y-2 w-full'>
              <div className='h-5 w-3/4 bg-muted rounded animate-pulse mx-auto' />
              <div className='h-4 w-1/2 bg-muted rounded animate-pulse mx-auto' />
            </div>
          </div>
        ) : user ? (
          <div className='space-y-6'>
            <div className='flex flex-col items-center gap-4'>
              <Avatar className='h-20 w-20'>
                <AvatarImage
                  src={user.image || `https://avatar.vercel.sh/${user.email}`}
                  alt={user.name}
                />
                <AvatarFallback className='bg-primary text-primary-foreground text-xl font-semibold'>
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className='text-center'>
                <h3 className='text-lg font-semibold'>{user.name}</h3>
                <p className='text-sm text-muted-foreground'>{user.email}</p>
                {user.phone && (
                  <p className='text-sm text-muted-foreground mt-1'>
                    <Icon icon='ph:phone' className='inline h-4 w-4 mr-1' />
                    {user.phone}
                  </p>
                )}
              </div>
            </div>

            {user.bio && (
              <>
                <Separator />
                <div>
                  <h4 className='text-sm font-medium mb-2'>Bio</h4>
                  <p className='text-sm text-muted-foreground'>{user.bio}</p>
                </div>
              </>
            )}

            <Separator />

            <div className='space-y-2'>
              <Button
                variant='outline'
                className='w-full justify-start'
                onClick={handleLogout}
              >
                <Icon icon='ph:sign-out' className='mr-2 h-4 w-4' />
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <div className='text-center py-8 text-muted-foreground'>
            Failed to load profile
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
