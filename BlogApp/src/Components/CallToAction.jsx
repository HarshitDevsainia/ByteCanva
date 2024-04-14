import { Button } from "flowbite-react";
import React from "react";

export default function CallToAction() {
    return(
        <div className="border-2 border-gray-500 p-3 rounded-tl-3xl rounded-br-3xl flex flex-col md:flex-row">
            <div className=" flex flex-col justify-evenly flex-1 gap-4 p-7">
                <h2 className="text-2xl font-medium">Want to Learn About HTML, CSS and JavaScript By builing fun and engaging projects?</h2>
                <p className=" text-gray-500">Check our 100 Js Project website and Start building your own project</p>
                <Button gradientDuoTone={'purpleToBlue'}>
                    <a href="https://www.100jsprojects.com/" target="_blank" rel="noopener" noreferrer>100 Js Project Website</a>
                </Button>
            </div>
            <div className="flex-1 p-7">
                <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"/>
            </div>
        </div>
    )
}

