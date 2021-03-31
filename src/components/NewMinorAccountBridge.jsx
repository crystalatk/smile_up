import { Link } from 'react-router-dom';
import NewNonMinorAccount from './NewNonMinorAccount';



const NewMinorAccountBridge = () => {
    return (
        <div>
            <p>You indicated that you are the parent or guardian of a smileUp volunteer who is a minor. Would you like to create their account(s) now?</p>
            <Link to="">Yes</Link>
        </div>
    )
}

export default NewMinorAccountBridge
