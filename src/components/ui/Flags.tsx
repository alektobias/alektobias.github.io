import React from 'react';

export const FlagUS = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="#bd3d44" d="M0 0h640v480H0" />
    <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 202.8h640M0 276.5h640M0 350.2h640M0 423.9h640" />
    <path fill="#192f5d" d="M0 0h264.8v239.4H0" />
    <marker id="us-a" markerHeight="30" markerWidth="30">
      <path fill="#fff" d="m14 0 9 27L0 10h28L5 27z" />
    </marker>
    <path fill="#fff" d="m14 0 9 27L0 10h28L5 27z" transform="matrix(.6667 0 0 .6667 19.3 14.8)" />
    {/* Simplified stars for file size/cleanliness or use full SVG if needed. 
        For a small icon, a simplified or just the pattern is often okay, 
        but let's try to be reasonably accurate or use a standard minimal svg.
        Below is a standard minimal approximation for small sizes.
    */}
    <g fill="#fff" transform="scale(.6667)">
      <g id="us-b">
        <g id="us-c">
          <g id="us-d">
            <g id="us-e">
              <path id="us-f" d="M30 14.8 19.3 47.7h33.8l-27.4-19.9 10.5-32.3L2.6 27.8 36.4 7.9z" transform="translate(-5) scale(.3)" />
              <use href="#us-f" x="78" />
            </g>
            <use href="#us-e" x="156" />
          </g>
          <use href="#us-d" x="312" />
        </g>
        <use href="#us-c" y="60" />
        <use href="#us-c" y="120" />
      </g>
      <use href="#us-b" y="180" />
      <use href="#us-c" y="240" />
      <use href="#us-d" transform="translate(39 30)" />
      <use href="#us-d" transform="translate(39 90)" />
      <use href="#us-d" transform="translate(39 150)" />
      <use href="#us-d" transform="translate(39 210)" />
    </g>
  </svg>
);

export const FlagES = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="#aa151b" d="M0 0h640v480H0z" />
    <path fill="#f1bf00" d="M0 120h640v240H0z" />
  </svg>
);

export const FlagFR = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fillRule="evenodd" strokeWidth="1pt">
      <path fill="#fff" d="M0 0h640v480H0z" />
      <path fill="#002395" d="M0 0h213.3v480H0z" />
      <path fill="#ed2939" d="M426.7 0H640v480H426.7z" />
    </g>
  </svg>
);

export const FlagBR = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="#009c3b" d="M0 0h640v480H0z" />
    <path fill="#ffdf00" d="m320 64 277 176-277 176L43 240z" />
    <circle cx="320" cy="240" r="109" fill="#002776" />
  </svg>
);
