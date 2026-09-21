'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export type PricePoint = {
  time: string;
  price: number;
};

type Props = {
  data: PricePoint[];
  positive: boolean;
};

export default function StockChart({ data, positive }: Props) {
  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 4, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={positive ? '#ff4d67' : '#3b82f6'} stopOpacity={0.22} />
              <stop offset="100%" stopColor={positive ? '#ff4d67' : '#3b82f6'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f1f3f5" />
          <XAxis dataKey="time" hide />
          <YAxis domain={['dataMin - 250', 'dataMax + 250']} hide />
          <Tooltip
            cursor={{ stroke: '#dfe3e8', strokeDasharray: '4 4' }}
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const item = payload[0].payload as PricePoint;
              return (
                <div className="chart-tooltip">
                  <strong>{item.price.toLocaleString('ko-KR')}원</strong>
                  <span>{item.time}</span>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={positive ? '#ff4d67' : '#3b82f6'}
            strokeWidth={2.5}
            fill="url(#priceFill)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
