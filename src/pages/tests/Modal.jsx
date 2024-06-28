import React from 'react'

const Modal = () => {
    return (
       <div className="container mt-32 px-3 mx-auto">
         <div className="flex flex-col bg-white mx-auto overflow-hidden rounded-3xl border-green-600 border-solid border-[3px] min-w-[320px]">
          <div className="flex gap-5 justify-between px-12 py-6 w-full bg-neutral-100 leading-[140%] md:flex-wrap md:px-5 md:max-w-full">
            <div className="flex gap-5 justify-between">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ffcd93056fb1bd87dc7c280375367615c23ce66452a33299411d6bbe4217d8f8?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ffcd93056fb1bd87dc7c280375367615c23ce66452a33299411d6bbe4217d8f8?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ffcd93056fb1bd87dc7c280375367615c23ce66452a33299411d6bbe4217d8f8?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ffcd93056fb1bd87dc7c280375367615c23ce66452a33299411d6bbe4217d8f8?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ffcd93056fb1bd87dc7c280375367615c23ce66452a33299411d6bbe4217d8f8?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ffcd93056fb1bd87dc7c280375367615c23ce66452a33299411d6bbe4217d8f8?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ffcd93056fb1bd87dc7c280375367615c23ce66452a33299411d6bbe4217d8f8?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ffcd93056fb1bd87dc7c280375367615c23ce66452a33299411d6bbe4217d8f8?apiKey=5f2b5e956dbf4fa686f177a54d164696&"
                className="shrink-0 w-16 aspect-square"
              />
              <div className="flex flex-col my-auto">
                <div className="text-2xl font-semibold text-neutral-900">
                  Noah Anderson
                </div>
                <div className="mt-1 text-base font-medium text-neutral-400">
                  Offline
                </div>
              </div>
            </div>
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&"
              className="shrink-0 my-auto aspect-[0.88] w-[49px]"
            />
          </div>
          <div className="flex flex-col items-center self-center p-6 mt-8 w-full font-medium bg-white rounded-2xl border px-5  border-neutral-400 border-opacity-30 min-w-[360px] max-md:px-5 max-md:max-w-full">
            <div className="justify-center self-center px-8 py-2.5 text-lg leading-7 bg-white rounded-lg shadow-sm text-stone-500 max-md:px-5">
              MAY 2023
            </div>
            <div className="flex flex-col mt-6 self-start max-w-full text-stone-500 w-[464px]">
              <div className="justify-center px-8 py-4 text-lg leading-7 rounded-3xl bg-neutral-100 max-md:px-5 max-md:max-w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                vehicula congue leo, in sagittis purus scelerisque.
              </div>
              <div className="mt-3 text-base leading-6 max-md:max-w-full">
                12:00 pm
              </div>
            </div>
            <div className="flex flex-col self-end mt-2 max-w-full w-[464px]">
              <div className="justify-center px-8 py-4 text-lg leading-7 text-white bg-green-600 rounded-3xl max-md:px-5 max-md:max-w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                vehicula congue leo, in sagittis purus scelerisque.
              </div>
              <div className="self-end mt-3 text-base leading-6 text-stone-500">
                12:00 pm
              </div>
            </div>
            <div className="flex flex-col self-start mt-2 max-w-full text-stone-500 w-[464px]">
              <div className="justify-center px-8 py-4 text-lg leading-7 rounded-3xl bg-neutral-100 max-md:px-5 max-md:max-w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                vehicula congue leo, in sagittis purus scelerisque.
              </div>
              <div className="mt-3 text-base leading-6 max-md:max-w-full">
                12:00 pm
              </div>
            </div>
          </div>

          <div className="flex gap-5 items-center px-10 py-5 mt-8 text-base font-medium leading-6 bg-neutral-100 text-stone-500 max-md:flex-wrap max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/005d44799ec391ecc3ae90f68d8a36ad152051bff0b84dcb0002e118f1fd0023?apiKey=5f2b5e956dbf4fa686f177a54d164696&"
              className="shrink-0 self-stretch my-auto w-8 aspect-square"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd7b50e975ea426ddd59e73342a96880a1855dbe4023ad13eae783d1359d4319?apiKey=5f2b5e956dbf4fa686f177a54d164696&"
              className="shrink-0 self-stretch my-auto w-8 aspect-square"
            />
            <div className="flex flex-1 gap-2 justify-between self-stretch px-6 py-4 bg-white rounded-xl max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="my-auto">Type a message here...</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2405cd43fec146f37e65f3401a1e9bbf200d924085a021f83033ee01ccff736?apiKey=5f2b5e956dbf4fa686f177a54d164696&"
                className="shrink-0 w-8 aspect-square"
              />
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/59abfe64fce6554821c8fb254dd477c7c89dfe6775a4f88d664b9443b332ccc5?apiKey=5f2b5e956dbf4fa686f177a54d164696&"
              className="shrink-0 self-stretch my-auto w-8 aspect-square"
            />
          </div>
        </div>
       </div>
      );
}

export default Modal




