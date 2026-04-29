import { useCallback, useEffect, useRef, useState } from 'react';

interface RecorderState {
  isRecording: boolean;
  audioUrl: string | null;
  error: string | null;
}

/**
 * MediaRecorder 기반 마이크 녹음 hook.
 * - 권한 요청 → 녹음 → 정지 시 Blob URL 반환
 * - 컴포넌트 언마운트 시 stream/url 정리
 */
export function useRecorder() {
  const [state, setState] = useState<RecorderState>({
    isRecording: false,
    audioUrl: null,
    error: null,
  });
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const urlRef = useRef<string | null>(null);

  const cleanup = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      try { recorderRef.current.stop(); } catch { /* ignore */ }
    }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      cleanup();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, [cleanup]);

  const start = useCallback(async () => {
    if (state.isRecording) return;
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setState((s) => ({ ...s, error: 'unsupported' }));
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const rec = new MediaRecorder(stream);
      recorderRef.current = rec;
      rec.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || 'audio/webm' });
        const url = URL.createObjectURL(blob);
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = url;
        setState({ isRecording: false, audioUrl: url, error: null });
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      };
      rec.start();
      setState({ isRecording: true, audioUrl: state.audioUrl, error: null });
    } catch (e: any) {
      setState({ isRecording: false, audioUrl: null, error: e?.name || 'error' });
    }
  }, [state.isRecording, state.audioUrl]);

  const stop = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      try { recorderRef.current.stop(); } catch { /* ignore */ }
    }
  }, []);

  const reset = useCallback(() => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setState({ isRecording: false, audioUrl: null, error: null });
  }, []);

  return { ...state, start, stop, reset };
}
