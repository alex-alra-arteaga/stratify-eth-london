"use client";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useDynamicContext, UserProfile } from "@dynamic-labs/sdk-react-core";

export default function NavBar() {
  const [data, setData] = useState<UserProfile | undefined>(undefined);
  const [show, setShow] = useState<boolean | null>(null);
  const { user, setShowAuthFlow, handleLogOut } = useDynamicContext();

  useEffect(() => {
    setData(user);
  }, [user]);

  return (
    <>
      <div className="container mx-auto relative z-20">
        <nav className="w-full absolute">
          <div className="hidden lg:flex w-full f-f-p justify-between items-center py-6 relative">
            <div className="w-2/3">
              <a href="/" className="font-5xl font-bold">Stratify</a>
            </div>
            <div className="md:w-1/2 xl:w-1/3">
              <div className="flex gap-[25px] w-full items-center text-gray-600">
                <div className="border-b-4 border-transparent pb-1">
                  <a href="#home">Home</a>
                </div>
                <div className="border-b-4 border-transparent pb-1">
                  <a href="#features">Features</a>
                </div>
                <div className="border-b-4 border-transparent pb-1">
                  <a href="#plans">Plans</a>
                </div>
                <div className="border-b-4 border-transparent pb-1">
                  <a href="#faq">FAQ</a>
                </div>
                {data && (
                  <div className="border-b-4 border-transparent pb-1">
                    <a href="/create">Create</a>
                  </div>
                )}
                <div className="border-b-4 border-transparent pb-1">
                  {data
                    ? (
                      <div className="flex flex-row items-center justify-center gap-5 h-10">
                        <div className="w-22 h-auto py-2 px-3 bg-blue-600 text-white rounded-lg">
                          <span>
                            {data.email}
                          </span>
                        </div>
                        <div
                          onClick={() => {
                            handleLogOut();
                            setData(undefined);
                          }}
                          className="p-3 h-full rounded-md hover:cursor-pointer hover:bg-gray-300 flex items-center justify-center"
                        >
                          <span className="mr-4">Exit</span>
                          <MdLogout className="text-white" />
                        </div>
                      </div>
                    )
                    : (
                      <div>
                        <button
                          onClick={() => setShowAuthFlow(true)}
                          className="bg-blue-600 py-2 px-3 w-22 rounded-md text-white"
                        >
                          Log In
                        </button>
                      </div>
                    )}
                </div>
              </div>
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
                  <div className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                    <a href="#home">
                      <span className="ml-2 font-bold">Home</span>
                    </a>
                  </div>
                  <div className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none  justify-center">
                    <a href="#features">
                      <span className="ml-2 font-bold">Features</span>
                    </a>
                  </div>
                  <div className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700  items-center focus:text-indigo-700 focus:outline-none">
                    <a href="#plans">
                      <span className="ml-2 font-bold">Plans</span>
                    </a>
                  </div>
                  <div className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none  justify-center">
                    <a href="#faq">
                      <span className="ml-2 font-bold">FAQ</span>
                    </a>
                  </div>
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
    </>
  );
}
