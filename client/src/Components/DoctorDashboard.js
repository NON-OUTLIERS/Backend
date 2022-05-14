import React, { useEffect ,useState} from 'react';
import axios from 'axios';
import Eachpatient from './Eachpatient';
function DoctorDashboard() {
    const [patients, setpatients] = useState([]);
    useEffect(() => {
        const data = async () => {
            try {
                const data = (await axios.get('/api/doctor/getallpatients')).data;
                //console.log(data);
                setpatients(data.ptnts);
            }
            catch (error) {
                console.log(error);
            }
        };
        data();
    }, [setpatients]);
    return (
        <>
            <div className='sidepanel'>
                <div className='rect2'>
                    <div className='homeicon'></div>
                    <div className='home'> Home </div>
                </div>
                <div className='line1'>
                </div>
                <div className='rect4'>
                    <div className='patient'>
                        Patient
                    </div>
                </div>
                <div className='rect5'>
                    <div className='schedule'>
                        Schedule
                    </div>
                </div>
            </div>
            <div className='pateintslist'>
                Patients List
            </div>
            <div className='patient-row'>
                {
                    patients.map((data) => {
                        console.log(data);
                        return <div>
                            <li key={data.id}>{data.id}</li>
                        </div>
                    })
                }

            </div>
        </>
    )
}

export default DoctorDashboard;