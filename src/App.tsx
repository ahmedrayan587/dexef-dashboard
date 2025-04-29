import { useState } from 'react'
import Layout from './components/Layout'
import DataGrid from './components/DataGrid'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <DataGrid />
    </Layout>
  )
}