import { useEffect, useState } from 'react';

const VolunteerHours = () => {
    const [volunteerHours, setVolunteerHours] = useState('')
    useEffect(() => {

         const getData = () => {
            fetch('http://127.0.0.1:3232/volunteers/volunteerHours')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setVolunteerHours(data[0].sum)
            })
        }
        getData();
    },[])

    return (
        <>
            <h1> Total </h1>
                {!!volunteerHours ? 
                <h2>
                    {volunteerHours}
                </h2>
                :<h3>noData</h3>
                }
        </>
    )


}

export default VolunteerHours