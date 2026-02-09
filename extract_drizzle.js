
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { SiDrizzle } from 'react-icons/si';

try {
  const svgString = renderToStaticMarkup(React.createElement(SiDrizzle));
  console.log(svgString);
} catch (e) {
  console.error(e);
}
