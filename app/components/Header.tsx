'use client'

import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  const handlePreview = () => {
    router.push('/report')
  }

  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">EHR System - Medical Claim Form</h1>
        <p className="text-sm">Healthcare Medical Center - 123 Medical Plaza</p>
      </div>
      <div className="space-x-3">
        <button className="bg-yellow-400 text-white px-4 py-2 rounded">Logo</button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handlePreview}
        >
          Preview
        </button>
        <button className="bg-[#008BDC] text-white px-4 py-2 rounded hover:bg-blue-700">
          Save
        </button>
      </div>
    </header>
  )
}
