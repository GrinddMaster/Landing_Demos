import { useEffect, useRef } from 'react';
import { setupSdk } from '@matterport/sdk';
import sdkInterface from '@/sdk_interface';

export default function TourViewContainer() {
  const iframeRef = useRef(null);
  const started = useRef(false);
  const spaceId = import.meta.env.VITE_SPACE_ID;
  const sdkKey = import.meta.env.VITE_SDK_KEY;
  const port = import.meta.env.VITE_PORT;

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const sdk_options = {
      iframe: iframeRef.current,
      space: spaceId,
      domain: `localhost${port}`,
      iframeQueryParams: { qs: '1' },
    };

    setupSdk(sdkKey, sdk_options)
      .then((mpSdk) => {
        sdkInterface(mpSdk);
      })
      .catch((error) => {
        console.error('Failed Connection:', error);
      });
  }, [sdkKey, spaceId, port]);

  return (
    <iframe
      ref={iframeRef}
      title="Matterport Showcase"
      style={{ width: '100%', height: '600px', border: 0 }}
      src={`https://my.matterport.com/show/?m=${spaceId}&applicationKey=${sdkKey}`}
      allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
    />
  );
}
