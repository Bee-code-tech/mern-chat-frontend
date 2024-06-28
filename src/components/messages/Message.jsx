import React from 'react';
import { HiDocumentDownload } from 'react-icons/hi';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from './../../utils/extractTime';
import moment from 'moment';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation, downloadFile } = useConversation();

    console.log(message);

    const fromMe = message.senderId === authUser._id;
    const formattedTime = moment(message.createdAt).calendar();
    const alignRight = fromMe ? "justify-end" : "justify-start"; // Adjusted alignment logic
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-green-500" : "bg-neutral-200"; // Different background colors for sender and receiver
    const txtColor = fromMe ? "text-white" : "text-stone-500"; // Different background colors for sender and receiver

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
        <div>
         
         
          
          <div className={` flex ${alignRight} `}>
                {/* check if it is image  */}
                

                {/* check file and image  */}
                {isFile && !isImage && (
                    <div className="flex items-center">
                        <HiDocumentDownload className="w-6 h-6 mr-2" />
                        <a href={message.file} download={getDownloadFileName(message.file)} className="text-white">Download File</a>
                    </div>
                )}

               {!isFile && !isImage && (
                <>
                   <div className=" w-1/2">
                   <div className={`flex flex-col mt-6  max-w-full ${txtColor} w-auto`}>
                        <div className={`justify-center px-4 py-2 text-lg leading-7 rounded-3xl ${bubbleBgColor} max-md:px-5 max-md:max-w-full`}>
                           {message.message}
                        </div>
                        <div className="mt-3 text-black font-thin leading-6 max-md:max-w-full">
                            {formattedTime}
                        </div>
                    </div>
                   </div>
                    {/* <div className={`chat-bubble ${bubbleBgColor}  `}>
                        <p className={`lg:text-lg ${textColor} text-[15px]`}>
                        {message.message}
                        </p> 
                    <p className={`block mt-2 ${textColor} text-[10px] self-end font-thin`}>
                    {formattedTime}
                    </p>
                    </div>
                    <div className="chat-footer text-black ">
                        Delivered
                    </div> */}
                </>
               )}
            </div>
          

            {isImage && (
                    <div className="flex justify-end mb-2 w-full">
                        <img src={message.file} alt="Attached Image" className="w-1/2 bg-green-500 p-2 h-full object-cover rounded-lg" style={{ maxWidth: '250px', maxHeight: '250px' }} />
                    </div>
                )}

            
                {!fromMe && ( // Show sender's picture on the right side
                        <div>
                            <p className='ml-4'>{formattedTime}</p>
                        </div>
                    )}
        </div>
    );
};

export default Message;

