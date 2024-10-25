import React from 'react'
import { IoMenu } from "react-icons/io5";


export default function NavBar() {
    return (
        <div>
            <div className='fixed top-0 left-0 right-0 justify-between items-center bg-orange-100 px-4 md:px-20 h-16 border-b-8 border-orange-200/50'>
                <h1 className='text-orange-500 mt-4  text-xl cursor-default'>Pierre-Andre-<span className='font-bold'>FOOD</span></h1>
                {/* <IoMenu className='text-3xl text-gray-600 cursor-pointer'/> */}
            </div>
        </div>
    )
}
