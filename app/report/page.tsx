'use client'
import { useEffect, useState } from 'react';
export default function ReportPage() {
  const [formData, setFormData] = useState<any>(null)
  useEffect(()=>{
    const data=localStorage.getItem('claimFormData')
    if (data){
      try{
        setFormData(JSON.parse(data))
      }catch(err) {
        console.log('error parsing',err)
      }}},[]);
  if (!formData)return <div style={{ padding:'20px'}}>Loading...</div>
  return (
    <div style={{backgroundColor:'#fff',minHeight:'100vh'}}>
      <div style={{ padding:'16px',borderBottom:'1px solid #ddd'}}>
      <h2>Report Preview</h2>
         <button onClick={()=>window.print()}style={{marginTop:'10px'}}>Print</button>
      </div>
      <div style={{ padding:'20px'}}>
        <h3>Patient Info</h3>
        <p><strong>Name:</strong>{formData.firstName||'N/A'}{formData.lastName||''}</p>
        <p><strong>Gender:</strong>{formData.gender||'-'}</p>
        <p><strong>DOB:</strong> {formData.dob||'-'}</p>
        <h4 style={{ marginTop:'20px'}}>Medications</h4>
        <p>{formData.medication||'No medications recorded'}</p>
        <h4 style={{ marginTop:'20px'}}>Vitals</h4>
        <p>BP: {formData.bp||'128/80'}</p>
        <div style={{marginTop:'30px'}}>
            <p>____________________</p> <p>Doctor's Signature</p>
     </div>
    </div>
    </div>
  )
}
