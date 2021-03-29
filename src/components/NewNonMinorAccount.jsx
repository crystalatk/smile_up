import { useState } from 'react';

const NewNonMinorAccount = () => {
    const [firstName, setFirstName] = useState('');
    const [hasMinor, setHasMinor] = useState(false);

    const _handleHasMinorChange = e => {
        setHasMinor(e.target.value);
    }

    
    
    return (
        <>
            <h1>Create an Account:</h1>
            <form onSubmit={_handleSubmit}>
                <label>Create Username
                    <input></input>
                </label>
                <label>Create a Password
                    <input></input>
                </label>
                <label>Retype your password
                    <input></input>
                </label>
                <label>First Name
                    <input></input>
                </label>
                <label>Last Name
                    <input></input>
                </label>
                <label>Date of Birth
                    <input></input>
                </label>
                <label>Phone Number
                    <input></input>
                </label>
                <label>Email
                    <input></input>
                </label>
                <label>Zip Code
                    <input></input>
                </label>
                <label>Emergency Contact Name (First & Last)
                    <input></input>
                </label>
                <label>Emergency Contact Phone Number
                    <input></input>
                </label>
                <label>Are you the parent or guardian of a smileUp volunteer who is under the age of 18?
                    <input type="radio" value={true} onChange={_handleHasMinorChange} name="minor_signup"/> Yes
                    <input type="radio" value={false} onChange={_handleHasMinorChange} name="minor_signup"/> No
                </label>
                <label>Would you like to include a message to the administrator? If so, enter below:
                    <input></input>
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default NewNonMinorAccount;