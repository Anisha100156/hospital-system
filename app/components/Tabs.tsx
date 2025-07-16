'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { name: 'Patient Information', path: '/dashboard/patient-information' },
  { name: 'Visit Details', path: '/dashboard/visit-details' },
  { name: 'Vitals', path: '/dashboard/vitals' },
 
  { name: 'Clinical Notes', path: '/dashboard/clinical-notes' },
  { name: 'Orders', path: '/dashboard/orders' },
]

export default function Tabs() {
  const pathname = usePathname()

  return (
    <div className="flex border-b border-gray-200">
      {tabs.map(tab => (
        <Link key={tab.name} href={tab.path}>
          <div
            className={`px-6 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer ${
              pathname === tab.path
                ? 'bg-blue-600 text-white'
                : 'bg-white hover:bg-gray-200 text-gray-700'
            }`}
          >
            {tab.name}
          </div>
        </Link>
      ))}
    </div>
  )
}
