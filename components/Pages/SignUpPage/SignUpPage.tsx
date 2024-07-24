import Image from "@/components/Image"
import AuthForm from "./AuthForm"

const SignUpPage = () => {

  return (
    <div className="relative flex min-h-screen min-h-screen-ios lg:p-6 md:px-6 md:pt-16 md:pb-10">
            <div className="relative shrink-0 w-[40rem] p-20 overflow-hidden 2xl:w-[37.5rem] xl:w-[30rem] xl:p-10 lg:hidden">
                <div className="max-w-[25.4rem]">
                    <div className="mb-4 h2 text-n-1">
                        Unlock the power of AI
                    </div>
                    <div className="body1 text-n-3">
                        Chat with the smartest AI - Experience the power of AI
                        with us
                    </div>
                </div>
                <div className="absolute top-52 left-5 right-5 h-[50rem] xl:top-24">
                    <Image
                        className="object-contain"
                        src="/images/create-pic.png"
                        fill
                        sizes="(max-width: 1180px) 50vw, 33vw"
                        alt="Create Picture"
                    />
                </div>
            </div>
            <div className="flex grow my-6 mr-6 p-10 bg-n-1 rounded-[1.25rem] lg:m-0 md:p-0 dark:bg-n-6">
                <AuthForm />
            </div>
        </div>
  )
}

export default SignUpPage
