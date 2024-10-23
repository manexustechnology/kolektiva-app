'use client';

import { interGlobalFont } from '@/commons/font';
import { PropertyData } from '@/types/property';
import { Divider } from 'antd';
import { ApexOptions } from 'apexcharts';
import { useState, useEffect } from 'react';
import '../../../../../styles/quill-custom-styles.css';

interface MarketDetailMarketPanelProps {
  property: PropertyData;
}

const MarketDetailMarketPanel: React.FC<MarketDetailMarketPanelProps> = ({
  property,
}) => {
  const [ReactApexChart, setReactApexChart] = useState<any>();
  useEffect(() => {
    import('react-apexcharts').then((mod) => {
      setReactApexChart(() => mod.default);
    });
  }, []);

  const [historicalChartSeries, setHistoricalChartSeries] = useState<
    ApexOptions['series']
  >([
    {
      name: 'Appreciation',
      data: Array.from({ length: 8 }, () => Math.floor(Math.random() * 14) + 1),
    },
  ]);
  const [historicalChartOptions, setHistoricalChartOptions] =
    useState<ApexOptions>({
      chart: {
        type: 'bar',
        height: 350,
        stacked: false,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
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
          },
        },
        categories: [
          '2016-2017',
          '2017-2018',
          '2018-2019',
          '2019-2020',
          '2020-2021',
          '2021-2022',
          '2022-2023',
          '2023-2024',
        ],
      },
      colors: ['#0D9488'],
      dataLabels: {
        enabled: false,
      },
      legend: {
        showForSingleSeries: true,
        position: 'bottom',
        markers: {
          shape: 'circle',
        },
      },
      fill: {
        opacity: 1,
      },
    });

  const CommingSoon = true;

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Makets */}
        <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
          {/* Title */}
          <p className="text-lg font-medium text-zinc-500">Markets</p>
          {/* Divider */}
          <div className="w-full h-px bg-zinc-200"></div>

          {!CommingSoon ? (
            <div
              className="quill-wrapper"
              dangerouslySetInnerHTML={{
                __html: property.city,
              }}
            />
          ) : (
            <p className="text-sm font-medium text-zinc-500">Coming Soon</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MarketDetailMarketPanel;
