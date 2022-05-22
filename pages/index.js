import Layout from '../components/layout'
import HomeLayout from '../components/home-layout'

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>This is the home page.</p>
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