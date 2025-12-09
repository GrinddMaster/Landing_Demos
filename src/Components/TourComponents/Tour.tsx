import { useEffect, useRef } from 'react';
import { setupSdk } from '@matterport/sdk';
import sdkInterface from '@/sdk_interface';

//  use this import.meta.env.VARIABLE to get your .env data;

export default function TourViewContainer(
  spaceId:string,
  sdkKey:string,
  tourUrl:string =`https://my.matterport.com/show/?m=${spaceId}&applicationKey=${sdkKey}` ) 
  {
  const iframeRef = useRef(null);
  const started = useRef(false);
  const port = import.meta.env.VITE_PORT;

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const sdk_options:object = {
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
      src={tourUrl}
      allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
    />
  );
}
