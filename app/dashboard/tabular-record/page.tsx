'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

interface Visit {
  startTime: string
  endTime: string
  status: string
  patientName: string
  duration: number
  provider: string
  dob: string
  gender: string
}

export default function VisitDashboard() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/dashboard/tabular-record') return

    const fetchedVisits: Visit[] = [
      {
        startTime: '09:00 AM',
        endTime: '09:30 AM',
        status: 'Confirmed',
        patientName: 'Almazan, Jose Pocholo',
        duration: 30,
        provider: 'Lakshmi Prathipati, MD',
        dob: '8/3/1980',
        gender: 'Male'
      },
      {
        startTime: '09:15 AM',
        endTime: '09:30 AM',
        status: 'Pending',
        patientName: 'Vasquez, Marilyn',
        duration: 15,
        provider: 'N Kuruvadi DO',
        dob: '3/5/1969',
        gender: 'Female'
      },
      {
        startTime: '09:30 AM',
        endTime: '09:45 AM',
        status: 'Pending',
        patientName: 'Hassan, Ibrahim Sharif',
        duration: 15,
        provider: 'N Kuruvadi DO',
        dob: '4/1/1970',
        gender: 'Male'
      },
      {
        startTime: '10:00 AM',
        endTime: '10:30 AM',
        status: 'Checked In',
        patientName: 'Nina Thomas',
        duration: 30,
        provider: 'A Chatterjee MD',
        dob: '5/12/1975',
        gender: 'Female'
      }
    ]

    setVisits(fetchedVisits)
  }, [selectedDate, pathname])

  if (pathname !== '/dashboard/tabular-record') return null

  const pendingCount = visits.filter(v => v.status.toLowerCase() === 'pending').length;
  const checkedInCount = visits.filter(v => v.status.toLowerCase() === 'checked in').length;

  return (
    <div className="flex p-6 font-sans text-sm gap-4">
      {/* Sidebar */}
      <div className="flex flex-col items-center gap-4">
        <Calendar
          onChange={(value: Date) => setSelectedDate(value)}
          value={selectedDate}
        />

        <div className="w-[350px] bg-blue-900 text-white p-4 rounded text-center">
          <h2 className="text-base font-semibold mb-1">Dr Name - (User)</h2>
          <p className="mb-4 text-lg font-semibold">Dr. Aruna</p>
          <h2 className="text-base font-semibold mb-1">Department</h2>
          <p className="mb-4 text-lg font-semibold">Gastro</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-3">
          <p className="text-blue-700 font-semibold text-xs max-w-xs">
            
          </p>
          <p className="text-sm font-semibold text-blue-900">
            Pending: {pendingCount} &nbsp;&nbsp; Checked In: {checkedInCount} &nbsp;&nbsp; Checked Out: 0
          </p>
        </div>

        <div className="border border-gray-300 rounded overflow-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-blue-100 border-b text-gray-700">
              <tr>
                <th className="border px-2 py-2">Start Time</th>
                <th className="border px-2 py-2">End Time</th>
                <th className="border px-2 py-2">Status</th>
                <th className="border px-2 py-2">Patient Name / Therapy Name</th>
                <th className="border px-2 py-2">Duration</th>
                <th className="border px-2 py-2">Provider Name</th>
                <th className="border px-2 py-2">DOB</th>
                <th className="border px-2 py-2">Gender</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit, index) => (
                <tr key={index} className="border-b text-gray-800">
                  <td className="border px-2 py-1">{visit.startTime}</td>
                  <td className="border px-2 py-1">{visit.endTime}</td>
                  <td className="border px-2 py-1">{visit.status}</td>
                  <td className="border px-2 py-1">{visit.patientName}</td>
                  <td className="border px-2 py-1">{visit.duration}</td>
                  <td className="border px-2 py-1">{visit.provider}</td>
                  <td className="border px-2 py-1">{visit.dob}</td>
                  <td className="border px-2 py-1">{visit.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
      </div>
    </div>
  )
}