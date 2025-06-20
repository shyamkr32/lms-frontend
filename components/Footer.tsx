import React from 'react'
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='bg-black h-12 flex justify-center items-center '>
        <FaRegCopyright />
        <div>2025 |</div>
        <div>All rights reserved</div>
    </footer>
  )
}

export default Footer