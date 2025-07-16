
import Header from '../components/Header'
import Tabs from '../components/Tabs'


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      <Header />
      <div className="mt-8 mx-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <Tabs />
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}