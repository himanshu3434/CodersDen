"use client";
import { SubmissionsDetails } from "@/actions/charts/submissionDetails";
import { MaxSubmissionDataObjType } from "@/types/types";
import React, { useEffect, useState } from "react";
import MaxSubmissionTable from "./MaxSubmissionTable";

function Submissions({ user1, user2 }: { user1: string; user2: string }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [allSubmissionDetails, setAllSubmissionDetails] =
    useState<MaxSubmissionDataObjType>();
  useEffect(() => {
    const getSubmissions = async () => {
      const allSubmissionDetails = await SubmissionsDetails(user1, user2, year);
      setAllSubmissionDetails(allSubmissionDetails);
      console.log("this is all the data ", allSubmissionDetails);
    };

    getSubmissions();
  }, [year]);

  return (
    <div>
      {allSubmissionDetails && (
        <MaxSubmissionTable
          allSubmissionDetails={allSubmissionDetails}
          user1={user1}
          user2={user2}
        />
      )}
    </div>
  );
}

export default Submissions;
