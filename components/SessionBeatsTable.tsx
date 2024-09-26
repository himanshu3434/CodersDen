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
    <BarChart
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
      width={500}
      height={300}
      borderRadius={18}
    />
  );
};

export default SessionBeatsTable;
