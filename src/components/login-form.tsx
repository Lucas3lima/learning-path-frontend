import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useSignIn } from "@/hooks/auth/useSignIn"
import { cn } from "@/lib/utils"
import { signInSchema, type SignInSchema } from "@/schemas/sign-in-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { mutate, isPending, error, isSuccess  } = useSignIn()
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message, { position: 'top-center'})
    } 
    
    if(isSuccess){
      navigate({to: '/'})
    }
    
  }, [error,  isSuccess, navigate])



  const {
    register,
    handleSubmit,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = (data: SignInSchema) => {
    mutate({
      email: data.email,
      password: data.password
    })
  }

  return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          {isSuccess}
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login in to learning path

            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {... register('email')}
                  />
                  
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    {... register('password')}
                  />
                  

                </Field>
                <Field>
                  <Button disabled={isPending} variant={"metalsa"} type="submit">Continue <ArrowRight/> </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account? <Link to="/sign-up"> Sign up </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

      </div>
  )
}
