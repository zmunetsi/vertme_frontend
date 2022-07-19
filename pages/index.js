import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../components/layout'
import HomeLayout from '../components/home-layout'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import AuthService from '../services/auth'

export default function Home(props) {

  const router = useRouter()

  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(props.isAuthenticated)
    if (isAuthenticated) {
      router.push('/dashboard')
    }

  }, [])


  const handleSignupDialog = () => {
    setShowSignupDialog(true)
  }

  const handleLoginDialog = () => {
    setShowLoginDialog(true)
  }

  const handleHideSignupDialog = () => {
    setShowSignupDialog(false)
  }

  const handleHideLoginDialog = () => {
    setShowLoginDialog(false)
  }


  return (
    <div className="grid grid-nogutter surface-0 text-800">
      <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
        <section>
          <span className="block text-6xl font-bold mb-1">Introvert or Extrovert</span>
          <div className="text-6xl text-primary font-bold mb-3">Find out more about your personality</div>
          <p className="mt-0 mb-4 text-700 line-height-3">These are simulated assessment designed by professionals. </p>

          <Button label="Sign up" type="button" className="mr-3 p-button-raised" onClick={handleSignupDialog} />
          <Button label="Login" type="button" className="p-button-outlined" onClick={handleLoginDialog} />
          <Dialog className="lg:w-4" visible={showSignupDialog} modal onHide={handleHideSignupDialog}>
            {/* signup form */}
            <SignupForm />
          </Dialog>

          <Dialog className="lg:w-4" visible={showLoginDialog} modal onHide={handleHideLoginDialog}>
            {/* login form */}
            <LoginForm />

          </Dialog>
        </section>
      </div>
      <div className="col-12 md:col-6 overflow-hidden">
        <img src="assets/images/hero-1.png" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout title="Home">
      <HomeLayout>{page}</HomeLayout>
    </Layout>
  )
}

const SignupForm = () => {

  const authService = new AuthService();
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');

  const handleSignupForm = (e) => {
    e.preventDefault()
    authService.register(name, email, password, c_password)
  }


  return (

    <div className="flex align-items-center justify-content-center">
      <form id="signup-form" className="w-full" onSubmit={handleSignupForm}>
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span className="text-600 font-medium line-height-3">Don't have an account?</span>
          <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
        </div>

        <div>
          <label htmlFor="name" className="block text-900 font-medium mb-2">Name</label>
          <InputText
            id="name"
            name="name"
            type="text"
            className="w-full mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
          <InputText
            id="email"
            name="email"
            type="text"
            className="w-full mb-3"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
          <InputText
            id="password"
            name="password"
            type="password"
            className="w-full mb-3"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <label htmlFor="c_password" className="block text-900 font-medium mb-2">Confirm Password</label>
          <InputText
            id="c_password"
            name="c_password"
            type="password"
            className="w-full mb-3"
            value={c_password}
            onChange={e => setC_password(e.target.value)}
          />

          <div className="flex align-items-center justify-content-between mb-6">
            <div className="flex align-items-center">
              <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
              <label htmlFor="rememberme">Remember me</label>
            </div>
            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
          </div>

          <Button label="Sign Up" icon="pi pi-user" className="w-full" />
        </div>
      </form>
    </div>

  )
}

const LoginForm = (props) => {

  const authService = new AuthService();
  const router = useRouter()

  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(props.isAuthenticated)
    if (isAuthenticated) {
      router.push('/dashboard')
    }

  }, [])


  const handleLoginForm = (e) => {
    e.preventDefault()
    authService.login(email, password).then(Response => {
      if (Response) {
        if (Response.token !== null) {
          setError('')
          router.push('/dashboard');
        } else {
          setError('Invalid email or password')
        }

      } else {
        alert('Server Error, Please try again later')
        setError('Server Error')
      }
    }

    )
  }

  return (

    <div className="flex align-items-center justify-content-center">
      <form id="login-form" className="w-full" onSubmit={handleLoginForm}>
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span className="text-600 font-medium line-height-3">Don't have an account?</span>
          <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
        </div>

        <div>


          <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
          <InputText
            id="email"
            name="email"
            type="text"
            className="w-full mb-3"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
          <InputText
            id="password"
            name="password"
            type="password"
            className="w-full mb-3"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <div className="flex align-items-center justify-content-between mb-6">
            <div className="flex align-items-center">
              <Checkbox id="rememberme" name="remember" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
              <label htmlFor="rememberme">Remember me</label>
            </div>
            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
          </div>

          <Button label="Sign In" icon="pi pi-user" className="w-full" />
        </div>
      </form>
    </div>

  )
}


export const getServerSideProps = ({ req, res }) => {


  let user = null;
  let isAuthenticated = false;

  if (req.cookies.user && req.cookies.authenticated === 'true') {
    isAuthenticated = true;
    user = JSON.parse(req.cookies.user);

    res.writeHead(302, {
      Location: '/dashboard'
    })
    res.end()

  }
  return {
    props: {
      user,
      isAuthenticated
    }
  }
}

