'use client';

import React, { useEffect, useState } from 'react';
import { Track } from 'livekit-client';
import { AnimatePresence, motion } from 'motion/react';
import {
  type AgentState,
  type ReceivedChatMessage,
  useRoomContext,
  useTranscriptions,
  useVoiceAssistant,
} from '@livekit/components-react';
import { useLocalParticipant } from '@livekit/components-react';
import { toastAlert } from '@/components/alert-toast';
import { AgentControlBar } from '@/components/livekit/agent-control-bar/agent-control-bar';
import { ChatEntry } from '@/components/livekit/chat/chat-entry';
import { ChatMessageView } from '@/components/livekit/chat/chat-message-view';
import { VideoTile } from '@/components/livekit/video-tile';
import useChatAndTranscription from '@/hooks/useChatAndTranscription';
import { useDebugMode } from '@/hooks/useDebug';
import type { AppConfig } from '@/lib/types';
import { cn } from '@/lib/utils';

function isAgentAvailable(agentState: AgentState) {
  return agentState == 'listening' || agentState == 'thinking' || agentState == 'speaking';
}

interface SessionViewProps {
  appConfig: AppConfig;
  disabled: boolean;
  sessionStarted: boolean;
}

export const SessionView = ({
  appConfig,
  disabled,
  sessionStarted,
  ref,
}: React.ComponentProps<'div'> & SessionViewProps) => {
  const { state: agentState } = useVoiceAssistant();
  const [chatOpen, setChatOpen] = useState(false);

  const { messages, send } = useChatAndTranscription();
  const transcriptions = useTranscriptions();
  const room = useRoomContext();
  const { localParticipant } = useLocalParticipant();
  const cameraPublication = localParticipant.getTrackPublication(Track.Source.Camera);
  const cameraTrack = cameraPublication
    ? { source: Track.Source.Camera, participant: localParticipant, publication: cameraPublication }
    : undefined;

  useDebugMode();

  async function handleSendMessage(message: string) {
    await send(message);
  }

  useEffect(() => {
    if (sessionStarted) {
      const timeout = setTimeout(() => {
        if (!isAgentAvailable(agentState)) {
          const reason =
            agentState === 'connecting'
              ? 'Agent did not join the room. '
              : 'Agent connected but did not complete initializing. ';

          toastAlert({
            title: 'Session ended',
            description: (
              <p className="w-full">
                {reason}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.livekit.io/agents/start/voice-ai/"
                  className="whitespace-nowrap underline"
                >
                  See quickstart guide
                </a>
                .
              </p>
            ),
          });
          room.disconnect();
        }
      }, 10_000);

      return () => clearTimeout(timeout);
    }
  }, [agentState, sessionStarted, room]);

  const { supportsChatInput, supportsVideoInput, supportsScreenShare } = appConfig;
  const capabilities = {
    supportsChatInput,
    supportsVideoInput,
    supportsScreenShare,
  };

  return (
    <main
      ref={ref}
      inert={disabled}
      className={
        // prevent page scrollbar
        // when !chatOpen due to 'translate-y-20'
        cn(!chatOpen && 'max-h-svh overflow-hidden')
      }
    >
      <ChatMessageView
        className={cn(
          'mx-auto min-h-svh w-full max-w-2xl px-3 pt-8 pb-40 transition-[opacity,translate] duration-300 ease-out md:px-0 md:pt-12 md:pb-48',
          chatOpen ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-20 opacity-0'
        )}
      >
        <div className="space-y-3 whitespace-pre-wrap">
          <AnimatePresence>
            {messages.map((message: ReceivedChatMessage) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 1, height: 'auto', translateY: 0.001 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <ChatEntry hideName key={message.id} entry={message} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ChatMessageView>

      <div className="bg-background mp-12 fixed top-0 right-0 left-0 h-32 md:h-36">
        {/* skrim */}
        <div className="from-background absolute bottom-0 left-0 h-12 w-full translate-y-full bg-gradient-to-b to-transparent" />
      </div>

      {/* Zoom-style video call interface */}
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700">
        {/* Live Transcription Overlay */}
        {transcriptions.length > 0 && (
          <div className="absolute top-8 left-1/2 z-30 -translate-x-1/2 transform">
            <div className="rounded-lg bg-black/70 px-4 py-2 text-sm font-medium text-white">
              {transcriptions[transcriptions.length - 1].text}
            </div>
          </div>
        )}

        <div className="relative -mt-16 mb-16 flex h-full w-full items-center justify-center">
          {/* Mike Smith's photo - large and centered */}
          <div className="relative z-10">
            <img
              src="/mikeSmith.png"
              alt="Mike Smith - Solar Customer"
              className="h-[500px] w-[500px] rounded-2xl border-4 border-white/20 object-cover shadow-2xl"
            />
            <div className="absolute bottom-4 left-4 z-30 rounded-lg bg-black/70 px-3 py-1 text-sm font-medium text-white">
              Mike Smith
            </div>
          </div>

          {/* Your camera feed - small tile in corner */}
          {cameraTrack && !cameraTrack.publication.isMuted && (
            <div className="absolute right-20 bottom-20 z-20">
              <VideoTile
                trackRef={cameraTrack}
                className="h-18 w-24 rounded-lg border-2 border-white/20 shadow-lg"
              />
            </div>
          )}

          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-white/20"></div>
            <div className="absolute right-20 bottom-20 h-24 w-24 rounded-full bg-white/20"></div>
            <div className="absolute top-1/2 right-10 h-16 w-16 rounded-full bg-white/20"></div>
          </div>
        </div>
      </div>

      <div className="bg-background fixed right-0 bottom-0 left-0 z-50 px-3 pt-2 pb-8 md:px-12 md:pb-16">
        <motion.div
          key="control-bar"
          initial={{ opacity: 0, translateY: '100%' }}
          animate={{
            opacity: sessionStarted ? 1 : 0,
            translateY: sessionStarted ? '0%' : '100%',
          }}
          transition={{ duration: 0.3, delay: sessionStarted ? 0.5 : 0, ease: 'easeOut' }}
        >
          <div className="relative z-10 mx-auto w-full max-w-2xl">
            {appConfig.isPreConnectBufferEnabled && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: sessionStarted && messages.length === 0 ? 1 : 0,
                  transition: {
                    ease: 'easeIn',
                    delay: messages.length > 0 ? 0 : 0.8,
                    duration: messages.length > 0 ? 0.2 : 0.5,
                  },
                }}
                aria-hidden={messages.length > 0}
                className={cn(
                  'absolute inset-x-0 -top-12 text-center',
                  sessionStarted && messages.length === 0 && 'pointer-events-none'
                )}
              >
                <p className="animate-text-shimmer inline-block !bg-clip-text text-sm font-semibold text-transparent">
                  Agent is listening, ask it a question
                </p>
              </motion.div>
            )}

            <AgentControlBar
              capabilities={capabilities}
              onChatOpenChange={setChatOpen}
              onSendMessage={handleSendMessage}
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
};
