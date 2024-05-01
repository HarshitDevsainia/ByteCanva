import { Button } from "flowbite-react";
import React from "react";
import {Link} from 'react-router-dom'

export default function CallToAction() {
    return(
        <div className="border-2 border-gray-500 p-3 rounded-tl-3xl rounded-br-3xl flex flex-col md:flex-row">
            <div className=" flex flex-col justify-evenly flex-1 gap-4 p-7">
                <h2 className="text-2xl font-medium">Want to Learn About HTML, CSS and JavaScript By builing fun and engaging projects?</h2>
                <p className=" text-gray-500">Check our Projects and Start building your own project</p>
                <Button gradientDuoTone={'purpleToBlue'}>
                    <a href="https://www.geeksforgeeks.org/top-javascript-projects/" target="_blank" rel="noopener" noreferrer>Top JS Projects Idea</a>
                </Button>
            </div>
            <div className="flex-1 p-7">
                <img className="rounded-tl-3xl rounded-br-3xl" src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221114110410/Top-10-JavaScript-Project-Ideas-For-Beginners-2023.png"/>
            </div>
        </div>
    )
}

