"use client"

export default function InputField({reversed,InputText})
{
    return(
        <div className={`topTD flex ${reversed ? 'flex-row-reverse' : 'flex-row'}`} style={{ textAlign: reversed ? 'right' : 'left' }}>
            <label className="" htmlFor="Textfield">{InputText}</label>
            <input className="" type="text"  name="Textfield"/>
        </div>        
    )    
}