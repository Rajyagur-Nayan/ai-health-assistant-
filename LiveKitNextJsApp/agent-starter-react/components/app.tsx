'use client';

import { useEffect, useMemo, useState } from 'react';
import { Room, RoomEvent } from 'livekit-client';
import { RoomAudioRenderer, RoomContext, StartAudio } from '@livekit/components-react';
import { toastAlert } from '@/components/alert-toast';
import { SessionView } from '@/components/session-view';
import { Toaster } from '@/components/ui/sonner';
import { Welcome } from '@/components/welcome';
import useConnectionDetails from '@/hooks/useConnectionDetails';
import type { AppConfig } from '@/lib/types';

interface AppProps {
  appConfig: AppConfig;
}

export function App({ appConfig }: AppProps) {
  const room = useMemo(() => new Room(), []);
  const [sessionStarted, setSessionStarted] = useState(false);
  const { connectionDetails, refreshConnectionDetails } = useConnectionDetails();

  useEffect(() => {
    const onDisconnected = () => {
      setSessionStarted(false);
      refreshConnectionDetails();
    };
    const onMediaDevicesError = (error: Error) => {
      toastAlert({
        title: 'Encountered an error with your media devices',
        description: `${error.name}: ${error.message}`,
      });
    };
    room.on(RoomEvent.MediaDevicesError, onMediaDevicesError);
    room.on(RoomEvent.Disconnected, onDisconnected);
    return () => {
      room.off(RoomEvent.Disconnected, onDisconnected);
      room.off(RoomEvent.MediaDevicesError, onMediaDevicesError);
    };
  }, [room, refreshConnectionDetails]);

  useEffect(() => {
    if (sessionStarted && room.state === 'disconnected' && connectionDetails) {
      Promise.all([
        room.localParticipant.setMicrophoneEnabled(true, undefined, {
          preConnectBuffer: appConfig.isPreConnectBufferEnabled,
        }),
        room.connect(connectionDetails.serverUrl, connectionDetails.participantToken),
      ]).catch((error) => {
        toastAlert({
          title: 'There was an error connecting to the agent',
          description: `${error.name}: ${error.message}`,
        });
      });
    }
    return () => {
      room.disconnect();
    };
  }, [room, sessionStarted, connectionDetails, appConfig.isPreConnectBufferEnabled]);

  const { startButtonText } = appConfig;

  return (
    <>
      {!sessionStarted ? (
        <Welcome
          key="welcome"
          startButtonText={startButtonText}
          onStartCall={() => setSessionStarted(true)}
          disabled={false} // Welcome screen is always interactive when visible
        />
      ) : (
        <RoomContext.Provider value={room}>
          <RoomAudioRenderer />
          <StartAudio label="Start Audio" />
          <SessionView
            key="session-view"
            appConfig={appConfig}
            disabled={false} // Session view is always interactive when visible
            sessionStarted={sessionStarted}
          />
        </RoomContext.Provider>
      )}
      <Toaster />
    </>
  );
}
