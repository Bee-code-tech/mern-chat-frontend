import { BsSend } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { MdZoomOutMap } from "react-icons/md";
import { useRef, useState } from "react";
import Picker from 'emoji-picker-react';
import useSendMessage from "../../hooks/useSendMessage";
import { CiHeart } from "react-icons/ci";
import { FaImage, FaVideo, FaFile } from 'react-icons/fa';
import FlieUpload from "../Modal/FlieUpload";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    const fileRef = useRef();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleEmojiSelect = (emojiObject) => {
        setMessage((prevMessage) => prevMessage + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendMessage(message, file);
        setMessage("");
        setFile(null);
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            await handleSubmit(e);
        }
    };

    const selectFile = (acceptedFileTypes) => {
        fileRef.current.accept = acceptedFileTypes;
        fileRef.current.click();
    };

    const fileSelected = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        setShowModal(false); // Close the modal after file selection
    };

    const renderFileBox = () => {
        if (!file) return null;

        let icon;
        if (file.type.startsWith('image/')) {
            icon = <FaImage className="text-green-500 mr-2" />;
        } else if (file.type.startsWith('video/')) {
            icon = <FaVideo className="text-green-500 mr-2" />;
        } else {
            icon = <FaFile className="text-green-500 mr-2" />;
        }

        return (
            <div className="flex items-center p-3 bg-neutral-100 border-2 border-green-500 rounded-lg w-full">
                {icon}
                <span className="text-black">{file.name}</span>
            </div>
        );
    };

    return (
        <>
            <form className='p-3 bg-neutral-100 gap-0 md:gap-3 lg:gap-3 w-full flex items-center justify-between' onSubmit={handleSubmit}>
                <MdZoomOutMap className='hidden lg:block md:block text-[32px] mr-3 cursor-pointer text-black' />

                <div className=''>
                    <div className="icons">
                        <label onClick={() => setShowModal(true)}>
                            <FaPlus className='h-12 cursor-pointer text-black' />
                        </label>
                        <input
                            type="file"
                            ref={fileRef}
                            style={{ display: "none" }}
                            onChange={fileSelected}
                        />
                    </div>
                </div>

                <div className="relative w-[270px] lg:w-[550px] md:w-[450px]">
                    {file ? (
                        renderFileBox()
                    ) : (
                        <input
                            type="text"
                            value={message}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message"
                            className="text-lg rounded-lg block w-full p-3 bg-white border-2 border-neutral-300 focus:outline-none text-black"
                        />
                    )}
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        <CiHeart className="text-[28px] text-neutral-400" />
                    </span>
                    {showEmojiPicker && (
                        <div className="absolute z-[1000px] bottom-full -right-12 mb-2">
                            <Picker
                                onEmojiClick={handleEmojiSelect}
                                pickerStyle={{ position: "absolute", bottom: "30px", right: "-10px" }}
                            />
                        </div>
                    )}
                </div>

                <button type='submit' className='flex items-center'>
                    {loading ?
                        <span className="bg-[#18BB0C] rounded-md p-2 lg:p-3 md:p-3 flex items-center justify-center">
                            <div className='loading loading-spinner'></div>
                        </span>
                        :
                        <div className="bg-[#18BB0C] hover:shadow-lg rounded-md p-2 lg:p-3 md:p-3 flex items-center justify-center">
                            <BsSend className="text-white text-xl font-bold" />
                        </div>
                    }
                </button>
            </form>

            <FlieUpload
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onFileSelect={selectFile}
            />
        </>
    );
};

export default MessageInput;
