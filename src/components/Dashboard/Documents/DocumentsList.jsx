import { useState, useEffect } from "react";


const DocumentsList = ({reloadDocument}) => {
    const [documentArray, setDocumentArray] = useState([]);
    
    useEffect(() => {
        const fetchList = async () => {
            const documentListResponse = await fetch(
                `${process.env.REACT_APP_HOST}/events/getdocuments`,
                {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                }
            )
                .then((response) => response.json())
                .catch((e) => {
                console.log(e);
                });
            setDocumentArray(documentListResponse);
        };
        fetchList();
    }, [reloadDocument]);


  return (
    <div>
      <h1>All documents</h1>
      <h3>Select a document below to view in a new window</h3>
      {documentArray.map((doc, index) => (
        <div>
          <a
            href={doc.document_url}
            target="_blank"
            rel="noreferrer"
            key={index}
          >
            {doc.document_title}
          </a>
        </div>
      ))}
    </div>
  );
};

export default DocumentsList;
