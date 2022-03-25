import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { DateRange } from "@material-ui/icons";
import styled from "styled-components";
import { arrayBuffer } from "stream/consumers";

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
  isDark: boolean;
}

function Chart({ coinId, isDark }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        <ChartLoader>Loading chart ...</ChartLoader>
      ) : (
        <ApexChart style={{color: "#333"}}
          type="candlestick"
          series={[
            {
              data: data?.map((price) => ({
                x: price.time_close,
                y: [price.open.toFixed(2),
                    price.high.toFixed(2),
                    price.low.toFixed(2),
                    price.close.toFixed(2)],
              })) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light"
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
              width: 2,
            },
            yaxis: {
              show: false,
              tooltip: {
                enabled: true
              }
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
              categories: data?.map((price) => price.time_close) ?? [],
            },
            fill: {
              type: "solid",
              gradient: { 
                gradientToColors: ["blue"], 
                stops: [0, 100],
                type: "horizontal"
              },
            },
            tooltip: {
              enabled: true,
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
            },
            // labels: data?.map((price) => price.time_close)
          }}
        />
      )}
    </div>
  );
}

export default Chart;
