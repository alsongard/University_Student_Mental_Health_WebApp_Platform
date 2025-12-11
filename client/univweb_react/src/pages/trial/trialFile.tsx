

import { generateUploadButton } from "@uploadthing/react";
const UploadButton = generateUploadButton({
    url: "http://localhost:5000/api/uploadthing"

});
// ...

function MyUploadFile()
{
    const studentId = localStorage.getItem("studentId");
    return (
        <>
            <h1>Upload files</h1>
            <div className="border-black border-2  dark:bg-slate-400">
                <UploadButton 
                    endpoint="myFileRouter"// this should match the fileRouter you defined in your backend
                    input={{studentId:"69360cd7001a399b72c0b961" }}
                    appearance={{
                        button: "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded",
                        allowedContent: "text-xs text-gray-500 dark:text-gray-400",
                    }}
                    onClientUploadComplete={(res) => {
                        // This runs when upload completes on client side
                        console.log("Upload complete:", res);
                        console.log("File URL:", res[0]?.url);
                        // alert("File uploaded successfully!");
                    }}
                    onUploadError={(error) => {
                        console.error("Upload error:", error);
                        // alert(`Upload failed: ${error.message}`);
                    }}
                    onUploadBegin={() => {
                        console.log("Upload starting...");
                    }}
                />
            </div>
        </>

    )
}
export default MyUploadFile;
