import { IoMdCheckmark } from "react-icons/io";
import { PiProhibitBold } from "react-icons/pi";

export default function Plans() {
  return (
    <div className="bg-white :bg-gray-900 mt-10" id="plans">
      <div className="container px-6 pt-8 mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary text-blue-500">
                Plans
              </span>
              <h2 className="mb-4 text-3xl font-bold text-dark sm:text-[40px]/[48px]">
                Choose the plan that fits you best
              </h2>
              <p className="text-base text-body-color">
                Start your journey with us aligning our services to your needs.
              </p>
            </div>
          </div>
        </div>
        <div className="xl:items-center xl:-mx-8 xl:flex">
          <div className="flex-1 xl:mx-8">
            <div className="mt-8 space-y-8 md:-mx-4 md:flex md:items-center md:justify-center md:space-y-0 xl:mt-0">
              <div className="max-w-sm mx-auto border rounded-lg md:mx-4 :border-gray-700 h-[600px]">
                <div className="p-6">
                  <h1 className="text-xl font-medium text-gray-700 capitalize lg:text-2xl :text-white">
                    Inversor
                  </h1>
                  <p className="my-4 text-gray-500 :text-gray-300">
                    From crypto assets to real estate, passing through
                    securities and commodities, we have the best investment
                    strategies.
                  </p>
                  <a
                    href="/app"
                    className="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                  >
                    Just take a look
                  </a>
                </div>
                <hr className="border-gray-200 :border-gray-700" />
                <div className="p-6">
                  <h1 className="text-lg font-medium text-gray-700 capitalize lg:text-xl :text-white">
                    What&apos;s included:
                  </h1>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center">
                      <IoMdCheckmark />
                      <span className="mx-4 text-gray-700 :text-gray-300">
                        Unrestricted access to the best performing strategies
                      </span>
                    </div>
                    <div className="flex items-center">
                      <IoMdCheckmark />
                      <span className="mx-4 text-gray-700 :text-gray-300">
                        Own analytics platform
                      </span>
                    </div>
                    <div className="flex items-center">
                      <IoMdCheckmark />
                      <span className="mx-4 text-gray-700 :text-gray-300">
                        Chat support
                      </span>
                    </div>
                    <div className="flex items-center">
                      <IoMdCheckmark />
                      <span className="mx-4 text-gray-700 :text-gray-300">
                        Share your portfolio on social
                      </span>
                    </div>
                    <div className="flex items-center">
                      <PiProhibitBold />
                      <span className="mx-4 text-gray-700 :text-gray-300">
                        Pro Terminal
                      </span>
                    </div>
                    <div className="flex items-center">
                      <PiProhibitBold />
                      <span className="mx-4 text-gray-700 :text-gray-300">
                        Investment Vehicle Aggregator offerings
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-sm mx-auto border rounded-lg md:mx-4 :border-gray-700 h-[600px]">
                <div className="p-6">
                  <h1 className="text-xl font-medium text-gray-700 capitalize lg:text-2xl :text-white">
                    Developer
                  </h1>
                  <p className="my-4 text-gray-500 :text-gray-300">
                    Unlimited creativity on reliable data, from macroeconomic
                    indicators to news, with AI and Machine Learning tools.
                  </p>
                  <a
                    href="/create"
                    className="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                  >
                    Start building today
                  </a>
                </div>
                <hr className="border-gray-200 :border-gray-700" />
                <div className="p-6">
                  <h1 className="text-lg font-medium text-gray-700 capitalize lg:text-xl :text-white">
                    What&apos;s included:
                  </h1>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center">
                      <IoMdCheckmark />
                      <span className="mx-4 text-gray-700 :text-gray-300">
                        CEX and DEX APIs
                      </span>
                    </div>
                    <div className="flex items-center">
                      <IoMdCheckmark />
                      <span className="mx-4 text-gray-700 :text-gray-300">
                        Morpho Lending and Borrowing SDKs
                      </span>
                    </div>
                    <div className="flex items-center">
                      <IoMdCheckmark />
                      <span className="mx-4 text-gray-700 :text-gray-300">
                        Portable IFrames
                      </span>
                    </div>
                    <div className="flex items-center">
                      <IoMdCheckmark />
                      <span className="mx-4 text-gray-700 :text-gray-300">
                        Stratify Team Consulting
                      </span>
                    </div>
                    <div className="flex items-center">
                      <IoMdCheckmark />
                      <span className="mx-4 text-gray-700 :text-gray-300">
                        Partner with Financial Institutions
                      </span>
                    </div>
                    <div className="flex items-center">
                      <IoMdCheckmark />
                      <span className="mx-4 text-gray-700 :text-gray-300">
                        Variety of benefit fees
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
