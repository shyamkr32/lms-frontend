"use client"
import React,{useState} from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";



const Navbar = () => {
  const [sidebar, setSidebar] = useState(false)

const toogleSidebar =()=>{
    setSidebar(!sidebar)
}

  return (
    <nav className="position fixed top-0 w-[100vw] h-14 bg-black flex justify-between items-center border border-gray-900 px-7">
      <div className="flex gap-4 items-center">
        <FaBars className="cursor-pointer" onClick={toogleSidebar} />
        <Link href={"/"}>
          <div className="hidden sm:block text-xl">Vrixaalabs LMS</div>
        </Link>
      </div>
      <div className="flex gap-4 sm:gap-8">
        <Link href={"/dashboard"}>
          <div className=" rounded-md p-1 hover:bg-zinc-800"> Dashboard</div>{" "}
        </Link>
        <Link href={"/courses"}>
          <div className="rounded-md p-1 hover:bg-zinc-800">Courses</div>{" "}
        </Link>
        <Link href={"/profile"}>
          <div className="rounded-md p-1 hover:bg-zinc-800">Profile</div>{" "}
        </Link>
        <Link href={"/login"}>
          <div className="rounded-md p-1 hover:bg-zinc-800">Log in</div>{" "}
        </Link>
      </div>

      {
        sidebar && <div className="min-h-screen bg-black w-2/3 sm:w-1/4 fixed top-0 left-0 transition duration-1000">
          <RxCross1 className="m-6 text-xl" onClick={toogleSidebar}/>
          <ul className="mx-5 flex flex-col gap-2">
            <li>Your profile</li>
            <li>Setting</li>
            <li>Contact us</li>
            <li>Invite</li>
          </ul>
        </div>
      }

    </nav>
  );
};

export default Navbar;
