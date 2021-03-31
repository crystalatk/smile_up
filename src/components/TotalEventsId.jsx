import { useEffect, useState } from 'react';


const EventsId = ({userInfo}) => {
    const [eventId, setEventId] = useState('')
    useEffect(() => {
        
        const getVH = () => {
            fetch(`http://127.0.0.1:3232/events/totalEventsId?volunteer_id=${userInfo.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setEventId(data[0].count)
            })
        }
        getVH();
        
    },[])


    return (
        <>
            <h1>Total Events </h1>
                {!!eventId ? 
                <h2>
                    {eventId}
                </h2>
                :<h3>nothing is here</h3>
                }
           
        </>
    )

}

export default EventsId