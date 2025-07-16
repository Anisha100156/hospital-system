'use client'
import React from 'react';
type Props = {
  label: string, name?:string,type?:string,value?: string,onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void
}
export default function InputField({label,name,type='text',value,onChange}:Props){
  return (
    <div style={{marginBottom:'1rem'}}>
      <label style={{display:'block', fontSize:'14px', color:'#444', marginBottom:'4px'}}>{label}</label>
      <input name={name} type={type} value={value} onChange={onChange} style={{padding: '8px 10px',border: '1px solid #ccc',borderRadius: '4px',width: '100%',fontSize: '14px'}}/>
    </div>
  )
}