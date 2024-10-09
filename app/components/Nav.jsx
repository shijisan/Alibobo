"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
    const [isInverted, setIsInverted] = useState(false);

    useEffect(() => {
        const nav = document.getElementById("nav");
        if (nav && nav.style.background === "white") {
            setIsInverted(true);  // Set the inverted flag to true
        } else {
            setIsInverted(false);  // Revert to the original colors
        }
    }, []);

    return (
        <>
            <nav
                className={`flex flex-row w-full px-5 py-1 justify-evenly h-[10vh] transition-colors 
                            ${isInverted ? 'bg-white text-orange-400' : 'bg-gradient-to-r from-orange-600 to-orange-400 text-white'}`}
                id="nav"
            >
                <div className="flex items-center justify-center lg:1/3">
                    <span className={`text-2xl font-medium poppins inter ${isInverted ? 'text-orange-400' : 'text-blue-950'}`}>
                        Ali<span>bobo</span>
                    </span>
                </div>

                {!isInverted && (
                    <form className="flex items-center text-black lg:w-1/3 lg:justify-center">
                        <input
                            className="w-5/6 p-2 mx-2 text-black rounded-l-full outline-none roboto focus:ring-3 focus:ring-transparent ring-offset-1 border-blue-950 focus:outline-blue-950 focus:outline-2"
                            placeholder="Search a product or shop"
                            type="search"
                            name="buyerSearch"
                            id="buyerSearch"
                        />

                        <button
                            className="w-1/6 p-2 text-white transition-colors rounded-r-full bg-blue-950 hover:bg-blue-900"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                )}

                <ul className="flex items-center lg:space-x-2 justify-evenly">
                    <li className={`px-3 py-2 transition-colors border rounded-full 
                                    ${isInverted ? 'border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white' : 'border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white'}`}>
                        <a className="w-full h-full font-medium" href="Seller">Start Selling</a>
                    </li>
                    <li className={`px-3 py-2 transition-colors border rounded-full 
                                    ${isInverted ? 'border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white' : 'border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white'}`}>
                        <a className="w-full h-full" href="Cart">
                            <FontAwesomeIcon icon={faCartShopping} />
                        </a>
                    </li>
                    <li className={`px-3 py-2 transition-colors border rounded-full 
                                    ${isInverted ? 'border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white' : 'border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white'}`}>
                        <a className="w-full h-full" href="Profile">
                            <FontAwesomeIcon icon={faUser} />
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
}
