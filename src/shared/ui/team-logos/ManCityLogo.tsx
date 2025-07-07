import React from 'react';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const ManCityLogo: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <Svg width={size} height={size} viewBox="0 0 40 40">
    <Circle cx={20} cy={20} r={20} fill="#6CB4EE" />
    <SvgText
      x="50%"
      y="54%"
      textAnchor="middle"
      fontSize={13}
      fontWeight="bold"
      fill="#fff"
      fontFamily="Oswald"
      >MCFC</SvgText>
  </Svg>
);

export default ManCityLogo; 