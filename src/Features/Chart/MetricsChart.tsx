import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomTick from './CustomTick';
import { ChartData } from '../../hooks/useHistoricalData';

const COLOR_MAP: { [key: string]: string } = {
  flareTemp: '#23C9FF',
  waterTemp: '#C884A6',
  casingPressure: '#DE6E4B',
  oilTemp: '#7A6563',
  tubingPressure: '#BBB193',
  injValveOpen: '#140152',
};

interface Props {
  selectedMetrics: string[];
  measurements: ChartData[];
  units: { [metric: string]: string };
}

export const MetricsChart = ({ selectedMetrics, measurements, units }: Props) => {
  /**
   * retrieves a list of unique units corresponding to the selected metrics
   * this is used to conditionally render y axes
   */
  const selectedUnits = useMemo(() => {
    const result = new Set<string>();
    for (let metric of selectedMetrics) {
      result.add(units[metric]);
    }

    return Array.from<string>(result);
  }, [selectedMetrics, units]);

  return (
    <div>
      {measurements.length > 0 ? (
        <ResponsiveContainer width="90%" height={600}>
          <LineChart data={measurements} margin={{ top: 5, bottom: 5 }}>
            <XAxis dataKey="at" tick={CustomTick} />
            {selectedUnits.map(unit => {
              return unit ? (
                <YAxis key={unit} yAxisId={unit} padding={{ top: 20, bottom: 20 }}>
                  <Label angle={-90} value={unit} position="insideTopLeft" style={{ textAnchor: 'middle' }} />
                </YAxis>
              ) : null;
            })}
            <Tooltip content={<CustomTooltip />} isAnimationActive={false} />
            <Legend />
            {selectedMetrics.map(metric => (
              <Line
                yAxisId={units[metric]}
                type="monotone"
                dataKey={metric}
                key={metric}
                stroke={COLOR_MAP[metric]}
                activeDot={{ r: 7 }}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
};
