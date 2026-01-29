import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useJourneyOverview } from '@/hooks/journeys/useJourneyOverview'
import { createFileRoute } from '@tanstack/react-router'
import { BadgeCheck, BookmarkIcon, BookOpen, ChartNoAxesColumnIncreasing, ClipboardCheck, CommandIcon, ShieldCheck, Target } from 'lucide-react'

export const Route = createFileRoute('/_app/$journey/')({
  component: RouteComponent,
})

function RouteComponent() {
  const levelIconMap = {
    Beginner: '/icons/beginner.svg',
    Intermediate: '/icons/intermediate.svg',
  } as const

  const { journey } = Route.useParams()
  const {data, isLoading, error} = useJourneyOverview(journey)

  if (isLoading) return <div>Carregando...</div>
  if (!data) return null
  if (error) return <div>{error.message}</div>

  return (
    <div className="min-h-[calc(100vh-65px)] bg-background text-white flex justify-center p-4 relative overflow-hidden font-sans selection:bg-blue-500/30">
        {/* Blob azul */}
        <div
            className="absolute z-0
            top-[10%] left-[5%] w-[200px] h-[200px]
            sm:top-[12%] sm:left-[10%] sm:w-[250px] sm:h-[250px]
            md:top-[15%] md:left-[20%] md:w-[320px] md:h-[320px]
            lg:w-[500px] lg:h-[500px]
            bg-blue-700/70 rounded-full blur-[60px] 
            pointer-events-none opacity-60"
        />

        {/* Blob verde */}
        <div
            className="absolute z-0 
            top-[-10%] right-[5%] w-[220px] h-[220px]
            sm:top-[-8%] sm:right-[10%] sm:w-[280px] sm:h-[280px]
            md:top-[-5%] md:right-[20%] md:w-[360px] md:h-[360px]
            lg:w-[500px] lg:h-[500px]
            bg-emerald-400/60 rounded-full blur-[80px] 
            pointer-events-none opacity-60"
        />
        <div className='relative z-10 block max-w-7xl w-full mx-auto'>
            <div className='text-center pt-20 space-y-10'>
                <h1 className='text-5xl font-bold'>{data.title}</h1>
                <p className='text-lg text-muted-foreground'>
                    {data.description}
                </p>
            </div>
            <Card className='bg-background p-4 mt-10 gap-0'>
              <CardHeader className='grid grid-cols-2 items-center gap-4 p-0 sm:grid-cols-3'>
                <div className='hidden sm:block space-y-1 text-sm'>
                  <p className='text-muted-foreground/60'>Sectors</p>
                  <div className='flex'>
                    {data.sectors.map((sector) => (
                      <Badge variant="outline" className='text-muted-foreground flex items-center gap-2 [&>svg]:!size-5 text-sm rounded-sm' >
                        {sector.name}
                        <CommandIcon className='text-blue-700'/>
                      </Badge>

                    ))}

                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-muted-foreground/60 text-sm'>Level</p>
                  <div>
                    <Badge variant="outline" className='text-muted-foreground flex items-center gap-2 [&>svg]:!size-5 text-sm rounded-sm' >
                      {data.level}
                      {data.level in levelIconMap ? (
                      <img
                        src={levelIconMap[data.level as keyof typeof levelIconMap]}
                        alt={data.level}
                        className="size-5"
                      />
                      ) : (
                        <ChartNoAxesColumnIncreasing className="size-5 text-blue-700" />
                      )}
                    </Badge>
                  </div>

                </div>
                <div>
                  <span className='text-muted-foreground/60 text-sm'>Progress</span>
                  <div className='flex justify-end gap-3 items-center'>
                    <Progress value={data.progress} className="h-1" />
                    <p className='text-blue-700 min-w-11'>{data.progress} %</p>
                    
                  </div>

                </div>
              </CardHeader>
              <Card className="bg-background gap-2" >
                <CardHeader>
                  <CardTitle className="text-lg">Contents</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">

                  {
                    data.modules.map((module) => (

                      <ModuleRow
                        index={module.order}
                        title={module.title}
                        lessons={module.totalLessons}
                        exams={module.totalExams}
                        progress={module.progress}
                      />
                    ))
                  }
                </CardContent>
              </Card>

            </Card>

            
        </div>
    </div>

  )
}

function ModuleRow({
  index,
  title,
  lessons,
  exams,
  progress,
}: {
  index: number
  title: string
  lessons: number
  exams: number
  progress: number
}) {
  return (
    <div className="flex items-center gap-4 rounded border border-white/10 bg-zinc-800/40 hover:bg-zinc-800/60 px-4 py-3">
      <span className="w-6 text-sm text-muted-foreground">
        {index}
      </span>

      <div className="flex-1">
        <p className="font-medium">{title}</p>
      </div>

      <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className='text-muted-foreground' >
            <BookOpen data-icon="inline-start" 
              className={progress > 0 ? 'text-blue-600' : ''}
            />
            {lessons} lessons
          </Badge>
          <Badge variant="outline" className='text-muted-foreground'>
            <Target data-icon="inline-start" 
              className={progress > 0 ? 'text-blue-600' : ''}
            />
            {exams} exam
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-center w-32">
        <Progress value={progress} className="h-1.5" />
        <p className="text-[10px] text-muted-foreground text-right">
          {progress}%
        </p>
      </div>
    </div>
  )
}

