"use client";
import { useState } from "react";
import Carousel from "@/components/Carousel";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { FaAngleDoubleDown } from "react-icons/fa";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function Hero() {
  const [show, setShow] = useState(false);
  const { setShowAuthFlow } = useDynamicContext();

  return (
    <section className="flex items-center justify-center min-h-screen w-full">
      <div className="lg:px-6 xl:px-0">
        <div className="container mx-auto relative z-20">
          <nav className="w-full absolute">
            <div className="hidden lg:flex w-full f-f-p justify-between items-center py-6 relative">
              <div className="w-2/3">
                <h1 className="font-5xl font-bold">Stratify</h1>
              </div>
              <div className="md:w-1/2 xl:w-1/3">
                <ul className="flex justify-between w-full items-center text-gray-600">
                  <li className="border-b-4 border-indigo-600 pb-1">
                    <a href="#">Home</a>
                  </li>
                  <li className="border-b-4 border-transparent pb-1">
                    <a href="#">Stats</a>
                  </li>
                  <li className="border-b-4 border-transparent pb-1">
                    <a href="#">Coins</a>
                  </li>
                  <li className="border-b-4 border-transparent pb-1">
                    <a href="#">Blog</a>
                  </li>
                  <li className="border-b-4 border-transparent pb-1">
                    <a href="#">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <nav className="lg:hidden">
            <div className="flex py-6 justify-between items-center px-4">
              <div>
                <h1 className="font-5xl font-bold">Stratify</h1>
              </div>
              <div className=" flex items-center">
                {show && (
                  <ul
                    id="list"
                    className=" p-2 border-r bg-white absolute rounded top-0 left-0 right-0 shadow mt-16 md:mt-16"
                  >
                    <li className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                      <a href="#">
                        <span className="ml-2 font-bold">Home</span>
                      </a>
                    </li>
                    <li className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none  justify-center">
                      <a href="#">
                        <span className="ml-2 font-bold">Stats</span>
                      </a>
                    </li>
                    <li className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700  items-center focus:text-indigo-700 focus:outline-none">
                      <a href="#">
                        <span className="ml-2 font-bold">Coins</span>
                      </a>
                    </li>
                    <li className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none  justify-center">
                      <a href="#">
                        <span className="ml-2 font-bold">Blog</span>
                      </a>
                    </li>
                    <li className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal pt-2 pb-4 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none  justify-center">
                      <a href="#">
                        <span className="ml-2 font-bold">About Us</span>
                      </a>
                    </li>
                  </ul>
                )}
                <div className="xl:hidden" onClick={() => setShow(!show)}>
                  {show
                    ? <RxCross2 className="text-3xl" />
                    : <GiHamburgerMenu className="text-3xl" />}
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="mx-auto container relative z-0 px-4 xl:px-0">
          <div className="flex flex-col-reverse md:flex-row">
            <div className="md:w-3/5 md:pt-24 pb-10 lg:py-32 xl:py-48">
              <h1 className="text-3xl lg:text-6xl xl:text-8xl font-black text-gray-900 text-center md:text-left tracking-tighter f-f-i md:w-7/12 text-heading-color">
                Strategies are now{" "}
                <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                  hella cool
                </span>
              </h1>
              <h2 className="md:w-8/12 py-4 text-center md:text-left md:py-8 text-gray-700 text-lg lg:text-2xl">
                Plain and simple description that is eye catching and
                informative.
              </h2>
              <div className="w-full flex justify-start items-center flex-row gap-5">
                <button
                  className="w-52 rounded-md bg-blue-600 border-2 border-blue-600 p-5 text-white transition-all duration-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white text-xl"
                  onClick={() => setShowAuthFlow(true)}
                >
                  Start Now
                </button>
                <button className="w-52 rounded-md bg-white border-2 border-blue-600 p-5 text-blue-600 transition-all duration-300 hover:bg-blue-100 hover:border-blue-700 hover:text-blue-700 text-xl">
                  More info
                </button>
              </div>
            </div>
            <div className="w-1/2 sm:w-2/5 h-[30rem] m-auto flex items-center overflow-hidden">
              <Carousel />
            </div>
          </div>
        </div>
        <div className="w-full h-5 flex items-center justify-center cursor-pointer">
          <FaAngleDoubleDown className="bottom-0 text-4xl text-blue-600 absolute animate-bounce mb-10" />
        </div>
      </div>
    </section>
  );
}
