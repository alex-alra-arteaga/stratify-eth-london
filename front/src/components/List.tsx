"use client";
import { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, plugins, registerables } from "chart.js";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

Chart.register(...registerables);

interface IStrategy {
  name: string;
  symbol: string;
  marketCap: number;
  description: string;
  data: number[];
  disabled?: boolean;
}

function Strategy(
  { name, symbol, marketCap, description, data, disabled = false }: IStrategy,
) {
  const [open, setOpen] = useState(false);
  const [follow, setFollow] = useState(false);
  const days = [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun",
  ];
  const goBackDays = 7;

  return (
    <>
      {open && (
        <>
          <div
            id="crud-modal"
            tabIndex={-1}
            aria-hidden="false"
            className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-black bg-opacity-25 z-50"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow :bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t :border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 :text-white">
                    Invest in <span className="font-bold">{symbol}</span>
                  </h3>
                  <button
                    onClick={() => setOpen(false)}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center :hover:bg-gray-600 :hover:text-white"
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 :text-white">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                        placeholder="2999"
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 :text-white">
                        Currency
                      </label>
                      <select
                        id="currency"
                        defaultValue={"Select a currency"}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                      >
                        <option value="FIAT_USD">USD</option>
                        <option value="FIAT_EUR">EUR</option>
                        <option value="FIAT_GBP">GBP</option>
                        <option value="NATIVE_ETH">ETH</option>
                        <option value="NATIVE_BTC">BTC</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 :text-white">
                        Asset distribution
                      </label>
                      <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500">
                        <Doughnut
                          className="w-20 h-auto"
                          data={{
                            labels: [
                              "USDC",
                              "Bitcoin",
                            ],
                            datasets: [
                              {
                                label: " Units ",
                                data: [65, 35],
                                backgroundColor: [
                                  "#2272c2",
                                  "#f7931a",
                                ],
                                hoverOffset: 4,
                              },
                            ],
                          }}
                          options={{
                            plugins: {
                              legend: {
                                display: false,
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 :text-white">
                        Disclaimer
                      </label>
                      <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500">
                        By clicking the "Invest" button, you agree to our{" "}
                        <span className="text-blue-500">
                          terms and conditions
                        </span>{" "}
                        and forfeit any right to a refund. Remember that
                        cryptocurrency investments are high-risk assets. Please
                        be mindful of this and proceed with caution.
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-center flex-row gap-5">
                    <button
                      className="text-white inline-flex items-center bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-white inline-flex items-center bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800"
                    >
                      Invest
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        className={`flex flex-row justify-between p-5 rounded-md gap-5 ${
          disabled ? "opacity-55 hover:cursor-not-allowed" : ""
        }`}
      >
        <div className="w-[30%] border-2 rounded-md p-2 h-full relative">
          <Line
            data={{
              labels: Array.from({ length: goBackDays }, (_, i) => {
                const newDate = new Date();
                newDate.setDate(
                  new Date().getDate() - i - 1 + Math.floor(Math.random() * 6) +
                    2,
                );
                return days[newDate.getDay()];
              }).reverse(),
              datasets: [
                {
                  label: `${symbol} - USD`,
                  data,
                  fill: false,
                  backgroundColor: disabled
                    ? "gray"
                    : data.at(0)! < data.at(-1)!
                    ? "rgba(34,139,34,0.2)"
                    : "rgba(255,0,0,0.2)",
                  borderColor: disabled
                    ? "gray"
                    : data.at(0)! < data.at(-1)!
                    ? "green"
                    : "red",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: false,
                },
              },
            }}
          />
        </div>
        <div className="w-[80%] rounded-md border-2 border-gray-200 flex items-center justify-center gap-5">
          <div className="w-full m-5 rounded-md flex items-center justify-center flex-row gap-5 p-2">
            <div className="w-[80%] h-auto flex flex-col">
              <h1 className="text-2xl mb-2 font-semibold">
                {disabled ? "Coming soon..." : `${name} - USD ${marketCap} $`}
              </h1>
              <p>
                {disabled
                  ? `This strategy will be revealed soon, no longer than one month. Please be patient. Sorry for the inconvenience.`
                  : description}
              </p>
            </div>
            <div className="w-[20%] h-auto flex items-center justify-center gap-5 flex-col">
              <div className="relative">
                <button
                  className={`${
                    disabled
                      ? "bg-gray-600 hover:cursor-not-allowed"
                      : "bg-green-500 hover:cursor-pointer"
                  } py-2 px-3 rounded-md text-white w-24`}
                  onClick={() => setOpen(true)}
                  disabled={disabled}
                >
                  Buy
                </button>
              </div>
              <div className="relative">
                <button
                  className={`${
                    disabled
                      ? "bg-gray-600 hover:cursor-not-allowed"
                      : "bg-blue-500 hover:cursor-pointer"
                  } py-2 px-3 rounded-md text-white w-24 ${
                    follow ? "opacity-55 hover:cursor-not-allowed" : ""
                  }`}
                  disabled={disabled || follow}
                  onClick={() => setFollow(true)}
                >
                  {follow ? "Following" : "Follow"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function List() {
  const { user } = useDynamicContext();

  useEffect(() => {
    if (!user) {
      location.href = "/";
    }
  }, []);

  return (
    <section className="flex items-center justify-center w-full">
      <div className="md:w-3/5 md:pt-24 pb-10 lg:pt-32 xl:pt-48 flex items-center justify-center w-full flex-col gap-5">
        <div className="w-full pt-4">
          <div className="mx-auto mb-[10px] max-w-[520px] text-center lg:mb-7">
            <span className="mb-2 block text-lg font-semibold text-primary text-blue-500">
              Strategies
            </span>
            <h2 className="mb-4 text-3xl font-bold text-dark sm:text-[40px]/[48px]">
              Invest effortlessly
            </h2>
            <p className="text-base text-body-color">
              Choose the strategy that best suits your investment profile and
              start investing in the best cryptocurrencies. All from the same
              place.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full py-5 gap-5 h-full">
          <Strategy
            name="Test Stake"
            symbol="TSK"
            marketCap={145111}
            description="The best strategy for you to invest in COIN. The aim of the strategy is to generate yields. What else would it be?"
            data={[100, 250, 200, 450, 800, 600, 725]}
          />
          <Strategy
            name="Shiba Doge"
            symbol="SHIB"
            marketCap={129401}
            description="The best strategy for you to invest in COIN. The aim of the strategy is to generate yields. What else would it be?"
            data={[100, 210, 100, 301, 230, 100, 325]}
            disabled
          />
          <Strategy
            name="Ethereum Global"
            symbol="ETHG"
            marketCap={223401}
            description="A way to invest in Ethereum. The strategy aims to generate yields and increase the value of your investment."
            data={[600, 550, 500, 350, 500, 400, 720]}
            disabled
          />
          <Strategy
            name="Gold to the moon"
            symbol="GTTM"
            marketCap={15441}
            description="Matching gold with Bitcoin. The main goal is to increase the profit generated and the value of the investment."
            data={[1000, 900, 600, 100, 150, 155, 315]}
            disabled
          />
        </div>
      </div>
    </section>
  );
}
