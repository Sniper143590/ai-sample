
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider"
import Field from "@/components/Field";
import Notify from "@/components/Notify";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { validation } from "../validation";
type CreateAccountProps = {};

const CreateAccount = ({}: CreateAccountProps) => {
    const router = useRouter()
    const { register, userEmail, setUserEmail, userPassword, setUserPassword } = useAuth()
    const handleSubmit = async () => {
        const { error } = await validation.validate({
            userEmail: userEmail,
            userPass: userPassword,
        });
        if (error) {
            console.error(error);
            toast.error((t) => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 text-center"><p className="ml-4">{error.message}</p></div>
                </Notify>
              ));
            return;
        }
        const registerResult = await register()
        if(registerResult){
            router.push("/")
        } else {
            toast.error((t) => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 text-center"><p className="ml-4">Email already registered!</p></div>
                </Notify>
              ));
              return
        }
    }
    return (
        <>
            <Field
                className="mb-4"
                classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                placeholder="Email"
                icon="email"
                type="email"
                value={userEmail}
                onChange={(e: any) => setUserEmail(e.target.value)}
                required
            />
            <Field
                className="mb-6"
                classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                placeholder="Password"
                icon="lock"
                type="password"
                value={userPassword}
                onChange={(e: any) => setUserPassword(e.target.value)}
                required
            />
            <button className="btn-blue btn-large w-full mb-6" type="button" onClick={handleSubmit}>
                Create Account
            </button>
            <div className="text-center caption1 text-n-4">
                By creating an account, you agree to our{" "}
                <Link
                    className="text-n-5 transition-colors hover:text-n-7 dark:text-n-3 dark:hover:text-n-1"
                    href="/"
                >
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                    className="text-n-5 transition-colors hover:text-n-7 dark:text-n-3 dark:hover:text-n-1"
                    href="/"
                >
                    Privacy & Cookie Statement
                </Link>
                .
            </div>
        </>
    );
};

export default CreateAccount;
