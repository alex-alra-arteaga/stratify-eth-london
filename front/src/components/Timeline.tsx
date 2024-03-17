export default function Timeline() {
  return (
    <ol className="relative border-s border-gray-200 :border-gray-700">
      <li className="mb-10 ms-4">
        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white :border-gray-900 :bg-gray-700">
        </div>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 :text-gray-500">
          Step One
        </time>
        <h3 className="text-lg font-semibold text-gray-900 :text-white">
          Study the market
        </h3>
        <p className="mb-4 text-base font-normal text-gray-500 :text-gray-400">
          Cryptocurrency trading is a complex market. It is paramount to make
          the right decisions and have the right tools to be successful.
        </p>
      </li>
      <li className="mb-10 ms-4">
        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white :border-gray-900 :bg-gray-700">
        </div>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 :text-gray-500">
          Step Two
        </time>
        <h3 className="text-lg font-semibold text-gray-900 :text-white">
          Create the strategy
        </h3>
        <p className="text-base font-normal text-gray-500 :text-gray-400">
          Use the code editor to create your strategy. Use our sdk to get
          real-time data and execute your orders when conditions are met.
        </p>
      </li>
      <li className="ms-4">
        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white :border-gray-900 :bg-gray-700">
        </div>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 :text-gray-500">
          Step Three
        </time>
        <h3 className="text-lg font-semibold text-gray-900 :text-white">
          Deploy your strategy
        </h3>
        <p className="text-base font-normal text-gray-500 :text-gray-400">
          Verify your identity with WorldCoin and deploy your strategy to the
          market. Monitor your strategy and earn money.
        </p>
      </li>
    </ol>
  );
}
