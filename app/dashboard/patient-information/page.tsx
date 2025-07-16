'use client'

import InputField from '@/app/components/InputField'
import SelectField from '@/app/components/SelectField'
import { Pencil } from 'lucide-react'
import { useState } from 'react'

export default function PatientInformation() {
  const [dob, setDob] = useState('')
  const [age, setAge] = useState('')

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

  return (
    <>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-semibold text-gray-800">Patient Information</h2>
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600">
            + New Visit
          </button>
          <button className="border border-gray-400 text-gray-700 text-sm px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1">
            <Pencil className="w-4 h-4 text-black" /> Edit
          </button>
        </div>
      </div>
      <hr className="border-t border-gray-300 mt-1 mb-2 mx-4" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField label="Patient UNQ-ID" placeholder="UHIDYYYYXXXX" />
        <InputField label="First Name" />
        <InputField label="Last Name" />
        <InputField label="Contact Number" placeholder="1234567890" />
        <InputField label="National ID" placeholder="1234567890" />
        <InputField label="Nationality" placeholder="Nationality" />
        <div>
          <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={handleDobChange}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <InputField label="Age" disabled value={age} />
        <SelectField label="Gender" options={['Male', 'Female', 'Other']} />
        <InputField label="Insurance ID" placeholder="Insurance ID" />
        <InputField label="Insurance Provider" placeholder="Blue Cross Blue Shield" />
        <InputField label="Payer" placeholder="National Insurance" />
      </div>
    </>
  )
}