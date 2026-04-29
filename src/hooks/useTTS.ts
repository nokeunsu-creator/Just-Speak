import { useCallback, useEffect, useRef, useState } from 'react';
import { speak, speakQueue, cancel, isSpeaking, pickEnglishVoice, unlock } from '../engine/tts';
import { useApp } from '../state/AppContext';

export function useTTS() {
  const { state } = useApp();
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const stopFlag = useRef(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [queueRunning, setQueueRunning] = useState(false);

  useEffect(() => {
    pickEnglishVoice().then((v) => { voiceRef.current = v; });
  }, []);

  useEffect(() => {
    return () => { cancel(); };
  }, []);

  const speakOne = useCallback(async (text: string) => {
    unlock();
    stopFlag.current = true;       // stop any in-flight queue
    await new Promise((r) => setTimeout(r, 30));
    stopFlag.current = false;
    setQueueRunning(false);
    setPlayingIndex(null);
    try {
      await speak(text, {
        rate: state.settings.ttsRate,
        pitch: state.settings.ttsPitch,
        voice: voiceRef.current,
      });
    } catch { /* ignore */ }
  }, [state.settings.ttsRate, state.settings.ttsPitch]);

  const playQueue = useCallback(async (lines: string[], onLineEnd?: (i: number) => void) => {
    unlock();
    stopFlag.current = false;
    setQueueRunning(true);
    try {
      await speakQueue(lines, {
        rate: state.settings.ttsRate,
        pitch: state.settings.ttsPitch,
        gapMs: state.settings.gapMs,
        voice: voiceRef.current,
        shouldStop: () => stopFlag.current,
        onLineStart: (i) => setPlayingIndex(i),
        onLineEnd: (i) => onLineEnd?.(i),
      });
    } finally {
      setPlayingIndex(null);
      setQueueRunning(false);
    }
  }, [state.settings.ttsRate, state.settings.ttsPitch, state.settings.gapMs]);

  const stop = useCallback(() => {
    stopFlag.current = true;
    cancel();
    setPlayingIndex(null);
    setQueueRunning(false);
  }, []);

  return { speakOne, playQueue, stop, playingIndex, queueRunning, isSpeaking };
}
