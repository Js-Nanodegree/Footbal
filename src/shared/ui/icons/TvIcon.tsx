import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const TvIcon = ({ size = 40, color = '#FF2D7A' }) => (
  <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <Rect x="6" y="12" width="28" height="16" rx="3" stroke={color} strokeWidth="2"/>
    <Path d="M14 30h12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export default TvIcon; 