import { useState } from 'react';
import { storage } from '../../../firebase/index';

const UploadAvatar = ({ id, reloadPhoto, setReloadPhoto }) => {
    const [image, setImage] = useState(null);
    const handleChange = async (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = async () => { 
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
            },
            () => {
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(async function(url) {
                        const response = await fetch(
                            `${process.env.REACT_APP_HOST}/volunteers/editavatar`,
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    id: id,
                                    avatar_link: url
                                }),
                            }
                        ).then((response) => response);
                        console.log(response);
                        setReloadPhoto(!reloadPhoto);
                    })
                })
            };
    return (
        <div>
            {!!image ? (<button onClick={handleUpload}>Click to Upload</button>) : (<button
                component="label"
                >
                Change Avatar
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleChange}
                />
                </button>)
            }
        </div>
    )
}

export default UploadAvatar;