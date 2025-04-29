import { ReactNode } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Layout({ children, sidebarOpen, setSidebarOpen }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} />
        <main className="flex-1 overflow-auto p-4 bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}