'use client'

import { useState } from 'react'

export default function ClinicalRecords() {
  const [chiefComplaint, setChiefComplaint] = useState('')
  const [durationOfIllness, setDurationOfIllness] = useState('')
  const [historyOfIllness, setHistoryOfIllness] = useState('')

  const [primaryDiagnosis, setPrimaryDiagnosis] = useState({ code: '', description: '' })
  const [secondaryDiagnosis, setSecondaryDiagnosis] = useState({ code: '', description: '' })
  const [diagnoses, setDiagnoses] = useState([])

  const [cpt, setCpt] = useState({ code: '', description: '', type: 'Procedure', qty: 1 })
  const [procedures, setProcedures] = useState([])

  const [medication, setMedication] = useState({ name: '', dosage: '', frequency: '' })
  const [medications, setMedications] = useState([])
  const [treatmentPlan, setTreatmentPlan] = useState('')
  const [referredTo, setReferredTo] = useState('')
  const [referralReason, setReferralReason] = useState('')

  const [doctorName, setDoctorName] = useState('')
  const [doctorConsent, setDoctorConsent] = useState(false)

  const handleAddDiagnosis = () => {
    if (secondaryDiagnosis.code && secondaryDiagnosis.description) {
      setDiagnoses([...diagnoses, secondaryDiagnosis])
      setSecondaryDiagnosis({ code: '', description: '' })
    }
  }

  const handleRemoveDiagnosis = index => {
    setDiagnoses(diagnoses.filter((_, i) => i !== index))
  }

  const handleAddProcedure = () => {
    if (cpt.code && cpt.description) {
      setProcedures([...procedures, cpt])
      setCpt({ code: '', description: '', type: 'Procedure', qty: 1 })
    }
  }

  const handleRemoveProcedure = index => {
    setProcedures(procedures.filter((_, i) => i !== index))
  }

  const handleAddMedication = () => {
    if (medication.name && medication.dosage && medication.frequency) {
      setMedications([...medications, medication])
      setMedication({ name: '', dosage: '', frequency: '' })
    }
  }

  const handleRemoveMedication = index => {
    setMedications(medications.filter((_, i) => i !== index))
  }

  const handleSaveFormData = () => {
    const data = {
      chiefComplaint,
      durationOfIllness,
      historyOfIllness,
      primaryDiagnosis,
      diagnoses,
      procedures,
      medications,
      treatmentPlan,
      referredTo,
      referralReason,
      doctorName,
      doctorConsent,
    }

    try {
      localStorage.setItem('clinicalData', JSON.stringify(data))
      alert('Form data saved successfully!')
    } catch (err) {
      console.error('Failed to save form data:', err)
    }
  }

  return (
    <div className="p-6 space-y-6">

      <div>
        <h2 className="text-lg font-semibold mb-2">Clinical Summary</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Chief Complaint</label>
          <textarea
            value={chiefComplaint}
            onChange={e => setChiefComplaint(e.target.value)}
            className="border px-3 py-2 rounded w-full"
            placeholder="Fever, back pain, low back pain, etc."
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Duration of Illness/Symptoms</label>
          <input
            type="text"
            value={durationOfIllness}
            onChange={e => setDurationOfIllness(e.target.value)}
            className="border px-3 py-2 rounded w-full"
            placeholder="e.g., 3 days"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">History of Present Illness</label>
          <textarea
            value={historyOfIllness}
            onChange={e => setHistoryOfIllness(e.target.value)}
            className="border px-3 py-2 rounded w-full"
            placeholder="Describe the history of present illness..."
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Diagnosis</h2>

        <label className="block mb-1 font-bold">Primary Diagnosis</label>
        <div className="mb-4 flex gap-2">
          <input
            placeholder="ICD-10 Code"
            value={primaryDiagnosis.code}
            onChange={e => setPrimaryDiagnosis({ ...primaryDiagnosis, code: e.target.value })}
            className="border px-3 py-2 rounded w-1/4"
          />
          <input
            placeholder="Description"
            value={primaryDiagnosis.description}
            onChange={e => setPrimaryDiagnosis({ ...primaryDiagnosis, description: e.target.value })}
            className="border px-3 py-2 rounded w-3/4"
          />
        </div>

        <label className="block mb-1 font-bold">Secondary Diagnosis</label>
        <div className="flex gap-2">
          <input
            placeholder="ICD-10 Code"
            value={secondaryDiagnosis.code}
            onChange={e => setSecondaryDiagnosis({ ...secondaryDiagnosis, code: e.target.value })}
            className="border px-3 py-2 rounded w-1/4"
          />
          <input
            placeholder="Description"
            value={secondaryDiagnosis.description}
            onChange={e => setSecondaryDiagnosis({ ...secondaryDiagnosis, description: e.target.value })}
            className="border px-3 py-2 rounded w-3/4"
          />
          <button onClick={handleAddDiagnosis} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
        </div>

        {diagnoses.length > 0 && (
          <ul className="mt-4 space-y-2">
            {diagnoses.map((diag, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
                <span>{diag.code} - {diag.description}</span>
                <button onClick={() => handleRemoveDiagnosis(index)} className="text-red-600">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Procedures/Services (CPT Code)</h2>
        <div className="flex gap-2 mb-1">
          <label className="font-bold w-1/4">CPT Code</label>
          <label className="font-bold w-2/4">Description</label>
          <label className="font-bold w-1/6">Type</label>
          <label className="font-bold w-1/6">Qty</label>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            value={cpt.code}
            onChange={e => setCpt({ ...cpt, code: e.target.value })}
            className="border px-3 py-2 rounded w-1/4"
          />
          <input
            value={cpt.description}
            onChange={e => setCpt({ ...cpt, description: e.target.value })}
            className="border px-3 py-2 rounded w-2/4"
          />
          <select
            value={cpt.type}
            onChange={e => setCpt({ ...cpt, type: e.target.value })}
            className="border px-3 py-2 rounded w-1/6"
          >
            <option>Procedure</option>
            <option>Service</option>
          </select>
          <input
            type="number"
            min="1"
            value={cpt.qty}
            onChange={e => setCpt({ ...cpt, qty: +e.target.value })}
            className="border px-3 py-2 rounded w-1/6"
          />
          <button onClick={handleAddProcedure} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
        </div>

        {procedures.length > 0 && (
          <ul className="mt-4 space-y-2">
            {procedures.map((item, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
                <span>{item.code} - {item.description} ({item.type}, Qty: {item.qty})</span>
                <button onClick={() => handleRemoveProcedure(index)} className="text-red-600">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Medications</h2>
        <div className="flex gap-2 mb-2">
          <input
            placeholder="Medication name"
            value={medication.name}
            onChange={e => setMedication({ ...medication, name: e.target.value })}
            className="border px-3 py-2 rounded w-1/3"
          />
          <input
            placeholder="Dosage (e.g., 500mg)"
            value={medication.dosage}
            onChange={e => setMedication({ ...medication, dosage: e.target.value })}
            className="border px-3 py-2 rounded w-1/3"
          />
          <input
            placeholder="Frequency (e.g., BID)"
            value={medication.frequency}
            onChange={e => setMedication({ ...medication, frequency: e.target.value })}
            className="border px-3 py-2 rounded w-1/3"
          />
          <button onClick={handleAddMedication} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
        </div>
        {medications.length > 0 && (
          <ul className="mt-2 space-y-2">
            {medications.map((med, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
                <span>{med.name} - {med.dosage} - {med.frequency}</span>
                <button onClick={() => handleRemoveMedication(index)} className="text-red-600">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Treatment Plan</h2>
        <textarea
          value={treatmentPlan}
          onChange={e => setTreatmentPlan(e.target.value)}
          className="border px-3 py-2 rounded w-full"
          placeholder="Describe the treatment plan..."
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Referral (If applicable)</h2>
        <div className="flex gap-4">
          <input
            placeholder="Referred To"
            value={referredTo}
            onChange={e => setReferredTo(e.target.value)}
            className="border px-3 py-2 rounded w-1/2"
          />
          <input
            placeholder="Referral Reason"
            value={referralReason}
            onChange={e => setReferralReason(e.target.value)}
            className="border px-3 py-2 rounded w-1/2"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2 mt-6">Signatures</h2>
        <div className="flex gap-4">
          <div className="w-1/2 border-dashed border-2 rounded p-4 text-center text-gray-500">Click to sign</div>
          <div className="w-1/2 border-dashed border-2 rounded p-4 text-center text-gray-500">Patient signature</div>
        </div>
        <input
          placeholder="Doctor's Name"
          value={doctorName}
          onChange={e => setDoctorName(e.target.value)}
          className="border px-3 py-2 rounded w-full mt-2"
        />
        <div className="flex items-center mt-2">
          <input type="checkbox" checked={doctorConsent} onChange={() => setDoctorConsent(!doctorConsent)} className="mr-2"/>
          <label>I am Dr. {doctorName || '[Doctor Name]'}, treating doctor of the above patient and all the information provided in this claims form are best of my professional expertise and are true to best of my knowledge.</label>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <strong>System Generated Timestamp:</strong> July 10, 2025 at 11:52:19 PM
          <div className="italic">This is a computer-generated document. Valid with digital signature and seal.</div>
        </div>
        <button onClick={handleSaveFormData}className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Claim form (Save)
        </button>
      </div>
    </div>
  )
}
