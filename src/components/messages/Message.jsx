import React from 'react';
import { HiDocumentDownload } from 'react-icons/hi';
import { FaFileImage, FaFileVideo } from 'react-icons/fa';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import moment from 'moment';
import useGetMessages from '../../hooks/useGetMessages';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const {downloadFile} = useGetMessages()
    

    const fromMe = message.senderId === authUser._id;
    const formattedTime = moment(message.createdAt).calendar();
    const alignRight = fromMe ? "justify-end" : "justify-start";
    const bubbleBgColor = fromMe ? "bg-green-500" : "bg-neutral-200";
    const txtColor = fromMe ? "text-white" : "text-stone-500";
    const textColor = fromMe ? "text-white" : "text-black";

    

    const isFile = message.file;
    const isImage = message.file && /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(message.file);
    const isVideo = message.file && /\.(mp4|webm|ogg|avi|mov)$/i.test(message.file);
    const isDocument = message.file && /\.(pdf|docx?|xlsx?|pptx?)$/i.test(message.file);

    

    return (
        <div className={`flex ${alignRight} my-2`}>
            <div className="w-3/4 lg:w-1/2">
                {isFile && (
                    <div className="flex items-center">
                        {isImage && (
                           <div className="flex items-center bg-green-500 w-full rounded-md p-3">
                           <FaFileImage className="w-6 h-6 mr-2 text-white" />
                           <a href={message.file} download={ () => downloadFile(message.file)} className="text-white">
                               Download Image
                           </a>
                       </div>
                        )}

                        {isVideo && (
                            <div className="flex items-center bg-green-500 w-full rounded-md p-3">
                            <FaFileVideo className="w-6 h-6 mr-2 text-white" />
                            <a href={message.file} download={() => downloadFile(message.file)} className="text-white">
                                Download Video
                            </a>
                        </div>
                        )}

                        {isDocument && (
                            <div className="flex items-center bg-green-500 w-full rounded-md p-3">
                                <HiDocumentDownload className="w-6 h-6 mr-2 text-white" />
                                <a href={message.file} download={() => downloadFile(message.file)} className="text-white">
                                    Download Document
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {!isFile && (
                    <div className={`flex flex-col mt-6 max-w-full ${txtColor} w-auto`}>
                        <div className={`justify-center px-4 py-2 text-lg leading-7 rounded-3xl ${bubbleBgColor} max-md:px-5 max-md:max-w-full`}>
                            {message.message}
                        </div>
                        <div className="mt-3 text-black font-thin leading-6 max-md:max-w-full">
                            {formattedTime}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;
