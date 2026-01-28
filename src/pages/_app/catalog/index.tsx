import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useGetJourneys } from '@/hooks/auth/useGetPlants'
import { createFileRoute } from '@tanstack/react-router'
import { Brain, ChartNoAxesColumn, ChartNoAxesColumnDecreasing, ChartNoAxesColumnIncreasing, LucideClockFading, Search } from 'lucide-react'

export const Route = createFileRoute('/_app/catalog/')({
  component: RouteComponent,
})

function RouteComponent() {
  const levelIconMap = {
    Beginner: '/icons/beginner.svg',
    Intermediate: '/icons/intermediate.svg',
  } as const


  const { data, isLoading, error } = useGetJourneys()
  if (isLoading) return <LucideClockFading />

  if (error) return <p>{error.message}</p>

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-center">Find your Journey</h1>
        <p className="text-center text-muted-foreground mt-2">
          Learning paths designed to develop skills, track progress, and support professional growth.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
          {/* Filters */}
          <aside className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Filter Paths</h3>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-8 bg-background border-white/10"
                />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Sectors</h4>
              <div className="space-y-2">
                {['Quality', 'Production', 'T.I'].map((sector) => (
                  <label key={sector} className="flex items-center gap-2 text-sm">
                    <Checkbox /> {sector}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            { data ?
            data.map((journey) => (
              <Card
                key={journey.id}
                className="bg-background rounded border border-white/10 hover:border-blue-600 transition pb-0"
              >
                <CardHeader className="space-y-1 flex justify-between items-center">
                  <Brain className='w-7 h-7 text-blue-700' />
                  <Badge
                    variant="secondary"
                    className='dark:bg-zinc-900 bg-zinc-100 text-blue-600'
                  >
                    {
                      String(journey.completed) === 'true'
                        ? <p>completed</p>
                        : journey.progress > 0
                        ? <p>in progress</p>
                        : <p>didn't start</p>
                    }
                  </Badge>
                </CardHeader>

                <CardContent className='flex-1'>
                  <div className='mb-5'>
                    <CardTitle className="text-base">{journey.title}</CardTitle>
                    <CardDescription className='text-muted-foreground/50'>
                      {journey.description}
                    </CardDescription>
                  </div>

                  <div className='flex gap-2 items-center'>
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-zinc-900 text-blue-700 text-xs">
                      {journey.responsible.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <span className="text-sm text-muted-foreground/50">{journey.responsible.name}</span>
                  </div>
                </CardContent>
                <div className='mx-4'>
                  <Separator />
                </div>
                <CardFooter className="px-0 gap-2 block">
                  <div className='flex justify-between px-6 pb-3 text-sm text-muted-foreground/50 w-full'>
                    <p>Training - {journey.totalHours}h</p>
                    {journey.level in levelIconMap ? (
                    <img
                      src={levelIconMap[journey.level as keyof typeof levelIconMap]}
                      alt={journey.level}
                      className="size-5"
                    />
                  ) : (
                    <ChartNoAxesColumnIncreasing className="size-5 text-blue-700" />
                  )}

                  </div>
                  <Progress value={journey.progress} className="h-1" />
                </CardFooter>
              </Card>
            ))
            : <p></p>
            }
          </section>
        </div>
      </div>
    </div>
  )
}
