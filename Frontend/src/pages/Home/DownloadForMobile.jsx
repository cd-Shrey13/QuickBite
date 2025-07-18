// import React from 'react'
// import { assets } from '../../assets/assets'

// function DownloadForMobile() {
//     return (
//         <section className="w-full bg-(--color-creme) p-4">
//             <div class="w-full rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm sm:p-8 dark:border-gray-700 dark:bg-gray-800">
//                 <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
//                     Order your food on the Go
//                 </h5>
//                 <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
//                     Download QuickBite app on iOS & Android today.
//                 </p>
//                 <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse gap-x-4">
//                     <a
//                         href="#"
//                         class="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 focus:outline-none sm:w-auto dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
//                     >
//                         <svg
//                             class="me-3 h-7 w-7"
//                             aria-hidden="true"
//                             focusable="false"
//                             data-prefix="fab"
//                             data-icon="apple"
//                             role="img"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 384 512"
//                         >

//                         </svg>
//                         <div class="text-left rtl:text-right">
//                             <div class="mb-1 text-xs">Download on the</div>
//                             <div class="-mt-1 font-sans text-sm font-semibold">
//                                 Mac App Store
//                             </div>
//                         </div>
//                     </a>
//                     <a
//                         href="#"
//                         class="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 focus:outline-none sm:w-auto dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
//                     >
//                         <svg
//                             class="me-3 h-7 w-7"
//                             aria-hidden="true"
//                             focusable="false"
//                             data-prefix="fab"
//                             data-icon="google-play"
//                             role="img"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 512 512"
//                         >
//
//                         </svg>
//                         <div class="text-left rtl:text-right">
//                             <div class="mb-1 text-xs">Get in on</div>
//                             <div class="-mt-1 font-sans text-sm font-semibold">
//                                 Google Play
//                             </div>
//                         </div>
//                     </a>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default DownloadForMobile

import React from 'react'
import { assets } from '../../assets/assets'

function DownloadForMobile() {
    return (
        <section className="w-full bg-[#fdf3e7] px-4 py-10">
            <div className="mx-auto w-full max-screen-xl rounded-2xl border border-[#f3e1c7] bg-[#fffaf4] p-6 text-center shadow-md sm:p-10">
                <h5 className="mb-2 text-3xl font-bold text-[#2c2c2c]">
                    Order your food on the Go
                </h5>
                <p className="mb-6 text-base text-gray-600 sm:text-lg">
                    Download QuickBite app on iOS & Android today.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
                    {/* Apple Store */}
                    <a
                        href="#"
                        className="inline-flex items-center justify-center gap-3 rounded-lg bg-black px-5 py-3 text-white shadow transition hover:bg-gray-800 sm:w-auto"
                    >
                        <svg
                            className="h-6 w-6"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            fill="currentColor"
                        >
                            <path
                                fill="currentColor"
                                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                            ></path>
                        </svg>
                        <div className="text-left">
                            <div className="text-xs">Download on the</div>
                            <div className="-mt-1 text-sm font-semibold">
                                Mac App Store
                            </div>
                        </div>
                    </a>

                    {/* Google Play */}
                    <a
                        href="#"
                        className="inline-flex items-center justify-center gap-3 rounded-lg bg-green-600 px-5 py-3 text-white shadow transition hover:bg-green-700 sm:w-auto"
                    >
                        <svg
                            className="h-6 w-6"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="currentColor"
                        >
                            <path
                                fill="currentColor"
                                d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                            ></path>
                        </svg>
                        <div className="text-left">
                            <div className="text-xs">Get it on</div>
                            <div className="-mt-1 text-sm font-semibold">
                                Google Play
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default DownloadForMobile
