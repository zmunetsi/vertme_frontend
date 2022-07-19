import { useState, useEffect  } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import PageLayout from '../components/page-layout'
import AuthService from '../services/auth'
import { Button } from 'primereact/button'


export default function Dashboard( props ) {
  const router = useRouter()
  const [firstname, setFirstname] = useState('')

  const authService = new AuthService()

  useEffect(() => {
    setFirstname(props.user.name)
  }, [])

  const handleLogout = () => {
    authService.logout()
    router.push('/')
  }

  return (
    <>
    <div>
      <h1>Welcome, { firstname }</h1>
      <p>This is the Dashboard</p>
    </div>
    <Button label="Logout" type="button" className="p-button-outlined" onClick={handleLogout} />
    </>
  )
}

Dashboard.getLayout = function getLayout(page) {
  return ( 
    <Layout title="Dashboard">
      <PageLayout>{page}</PageLayout>
    </Layout>
  )
}

export const getServerSideProps = ({ req, res }) => {
  
  let user = null;
  let isAuthenticated = false;

  if( req.cookies.user && req.cookies.authenticated === 'true') {

    isAuthenticated = true;
    user = JSON.parse(req.cookies.user);
  }else{
    res.writeHead(302, {
      Location: '/'
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

