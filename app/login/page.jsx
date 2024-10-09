"use client";

import { useEffect } from "react";

export default function Login(){

    useEffect(()=>{
        var nav = document.getElementById("nav");
        nav.style.background = "white";
    },[])

    return(
        <>
        <section class="container min-h-[90vh] bg-gradient-to-br from-orange-600 to-orange-400 flex justify-center items-center">

            <form className="flex flex-col justify-center w-full p-5 bg-white rounded-2xl lg:w-1/3">
                <h1 className="my-2 text-3xl text-center">Login</h1>

                <div className="flex flex-col input-group">
                    <label className="my-2" htmlFor="firstName">Phone:</label>
                    <input className="p-2 border rounded-lg border-blue-950" type="tel" name="phoneNum" id="phoneNum" />
                </div>
                <div className="flex flex-col input-group">
                    <label className="my-2" htmlFor="firstName">Password:</label>
                    <input className="p-2 border rounded-lg border-blue-950" type="password" name="password" id="password" />
                </div>
                <button className="p-2 mt-4 text-white rounded-lg bg-blue-950 hover:bg-blue-900" type="submit">Login</button>

            </form>
        </section>
        </>
    );
}