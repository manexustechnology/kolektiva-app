import React from 'react';

interface MapEmbedProps {
  latitude: string;
  longitude: string;
  width?: string;
  height?: string;
  className?: string;
}

const MapEmbed: React.FC<MapEmbedProps> = ({
  latitude,
  longitude,
  width = '100%',
  height = '400px',
  className = '',
}) => {
  const src = `https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`;

  return (
    <div style={{ width, height }}>
      <iframe
        className={className}
        src={src}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default MapEmbed;