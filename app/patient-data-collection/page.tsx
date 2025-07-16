'use client'

import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'

const tabs = [
  'Patient Information',
  'Visit Details',
  'Vitals',
  'Clinical Notes',
  'Visit Wise Order & Orders',
]

export default function ClinicalDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Patient Information')
  const [dob, setDob] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [formData, setFormData] = useState<any>({})

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value
    setDob(selectedDate)

    if (selectedDate) {
      const birthDate = new Date(selectedDate)
      const today = new Date()
      let calculatedAge = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--
      }
      setAge(calculatedAge.toString())
    } else {
      setAge('')
    }
  }

  const handlePreview = () => {
    const allData = {
      ...formData,
      dob,
      age,
    }
    localStorage.setItem('previewData', JSON.stringify(allData))
    router.push('/report')
  }

  const updateForm = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">EHR System - Medical Claim Form</h1>
          <p className="text-sm">
            Healthcare Medical Center - 123 Medical Plaza, Healthcare City, HC 12345
          </p>
        </div>
        <div className="space-x-3">
          <button className="bg-yellow-400 text-white px-4 py-2 rounded">Logo</button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handlePreview}
          >
            Preview Form
          </button>
          <button className="bg-[#008BDC] text-white px-4 py-2 rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="mt-8 mx-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-gray-200 text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'Patient Information' && (
            <>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-semibold text-gray-800">Patient Information</h2>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600">
                    + New Visit
                  </button>
                  <button className="border border-gray-400 text-gray-700 text-sm px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1">
                    <Pencil className="w-4 h-4 text-black" />
                    Edit
                  </button>
                </div>
              </div>
              <hr className="border-t border-gray-300 mt-1 mb-2 mx-3 md:mx-4" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField label="Patient UNQ-ID" onChange={updateForm} />
                <InputField label="First Name" onChange={updateForm} />
                <InputField label="Last Name" onChange={updateForm} />
                <InputField label="Contact Number" onChange={updateForm} />
                <InputField label="National ID" onChange={updateForm} />
                <InputField label="Nationality" onChange={updateForm} />
                <div>
                  <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={handleDobChange}
                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <InputField label="Age" value={age} disabled placeholder="-" />
                <SelectField label="Gender" options={['Male', 'Female', 'Other']} onChange={updateForm} />
                <InputField label="Insurance ID" onChange={updateForm} />
                <InputField label="Insurance Provider" onChange={updateForm} />
                <InputField label="Payer" onChange={updateForm} />
              </div>
            </>
          )}

          {activeTab === 'Visit Details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Visit Date" type="date" onChange={updateForm} />
              <InputField label="Visit Reason" onChange={updateForm} />
              <InputField label="Referring Doctor" onChange={updateForm} />
              <InputField label="Visit Type" onChange={updateForm} />
            </div>
          )}

          {activeTab === 'Vitals' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Blood Pressure" onChange={updateForm} />
              <InputField label="Pulse" onChange={updateForm} />
              <InputField label="Temperature" onChange={updateForm} />
              <InputField label="Weight" onChange={updateForm} />
              <InputField label="Height" onChange={updateForm} />
              <InputField label="Respiratory Rate" onChange={updateForm} />
            </div>
          )}

          {activeTab === 'Clinical Notes' && (
            <textarea
              className="w-full border border-gray-300 rounded px-4 py-2 h-32 resize-none"
              placeholder="Write clinical notes here..."
              onChange={(e) => updateForm('Clinical Notes', e.target.value)}
            />
          )}

          {activeTab === 'Visit Wise Order & Orders' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Lab Test Order" onChange={updateForm} />
              <InputField label="Radiology Order" onChange={updateForm} />
              <InputField label="Medication Order" onChange={updateForm} />
              <InputField label="Specialist Referral" onChange={updateForm} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Reusable Input Field
function InputField({ label, type = 'text', placeholder = '', value, readOnly, disabled, onChange }: any) {
  const inputBgClass = disabled ? 'bg-gray-100' : 'bg-white'
  return (
    <div>
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <input
        type={type}
        placeholder={placeholder || `Enter ${label}`}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        className={`mt-1 w-full border border-gray-300 rounded px-3 py-2 text-gray-700 placeholder:font-normal ${inputBgClass}`}
        onChange={(e) => onChange && onChange(label, e.target.value)}
      />
    </div>
  )
}

function SelectField({ label, options, onChange }: any) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <select
        className="mt-1 w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-700"
        onChange={(e) => onChange && onChange(label, e.target.value)}
      >
        <option value="">Select {label}</option>
        {options.map((opt: string) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}
