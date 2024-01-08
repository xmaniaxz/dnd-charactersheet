
import InputField from './Inputfields'
export default function UnderInfo() {
    return (
        <div className='underHPContainer' >
            <div className='w-1/2'>
                <InputField classname='underHP' InputText='Max HP :' />
                <InputField classname='underHP' InputText='HP :' />
            </div>
            <div className='w-1/2'>
                <InputField classname='underHP' InputText=': Character name' reversed/>
                <InputField classname='underHP' InputText=': Proficiency' reversed/>                
            </div>
        </div>
    )
}