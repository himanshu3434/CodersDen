import { userSessionBeatsObjType } from "@/types/types";
import { BarChart } from "@mui/x-charts/BarChart";

const SessionBeatsTable = ({
  user1,
  user2,
  allSessionBeats,
}: userSessionBeatsObjType) => {
  const user1SessionBeatsEasy = allSessionBeats.user1SessionBeatsEasy;
  const user1SessionBeatsMedium = allSessionBeats.user1SessionBeatsMedium;
  const user1SessionBeatsHard = allSessionBeats.user1SessionBeatsHard;
  const user2SessionBeatsEasy = allSessionBeats.user2SessionBeatsEasy;
  const user2SessionBeatsMedium = allSessionBeats.user2SessionBeatsMedium;
  const user2SessionBeatsHard = allSessionBeats.user2SessionBeatsHard;

  return (
    <div>
      <div className="flex items-center my-8 ">
        <hr className="flex-grow border-t-2 border-semiblack mr-4  " />
        <span className="text-xl font-semibold dark:text-slate-500">
          Beats %
        </span>
        <hr className="flex-grow border-t-2 border-semiblack ml-4" />
      </div>
      <BarChart
        className="dark:bg-semiblack rounded-xl dark:stroke-gray-300 dark:stroke-1"
        yAxis={[{ label: "Code Beats(%)" }]}
        xAxis={[{ scaleType: "band", data: ["Easy ", "Medium ", "Hard "] }]}
        series={[
          {
            label: user1,
            data: [
              user1SessionBeatsEasy,
              user1SessionBeatsMedium,
              user1SessionBeatsHard,
            ],
            color: "#FDAF7B",
          },
          {
            label: user2,
            data: [
              user2SessionBeatsEasy,
              user2SessionBeatsMedium,
              user2SessionBeatsHard,
            ],
            color: "#D4ADFC",
          },
        ]}
        width={400}
        height={300}
        borderRadius={18}
      />
    </div>
  );
};

export default SessionBeatsTable;
