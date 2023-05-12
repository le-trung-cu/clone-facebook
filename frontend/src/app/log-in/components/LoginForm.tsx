'use client'
import { Formik } from 'formik'
import * as yup from 'yup'

export default function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={yup.object({
        email: yup.string()
          .required('Required')
          .email('Invalid email address')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <input data-test="email" className="border border-gray-300 rounded-lg p-2 w-full leading-loose focus:outline-none focus:border-blue-600"
              type="email"
              name="email"
              placeholder="Email address or phone number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email} />
          </div>
          <div>
            <input className="border border-gray-300 rounded-lg p-2 w-full leading-loose focus:outline-none focus:border-blue-600"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password} />
            {errors.email && <div className="text-red-500 my-1 text-right">{errors.password}</div>}
          </div>

          <button type="submit" className="bg-blue-600 w-full text-white font-bold p-3 text-center text-xl rounded-lg disabled:bg-opacity-50" disabled={isSubmitting}>Log In</button>
        </form>
      )}

    </Formik>
  )
}