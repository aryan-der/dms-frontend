import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import useAuth from "@/hooks/use-auth"
import { authRoute } from "@/const/route"
import { Link } from "react-router-dom"
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const { useLogin } = useAuth()
  const { mutate, isPending } = useLogin()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate({
      email: form.email,
      password: form.password
    })
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Emaill</FieldLabel>
          <Input
            id="email"
            // type="email"
            placeholder="m@example.com"
            required
            value={form.email}
            onChange={handleInputChange}
            className="rounded-lg"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              tabIndex={-1}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={form.password}
            placeholder="enter password"
            onChange={handleInputChange}
            className="rounded-lg"
          />
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>{isPending ? "Logging in..." : "Login"}</Button>
        </Field>
        <FieldDescription className="px-6 text-center">
          Don't have an account? <Link to={authRoute.register}>Register</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
