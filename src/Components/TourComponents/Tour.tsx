import { useEffect, useRef } from 'react';
import { setupSdk } from '@matterport/sdk';
import sdkInterface from '@/sdk_interface';
import { iframeQueue } from './iframe-queue';
import { TourViewProps } from '@/types';


function initIframe({
  iframe,
  spaceId,
  sdkKey,
  port,
}: {
  iframe: HTMLIFrameElement;
  spaceId: string;
  sdkKey: string;
  port: string;
}) {
  return async () => {
    // 1. Wait for iframe to load
    await new Promise<void>((resolve) => {
      if (iframe.contentWindow) return resolve();
      iframe.onload = () => resolve();
    });

    // 2. Connect SDK
    const mpSdk = await setupSdk(sdkKey, {
      iframe,
      space: spaceId,
      domain: `localhost${port}`,
      iframeQueryParams: { qs: '1' },
    });

    // 3. Initialize SDK logic (sandbox, listeners, etc.)
    sdkInterface(mpSdk);
  };
}


export default function TourViewContainer({ spaceId, sdkKey }: TourViewProps) {
  const iframeRef = useRef(null);
  const port = import.meta.env.VITE_PORT;

  useEffect(() => {
    if (!iframeRef.current) return;

    iframeQueue.enqueue(initIframe({
      iframe: iframeRef.current,
      spaceId,
      sdkKey,
      port,
    }));
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
