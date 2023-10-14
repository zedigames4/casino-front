/* eslint-disable prefer-destructuring */
import React, { useRef, useEffect } from 'react';

import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-moment';

// Import utilities
import { tailwindConfig, formatValue } from '@/utils/app';

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
);

const BarChart01 = ({
  data,
  width,
  height,
}: {
  width: string | number | undefined;
  height: string | number | undefined;
  data: any;
}) => {
  const canvas = useRef<any>(null);
  const legend = useRef<any>(null);

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        layout: {
          padding: {
            top: 12,
            bottom: 16,
            left: 20,
            right: 20,
          },
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
            },
            ticks: {
              maxTicksLimit: 5,
              callback: value => formatValue(Number(value)),
            },
          },
          x: {
            type: 'time',
            time: {
              parser: 'MM-DD-YYYY',
              unit: 'month',
              displayFormats: {
                month: 'MMM YY',
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => '', // Disable tooltip title
              label: context => formatValue(context.parsed.y),
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
      plugins: [
        {
          id: 'htmlLegend',
          afterUpdate(c, args, options) {
            const ul = legend.current;
            if (!ul) return;
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            // Reuse the built-in legendItems generator

            const items =
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              c?.options?.plugins?.legend?.labels?.generateLabels(c);
            items?.forEach(item => {
              const li = document.createElement('li');
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              li.style.marginRight = tailwindConfig().theme.margin[4];
              // Button element
              const button = document.createElement('button');
              button.style.display = 'inline-flex';
              button.style.alignItems = 'center';
              button.style.opacity = item.hidden ? '.3' : '';
              button.onclick = () => {
                c.setDatasetVisibility(
                  Number(item.datasetIndex),
                  !c.isDatasetVisible(Number(item.datasetIndex)),
                );
                c.update();
              };
              // Color box
              const box = document.createElement('span');
              box.style.display = 'block';
              box.style.width = tailwindConfig().theme.width[3];
              box.style.height = tailwindConfig().theme.height[3];
              box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
              box.style.marginRight = tailwindConfig().theme.margin[2];
              box.style.borderWidth = '3px';
              box.style.borderColor = item.fillStyle as string;
              box.style.pointerEvents = 'none';
              // Label
              const labelContainer = document.createElement('span');
              labelContainer.style.display = 'flex';
              labelContainer.style.alignItems = 'center';
              const value = document.createElement('span');
              value.style.color = tailwindConfig().theme.colors.white[800];
              value.style.fontSize = tailwindConfig().theme.fontSize['3xl'][0];
              value.style.lineHeight =
                tailwindConfig().theme.fontSize['3xl'][1].lineHeight;
              value.style.fontWeight = tailwindConfig().theme.fontWeight.bold;
              value.style.marginRight = tailwindConfig().theme.margin[2];
              value.style.pointerEvents = 'none';
              const label = document.createElement('span');
              label.style.color = tailwindConfig().theme.colors.white[500];
              label.style.fontSize = tailwindConfig().theme.fontSize.sm[0];
              label.style.lineHeight =
                tailwindConfig().theme.fontSize.sm[1].lineHeight;
              const theValue = c.data.datasets[
                item.datasetIndex as number
              ].data.reduce((a, b) => Number(a) + Number(b), 0);
              const valueText = document.createTextNode(
                formatValue(Number(theValue)),
              );
              const labelText = document.createTextNode(item.text);
              value.appendChild(valueText);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(labelContainer);
              labelContainer.appendChild(value);
              labelContainer.appendChild(label);
              ul.appendChild(li);
            });
          },
        },
      ],
    });
    return () => chart.destroy();
  }, []);

  return (
    <>
      <div className="px-5 py-3">
        <ul ref={legend} className="flex flex-wrap" />
      </div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height} />
      </div>
    </>
  );
};

export default BarChart01;
