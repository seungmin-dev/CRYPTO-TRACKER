import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { DateRange } from "@material-ui/icons";
import styled from "styled-components";

const ChartLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId),
    {
        refetchInterval: 10000
    }
  );
  return (
    <div>
      {isLoading ? (
        <ChartLoader>Loading chart ...</ChartLoader>
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => price.close) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => price.time_close) ?? []
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"],
                          stops: [0, 100]},
            },
            colors: ["red"],
            tooltip: {
                y: {
                    formatter: (value) => `$ ${value.toFixed(3)}`
                },
            }
          }}
        />
      )}
    </div>
  );
}

export default Chart;
