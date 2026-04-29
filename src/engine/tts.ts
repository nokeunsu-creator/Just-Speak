/**
 * Web Speech API 래퍼.
 * - 단일 문장 재생, 큐 재생 (Listen 모드), 인터럽트
 * - iOS Safari는 첫 사용자 제스처 안에서만 speak 호출 가능 → unlock() 사용
 */

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice | null;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (e: SpeechSynthesisErrorEvent) => void;
}

let unlocked = false;
let cachedVoices: SpeechSynthesisVoice[] = [];

export function isSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function unlock(): void {
  if (unlocked || !isSupported()) return;
  try {
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    window.speechSynthesis.speak(u);
    unlocked = true;
  } catch {
    /* ignore */
  }
}

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!isSupported()) return resolve([]);
    const list = window.speechSynthesis.getVoices();
    if (list.length) {
      cachedVoices = list;
      return resolve(list);
    }
    const handler = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.removeEventListener('voiceschanged', handler);
      resolve(cachedVoices);
    };
    window.speechSynthesis.addEventListener('voiceschanged', handler);
    setTimeout(() => resolve(cachedVoices = window.speechSynthesis.getVoices()), 1500);
  });
}

export async function pickEnglishVoice(): Promise<SpeechSynthesisVoice | null> {
  const voices = cachedVoices.length ? cachedVoices : await loadVoices();
  if (!voices.length) return null;
  const preferences = ['en-US', 'en-GB', 'en-AU', 'en-CA', 'en'];
  for (const lang of preferences) {
    const v = voices.find((x) => x.lang?.toLowerCase().startsWith(lang.toLowerCase()));
    if (v) return v;
  }
  return voices[0] ?? null;
}

export function cancel(): void {
  if (!isSupported()) return;
  try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
}

export function isSpeaking(): boolean {
  if (!isSupported()) return false;
  return window.speechSynthesis.speaking || window.speechSynthesis.pending;
}

export function speak(text: string, opts: SpeakOptions = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isSupported()) return resolve();
    cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = opts.rate ?? 0.95;
    u.pitch = opts.pitch ?? 1.0;
    u.volume = opts.volume ?? 1.0;
    u.lang = opts.voice?.lang ?? 'en-US';
    if (opts.voice) u.voice = opts.voice;
    u.onstart = () => opts.onStart?.();
    u.onend = () => { opts.onEnd?.(); resolve(); };
    u.onerror = (e) => {
      opts.onError?.(e);
      // Some browsers fire 'canceled' as error; treat both as resolved to avoid breaking queue.
      if (e.error === 'canceled' || e.error === 'interrupted') return resolve();
      reject(e);
    };
    try {
      window.speechSynthesis.speak(u);
    } catch (err) {
      reject(err as any);
    }
  });
}

export interface QueueOptions extends SpeakOptions {
  gapMs?: number;
  onLineStart?: (index: number) => void;
  onLineEnd?: (index: number) => void;
  shouldStop?: () => boolean;
}

export async function speakQueue(lines: string[], opts: QueueOptions = {}): Promise<void> {
  for (let i = 0; i < lines.length; i++) {
    if (opts.shouldStop?.()) return;
    opts.onLineStart?.(i);
    await speak(lines[i], opts);
    opts.onLineEnd?.(i);
    if (i < lines.length - 1) {
      const gap = opts.gapMs ?? 600;
      await new Promise((r) => setTimeout(r, gap));
    }
  }
}
