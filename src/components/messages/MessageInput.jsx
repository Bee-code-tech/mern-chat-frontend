import { BsSend } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { MdZoomOutMap } from "react-icons/md";
import useSendMessage from "../../hooks/useSendMessage";
import { useRef, useState } from "react";
import InputEmoji from "react-input-emoji";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    const [text, setText] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const fileRef = useRef();

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    function handleOnEnter(text) {
        console.log("enter", text);
    }

    const [img, setImg] = useState({
        file: null,
        url: "",
    });

    function selectFile() {
        fileRef.current.click();
    }

    function fileSelected(e) {
        console.log(e.target.files);
        const file = e.target.files[0];
        if (!file) return;
        // const reader = new FileReader();
        // reader.onload = (event) => {
        //     setImg({
        //         file: file,
        //         url: event.target.result, // Data URL
        //     });
        // };
        // reader.readAsDataURL(file);
        setFile(file);
    }


    const [file, setFile] = useState(null);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const combinedMessage = message + newMessage;
        await sendMessage(combinedMessage, file);
        setMessage("");
        setNewMessage("");
        setFile(null);
        setImg({ file: null, url: "" }); // Clear selected file
    };




    return (
        <form className='p-3 bg-slate-200  gap-0 md:gap-3 lg:gap-3 w-full flex items-center justify-between' onSubmit={handleSubmit}>
                
                <MdZoomOutMap  className=' hidden lg:block md:block text-[32px] mr-3 cursor-pointer text-black '  />

                {/* image shareing */}
                <div className=''>
                    <div className="icons">
                        <label htmlFor="file">
                            <FaPlus className='h-12 cursor-pointer text-black ' />
                        </label>
                        <input
                            type="file"
                            id="file"
                            ref={fileRef}
                            style={{ display: "none" }}
                            // onChange={handleFileChange}
                            onClick={selectFile}
                            onChange={fileSelected}
                        />
                    </div>
                </div>

                {file && (
                    <div className="absolute right-[70px] bottom-[6px] flex items-center">
                        <img src={URL.createObjectURL(file)} alt="Selected File" style={{ height: '30px', width: 'auto' }} />
                    </div>
                )}

                

                  <div className="w-[300px] sm:w-[310px] lg:w-[550px] md:w-[450px]">
                  <InputEmoji
                        value={newMessage}
                        onChange={handleChange}
                        cleanOnEnter
                        onEnter={handleOnEnter}
                        placeholder="Type a message"
                        className=' text-lg  rounded-lg block
                         w-[100px] p-3 bg-gray-700 border-gray-600 '
                    />
                  </div>
                
                {/* end image shareing */}
                <button type='submit' className=' flex items-center'>
                    {loading ? 
                    <span className="bg-[#18BB0C] rounded-md p-2 lg:p-3 md:p-3 flex items-center justify-center ">
                        <div className='loading loading-spinner'>

</div>
                    </span>
                     :
                    <div className="bg-[#18BB0C] hover:shadow-lg rounded-md p-2 lg:p-3 md:p-3 flex items-center justify-center ">
                     <BsSend className="text-white text-xl font-bold" />

                    </div>
                     }
                </button>
        </form >
    );
};
export default MessageInput;