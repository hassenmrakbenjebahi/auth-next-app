"use client"

import { signIn } from "next-auth/react";
const SignInWithGoogle = () =>{
    return(
        <button type="button" onClick={()=>signIn('google')} className="flex items-center justify-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
               <img
        src="/images/google-icone.svg" 
        alt="Google Icon"
        className="w-5 h-5 mr-2"
      />
             Sign in with Google </button>
    );
};

export default SignInWithGoogle;