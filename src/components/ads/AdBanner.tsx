import { useEffect, useRef } from 'react';

// TODO: Google AdSense 승인 후 아래 값을 교체하세요
// 1. index.html 의 AdSense 스크립트 주석 해제 + client ID 교체
// 2. AD_CLIENT 본인의 퍼블리셔 ID로 교체
// 3. AD_SLOT 광고 단위 ID 입력
const AD_CLIENT = '';
const AD_SLOT = '';

export function AdBanner() {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!AD_CLIENT || !AD_SLOT) return;
    if (pushed.current) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      pushed.current = true;
    } catch { /* AdSense 미로드 시 무시 */ }
  }, []);

  // AdSense 미설정 시 플레이스홀더
  if (!AD_CLIENT || !AD_SLOT) {
    return (
      <div
        className="mx-2 mb-1 flex shrink-0 items-center justify-center rounded-xl border border-dashed border-indigo-300 bg-gradient-to-br from-indigo-50 to-violet-50 px-3 py-3 text-xs text-slate-500 dark:from-slate-800 dark:to-slate-700 dark:text-slate-400"
        style={{ minHeight: 56 }}
      >
        📣 광고 영역
      </div>
    );
  }

  return (
    <div ref={adRef} className="mx-2 mb-1 shrink-0 text-center" style={{ minHeight: 50 }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
