import { useState, useEffect } from 'react';

const DocumentsList = ({reloadDocument}) => {
    const [documentArray, setDocumentArray] = useState([]);
    
    useEffect(() => {
        console.log();
        const fetchList = async () => {
            const documentListResponse = await fetch(
                `http://127.0.0.1:3232/events/getdocuments`,
                {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                }
            )
                .then((response) => response.json())
                .catch((e) => {
                console.log(e);
                });
            console.log("THIS IS THE DOCUMENT LIST RESPONSE: ", documentListResponse);
            setDocumentArray(documentListResponse);
        };
        fetchList();
    }, [reloadDocument]);

    return (
        <div>
            <h1>All documents</h1>
            <h3>Select a document below to view in a new window</h3>
            {documentArray.map((doc, index) => 
            (   <div>
                <a href={doc.document_url} target="_blank" rel="noreferrer" key={index}>{doc.document_title}</a>
                </div>
                )
            )}
        </div>
    )
}

export default DocumentsList
