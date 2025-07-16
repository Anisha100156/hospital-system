'use client'
import {useRouter} from 'next/navigation'
export default function Header() {
  const router = useRouter();
   function previewReport(){
     router.push('/report')
  }return (
    <header className="bg-blue-600 text-white py-3 px-5 flex justify-between items-center">
      <div>
        <h1 style={{fontSize:'20px', fontWeight:'bold'}}>EHR System - Medical Claim Form</h1>
        Healthcare Medical Center-123 Medical Plaza
      </div>
      <div>
        <button style={{backgroundColor:'#facc15',padding:'8px 12px', marginRight:'10px', borderRadius:'4px', color:'white' }}>Logo</button>
        <button onClick={previewReport} style={{backgroundColor:'#22c55e', padding:'8px 12px', marginRight: '10px', borderRadius:  '4px', color:'white' }}>Preview</button>
         <button className="bg-[#008BDC] px-3 py-2 text-white rounded">Save</button>
       </div>
    </header>
  )
}
