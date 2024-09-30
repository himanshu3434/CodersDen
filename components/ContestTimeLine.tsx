import * as React from "react";

import { ContestTimeLinePropsType, contestType } from "@/types/types";
// import { LineChart } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts/LineChart";

// Function to merge timestamps and format them
function mergeTimestamps(
  allContestsUser1: contestType[],
  allContestsUser2: contestType[]
) {
  const timestampMap: { [timestamp: number]: boolean } = {};

  // Add timestamps from both users to the map
  allContestsUser1.forEach((contest) => {
    timestampMap[contest.timestamp] = true;
  });
  allContestsUser2.forEach((contest) => {
    timestampMap[contest.timestamp] = true;
  });

  // Convert object keys to an array and sort them
  const sortedTimestamps = Object.keys(timestampMap)
    .map(Number)
    .sort((a, b) => a - b);

  // Convert timestamps to human-readable format (Month Year)
  const formattedTimestamps = sortedTimestamps.map((timestamp) => {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options); // Format date
    return formattedDate;
  });

  return formattedTimestamps;
}
export default function ContestTimeLine({
  user1,
  user2,
  allContestsUser1,
  allContestsUser2,
}: ContestTimeLinePropsType) {
  //   console.log("e1e");
  const xAxisData = mergeTimestamps(allContestsUser1, allContestsUser2);
  // console.log(xAxisData.length);
  const sortedContestsUser1 = allContestsUser1.sort(
    (a, b) => a.timestamp - b.timestamp
  );
  const sortedContestsUser2 = allContestsUser2.sort(
    (a, b) => a.timestamp - b.timestamp
  );
  const mapRatings = (contests: contestType[], xAxisData: string[]) => {
    const ratings: (number | null)[] = [];

    xAxisData.forEach((formattedDate) => {
      const contest = contests.find((contest) => {
        const date = new Date(contest.timestamp * 1000);
        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        const formattedContestDate = date.toLocaleDateString("en-US", options);
        return formattedDate === formattedContestDate;
      });

      if (contest) {
        ratings.push(contest.rating);
      } else {
        ratings.push(null);
      }
    });

    return ratings;
  };

  const user1Rating = mapRatings(sortedContestsUser1, xAxisData);
  const user2Rating = mapRatings(sortedContestsUser2, xAxisData);
  console.log(user1Rating);
  console.log(xAxisData);
  console.log(user2Rating);
  return (
    <div>
      <div className="flex items-center my-8 ">
        <hr className="flex-grow border-t-2 border-semiblack mr-4  " />
        <span className="text-xl font-semibold dark:text-slate-500">
          Timeline
        </span>
        <hr className="flex-grow border-t-2 border-semiblack ml-4" />
      </div>
      <LineChart
        className="dark:bg-semiblack rounded-xl dark:stroke-gray-300 dark:stroke-1"
        xAxis={[
          {
            data: xAxisData,
            scaleType: "point",
            dataKey: "month",
            valueFormatter: (dateString) => {
              // Split the date string into parts
              const [monthDay, year] = dateString.split(", ");
              return `${monthDay}\n${year}`; // Return two lines
            },
            tickLabelInterval(value, index) {
              // Display every 2nd label
              return index % 5 === 0;
            },
          },
        ]}
        yAxis={[
          {
            min: 1200, // Set the starting point of the y-axis
            //   max: 4000, // Optionally set the maximum value

            scaleType: "linear",
          },
        ]}
        series={[
          {
            label: user1,
            data: user1Rating,
            connectNulls: true,
            showMark: false,
            color: "#FDAF7B",
          },
          {
            label: user2,
            data: user2Rating,
            connectNulls: true,
            showMark: false,
            color: "#D4ADFC",
          },
        ]}
        width={1000}
        height={300}
      />
    </div>
  );
}
