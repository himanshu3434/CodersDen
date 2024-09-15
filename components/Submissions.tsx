"use client";
import { SubmissionsDetails } from "@/actions/charts/submissionDetails";
import { AllSubmissionDataType } from "@/types/types";
import React, { useEffect, useState } from "react";
import MaxSubmissionTable from "./MaxSubmissionTable";
import StreakSubmissionTable from "./StreakSubmissionTable";
const union = (arr1: number[], arr2: number[]) => {
  return [...Array.from(new Set([...arr1, ...arr2]))];
};
function Submissions({ user1, user2 }: { user1: string; user2: string }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState<number[]>([2024]);
  const [allSubmissionDetails, setAllSubmissionDetails] =
    useState<AllSubmissionDataType>();
  useEffect(() => {
    const getSubmissions = async () => {
      const allSubmissionDetails = await SubmissionsDetails(user1, user2, year);
      setAllSubmissionDetails(allSubmissionDetails);
      setAvailableYears(
        union(
          allSubmissionDetails.availableYearsUser1,
          allSubmissionDetails.availableYearsUser2
        )
      );
      // console.log("this is all the data ", allSubmissionDetails);
    };

    getSubmissions();
  }, [year]);

  return (
    <div>
      {allSubmissionDetails && (
        <div className="flex flex-col justify-center items-center ">
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div>
            <MaxSubmissionTable
              maxSubmissionDataObj={
                allSubmissionDetails.maxSubmissionDataObjType
              }
              user1={user1}
              user2={user2}
            />
          </div>

          <div>
            <StreakSubmissionTable
              user1={user1}
              user2={user2}
              allSubmissionDetails={allSubmissionDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Submissions;
