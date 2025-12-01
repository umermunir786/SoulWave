import React, { createContext, useContext, useState } from 'react';
import { createAudioPlayer, useAudioPlayer } from 'expo-audio';

interface AudioContextType {
  player: ReturnType<typeof useAudioPlayer> | null;
  currentTrack: {
    title: string;
    artist: string;
    artwork?: string;
  } | null;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  setCurrentTrack: (track: { title: string; artist: string; artwork?: string }) => void;
  initializePlayer: (source: any) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audioSource, setAudioSource] = useState<any>(null);
  const [currentTrack, setCurrentTrack] = useState<{
    title: string;
    artist: string;
    artwork?: string;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const player = useAudioPlayer(audioSource);
  // const player = createAudioPlayer(audioSource);

  const initializePlayer = (source: any) => {
    setAudioSource(source);
  };

  return (
    <AudioContext.Provider
      value={{
        player,
        currentTrack,
        setCurrentTrack,
        initializePlayer,
        isVisible,
        setIsVisible,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};