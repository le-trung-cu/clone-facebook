'use client'

export default function SignUp() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50">
      <section className="max-w-[440px] w-10/12 m-auto py-5 rounded shadow mt-16 shadow-gray-300 bg-white">
        <div className="pl-5 pb-3">
          <h2 className="font-sfpro font-bold text-3xl">Sign Up</h2>
          <p className="font-sfpro text-sm text-gray-600">It's quick and easy.</p>
        </div>
        <hr />
        <form>
          <div className="flex flex-wrap">
            <input className="basis-1/2 sign-up__input" type="text" placeholder="First name" />
            <input className="basis-1/2" type="text" placeholder="Last name" />
            <input className="basis-full" type="text" placeholder="Mobile number or email address" />
            <input className="basis-full" type="password" placeholder="New password" />
          </div>
          <fieldset>
            <legend>Date of birth</legend>
            <div>
              <select>
                <option>12</option>
              </select>
              <select>
                <option>12</option>
              </select>
              <select>
                <option>12</option>
              </select>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  )
}