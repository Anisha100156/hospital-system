'use client'
import InputField from '@/app/components/InputField'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Vitals() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    height: '',
    weight: '',
    temperature: '',
    spo2: '',
    bloodPressure: '',
    pulseRate: '',
    respiratoryRate: ''
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSendToDoctor = () => {
    // ✅ Save the vitals data to localStorage
    localStorage.setItem('vitalsData', JSON.stringify(formData))
    
    // ✅ Navigate to tabular record page
    router.push('/dashboard/tabular-record')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Vital Signs</h2>
      <hr className="border-t border-gray-300 mb-4 mx-3 md:mx-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Date"
          type="date"
          value={formData.date}
          onChange={e => handleChange('date', e.target.value)}
          placeholder="Select date"
        />
        <InputField
          label="Time"
          type="time"
          value={formData.time}
          onChange={e => handleChange('time', e.target.value)}
          placeholder="Select time"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <InputField
          label="Height (cm)"
          value={formData.height}
          onChange={e => handleChange('height', e.target.value)}
          placeholder="178"
        />
        <InputField
          label="Weight (kg)"
          value={formData.weight}
          onChange={e => handleChange('weight', e.target.value)}
          placeholder="84"
        />
        <InputField
          label="Temperature (°C)"
          value={formData.temperature}
          onChange={e => handleChange('temperature', e.target.value)}
          placeholder="37.0"
        />
        <InputField
          label="SPO2 (%)"
          value={formData.spo2}
          onChange={e => handleChange('spo2', e.target.value)}
          placeholder="98"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end">
        <InputField
          label="Blood Pressure (mmHg)"
          value={formData.bloodPressure}
          onChange={e => handleChange('bloodPressure', e.target.value)}
          placeholder="130/85"
        />
        <InputField
          label="Pulse Rate (bpm)"
          value={formData.pulseRate}
          onChange={e => handleChange('pulseRate', e.target.value)}
          placeholder="78"
        />
        <InputField
          label="Respiratory Rate (/min)"
          value={formData.respiratoryRate}
          onChange={e => handleChange('respiratoryRate', e.target.value)}
          placeholder="16"
        />
        <div className="mt-1 col-span-1 md:col-span-1">
          <button
            className="w-full bg-blue-600 text-white px-10 py-3 rounded hover:bg-blue-700"
            onClick={handleSendToDoctor}
          >
            Send to Doctors
          </button>
        </div>
      </div>
    </div>
  )
}
