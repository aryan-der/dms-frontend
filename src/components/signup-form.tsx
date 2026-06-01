import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { authRoute } from "@/const/route"
import { BsGoogle } from "react-icons/bs"
import useUser from "@/hooks/use-user"
import { useForm } from "react-hook-form"

type RegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { useRegister } = useUser()
  const { mutate: registerUser, isPending } = useRegister()

  const { register, handleSubmit } = useForm<RegisterFormData>()

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            placeholder="John Doe"
            className="rounded-lg"
            {...register("name", { required: true })}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className="rounded-lg"
            {...register("email", { required: true })}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            className="rounded-lg"
            {...register("password", { required: true })}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">
            Confirm Password
          </FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Re-enter password"
            className="rounded-lg"
            {...register("confirmPassword", { required: true })}
          />
        </Field>

        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Account"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <Button variant="outline" type="button">
            <BsGoogle />
            Sign up with Google
          </Button>

          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <Link to={authRoute.login}>Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}