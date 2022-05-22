import Layout from '../components/layout'
import PageLayout from '../components/page-layout'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the Dashboard</p>
    </div>
  )
}

Dashboard.getLayout = function getLayout(page) {
  return (
    <Layout title="Dashboard">
      <PageLayout>{page}</PageLayout>
    </Layout>
  )
}