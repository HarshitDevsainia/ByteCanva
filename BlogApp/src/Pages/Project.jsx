import React from "react";
import CallToAction from '../Components/CallToAction'

export default function project() {
    return(
        <>
          <div className=" min-h-screen flex flex-col gap-4 items-center justify-center">
            <h1 className="text-2xl font-semibold text-center">Projects</h1>
            <p className="text-md text-center text-gray-500 dark:text-white">Build Fun and Engaging while learning HTML,CSS,JavaScript</p>
            <div className=" max-w-3xl"><CallToAction/></div>
          </div>
        </>
    )
}