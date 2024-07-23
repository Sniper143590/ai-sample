import { useAuth } from "@/providers/AuthProvider"
import Field from "@/components/Field"
import { useRouter } from "next/navigation"
import { validation } from "../validation"
import { useState } from "react"

type SignInProps = {
    onClick: () => void;
};

const SignIn = ({ onClick }: SignInProps) => {
    const router = useRouter()
    const {  login,  userEmail, setUserEmail, userPassword, setUserPassword } = useAuth()
    const [error, setError] = useState<string | null>(null)
    const handleSubmit = async () => {
        try {
            const { error } = await validation.validate({
                userEmail: userEmail,
                userPass: userPassword,
            });
            if (error) {
                setError(error.message)
                return
            }
            const loginResult = await login()
            if (loginResult) {
                router.push("/admin")
            } else {
                setError("Wrong credential!")
            }
        } catch (error) {
            setError("Something went wrong. Try later!")
        }
    }
    return (
        <>
            <Field
                className="mb-4"
                classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                placeholder="Username or email"
                icon="email"
                value={userEmail}
                onChange={(e: any) => setUserEmail(e.target.value)}
                required
            />
            <Field
                className="mb-2"
                classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                placeholder="Password"
                icon="lock"
                type="password"
                value={userPassword}
                onChange={(e: any) => setUserPassword(e.target.value)}
                required
            />
            {error && (
                <div className="text-red-500 mb-4 font-inter">
                    {error}
                </div>
            )}
            <button
                className="mb-6 base2 text-primary-1 transition-colors hover:text-primary-1/90"
                type="button"
                onClick={onClick}
                >
                Forgot password?
            </button>
            
            <button className="btn-blue btn-large w-full" type="button" onClick={handleSubmit}>
                Sign in
            </button>
        </>
    );
};

export default SignIn;
