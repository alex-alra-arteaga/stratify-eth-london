"use client";
import { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";

function Button({ fn, kind }: { fn: () => void; kind: "plus" | "minus" }) {
  return (
    <div
      className="p-2 rounded-md bg-gray-500 flex items-center justify-center hover:cursor-pointer hover:bg-gray-400 transition-all duration-300 ease-in-out"
      onClick={fn}
    >
      <button className="w-full">
        {kind === "plus" ? <TiPlus /> : <TiMinus />}
      </button>
    </div>
  );
}

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gray-300 rounded-md">
      <div className="flex flex-row gap-3 p-5 items-center justify-center">
        <Button fn={() => setCount(count - 1)} kind="minus" />
        <div className="min-w-10 flex items-center justify-center">
          <p>{count}</p>
        </div>
        <Button fn={() => setCount(count + 1)} kind="plus" />
      </div>
    </div>
  );
}
