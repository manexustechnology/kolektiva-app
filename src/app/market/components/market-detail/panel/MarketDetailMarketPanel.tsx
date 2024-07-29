'use client';

import { interGlobalFont } from "@/app/layout";
import { Divider } from "antd";
import { ApexOptions } from "apexcharts";
import { useState, useEffect } from "react";

const MarketDetailMarketPanel: React.FC = () => {
  // https://blog.nirdeshpokhrel.com.np/nextjs-window-is-not-defined-react-apexcharts
  const [ReactApexChart, setReactApexChart] = useState<any>();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setReactApexChart(() => mod.default);
    });
  }, []);

  const [historicalChartSeries, setHistoricalChartSeries] = useState<ApexOptions["series"]>([
    {
      name: 'Appreciation',
      data: Array.from({ length: 8 }, () => Math.floor(Math.random() * 14) + 1)
    },
  ]);
  const [historicalChartOptions, setHistoricalChartOptions] = useState<ApexOptions>({
    chart: {
      type: 'bar',
      height: 350,
      stacked: false,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: false
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 2,
        borderRadiusApplication: 'end', // 'around', 'end'
        borderRadiusWhenStacked: 'last', // 'all', 'last'
      },
    },
    xaxis: {
      title: {
        text: 'Year',
        style: {
          fontFamily: interGlobalFont.style.fontFamily,
          fontWeight: 500,
        }
      },
      categories: ['2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023', '2023-2024'],
    },
    colors: [
      '#0D9488',
    ],
    dataLabels: {
      enabled: false,
    },
    legend: {
      showForSingleSeries: true,
      position: 'bottom',
      markers: {
        shape: 'circle',
      }
    },
    fill: {
      opacity: 1
    }
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium text-zinc-700">Why DKI Jakarta?</p>
          <p className="text-sm text-zinc-500">Owning property in DKI Jakarta is a highly profitable investment because Jakarta is the economic and business center of Indonesia, offering significant opportunities for property value growth. With continuously developing infrastructure, including transportation projects like MRT and LRT, accessibility and quality of life are improving. Additionally, Jakarta has comprehensive educational, healthcare, and entertainment facilities and serves as the hub of cultural and political activities, making it an ideal location for both residence and long-term investment. With consistently high property demand, owning property in Jakarta promises significant potential returns in the future.</p>
        </div>
        <Divider className="border-zinc-200 !m-0" />
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium text-zinc-700">DKI Jakarta historical growth</p>
          <div id="chart">
            {ReactApexChart && <ReactApexChart options={historicalChartOptions} series={historicalChartSeries} type="bar" height={350} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default MarketDetailMarketPanel;