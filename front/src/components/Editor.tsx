"use client";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import WorldCoin from "./WorldCoin";
import Timeline from "./Timeline";

export default function IDE() {
  const { user } = useDynamicContext();
  const [person, setPerson] = useState(false);

  useEffect(() => {
    if (!user) {
      location.href = "/";
    }
  }, [user]);

  return (
    <div className="flex justify-center items-start pt-28 h-screen mx-20">
      <div className="mx-auto mb-[10px] max-w-[520px] text-center lg:mb-7 flex items-center justify-center flex-col">
        <div className="flex items-center justify-center flex-col gap-5 my-5">
          <span className="mb-2 block text-lg font-semibold text-primary text-blue-500">
            Quick Start
          </span>
          <h2 className="mb-4 text-3xl font-bold text-dark sm:text-[40px]/[48px]">
            Create your strategy
          </h2>
          <Timeline />
        </div>
      </div>
      <div className="w-full max-w-4xl p-4 border">
        <form
          action="#"
          onSubmit={() => void 0}
        >
          <div className="">
            <label htmlFor="comment" className="sr-only">
              Add your code
            </label>
            <Editor
              height="60vh"
              defaultLanguage="javascript"
              defaultValue='import sdk from "jsr:@stratify/core";'
              options={{ fontSize: 20 }}
              className="rounded-md"
            />
          </div>
          <div className="flex items-center justify-center py-2 px-3">
            <div className="flex items-center justify-center flex-row gap-5">
              {person
                ? (
                  <button
                    type="submit"
                    className="bg-blue-600 rounded-md px-3 py-2 text-white font-semibold"
                  >
                    Publish to the market
                  </button>
                )
                : (
                  <WorldCoin
                    onSuccess={() => setPerson(true)}
                    handleVerify={() => void 0}
                  />
                )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
