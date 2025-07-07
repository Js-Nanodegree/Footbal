import { useState } from 'react';

const useSvgDownload = () => {
  const [svg, setSvg] = useState<{ [x: string]: string }>({});
  return {
    downloadSvg: async (url: string, name: string) => {
      const response = await fetch(url);
      const text = await response.text();
      setSvg((prev) => ({ ...prev, [url]: text }));
      return svg;
    },
    svg,
  };
};

export default useSvgDownload; 