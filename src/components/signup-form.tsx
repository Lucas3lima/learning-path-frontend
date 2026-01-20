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
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useSignUp } from "@/pages/_auth/-components/hooks/useSignUp"
import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { useGetPlants } from "@/pages/_auth/-components/hooks/useGetPlants"
import { ArrowRight } from "lucide-react"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { mutate, data, isPending, error } = useSignUp()

  const {data: plants} = useGetPlants()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [plantId, setPlantId] = useState("")

  function handleSubmit(e: React.FormEvent){
    e.preventDefault()

    mutate({
      name,
      email,
      password,
      registration_number: registrationNumber,
      role: 'user',
      plant_id: plantId
    })
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required 
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 4 characters long.
                </FieldDescription>
              </Field>
              <Field>
              <Field>
                <FieldLabel htmlFor="registration_number">Registration Number</FieldLabel>
                <Input 
                  id="registration_number" 
                  type="text" 
                  placeholder="000" 
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  required 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="plant">Plant</FieldLabel>
                <Select value={plantId} onValueChange={setPlantId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Plants</SelectLabel>

                      {
                        plants?.plants.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        ))
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
                <Button variant="metalsa" type="submit" disabled={isPending}>
                  {isPending ? 'Creating account...' : 'Create Account'}
                  {!isPending && <ArrowRight />}
                </Button>

                {
                  error && (
                    <p className="text-sm text-red-500">
                      {(error as Error).message}
                    </p>
                  )
                }
                <FieldDescription className="text-center">
                  Already have an account? <Link to="/sign-in">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

    </div>
  )
}
