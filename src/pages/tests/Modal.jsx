import React from 'react'

const Modal = () => {
  return (
    <div className="container mx-auto w-[300px] lg:w-[60%] mt-32">
      <div className="flex gap-4 items-start px-8 pt-8 text-center text-white bg-green-600 rounded-[32px] max-md:flex-wrap max-md:px-5">
      <div className="flex flex-col self-end mt-8 pb-4 -w-full">
        <div className="self-center text-4xl font-bold leading-[56px]">
          About us
        </div>
        <div className="mt-10 text-lg font-medium leading-9 max-md:max-w-full">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis
          justo vitae risus faucibus, sed interdum felis efficitur. Nunc
          elementum nunc ac ex consequat, a finibus lectus volutpat. Morbi id
          dolor vel nunc pharetra accumsan.
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis
          justo vitae risus faucibus, sed interdum felis efficitur. Nunc
          elementum nunc ac ex consequat, a finibus lectus volutpat. Morbi id
          dolor vel nunc pharetra accumsan.
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis
          justo vitae risus faucibus, sed interdum felis efficitur. Nunc
          elementum nunc ac ex consequat, a finibus lectus volutpat. Morbi id
          dolor vel nunc pharetra accumsan.
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4d54e88e009701d5d12b3d77d0256b2f71c5ecaf134c716bfe20413001ba2c3?apiKey=5f2b5e956dbf4fa686f177a54d164696&"
        className="shrink-0 self-start w-10 aspect-square"
      />
    </div>
    </div>
  );
}

export default Modal







