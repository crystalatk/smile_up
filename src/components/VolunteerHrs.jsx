import { useEffect, useState } from 'react';

const VolunteerHours = () => {
    const [volunteerHours, setVolunteerHours] = useState('')
    useEffect(() => {

        function getData () {
            fetch('http://127.0.0.1:3232/volunteers/volunteerHours')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setVolunteerHours(data[0].total_minutes)
            })
        }
        getData();
    },[])

    return (
        <>
            <h1> Total Minutes</h1>
            
                <h2>
                    {volunteerHours}
                </h2>
        </>
    )


}

export default VolunteerHours