import { useEffect, useState } from 'react';


const TotalEvents = () => {
    const [totalEvents, setTotalEvents] = useState('')
    useEffect(() => {
        
        const getEvents = () => {
            fetch('http://127.0.0.1:3232/events/counttotalevents')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTotalEvents(data[0].count)
            })
        }
        getEvents();
        
    },[])


    return (
        <>
            <h1>Total Events</h1>
   
                <h2>
                    {totalEvents}
                </h2>
          
           
        </>
    )

}

export default TotalEvents