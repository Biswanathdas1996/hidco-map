import React from "react";
import { get, del } from "../../helper/apiHelper";
import { validateResponseAdmin } from "../../helper/validateResponse";
import Card from "@mui/material/Card";
import PieChart from "../../components/anayalitics/PieChart";
import BarChart from "../../components/anayalitics/BarChart";
import LineChart from "../../components/anayalitics/LineChart";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function Dashboard() {
  const [data, setData] = React.useState(null);
  const [pieChartData, setPieChartData] = React.useState(null);

  const fetchAllRouts = async () => {
    const response = await get(
      "/admin/user/analytics/2023-05-08?routeId&userId"
    );
    console.log("---response", response);
    if (validateResponseAdmin(response)) {
      setData(response?.data);

      // const totalLocationCount = response?.data?.reduce(
      //   (total = 0, data) => (total += Number(data?.totalLocations))
      // );
      const totalLocationCount = response?.data?.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue?.totalLocations;
        },
        0
      );
      const totalDuty = response?.data?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue?.totalDuty;
      }, 0);
      const completedLocations = response?.data?.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue?.completedLocations;
        },
        0
      );
      const completedDuty = response?.data?.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue?.completedDuty;
        },
        0
      );
      setPieChartData({
        totalLocationCount,
        totalDuty,
        completedLocations,
        completedDuty,
      });
      console.log(
        "totalLocationCount",
        totalLocationCount,
        totalDuty,
        completedLocations,
        completedDuty
      );
    }
  };

  React.useEffect(() => {
    fetchAllRouts();
  }, []);

  return (
    <div>
      {data && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card style={{ marginTop: "2rem" }}>
                <PieChart
                  data={[
                    {
                      name: "Total locations",
                      value: pieChartData?.totalLocationCount,
                    },
                    {
                      name: "Visited locations",
                      value: pieChartData?.completedLocations,
                    },
                  ]}
                  colors={["#0088FE", "#00C49F", "#FFBB28"]}
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card style={{ marginTop: "2rem" }}>
                <PieChart
                  data={[
                    { name: "Total duty", value: pieChartData?.totalDuty },
                    {
                      name: "Completed duty",
                      value: pieChartData?.completedDuty,
                    },
                  ]}
                  colors={["#ad000491", "#00C49F", "#FFBB28"]}
                />
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card style={{ marginTop: "2rem" }}>
                <BarChart data={data} />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card style={{ marginTop: "2rem" }}>
                <LineChart data={data} />
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}
