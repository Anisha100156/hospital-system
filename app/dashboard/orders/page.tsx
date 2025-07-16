'use client'

import { useEffect, useState } from 'react'
import { Info, ClipboardList, FileText, Stethoscope, Pill } from 'lucide-react'

export default function OrdersReportPage() {
  const [clinicalData, setClinicalData] = useState(null)
  const [selectedVisit, setSelectedVisit] = useState('VST-12349')

  useEffect(() => {
    const storedData = localStorage.getItem('clinicalData')
    if (storedData) {
      setClinicalData(JSON.parse(storedData))
    }
  }, [])

  const dummyLabOrders = [
    { orderId: 'LAB-001', code: '80053', description: 'Metabolic Panel', qty: 1, employee: 'EMP-001', status: 'Pending' },
    { orderId: 'LAB-002', code: '83036', description: 'Hemoglobin A1C', qty: 1, employee: 'EMP-220', status: 'In Process' },
    { orderId: 'LAB-003', code: '81003', description: 'Urinalysis', qty: 1, employee: 'EMP-001', status: 'Completed' },
    { orderId: 'LAB-004', code: '87086', description: 'Culture, Urine', qty: 1, employee: 'EMP-234', status: 'Cancelled' },
    { orderId: 'LAB-005', code: '81001', description: 'Urine Microscopy', qty: 1, employee: 'EMP-001', status: 'Cancelled' },
  ]

  const renderStatusBadge = (status) => {
    const base = 'px-2 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1'
    switch (status) {
      case 'Pending':
        return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>
      case 'In Process':
        return <span className={`${base} bg-blue-100 text-blue-800`}>In Process</span>
      case 'Completed':
        return <span className={`${base} bg-green-100 text-green-800`}>Completed</span>
      case 'Cancelled':
        return <span className={`${base} bg-red-100 text-red-800`}>Cancelled <Info size={12} /></span>
      default:
        return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>
    }
  }

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Visit Wise Order & Orders</h2>

      {/* Visit Tabs */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        {['VST-12345', 'VST-12346', 'VST-12347', 'VST-12348', 'VST-12349'].map((v, i) => (
          <div
            key={v}
            onClick={() => setSelectedVisit(v)}
            className={`px-4 py-2 rounded cursor-pointer text-center transition duration-200 ${
              selectedVisit === v ? 'bg-blue-300' : 'bg-blue-100 hover:bg-blue-200'
            }`}
          >
            <div className="text-blue-600 font-semibold">{v}</div>
            <div className="text-xs text-gray-600">0{10 - i}/07/2025</div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-4 gap-4 bg-blue-50 p-4 rounded mb-4 text-sm text-gray-800">
        <div className="text-center"><strong>Patient ID:</strong> -</div>
        <div className="text-center"><strong>Visit ID:</strong> {selectedVisit}</div>
        <div className="text-center"><strong>Bill Date:</strong> -</div>
        <div className="text-center"><strong>Visit Order Number:</strong> -</div>
      </div>

      {/* Lab Orders */}
      <div>
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <ClipboardList size={18} /> Lab Orders
        </h3>
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-2 text-left">Lab Order #</th>
              <th className="border border-gray-300 px-3 py-2 text-left">CPT Code</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Qty</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Status changed by</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyLabOrders.map((item) => (
              <tr key={item.orderId}>
                <td className="border border-gray-300 px-3 py-2">{item.orderId}</td>
                <td className="border border-gray-300 px-3 py-2">{item.code}</td>
                <td className="border border-gray-300 px-3 py-2">{item.description}</td>
                <td className="border border-gray-300 px-3 py-2">{item.qty}</td>
                <td className="border border-gray-300 px-3 py-2">{item.employee}</td>
                <td className="border border-gray-300 px-3 py-2">{renderStatusBadge(item.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Radiology Orders */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FileText size={18} /> Radiology Orders
        </h3>
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-2 text-left">Rad Order #</th>
              <th className="border border-gray-300 px-3 py-2 text-left">CPT Code</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Qty</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Status changed by</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 text-center" colSpan={6}>No radiology orders</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Other Procedures */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Stethoscope size={18} /> Other Procedures
        </h3>
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-2 text-left">Procedure Order #</th>
              <th className="border border-gray-300 px-3 py-2 text-left">CPT Code</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Qty</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Status changed by</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 text-center" colSpan={6}>No other procedures</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ICD Codes Summary */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FileText size={18} /> ICD Codes Summary
        </h3>
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-2 text-left">ICD Code</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 text-center" colSpan={3}>No ICD codes</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Medications */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Pill size={18} /> Medications
        </h3>
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-2 text-left">Medication</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Dosage</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Frequency</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 text-center" colSpan={3}>No medications</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
