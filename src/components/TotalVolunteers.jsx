import { useEffect, useState } from 'react';


const TotalVolunteers = () => {
    const [totalVolunteers, setTotalVolunteers] = useState('')
    useEffect(() => {
        (async () => {
            const volunteerTotal = await fetch('http://127.0.0.1:3232/volunteers/totalVolunteers').then(response => response.json())
            console.log("This is the volunteer total:", volunteerTotal);
            setTotalVolunteers(volunteerTotal.length);
        })();
    },[])


    return (
        <>
            <h1>Total Volunteers</h1>
            {!!totalVolunteers ? (
                <h1>
                    {totalVolunteers}
                </h1>
            ) : (
                <p>Getting Total ...</p>
            )}
        </>
    )

}

export default TotalVolunteers