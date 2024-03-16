import React from "react";
import { FaBook, FaChartLine, FaGear, FaScrewdriver } from "react-icons/fa6";
import { FaMoneyBillAlt, FaUniversity } from "react-icons/fa";

export default function Features() {
  return (
    <div className="max-w-7xl mx-auto font-[sans-serif] text-[#333] mt-20">
      <div className="flex items-center justify-center">
        <div className="w-full px-4 flex items-center justify-center">
          <div className="mb-[60px] max-w-[520px] text-center lg:mb-20">
            <span className="mb-2 block text-lg font-semibold text-primary text-blue-500">
              Features
            </span>
            <h2 className="mb-4 text-3xl font-bold text-dark sm:text-[40px]/[48px]">
              What differentiates us?
            </h2>
            <p className="text-base text-body-color">
              Speaking of features, here are some of the things that make our
              product stand out. Dwell on these and see if they resonate with
              your needs.
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
            Marketing
          </h3>
          <p className="text-gray-500">
            Plan it, create it, launch it. Collaborate seamlessly with all the
            organization and hit your marketing goals every month with our
            marketing plan.
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-md text-white bg-blue-300 lg:h-12 lg:w-12">
            <FaUniversity className="text-2xl" />
          </div>
          <h3 className="mb-2 text-xl font-bold">Legal</h3>
          <p className="text-gray-500">
            Protect your organization, devices and stay compliant with our
            structured workflows and custom permissions made for you.
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-md text-white bg-blue-300 lg:h-12 lg:w-12">
            <FaGear className="text-2xl" />
          </div>
          <h3 className="mb-2 text-xl font-bold">
            Business Automation
          </h3>
          <p className="text-gray-500">
            Auto-assign tasks, send Slack messages, and much more. Now power up
            with hundreds of new templates to help you get started.
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
            Audit-proof software built for critical financial operations like
            month-end close and quarterly budgeting.
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-md text-white bg-blue-300 lg:h-12 lg:w-12">
            <FaBook className="text-2xl" />
          </div>
          <h3 className="mb-2 text-xl font-bold">
            Enterprise Design
          </h3>
          <p className="text-gray-500">
            Craft beautiful, delightful experiences for both marketing and
            product with real cross-company collaboration.
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
            Keep your company’s lights on with customizable, iterative, and
            structured workflows built for all efficient teams and individual.
          </p>
        </div>
      </div>
    </div>
  );
}
