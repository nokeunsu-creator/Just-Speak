import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as tts from './tts';

describe('tts engine', () => {
  beforeEach(() => {
    // jsdom doesn't ship speechSynthesis; install a minimal stub.
    const speakCalls: SpeechSynthesisUtterance[] = [];
    (window as any).speechSynthesis = {
      speaking: false,
      pending: false,
      speak: (u: SpeechSynthesisUtterance) => {
        speakCalls.push(u);
        // Simulate immediate end
        setTimeout(() => u.onend?.(new Event('end') as any), 0);
      },
      cancel: vi.fn(),
      getVoices: () => [],
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    (window as any).__speakCalls = speakCalls;
    if (typeof (globalThis as any).SpeechSynthesisUtterance === 'undefined') {
      (globalThis as any).SpeechSynthesisUtterance = class {
        text: string;
        rate = 1; pitch = 1; volume = 1; lang = 'en-US';
        voice: any = null;
        onstart: any = null; onend: any = null; onerror: any = null;
        constructor(text: string) { this.text = text; }
      };
    }
  });

  it('reports supported when speechSynthesis exists', () => {
    expect(tts.isSupported()).toBe(true);
  });

  it('speak resolves on utterance end', async () => {
    await expect(tts.speak('hello')).resolves.toBeUndefined();
    expect((window as any).__speakCalls).toHaveLength(1);
  });

  it('speakQueue runs each line in order', async () => {
    const seen: number[] = [];
    await tts.speakQueue(['one', 'two', 'three'], {
      gapMs: 0,
      onLineStart: (i) => seen.push(i),
    });
    expect(seen).toEqual([0, 1, 2]);
  });

  it('speakQueue respects shouldStop', async () => {
    let count = 0;
    await tts.speakQueue(['a', 'b', 'c'], {
      gapMs: 0,
      shouldStop: () => count > 0,
      onLineStart: () => { count++; },
    });
    expect(count).toBe(1);
  });
});
