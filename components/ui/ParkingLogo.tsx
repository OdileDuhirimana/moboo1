import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ParkingLogo({ size = 140 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 140 140" fill="none">
      <Path
        d="M35 120V20h50a35 35 0 1 1 0 70H55v30"
        stroke="#fff"
        strokeWidth={18}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
} 