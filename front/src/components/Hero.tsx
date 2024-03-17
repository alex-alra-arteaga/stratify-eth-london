"use client";
import Carousel from "@/components/Carousel";
import { FaAngleDoubleDown } from "react-icons/fa";
import { useDynamicContext, UserProfile } from "@dynamic-labs/sdk-react-core";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";

export default function Hero() {
  const [data, setData] = useState<UserProfile | undefined>();
  const { user, setShowAuthFlow } = useDynamicContext();

  useEffect(() => {
    setData(user);
  }, [user]);

  return (
    <section
      className="flex items-center justify-center min-h-screen w-full"
      id="home"
    >
      <div className="lg:px-6 xl:px-0">
        <NavBar />
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
                {data
                  ? (
                    <a
                      className="w-52 rounded-md bg-gradient-to-r from-green-500 via-blue-600 to-indigo-400 inline-block p-5 text-white text-xl text-center border-blue-600 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:via-green-400 hover:to-indigo-300"
                      href="/app"
                    >
                      Launch App
                    </a>
                  )
                  : (
                    <button
                      className="w-52 rounded-md bg-gradient-to-r from-green-500 via-blue-600 to-indigo-400 inline-block p-5 text-white text-xl text-center border-blue-600 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:via-green-400 hover:to-indigo-300"
                      onClick={() => setShowAuthFlow(true)}
                    >
                      Start Now
                    </button>
                  )}
                <button className="w-52 rounded-md bg-indigo-400 p-5 text-white transition-all duration-300 hover:bg-blue-400 text-xl">
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
