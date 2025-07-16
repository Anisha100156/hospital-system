'use client'

import { useEffect, useState } from 'react'

export default function ReportPage() {
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem('claimFormData')
    if (stored) {
      setFormData(JSON.parse(stored))
    }
  }, [])

  const handlePrint = () => {
    window.print()
  }

  if (!formData) return <p className="p-8 text-gray-500">Loading report...</p>

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 bg-white z-10 flex items-center justify-between px-8 py-4 border-b">
        <h1 className="text-lg font-bold">Medical Claim Form Preview</h1>
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded shadow"
        >
          Print
        </button>
      </header>

      <div className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold">Healthcare Medical Center</h2>
          <p className="text-sm">123 Medical Plaza, Healthcare City, HC 12345</p>
        </div>

        {/* Patient Info */}
        <section className="p-4 mb-4">
          <h3 className="font-semibold mb-2">Patient Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
            <div><strong>Patient ID:</strong> {formData.patientId || '-'}</div>
            <div><strong>DOB:</strong> {formData.dob} (Age: {formData.age})</div>
            <div><strong>Visit ID:</strong> Auto</div>
            <div><strong>Gender:</strong> {formData.gender}</div>
            <div><strong>National ID:</strong> {formData.nationalId}</div>
            <div><strong>Nationality:</strong> {formData.nationality}</div>
            <div><strong>Insurance:</strong> {formData.insuranceProvider}</div>
            <div><strong>Payer:</strong> {formData.payer}</div>
            <div><strong>Contact:</strong> {formData.contactNumber}</div>
            <div><strong>Insurance ID:</strong> {formData.insuranceId}</div>
          </div>
        </section>

        {/* Visit Wise Order */}
        <section className="p-4 mb-4">
          <h3 className="font-semibold mb-2">Visit Wise Order</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><strong>Contact Person:</strong> {formData.contactPerson || '-'}</div>
            <div><strong>Relationship:</strong> {formData.relationship || '-'}</div>
            <div><strong>Contact Number:</strong> {formData.contactNumber || '-'}</div>
            <div><strong>Email:</strong> {formData.email || '-'}</div>
            <div><strong>Language:</strong> {formData.language || '-'}</div>
            <div><strong>Blood Group:</strong> {formData.bloodGroup || '-'}</div>
          </div>
          
        </section>

        {/* Clinical Summary */}
        <section className="p-4 mb-4">
          <h3 className="font-semibold mb-2">Clinical Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><strong>Chief Complaint:</strong> <strong>{formData.chiefComplaint || '-'}</strong></div>
            <div><strong>Duration of Illness/Symptoms:</strong> <strong>{formData.symptomDuration || '-'}</strong></div>
            <div><strong>History of Present Illness:</strong> <strong>{formData.presentIllness || '-'}</strong></div>
          </div>
        </section>

        {/* Vital Signs */}
        <section className="p-4 mb-4">
          <h3 className="font-semibold mb-2">Vital Signs</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div><strong>Height:</strong> 178 cm</div>
            <div><strong>Weight:</strong> 87 kg</div>
            <div><strong>Temp:</strong> 37°C</div>
            <div><strong>BP:</strong> 128/33 mmHg</div>
            <div><strong>PR:</strong> 77 bpm</div>
            <div><strong>RR:</strong> 16/min</div>
            <div><strong>SPO2:</strong> 99%</div>
            <div><strong>Date & Time:</strong></div>
          </div>
        </section>

        {/* Diagnosis */}
        <section className="p-4 mb-4">
          <h3 className="font-semibold mb-2">Diagnosis</h3>
          <div className="text-sm">
            <div><strong>Primary:</strong> i10 - auto from system</div>
            <div><strong>Secondary:</strong> J05 - AUTO</div>
            <div><strong>Secondary:</strong> M15.10 - AUTO DESC</div>
          </div>
        </section>

        {/* Procedures/Services */}
        <section className="p-4 mb-4">
          <h3 className="font-semibold mb-2">Procedures/Services (CPT Code)</h3>
          <table className="table-auto w-full text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-2 py-1 text-left">CPT Code</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Description</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Type</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Qty</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1 font-bold">82025</td>
                <td className="border border-gray-300 px-2 py-1 font-bold">Auto from master</td>
                <td className="border border-gray-300 px-2 py-1 font-bold">Procedure</td>
                <td className="border border-gray-300 px-2 py-1 font-bold">1</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Medications */}
        <section className="p-4 mb-4">
          <h3 className="font-semibold mb-2">Medications</h3>
          <ul className="list-disc list-inside text-sm">
            <li><strong>123456 AUTO - NEED TO WRITE 5 DAYS 3 TIMES</strong></li>
          </ul>
        </section>

        {/* Treatment Plan */}
        <section className="p-4 mb-4">
          <h3 className="font-semibold mb-2">Treatment Plan</h3>
          <ul className="list-disc list-inside text-sm">
            <li><strong>FOLLOW UP AFTER 3 DAYS, TAKE THE LAB AND OTHER REPORTS AND SCHEDULE</strong></li>
          </ul>
        </section>

        {/* Signatures */}
        <section className="p-4">
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <strong>Doctor's Signature & Seal</strong>
              <div className="border-t mt-4"></div>
            </div>
            <div>
              <strong>Patient's Signature</strong>
              <div className="border-t mt-4"></div>
            </div>
          </div>
          <div className="text-center text-sm">
            <strong>Date & Time of Examination:</strong>
            <div className="text-gray-500 text-xs">System Generated Timestamp</div>
          </div>
        </section>
      </div>
    </div>
  )
}
