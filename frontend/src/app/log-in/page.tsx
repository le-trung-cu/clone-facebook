import Link from 'next/link'
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'

export default function Login() {
  return (
    <div>
      <div className="login min-h-screen flex flex-col  pt-5 bg-[#f0f2f5]">
        <div className="flex-grow flex flex-col items-center px-10 md:flex-row">
          <header className="max-w-[400px] w-fulltext-center md:mr-5">
            <img className="h-[106px] m-auto" src="/facebook.svg" alt="" height={106} width="auto" />
            <p className="text-2xl tracking-wide mb-5 font-sfpro">Facebook helps you connect and share with the people in your life.</p>
          </header>
          <main className="max-w-[400px] w-full">
            <div className=" p-4 rounded-xl bg-white text-center shadow">
              <LoginForm />
              <Link className="inline-block text-blue-500 text-sm font-normal mt-5" href="/reset">Forgotten password?</Link>
              <hr className="mt-5" />
              <button type="button" className="mt-8 mb-4 bg-[#42b72a] text-white w-9/12 px-3 py-2 rounded-lg font-semibold leading-loose">Create Account</button>
            </div>
            <div className="text-center">
              <Link className="inline-block my-5 font-light text-sm" href="" ><span className="font-bold">Create a Page</span> for a celebrity, brand or business.</Link>
            </div>
          </main>
        </div>
        <footer>
          <p>footer</p>
        </footer>
      </div>
      <SignUp />
    </div>
  )
}