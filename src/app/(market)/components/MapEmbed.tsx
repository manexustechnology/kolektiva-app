import React from 'react';

interface MapEmbedProps {
  url: string;
}

const MapEmbed: React.FC<MapEmbedProps> = ({ url }) => {
  const extractCoordinates = (
    url: string,
  ): { lat: string; lng: string } | null => {
    const regex = /@([\d.-]+),([\d.-]+),/;
    const match = url.match(regex);

    if (!match) return null;

    const lat = match[1];
    const lng = match[2];

    return { lat, lng };
  };

  const coordinates = extractCoordinates(url);
  const embedUrl = coordinates
    ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=es;z=14&output=embed`
    : null;

  return (
    <div>
      {embedUrl ? (
        <iframe
          src={embedUrl}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <p>Invalid URL provided</p>
      )}
    </div>
  );
};

export default MapEmbed;
