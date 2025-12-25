import axios from 'axios';

// import { generateUploadButton } from "@uploadthing/react";
// const UploadButton = generateUploadButton({
//     url: "http://localhost:5000/api/uploadthing",
// });
// // ...

// function MyUploadFile()
// {
//     const cookies = document.cookie;
//     return (
//         <>
//             <h1>Upload files</h1>
//             <div className="border-black border-2  dark:bg-slate-400">
//                 <UploadButton 
//                     endpoint="profileImage"// this should match the fileRouter you defined in your backend
//                     appearance={{
//                         button: "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded",
//                         allowedContent: "text-xs text-gray-500 dark:text-gray-400",
//                     }}
//                     onClientUploadComplete={(res) => {
//                         // This runs when upload completes on client side
//                         console.log("Upload complete:", res);
//                         // console.log("File URL:", res[0]?.url);
//                         // alert("File uploaded successfully!");
//                     }}
//                     onUploadError={(error) => {
//                         console.error("Upload error:", error);
//                         // alert(`Upload failed: ${error.message}`);
//                     }}
//                     onUploadBegin={() => {
//                         console.log("Upload starting...");
//                     }}
//                     config={{
//                         mode: "auto",
//                         headers: {
//                             Cookie: document.cookie
//                         }, 
//                         credentials:"include"
//                     }}
//                 />
//             </div>
//         </>

//     )
// }


// import { useUploadThing } from "@uploadthing/react";

// function MyUploadFile() {
//     const { startUpload, isUploading } = useUploadThing("profileImage", {
//         headers: () => ({
//             Cookie: document.cookie,
//         }),
//         // or try with credentials: "include"
//         // credentials: "include",
//     });
    
//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             startUpload([file]);
//         }
//     };
    
//     return (
//         <div>
//       <h1>Upload files</h1>
//       <input type="file" onChange={handleFileChange} />
//       {isUploading && <p>Uploading...</p>}
//     </div>
//   );
// }
// export default MyUploadFile;



// function MyUploadFile() 
// {
//     const handleSubmit = async ()=>{
//         console.log("I was clicked")
//     }
//     return (
//         <>
//             <form action="http://localhost:5000/api/studentDetails//trialUpload" encType="multipart/form-data" method="POST" >
//                 <input type="file"/>
//                 <input value="submit" type="submit"/>
//             </form>
//         </>
//     )
// }

import React, { useState } from 'react';

function MyUploadFile(){
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('files', selectedFile);
        console.log("formData");
        console.log(formData)
        try {
            const response = await axios.post("http://localhost:5000/api/uploadFile", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type
                },
                withCredentials:true
            })
            console.log(response);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" multiple={false} onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default MyUploadFile;
