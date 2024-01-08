"use client"

export default function InputField({reversed,InputText,classname})
{
    return(
        <div className={`${classname}  flex ${reversed ? 'flex-row-reverse' : 'flex-row'}`} style={{ textAlign: reversed ? 'right' : 'left' }}>
            <label className="" htmlFor="Textfield">{InputText}</label>
            <input className="" type="text"  name="Textfield"/>
        </div>        
    )    
}