import { useAuth } from '@/hooks/useAuth'
import { Link } from '@tanstack/react-router'
import { Aperture, MapPin } from 'lucide-react'
import { AvatarDropdown } from './avatar-dropdown'

export function Header() {
  const { user } = useAuth()


  return (
    <header className="bg-background-header border-b border-white/10 font-sans">
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-6">
        
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Aperture className='text-blue-700'/>
          </Link>
          

          <div className="
            hidden sm:flex 
            items-center 
            gap-2 text-sm 
            font-semibold
            text-muted-foreground
            border rounded px-2 py-0.5
          ">
            <MapPin className="h-4 w-4 text-blue-700" />
            {user?.plantName}
          </div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                <Link
                    to="/"
                    activeProps={{
                    className: 'text-blue-700',
                    }}
                    inactiveProps={{
                    className: 'text-muted-foreground hover:text-white',
                    }}
                >
                    Home
                </Link>

                <Link
                    to="/catalog"
                    activeProps={{
                    className: 'text-blue-700',
                    }}
                    inactiveProps={{
                    className: 'text-muted-foreground hover:text-white',
                    }}
                >
                    Journeys
                </Link>

                <Link
                    to="/"
                    activeProps={{
                    className: 'text-blue-700',
                    }}
                    inactiveProps={{
                    className: 'text-muted-foreground hover:text-white',
                    }}
                >
                    Store
                </Link>
            </nav>

        </div>


        <AvatarDropdown />
      </div>
    </header>
  )
}
