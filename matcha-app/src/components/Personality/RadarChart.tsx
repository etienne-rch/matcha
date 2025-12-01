import React from 'react';
import Svg, { Line, Polygon, Text as SvgText } from 'react-native-svg';

import Colors from '@/themes/colors';

interface RadarDataPoint {
  label: string;
  value: number;
}

interface RadarChartProps {
  data: RadarDataPoint[];
  size?: number;
  colors?: {
    fill: string;
    fillOpacity: number;
    stroke: string;
    grid: string;
  };
}

export default function RadarChart({
  data,
  size = 300,
  colors = {
    fill: Colors.greenLight.normal,
    fillOpacity: 0.3,
    stroke: Colors.greenLight.dark.normal,
    grid: Colors.greyLight.divider,
  },
}: RadarChartProps) {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = (size / 2) * 0.7;
  const levels = 5;
  const sides = data.length;

  const getPoints = (level: number) => {
    return Array.from({ length: sides }, (_, i) => {
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
      const r = (radius * level) / levels;
      return {
        x: centerX + r * Math.cos(angle),
        y: centerY + r * Math.sin(angle),
      };
    });
  };

  const dataPoints = data.map((item, i) => {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    const r = radius * item.value;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  });

  const labelPoints = Array.from({ length: sides }, (_, i) => {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    const r = radius + 30;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
      label: data[i].label,
    };
  });

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Array.from({ length: levels }, (_, level) => {
        const points = getPoints(level + 1);
        return (
          <Polygon
            key={level}
            points={points.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke={colors.grid}
            strokeWidth="1"
          />
        );
      })}

      {labelPoints.map((point, i) => (
        <Line
          key={i}
          x1={centerX}
          y1={centerY}
          x2={getPoints(levels)[i].x}
          y2={getPoints(levels)[i].y}
          stroke={colors.grid}
          strokeWidth="1"
        />
      ))}

      <Polygon
        points={dataPoints.map((p) => `${p.x},${p.y}`).join(' ')}
        fill={colors.fill}
        fillOpacity={colors.fillOpacity}
        stroke={colors.stroke}
        strokeWidth="2"
      />

      {labelPoints.map((point, i) => (
        <SvgText
          key={i}
          x={point.x}
          y={point.y}
          fontSize="12"
          fill={Colors.greyDark.normal}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {point.label}
        </SvgText>
      ))}
    </Svg>
  );
}
