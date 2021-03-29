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
            <form>
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
                <div>
                    <label>If you are a parent or guardian, would you like to sign up your child to be a volunteer?
                        <input type="radio" value={true} checked={hasMinor === true} onChange={_handleHasMinorChange} name="minor_signup"/> Yes
                        <input type="radio" value={false} checked={hasMinor === false} onChange={_handleHasMinorChange} name="minor_signup"/> No
                    </label>
                </div>
                <label>Would you like to include a message to the administrator? If so, enter below:
                    <input></input>
                </label>

            </form>
        </>
    )
}

export default NewNonMinorAccount;