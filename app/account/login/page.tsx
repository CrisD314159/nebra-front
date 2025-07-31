import DarkVeil from "@/components/Background/DarkVeil";
import LoginForm from "@/components/Login/LoginForm";
import GoogleIcon from "@/public/GoogleIcon";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";




export default function Home() {
  const googleAuthEndpoint = process.env.NEXT_GOOGLE_END ?? '#'
  return (
      <div className="flex w-full h-full flex-col justify-center relative">
        <DarkVeil/>
        <div className="w-full absolute px-7">

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              alt="Nebra logo"
              src="/nebra-transparent.png"
              width={100}
              height={100}
              className="mx-auto w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">

            <LoginForm/>
                          <div className="mx-auto mt-3">
                  <Link href={googleAuthEndpoint ?? "#"} className="mx-auto w-full">
                    <button className="btn btn-outline btn-primary w-full">
                      <GoogleIcon/>
                      Sign in with Google
                    </button>
                  </Link>
                </div>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Do not have an account?{' '}
              <Link href="/account/signup" className="font-semibold  hover:text-indigo-500 text-indigo-700">
                Sign up here
              </Link>
            </p>
            <p className="flex flex-col items-center mt-5 gap-3">
              <Link href={"https://github.com/CrisD314159/nebra-front"}>
                <Github width={30} height={30} style={{color:'white', stroke:'#FFFFFF'}}/>
              </Link>
              <Link href={"https://crisdev-pi.vercel.app/"} className="font-semibold  hover:text-indigo-500 text-indigo-700">
                {"Creator's Page"}
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
}
