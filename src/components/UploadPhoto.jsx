import { useState } from 'react';
import { storage } from '../firebase/index';

const UploadPhoto = ({userInfo, setUserInfo}) => {
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
                            `http://127.0.0.1:3232/volunteers/editavatar`,
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    id: userInfo.id,
                                    avatar_link: url
                                }),
                            }
                        ).then((response) => response);
                        setUserInfo({
                            avatar_link: url
                        })
                    }) 
                })
            };
    return (
        <div>
            {!!image ? (<button onClick={handleUpload}>Click to Upload</button>) : (<button
                component="label"
                >
                Add File to Upload
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

export default UploadPhoto