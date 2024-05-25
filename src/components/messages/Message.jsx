// import React from 'react';
// import { HiDocumentDownload } from 'react-icons/hi'; // Import file icon
// import useConversation from '../../zustand/useConversation';
// import { useAuthContext } from '../../context/AuthContext';
// import { extractTime } from './../../utils/extractTime';

// const Message = ({ message }) => {
//     const { authUser } = useAuthContext();
//     // const { selectedConversation } = useConversation();
//     const { selectedConversation, downloadFile } = useConversation();

//     const fromMe = message.senderId === authUser._id;
//     const formattedTime = extractTime(message.createdAt);
//     const chatClassName = fromMe ? "chat-end" : "chat-start";
//     const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
//     const bubbleBgColor = fromMe ? "bg-blue-500" : "";
//     const isFile = message.file; // Check if message has a file
//     const isImage = message.file && /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(message.file); // Check if file is an image

//     const shakeClass = message.shouldShake ? "shake" : "";

//     // const getFileExtension = (filename) => {
//     //     return filename.split('.').pop().toLowerCase();
//     // };

//     // const getDownloadFileName = (filename) => {
//     //     const extension = getFileExtension(filename);
//     //     return `download.${extension}`;
//     // };

//     // const getDownloadFileName = (filename) => {
//     //     return filename.split('/').pop(); // Get the filename from the URL
//     // };

//     const getDownloadFileName = (file) => {
//         console.log(file);
//         if (file instanceof File) {
//             return file.name; // Extract filename from File object
//         }
//         // Fallback: Extract filename from URL
//         return file.split('/').pop();
//     };


//     return (
//         <div className={`flex flex-col chat ${chatClassName}`}>
//             <div className="flex items-center mb-2">
//                 {!fromMe && (
//                     <div>
//                         <img src={selectedConversation?.profilePic} alt="User A" className="w-8 h-8 rounded-full mr-2" />
//                     </div>
//                 )}
//                 <div className={`p-2 rounded-lg max-w-[250px] ${bubbleBgColor}`}>
//                     {isImage && (
//                         <img src={message.file} alt="Attached Image" className="w-full h-full object-cover rounded-lg" style={{ maxWidth: '250px', maxHeight: '250px' }} />
//                     )}
//                     {isFile && !isImage && (
//                         <div className="flex items-center">
//                             <HiDocumentDownload className="w-6 h-6 mr-2" /> {/* File icon */}
//                             <a href={message.file} download={getDownloadFileName(message.file)} className=" text-white">Download File</a>


//                         </div>
//                     )}
//                     {!isFile && !isImage && ( // Display message if no file
//                         <p>{message.message}</p>
//                     )}
//                 </div>

//                 <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
//                 {fromMe && (
//                     <div>
//                         <img src={authUser.profilePic} alt="User A" className="w-8 h-8 rounded-full ml-2" />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Message;
// import React from 'react';
// import { HiDocumentDownload } from 'react-icons/hi';
// import useConversation from '../../zustand/useConversation';
// import { useAuthContext } from '../../context/AuthContext';
// import { extractTime } from './../../utils/extractTime';

// const Message = ({ message }) => {
//     const { authUser } = useAuthContext();
//     const { selectedConversation, downloadFile } = useConversation();

//     const fromMe = message.senderId === authUser._id;
//     const formattedTime = extractTime(message.createdAt);
//     const alignRight = !fromMe ? "justify-end" : ""; // Dynamically adjust alignment
//     const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
//     const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-300"; // Different background colors for sender and receiver

//     const isFile = message.file;
//     const isImage = message.file && /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(message.file);

//     const getDownloadFileName = (file) => {
//         if (file instanceof File) {
//             return file.name;
//         }
//         return file.split('/').pop();
//     };

//     return (
//         <div className={`flex ${alignRight} mb-2`}>
//             {!fromMe && (
//                 <div>
//                     <img src={profilePic} alt="User A" className="w-8 h-8 rounded-full mr-2" />
//                 </div>
//             )}
//             <div className={`p-2 rounded-lg max-w-[250px] ${bubbleBgColor}`}>
//                 {isImage && (
//                     <img src={message.file} alt="Attached Image" className="w-full h-full object-cover rounded-lg" style={{ maxWidth: '250px', maxHeight: '250px' }} />
//                 )}
//                 {isFile && !isImage && (
//                     <div className="flex items-center">
//                         <HiDocumentDownload className="w-6 h-6 mr-2" />
//                         <a href={message.file} download={getDownloadFileName(message.file)} className="text-white">Download File</a>
//                     </div>
//                 )}
//                 {!isFile && !isImage && (
//                     <p>{message.message}</p>
//                 )}
//             </div>
//             <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
//             {fromMe && (
//                 <div>
//                     <img src={authUser.profilePic} alt="User A" className="w-8 h-8 rounded-full ml-2" />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Message;

import React from 'react';
import { HiDocumentDownload } from 'react-icons/hi';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from './../../utils/extractTime';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation, downloadFile } = useConversation();

    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const alignRight = fromMe ? "justify-end" : ""; // Adjusted alignment logic
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-green-500" : "bg-gray-100"; // Different background colors for sender and receiver

    const isFile = message.file;
    const isImage = message.file && /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(message.file);
    const textColor = fromMe ? "text-white" : "text-black";

    const getDownloadFileName = (file) => {
        if (file instanceof File) {
            return file.name;
        }
        return file.split('/').pop();
    };

    return (
        <div className={`flex ${alignRight} mb-2`}>
            {fromMe && ( // Show sender's picture on the left side
                <div>
                    {/* <img src={profilePic} alt="User A" className="w-8 h-8 rounded-full mr-2" /> */}
                    <p className='mr-4'>{formattedTime}</p>
                </div>
            )}
            <div className={`p-2 rounded-lg max-w-[250px] ${bubbleBgColor}`}>
                {isImage && (
                    <img src={message.file} alt="Attached Image" className="w-full h-full object-cover rounded-lg" style={{ maxWidth: '250px', maxHeight: '250px' }} />
                )}
                {isFile && !isImage && (
                    <div className="flex items-center">
                        <HiDocumentDownload className="w-6 h-6 mr-2" />
                        <a href={message.file} download={getDownloadFileName(message.file)} className="text-white">Download File</a>
                    </div>
                )}
                {!isFile && !isImage && (
                    <p className={textColor}>{message.message}</p>
                )}
            </div>
            {/* <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div> */}
            {!fromMe && ( // Show sender's picture on the right side
                <div>
                    {/* <img src={profilePic} alt="User A" className="w-8 h-8 rounded-full ml-2" /> */}
                    <p className='ml-4'>{formattedTime}</p>
                </div>
            )}
        </div>
    );
};

export default Message;

