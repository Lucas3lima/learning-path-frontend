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
import { cn } from "@/lib/utils"
import { useSignIn } from "@/pages/_auth/-components/hooks/use-login"
import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { mutate, data, isPending, error } = useSignIn()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    mutate({ email, password })
  }

  return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        {data?.token}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login in to learning path

            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="m@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </Field>
                <Field>
                  <Button disabled={isPending} variant={"metalsa"} type="submit">Continue <ArrowRight/> </Button>
                  {
                    error && (
                      <p className="text-sm text-red-500">
                        {(error as Error).message}
                      </p>
                    )
                  }
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
