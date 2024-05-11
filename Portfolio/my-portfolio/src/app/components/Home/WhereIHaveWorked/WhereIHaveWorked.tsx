"use client";
import { useState } from "react";
import ArrowIcon from "../../Icons/ArrowIcon";
import { motion } from "framer-motion";
import EnableStartup from "./Descriptions/EnableStartup";
import Smartos from "./Descriptions/Smartos";
import Enouvo from "./Descriptions/Enouvo";

type TJob =
  | "EnableStartup"
  | "Enouvo"
  | "Smartos"
  | "IdealFresh"
  | "Advanced"
  | "Fantasia"
  | "Advanced Agro Management"
  | "SuperBerry";

const WhereIHaveWorked = () => {
  const [descriptionJob, setDescriptionJob] = useState<TJob>("EnableStartup");

  const GetDescription = () => {
    switch (descriptionJob) {
      case "EnableStartup":
        return <EnableStartup />;
      case "Enouvo":
        return <Enouvo />;
      case "Smartos":
        return <Smartos />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-12 bg-transparent">
      <section className="flex flex-row items-center">
        <div className="flex flex-row items-center">
          <ArrowIcon
            className={"flex-none h-4 md:h-6 w-4 md:w-5 text-AAsecondary"}
          />
          <span className="text-AAsecondary font-sans text-sm  sm:text-xl">
            {" "}
            02.
          </span>
        </div>

        <span className="text-gray-200 opacity-85 font-bold tracking-wider text-lg md:text-2xl px-3">
          Where I&apos;ve Worked
        </span>
        <div className="bg-gray-400 h-[0.2px] w-16 sm:w-44 md:w-80"></div>
      </section>
      <section
        className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0
      justify-center md:justify-center items-center md:items-start "
      >
        <CompaniesBar setDescriptionJob={setDescriptionJob} />

        <div className="w-[576px]">{GetDescription()}</div>
      </section>
    </div>
  );
};

export default WhereIHaveWorked;

const CompaniesBar = ({
  setDescriptionJob,
}: {
  setDescriptionJob: (value: TJob) => void;
}) => {
  const [barPosition, setBarPosition] = useState<number>(-8);
  const [barAbovePosition, setBarAbovePosition] = useState<number>(0);

  const [companyNameBackgroundColorGreen, setCompanyNameBackgroundColorGreen] =
    useState<boolean[]>([true, false, false, false, false, false, false]);

  const CompanyButton = ({
    companyName,
    setBarPositionFn,
    setBarAbovePositionFn,
    setDescriptionJobFn,
    buttonOrderOfCompanyNameBackgroundColorGreen,
    companyNameBackgroundColorGreenDefault,
  }: {
    companyName: string;
    setBarPositionFn: () => void;
    setBarAbovePositionFn: () => void;
    setDescriptionJobFn: () => void;
    buttonOrderOfCompanyNameBackgroundColorGreen: number;
    companyNameBackgroundColorGreenDefault: boolean[];
  }) => {
    return (
      <button
        onClick={() => {
          setBarPositionFn();
          setBarAbovePositionFn();
          setDescriptionJobFn();
          setCompanyNameBackgroundColorGreen(
            companyNameBackgroundColorGreenDefault
          );
        }}
        className={`flex-none sm:text-base text-xs text-center md:text-left  hover:text-AAsecondary
             hover:bg-ResumeButtonHover rounded  font-mono  
             py-3 md:pl-6 md:px-4 md:w-44 w-32 duration-500
             ${
               companyNameBackgroundColorGreen[
                 buttonOrderOfCompanyNameBackgroundColorGreen
               ]
                 ? "bg-ResumeButtonHover text-AAsecondary"
                 : "text-gray-500"
             }`}
      >
        {companyName}
      </button>
    );
  };

  return (
    <div
      id="WhereIhaveWorkedSection"
      className=" flex flex-col md:flex-row  w-screen lg:w-auto 
      overflow-auto scrollbar-hide md:overflow-hidden pb-4 md:pb-0 justify-start
       sm:justify-center items-start sm:items-start"
    >
      <div
        className=" hidden md:block bg-gray-500 relative h-0.5 w-34 md:h-[132px] translate-y-1 md:w-0.5  
        rounded md:order-1 order-2  "
      >
        <motion.div
          animate={{ y: barPosition }}
          className={`absolute w-10 h-0.5 md:w-0.5 md:h-[2.8rem] rounded bg-AAsecondary `}
        ></motion.div>
      </div>
      <div className="flex flex-col md:order-2 order-1 space-y-1 pl-8 md:pl-0 ">
        <div className="flex flex-row md:flex-col">
          <CompanyButton
            buttonOrderOfCompanyNameBackgroundColorGreen={0}
            companyName="Enable Startup"
            setBarPositionFn={() => setBarPosition(-5)}
            setBarAbovePositionFn={() => setBarAbovePosition(1)}
            setDescriptionJobFn={() => setDescriptionJob("EnableStartup")}
            companyNameBackgroundColorGreenDefault={[
              true,
              false,
              false,
              false,
              false,
              false,
            ]}
          />
          <CompanyButton
            buttonOrderOfCompanyNameBackgroundColorGreen={1}
            companyName="Enouvo"
            setBarPositionFn={() => setBarPosition(40)}
            setBarAbovePositionFn={() => setBarAbovePosition(129)}
            setDescriptionJobFn={() => setDescriptionJob("Enouvo")}
            companyNameBackgroundColorGreenDefault={[
              false,
              true,
              false,
              false,
              false,
              false,
            ]}
          />
          <CompanyButton
            buttonOrderOfCompanyNameBackgroundColorGreen={2}
            companyName="Smartos"
            setBarPositionFn={() => setBarPosition(80)}
            setBarAbovePositionFn={() => setBarAbovePosition(257)}
            setDescriptionJobFn={() => setDescriptionJob("Smartos")}
            companyNameBackgroundColorGreenDefault={[
              false,
              false,
              true,
              false,
              false,
              false,
            ]}
          />
        </div>
        <div className="block md:hidden h-0.5 rounded bg-gray-500">
          <motion.div
            animate={{ x: barAbovePosition }}
            className="w-[128px] h-0.5 rounded bg-AAsecondary"
          ></motion.div>
        </div>
      </div>
    </div>
  );
};
