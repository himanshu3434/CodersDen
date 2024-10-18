import { UserSessionBeats } from "@/actions/charts/userSessionBeats";
import textColorAtom from "@/atoms/textColorAtom";
import {
  allUserSessionType,
  userNameComponentType,
  userSessionBeatsObjType,
} from "@/types/types";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import ChartType1 from "./skeleton/ChartType1";

const SessionBeatsTable = ({ user1, user2 }: userNameComponentType) => {
  const [allSessionBeats, setAllSessionBeats] = useState<allUserSessionType>({
    user1SessionBeatsEasy: 0,
    user1SessionBeatsMedium: 0,
    user1SessionBeatsHard: 0,
    user2SessionBeatsEasy: 0,
    user2SessionBeatsMedium: 0,
    user2SessionBeatsHard: 0,
  });
  const [loading, setLoading] = useState(true);
  const textColor = useRecoilValue(textColorAtom);

  const getSessionBeatData = async () => {
    const sessionData = (await UserSessionBeats(
      user1,
      user2
    )) as userSessionBeatsObjType;

    setAllSessionBeats(sessionData.allSessionBeats);
    setLoading(false);
  };
  useEffect(() => {
    getSessionBeatData();
  }, []);
  return (
    <div>
      <div className="flex items-center my-8 ">
        <hr className="flex-grow border-t-2 dark:border-semiblack mr-4 border-gray-500  " />
        <span className="text-lg font-semibold dark:text-slate-500 text-blackLighter">
          Beats %
        </span>
        <hr className="flex-grow border-t-2 dark:border-semiblack ml-4 border-gray-500 " />
      </div>
      {loading == true ? (
        <ChartType1 width={400} height={300} />
      ) : (
        <BarChart
          className="dark:bg-semiblack rounded-xl "
          yAxis={[{ label: "Code Beats(%)" }]}
          xAxis={[{ scaleType: "band", data: ["Easy ", "Medium ", "Hard "] }]}
          series={[
            {
              label: user1,
              data: [
                allSessionBeats.user1SessionBeatsEasy,
                allSessionBeats.user1SessionBeatsMedium,
                allSessionBeats.user1SessionBeatsHard,
              ],
              color: "#FDAF7B",
            },
            {
              label: user2,
              data: [
                allSessionBeats.user2SessionBeatsEasy,
                allSessionBeats.user2SessionBeatsMedium,
                allSessionBeats.user2SessionBeatsHard,
              ],
              color: "#D4ADFC",
            },
          ]}
          width={400}
          height={300}
          borderRadius={18}
          slotProps={{
            legend: {
              labelStyle: {
                fontSize: "14px",
                fill: textColor,
              },
            },
            axisLine: {
              style: {
                stroke: textColor,
              },
            },
            axisTick: {
              style: {
                stroke: textColor,
              },
            },
            axisTickLabel: {
              style: {
                fill: textColor,
                fontSize: "14px",
              },
            },
            axisLabel: {
              style: {
                fill: textColor,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default SessionBeatsTable;
