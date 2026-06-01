import { SignupForm } from "@/components/signup-form";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen w-full">
            {/* Right/Image section */}
            <div className="relative hidden lg:flex flex-1 bg-muted min-h-screen">
                <img
                    src="/placeholder.svg"
                    alt="Image"
                    className="absolute inset-0 w-full h-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            {/* Left/Login section */}
            <div className="flex flex-1 flex-col bg-background justify-center items-center px-4 py-8 md:px-10 min-h-screen">
                <div className="w-full max-w-sm flex flex-col gap-8">
                    <SignupForm />
                </div>
            </div>
        </div>
    );
}
