'use client'
import React from 'react';
type Props={label:string,options:string[],name?:string,value?:string,onChange?:(e:React.ChangeEvent<HTMLSelectElement>)=>void}
export default function SelectField({label,options,name,value,onChange}:Props){
  return (
    <div style={{marginBottom:'16px'}}>
      <label style={{display:'block', fontSize:'13px', color:'#555', marginBottom:'5px'}}>{label}</label>
      <select name={name} value={value} onChange={onChange}style={{width:'100%',padding:'8px 10px',fontSize:'14px',borderRadius:'4px',border:'1px solid #ccc'}}>
        <option value="">Choose{label}</option>
        {options.map((option,idx)=>(
         <option key={idx} value={option}>{option}</option>
        ))}
     </select>
    </div>
  )
}
