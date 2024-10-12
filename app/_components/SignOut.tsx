"use client"

import {signOut } from "next-auth/react";

const SignOut = () =>{
    return(
        <button type="button" onClick={()=>signOut()} className="w-full py-2 px-4 bg-sky-500 text-white rounded-md shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"

> Sign Out </button>
    );
};

export default SignOut;