import { SignupForm } from '@/components/signup-form'
import { createFileRoute } from '@tanstack/react-router'
import { GalleryVerticalEnd } from 'lucide-react'

export const Route = createFileRoute('/_auth/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium text-blue-500">
          <div className="bg-blue-500  text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Metalsa
        </a>
        <SignupForm />
      </div>
    </div>
  )
}
