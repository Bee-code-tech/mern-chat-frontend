import { BsSend } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { MdZoomOutMap } from "react-icons/md";
import { useRef, useState } from "react";
import Picker from "emoji-picker-react";
import useSendMessage from "../../hooks/useSendMessage";
import { GiSelfLove } from "react-icons/gi";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const fileRef = useRef();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSubmit(e);
    }
  };

  function selectFile() {
    fileRef.current.click();
  }

  function fileSelected(e) {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
  }

  return (
    <form
      className="p-3 bg-neutral-100 gap-0 md:gap-3 lg:gap-3 w-full flex items-center justify-between relative"
      onSubmit={handleSubmit}
    >
      <MdZoomOutMap className="hidden lg:block md:block text-[32px] mr-3 cursor-pointer text-black" />

      <div className="">
        <div className="icons">
          <label htmlFor="file">
            <FaPlus className="h-12 cursor-pointer text-black" />
          </label>
          <input
            type="file"
            id="file"
            ref={fileRef}
            style={{ display: "none" }}
            onClick={selectFile}
            onChange={fileSelected}
          />
        </div>
      </div>

      {file && (
        <div className="absolute right-[70px] bottom-[6px] flex items-center">
          <img
            src={URL.createObjectURL(file)}
            alt="Selected File"
            style={{ height: "30px", width: "auto" }}
          />
        </div>
      )}

      <div className="relative w-[270px] lg:w-[550px] md:w-[450px]">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          className="text-lg rounded-lg block w-full px-3 py-2 bg-white border-2 border-neutral-300 focus:outline-none text-black"
        />
        <span
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <GiSelfLove className="text-neutral-400 font-[32px]" />
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

      <button type="submit" className="flex items-center">
        {loading ? (
          <span className="bg-[#18BB0C] rounded-md p-2 lg:p-3 md:p-3 flex items-center justify-center">
            <div className="loading loading-spinner"></div>
          </span>
        ) : (
          <div className="bg-[#18BB0C] hover:shadow-lg rounded-md p-2 lg:p-3 md:p-3 flex items-center justify-center">
            <BsSend className="text-white text-xl font-bold" />
          </div>
        )}
      </button>
    </form>
  );
};

export default MessageInput;
