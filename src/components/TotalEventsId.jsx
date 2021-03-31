import { useEffect, useState } from 'react';


const EventsId = ({userInfo}) => {
    const [eventId, setEventId] = useState('')
    useEffect(() => {
        
        const getVH = () => {
            fetch(`http://127.0.0.1:3232/events/totalEventsId`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setEventId(data[0].sum)
            })
        }
        getVH();
        
    },[])


    return (
        <>
            <h1>Total Hours </h1>
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