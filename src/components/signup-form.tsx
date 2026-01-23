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
import { useGetPlants } from "@/hooks/auth/useGetPlants"
import { useSignUp } from "@/hooks/auth/useSignUp"
import { signUpSchema, type SignUpSchema } from '@/schemas/sign-up-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import { Controller, useForm } from 'react-hook-form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { useEffect } from 'react'
import { toast } from "sonner"


export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate, isPending, error } = useSignUp()

  useEffect(() => {
  if (error) {
    toast.error((error as Error).message,{ position: "top-center" })
  }
}, [error])


  const {data: plants} = useGetPlants()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = (data: SignUpSchema) => {
    mutate({
      name: data.name,
      email: data.email,
      password: data.password,
      registration_number: data.registrationNumber,
      role: 'user',
      plant_id: data.plantId,
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe"
                  {... register('name')}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}

              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  {... register('email')}
                  placeholder="m@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input 
                      id="password" 
                      type="password" 
                      {... register('password')}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      {... register('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
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
                  {... register('registrationNumber')}
                />
                {errors.registrationNumber && (
                  <p className="text-sm text-red-500">
                    {errors.registrationNumber.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="plant">Plant</FieldLabel>
                <Controller
                  control={control}
                  name="plantId"
                  render={({ field }) => (

                  <Select value={field.value} onValueChange={field.onChange}>
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

                  )}
                >
                </Controller>
                {errors.plantId && (
                  <p className="text-sm text-red-500">
                    {errors.plantId.message}
                  </p>
                )}
              </Field>
                <Button variant="metalsa" type="submit" disabled={isPending}>
                  {isPending ? 'Creating account...' : 'Create Account'}
                  {!isPending && <ArrowRight />}
                </Button>
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
