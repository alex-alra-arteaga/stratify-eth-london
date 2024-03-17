"use client";
import { useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function IDE() {
  const { user } = useDynamicContext();

  useEffect(() => {
    if (!user) {
      location.href = "/";
    }
  }, [user]);

  return (
    <div className="flex justify-center items-start pt-28 h-screen">
      <div className="w-full max-w-4xl p-4 border">
        <form
          action="#"
          onSubmit={() => {
            location.href = "/";
          }}
        >
          <div className="">
            <label htmlFor="comment" className="sr-only">
              Add your code
            </label>
            <Editor
              height="50vh"
              defaultLanguage="javascript"
              defaultValue='import sdk from "jsr:@stratify/core";'
              options={{ fontSize: 20 }}
            />
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5"></div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
