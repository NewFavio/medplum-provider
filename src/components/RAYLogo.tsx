import React from 'react';

interface RAYLogoProps {
  size?: number;
}

export function RAYLogo({ size = 30 }: RAYLogoProps): JSX.Element {
  return (
    <img
      src="/RAI_Logo.svg?v=2"
      alt="RAY Logo"
      style={{
        width: size * 3, // 3 times bigger horizontally
        height: size,     // Same height
        objectFit: 'contain'
      }}
    />
  );
}
