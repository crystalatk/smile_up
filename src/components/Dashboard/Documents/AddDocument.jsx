import { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { TextField, Select, InputLabel, MenuItem } from '@material-ui/core';
import { storage } from '../../../firebase/index';

const AddDocument = ({userInfo, reloadDocument, setReloadDocument}) => {
    const [eventList, setEventList] = useState([]);
    const [eventId, setEventId] = useState(null);
    const [isGeneral, setIsGeneral] = useState(null);
    const [documentTitle, setDocumentTitle] = useState("");
    const [documentFile, setDocumentFile] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);


  const handleFileChange = async (e) => {
    if (e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };


    const handleUpload = async () => { 
        const uploadTask = storage.ref(`documents/${documentFile.name}`).put(documentFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
            },
            () => {
                storage
                    .ref('documents')
                    .child(documentFile.name)
                    .getDownloadURL()
                    .then(async function(url) {
                        const response = await fetch(
                            `${process.env.REACT_APP_HOST}/admins/addDocument`,
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    is_general: isGeneral,
                                    event_id: eventId,
                                    document_title: documentTitle,
                                    document_url: url,
                                    admin_id: userInfo.id,
                                }),
                            }
                        ).then((response) => response);
                        console.log('the response is ', response);
                        setIsUploaded(true);
                        setReloadDocument(!reloadDocument)
                    })
                });
    };


  useEffect(() => {
    const fetchList = async () => {
      const eventListResponse = await fetch(
        `${process.env.REACT_APP_HOST}/events/list`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      console.log("THIS IS THE EVENTS LIST RESPONSE: ", eventListResponse);
      setEventList(eventListResponse);
    };
    fetchList();
  }, []);


    return (
        <>
            <h1>This is the AddDocument</h1>
            <form>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        Will this document be used for a specific event, or will this be a general-use document?
                    </FormLabel>
                    <label
                        aria-label="gender"
                        name="is_general"
                        onChange={(e) => (e.target.value === "true" ? setIsGeneral(true) : setIsGeneral(false))}
                    >
                        <FormControlLabel value="false" control={<Radio />} label="Specific Event" checked={isGeneral === false}/>
                        <FormControlLabel value="true" control={<Radio />} label="General" checked={isGeneral}/>
                    </label>
                </FormControl>
                <div>
                    {isGeneral === false &&  (
                        <InputLabel id="demo-simple-select-label">Which Event?
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={eventId}
                            onChange={(e) => setEventId(e.target.value)} 
                            defaultValue={null}
                            >
                            {eventList.map((event, index) => <MenuItem name={index} value={event.id}>{event.title}</MenuItem>)}
                            </Select>
                        </InputLabel>
                    )}
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required-first-name"
                        label="Document Title"
                        variant="outlined"
                        value={documentTitle}
                        margin="dense"
                        onChange={(e) => setDocumentTitle(e.target.value)}
                        type="text"
                    />
                </div>
                {!!documentTitle.length && (
                    <div>
                    {!!documentFile ? (<button onClick={handleUpload} type="button">Click to Upload</button>) : (<button
                        component="label"
                        >
                        Find Document to Upload
                        <input
                            type="file"
                            accept="application/pdf,application/vnd.ms-excel,application/msword,text/plain"
                            onChange={handleFileChange}
                        />
                        
                        </button>)
                    }
                </div>
                )}
            </form>
            {isUploaded && <p>Your document was uploaded successfully!</p>}
        </>
    );

};

export default AddDocument;
