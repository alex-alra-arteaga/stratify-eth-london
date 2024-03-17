import React from "react";
import { FaBook, FaChartLine, FaGear, FaScrewdriver } from "react-icons/fa6";
import { FaMoneyBillAlt, FaUniversity } from "react-icons/fa";

export default function Features() {
  return (
    <div
      className="max-w-7xl mx-auto font-[sans-serif] text-[#333] mt-20"
      id="features"
    >
      <div className="flex items-center justify-center">
        <div className="w-full px-4 flex items-center justify-center">
          <div className="mb-[60px] max-w-[520px] text-center lg:mb-20">
            <span className="mb-2 block text-lg font-semibold text-primary text-blue-500">
              Features
            </span>
            <h2 className="mb-4 text-3xl font-bold text-dark sm:text-[40px]/[48px]">
              What makes us unique?
            </h2>
            <p className="text-base text-body-color">
              We are the first asset management product with no counterparty risk by design.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-md text-white bg-blue-300 lg:h-12 lg:w-12">
            <FaChartLine className="text-2xl" />
          </div>
          <h3 className="mb-2 text-xl font-bold">
            Alignment
          </h3>
          <p className="text-gray-500">
            Strategies creators only make money if you do.
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-md text-white bg-blue-300 lg:h-12 lg:w-12">
            <FaUniversity className="text-2xl" />
          </div>
          <h3 className="mb-2 text-xl font-bold">Security</h3>
          <p className="text-gray-500">
            Your funds are secured by code audited by top talent, we are MICA compliant and non-custodial.
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-md text-white bg-blue-300 lg:h-12 lg:w-12">
            <FaGear className="text-2xl" />
          </div>
          <h3 className="mb-2 text-xl font-bold">
            Investment Automation
          </h3>
          <p className="text-gray-500">
            Deposit or create your own strategies and let the system do the rest.
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-md text-white bg-blue-300 lg:h-12 lg:w-12">
            <FaMoneyBillAlt className="text-2xl" />
          </div>
          <h3 className="mb-2 text-xl font-bold">
            Finance
          </h3>
          <p className="text-gray-500">
            Only riches could get you to launch your own hedge fund, now you can do it with a few clicks.
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-md text-white bg-blue-300 lg:h-12 lg:w-12">
            <FaBook className="text-2xl" />
          </div>
          <h3 className="mb-2 text-xl font-bold">
            Academic Research
          </h3>
          <p className="text-gray-500">
            We offer open data on multi-year immutable strategies and their performance.
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-md text-white bg-blue-300 lg:h-12 lg:w-12">
            <FaScrewdriver className="text-2xl" />
          </div>
          <h3 className="mb-2 text-xl font-bold">
            Operations
          </h3>
          <p className="text-gray-500">
            Our SDK abstracts the complexity of blockchain and allows you to focus on your strategy.
          </p>
        </div>
      </div>
    </div>
  );
}
