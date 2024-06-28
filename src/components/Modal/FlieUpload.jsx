import React from 'react'
import { CiImageOn, CiVideoOn } from 'react-icons/ci';
import { IoDocumentTextOutline } from 'react-icons/io5';

const FlieUpload = ({ isOpen, onClose, onFileSelect }) => {
    if (!isOpen) return null;

    return (
      <div  onClick={onClose} className="fixed  max-sm:top-[250px] lg:top-[215px] md:top-[215px] right-[40%] md:right-[60%] lg:right-[60%] inset-0 z-50 flex items-center justify-center">
        <div className="bg-white flex flex-col items-center justify-center border-2 border-neutral-300  p-4 rounded-lg shadow-lg w-[239px] h-auto">
          {/* <h2 className="text-lg font-semibold mb-4">Upload</h2> */}
          <div className="flex flex-col  w-full gap-4">
            <button
              onClick={() => onFileSelect('image/*')}
              className=" flex items-start gap-3 text-neutral-700  rounded-lg"
            >
                <CiImageOn className='text-[26px] text-neutral-700' />
              Photos
            </button>
            <button
              onClick={() => onFileSelect('video/*')}
              className=" flex items-start gap-3 text-neutral-700  rounded-lg"
            >
                <CiVideoOn className='text-[26px] text-neutral-700' />
              Videos
            </button>
            <button
              onClick={() => onFileSelect('.pdf,.doc,.docx')}
              className=" flex items-start gap-3 text-neutral-700  rounded-lg"
            >
                <IoDocumentTextOutline  className='text-[26px] text-neutral-700'/>
              Documents
            </button>
          </div>
          {/* <button
            onClick={onClose}
            className="mt-4 bg-gray-500 text-white  rounded-lg"
          >
            Close
          </button> */}
        </div>
      </div>
    );
}

export default FlieUpload


