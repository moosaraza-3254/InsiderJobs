import React from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link,useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const navigate=useNavigate()

  const { openSignIn } = useClerk()
  const { user, isSignedIn, isLoaded } = useUser()

  // Prevent rendering before Clerk loads
  if (!isLoaded) return null

  return (
    <div className='shadow py-4'>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
        <img onClick={()=> navigate('/')} className='cursor-pointer' src={assets.logo} alt='' />
        {isSignedIn ? (
          <div className='flex items-center gap-3'>
            <Link to='/applications'>Applied Jobs</Link>
            <p>|</p>
            <p className='max-sm:hidden'>
              Hi, {user.firstName} {user.lastName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className='flex gap-4 max-sm:text-xs'>
            <button className='text-gray-600'>Recruiter Login</button>
            <button
              onClick={() => openSignIn()}
              className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
