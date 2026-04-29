import type { CategoryMeta, LearningStep } from '../models/types';

export const LEARNING_STEPS: LearningStep[] = [
  {
    num: 1,
    title: '듣기 🔊',
    desc: '먼저 🔊 버튼으로 한 줄씩 들어보세요. 단어보다 발음과 억양에 집중합니다.',
  },
  {
    num: 2,
    title: '의미 확인 👀',
    desc: '영문을 탭하면 한글 해석이 나옵니다. 의미를 정확히 잡은 뒤 다음으로.',
  },
  {
    num: 3,
    title: '따라 말하기 🗣️',
    desc: '다시 🔊을 누르고 음성에 맞춰 작은 소리로 따라 말하세요. 처음엔 천천히, 점점 원어민 속도로.',
  },
  {
    num: 4,
    title: '자동 재생 ▶',
    desc: '▶ Listen으로 카테고리 전체를 흐름대로 들어보세요. 자연스러운 대화 패턴이 입에 붙습니다.',
  },
];

export const BEGINNER_PICKS = ['카페', '자기소개', '쇼핑'];

export const CATEGORIES: CategoryMeta[] = [
  {
    id: '공항',
    name: '공항',
    emoji: '✈️',
    description: '입국 심사·탑승 게이트',
    situation:
      '해외여행 시 입국 심사대와 보안 검색대에서 직원과 나누는 대화입니다. 여권 확인, 방문 목적, 체류 기간, 짐 검사 같은 절차를 다룹니다.',
    keyPhrases: [
      { en: 'purpose of your visit', ko: '방문 목적' },
      { en: 'anything to declare', ko: '신고할 물품' },
      { en: 'boarding gate', ko: '탑승 게이트' },
      { en: 'place your bag on the belt', ko: '가방을 벨트에 올려놓다' },
      { en: 'How long will you be staying?', ko: '얼마나 머무를 예정인가요?' },
    ],
  },
  {
    id: '식당',
    name: '식당',
    emoji: '🍽️',
    description: '주문·결제·메뉴 추천',
    situation:
      '레스토랑에서 자리 안내, 메뉴 주문, 식사 중 응대, 결제까지 직원과 손님이 나누는 대화입니다.',
    keyPhrases: [
      { en: 'table for two', ko: '두 명 자리' },
      { en: 'ready to order', ko: '주문할 준비' },
      { en: 'medium rare', ko: '(스테이크) 살짝 익힘' },
      { en: 'the bill', ko: '계산서' },
      { en: 'Keep the change', ko: '잔돈은 가지세요' },
    ],
  },
  {
    id: '호텔',
    name: '호텔',
    emoji: '🏨',
    description: '체크인·룸서비스',
    situation:
      '호텔 프런트에서 예약 확인, 객실 배정, 시설·서비스 안내, 짐 보관 요청을 진행합니다.',
    keyPhrases: [
      { en: 'have a reservation', ko: '예약했다' },
      { en: 'ocean view', ko: '오션뷰' },
      { en: 'wake-up call', ko: '모닝콜' },
      { en: 'store my luggage', ko: '짐을 보관하다' },
      { en: 'Wi-Fi password', ko: '와이파이 비밀번호' },
    ],
  },
  {
    id: '병원',
    name: '병원',
    emoji: '🏥',
    description: '증상 설명·처방',
    situation:
      '병원·진료소에서 의사가 환자에게 증상을 묻고 진단·처방을 내리는 진료 대화입니다.',
    keyPhrases: [
      { en: 'headache', ko: '두통' },
      { en: 'feel dizzy', ko: '어지럽다' },
      { en: 'blood pressure', ko: '혈압' },
      { en: 'prescribe medicine', ko: '약을 처방하다' },
      { en: 'side effects', ko: '부작용' },
    ],
  },
  {
    id: '쇼핑',
    name: '쇼핑',
    emoji: '🛍️',
    description: '사이즈·반품·결제',
    situation:
      '옷가게나 매장에서 점원과 손님이 사이즈, 색상, 가격, 결제, 반품 정책을 이야기합니다.',
    keyPhrases: [
      { en: 'try it on', ko: '입어보다' },
      { en: 'fitting room', ko: '탈의실' },
      { en: 'on sale', ko: '세일 중' },
      { en: 'return policy', ko: '반품 정책' },
      { en: 'cash or card', ko: '현금 또는 카드' },
    ],
  },
  {
    id: '길묻기',
    name: '길묻기',
    emoji: '🧭',
    description: '방향·랜드마크·교통',
    situation:
      '낯선 거리에서 행인에게 목적지 방향, 거리, 랜드마크를 묻고 답하는 짧은 대화입니다.',
    keyPhrases: [
      { en: 'How do I get to ~?', ko: '~에 어떻게 가나요?' },
      { en: 'go straight', ko: '직진하다' },
      { en: 'turn left at ~', ko: '~에서 왼쪽으로 돌다' },
      { en: 'ten-minute walk', ko: '도보 10분' },
      { en: 'landmark', ko: '랜드마크·표지물' },
    ],
  },
  {
    id: '카페',
    name: '카페',
    emoji: '☕',
    description: '음료 주문·매장 안내',
    situation:
      '카페에서 음료와 디저트를 주문하고, 매장/포장 여부와 와이파이 같은 시설 정보를 묻습니다.',
    keyPhrases: [
      { en: 'iced americano', ko: '아이스 아메리카노' },
      { en: 'for here or to go', ko: '매장 / 포장' },
      { en: 'name for the order', ko: '주문자 이름' },
      { en: 'a receipt', ko: '영수증' },
      { en: 'Wi-Fi password', ko: '와이파이 비밀번호' },
    ],
  },
  {
    id: '자기소개',
    name: '자기소개',
    emoji: '🤝',
    description: '스몰토크·취미 공유',
    situation:
      '처음 만난 사람과 자연스럽게 인사하고 출신, 직업, 거주 기간, 취미를 주고받는 스몰토크입니다.',
    keyPhrases: [
      { en: 'Nice to meet you', ko: '만나서 반가워요' },
      { en: 'Where are you from?', ko: '어디서 오셨어요?' },
      { en: 'What do you do for a living?', ko: '무슨 일 하세요?' },
      { en: 'How long have you lived here?', ko: '여기 산 지 얼마나 됐어요?' },
      { en: 'Do you have any hobbies?', ko: '취미가 있어요?' },
    ],
  },
  {
    id: '비즈니스 미팅',
    name: '비즈니스 미팅',
    emoji: '💼',
    description: '실적·전략·예산',
    situation:
      '사무실에서 임원·동료와 분기 실적, 전략, 예산, 일정 등을 논의하는 회의 대화입니다.',
    keyPhrases: [
      { en: 'quarterly results', ko: '분기 실적' },
      { en: 'grew by ~ percent', ko: '~퍼센트 성장하다' },
      { en: 'customer feedback', ko: '고객 피드백' },
      { en: "next quarter's targets", ko: '다음 분기 목표' },
      { en: 'follow-up meeting', ko: '후속 미팅' },
    ],
  },
  {
    id: '전화',
    name: '전화 응대',
    emoji: '📞',
    description: '메시지 전달·약속',
    situation:
      '회사로 걸려온 전화를 받고 다른 직원에게 메시지를 전달하는 비즈니스 전화 응대입니다.',
    keyPhrases: [
      { en: 'May I speak to ~?', ko: '~와 통화할 수 있을까요?' },
      { en: 'in a meeting', ko: '회의 중' },
      { en: 'take a message', ko: '메모를 받다' },
      { en: 'call me back', ko: '다시 전화하다' },
      { en: 'regarding ~', ko: '~ 관련' },
    ],
  },
  {
    id: '면접',
    name: '영어 면접',
    emoji: '🎤',
    description: '자기소개·강약점',
    situation:
      '취업 면접에서 면접관이 자기소개, 강·약점, 도전 사례, 미래 계획 등을 묻는 상황입니다.',
    keyPhrases: [
      { en: 'tell me about yourself', ko: '자기소개를 해주세요' },
      { en: 'your strengths', ko: '당신의 강점' },
      { en: 'weaknesses', ko: '약점' },
      { en: 'handle pressure', ko: '압박감을 다루다' },
      { en: 'in five years', ko: '5년 후' },
    ],
  },
  {
    id: '택시',
    name: '택시·교통',
    emoji: '🚖',
    description: '경로·요금·영수증',
    situation:
      '택시를 타고 목적지를 알리고 경로, 안전벨트, 요금, 영수증을 주고받는 짧은 대화입니다.',
    keyPhrases: [
      { en: 'Where to?', ko: '어디로 가시나요?' },
      { en: 'expressway', ko: '고속도로' },
      { en: 'in a hurry', ko: '급하다' },
      { en: 'fasten your seatbelt', ko: '안전벨트 매다' },
      { en: 'How much do I owe you?', ko: '얼마인가요?' },
    ],
  },
  {
    id: '영화관',
    name: '영화관',
    emoji: '🎬',
    description: '예매·좌석·상영관',
    situation:
      '영화관 매표소에서 영화·시간·좌석을 고르고 학생 할인이나 팝콘 추가 같은 옵션을 결정합니다.',
    keyPhrases: [
      { en: 'two tickets for ~', ko: '~ 영화 두 장' },
      { en: 'row F, seats 10 and 11', ko: 'F열 10번 11번' },
      { en: 'student discount', ko: '학생 할인' },
      { en: 'small, medium, or large', ko: '스몰/미디엄/라지' },
      { en: 'theater four', ko: '4관' },
    ],
  },
  {
    id: '긴급상황',
    name: '긴급상황',
    emoji: '🚨',
    description: '분실·도난·신고',
    situation:
      '지갑 분실 같은 긴급 상황에서 행인의 도움을 받고 경찰 신고 및 카드 정지 절차를 진행합니다.',
    keyPhrases: [
      { en: 'lost my wallet', ko: '지갑을 잃어버리다' },
      { en: 'report it to the police', ko: '경찰에 신고하다' },
      { en: 'police station', ko: '경찰서' },
      { en: 'cancel my cards', ko: '카드를 정지시키다' },
      { en: 'Take a deep breath', ko: '심호흡하세요' },
    ],
  },
  {
    id: '은행',
    name: '은행·환전',
    emoji: '🏦',
    description: '환전·계좌 개설',
    situation:
      '은행 창구에서 환전, 환율 확인, 수수료, 계좌 개설 양식 작성을 진행합니다.',
    keyPhrases: [
      { en: 'exchange some money', ko: '환전하다' },
      { en: "today's rate", ko: '오늘 환율' },
      { en: 'service fee', ko: '수수료' },
      { en: 'open a savings account', ko: '예금 계좌를 개설하다' },
      { en: 'fill out this form', ko: '양식을 작성하다' },
    ],
  },
  {
    id: '우체국',
    name: '우체국·택배',
    emoji: '📮',
    description: '소포·배송·추적',
    situation:
      '우체국에서 해외 소포 발송, 무게 측정, 배송 속도 선택, 양식 작성, 추적번호 안내를 받습니다.',
    keyPhrases: [
      { en: 'send this package', ko: '이 소포를 보내다' },
      { en: 'shipping speed', ko: '배송 속도' },
      { en: 'express delivery', ko: '특급 배송' },
      { en: 'declared value', ko: '신고 가격' },
      { en: 'tracking number', ko: '추적 번호' },
    ],
  },
  {
    id: '미용실',
    name: '미용실',
    emoji: '💇',
    description: '커트·스타일·결제',
    situation:
      '미용실에서 예약 확인, 머리 길이·스타일 요청, 샴푸·컷·결제까지 진행합니다.',
    keyPhrases: [
      { en: 'Just a trim', ko: '살짝 다듬기만' },
      { en: 'wash your hair', ko: '머리를 감다' },
      { en: 'layers', ko: '레이어드 컷' },
      { en: 'a bit shorter in the back', ko: '뒤쪽만 조금 더 짧게' },
      { en: 'How does this look?', ko: '이렇게 어때요?' },
    ],
  },
  {
    id: '약국',
    name: '약국',
    emoji: '💊',
    description: '감기·통증·일반의약품',
    situation:
      '약국에서 감기·통증 같은 증상을 설명하고 약사에게 일반의약품(OTC)을 추천받는 대화입니다.',
    keyPhrases: [
      { en: 'have a bad cold', ko: '감기가 심하다' },
      { en: 'runny nose / sore throat', ko: '콧물 / 인후통' },
      { en: 'side effects', ko: '부작용' },
      { en: 'over the counter', ko: '처방전 없이 살 수 있는' },
      { en: 'twice a day', ko: '하루 두 번' },
    ],
  },
  {
    id: '헬스장',
    name: '헬스장',
    emoji: '🏋️',
    description: '등록·PT·시설 안내',
    situation:
      '헬스장에서 신규 등록, 멤버십 종류, 그룹 수업·PT, 탈의실 같은 시설 안내를 받습니다.',
    keyPhrases: [
      { en: 'sign up', ko: '등록하다' },
      { en: 'monthly plan', ko: '월간 멤버십' },
      { en: 'group classes', ko: '그룹 수업' },
      { en: 'personal trainer', ko: '개인 트레이너' },
      { en: 'locker rooms', ko: '탈의실' },
    ],
  },
  {
    id: '미술관',
    name: '미술관·박물관',
    emoji: '🖼️',
    description: '입장·오디오 가이드·투어',
    situation:
      '미술관·박물관에서 입장권 구매, 오디오 가이드 대여, 사진 촬영 가능 여부, 가이드 투어 시간을 확인합니다.',
    keyPhrases: [
      { en: 'general admission', ko: '일반 입장' },
      { en: 'audio guide', ko: '오디오 가이드' },
      { en: 'no flash, please', ko: '플래시 사용 금지' },
      { en: 'guided tour', ko: '가이드 투어' },
      { en: 'gift shop', ko: '기념품 가게' },
    ],
  },
  {
    id: '공원',
    name: '공원·산책',
    emoji: '🌳',
    description: '날씨·산책로·반려견',
    situation:
      '공원에서 마주친 동네 사람과 날씨, 산책로, 반려견, 시설에 대해 가벼운 스몰토크를 합니다.',
    keyPhrases: [
      { en: 'such a nice day', ko: '정말 좋은 날씨' },
      { en: 'good trails', ko: '좋은 산책로' },
      { en: 'round trip', ko: '왕복' },
      { en: 'dog-friendly', ko: '반려견 동반 가능' },
      { en: 'public restrooms', ko: '공중 화장실' },
    ],
  },
  {
    id: '자동차',
    name: '자동차·정비',
    emoji: '🔧',
    description: '진단·견적·수리',
    situation:
      '정비소에서 차의 이상 증상을 설명하고 진단·견적·수리 일정과 대기 안내를 받습니다.',
    keyPhrases: [
      { en: 'strange noise', ko: '이상한 소리' },
      { en: 'clicking sound when I brake', ko: '브레이크 밟을 때 딸깍 소리' },
      { en: 'diagnose', ko: '진단하다' },
      { en: 'give you a quote', ko: '견적을 알려주다' },
      { en: 'leave the keys', ko: '열쇠를 맡기다' },
    ],
  },
  {
    id: '식료품점',
    name: '식료품·마트',
    emoji: '🛒',
    description: '계산·쿠폰·봉투',
    situation:
      '마트·식료품점 계산대에서 회원카드, 봉투 종류, 쿠폰, 영수증 같은 짧은 대화를 합니다.',
    keyPhrases: [
      { en: 'membership card', ko: '회원카드' },
      { en: 'paper or plastic bag', ko: '종이/비닐 봉투' },
      { en: 'organic', ko: '유기농' },
      { en: 'this coupon', ko: '이 쿠폰' },
      { en: 'Have a great day', ko: '좋은 하루 되세요' },
    ],
  },
  {
    id: '도서관',
    name: '도서관',
    emoji: '📚',
    description: '회원·대여·시설',
    situation:
      '도서관에서 회원 가입, 대여 권수·기간, 학습실/컴퓨터/프린터 같은 시설 이용 안내를 받습니다.',
    keyPhrases: [
      { en: 'library card', ko: '도서관 카드' },
      { en: 'proof of address', ko: '주소 증명서' },
      { en: 'borrow up to ten books', ko: '10권까지 대여' },
      { en: 'two weeks per book', ko: '책당 2주' },
      { en: 'quiet study area', ko: '조용한 학습실' },
    ],
  },
  {
    id: '학교',
    name: '학교·수업',
    emoji: '🎓',
    description: '첫날·수업·시험',
    situation:
      '학교 첫날 새 친구와 인사하고 수업, 선생님, 시험, 스터디 그룹에 대해 이야기합니다.',
    keyPhrases: [
      { en: 'new student', ko: '새 학생' },
      { en: 'first day', ko: '첫날' },
      { en: 'English literature', ko: '영문학' },
      { en: 'midterms', ko: '중간고사' },
      { en: 'study in groups', ko: '그룹으로 공부하다' },
    ],
  },
];
