import type { AspectRatio } from './videoUtils';

export type CategoryKey = 'all' | 'youtube' | 'works' | 'did' | 'character';

export interface Category {
  key: CategoryKey;
  label: string;
  labelEn: string;
  count: number;
}

export interface ColorSwatch {
  name: string;
  nameKr: string;
  hex: string;
}

export interface DesignFeature {
  label: string;
  labelEn: string;
  desc: string;
}

export interface CharacterData {
  nameKr: string;
  story: string;
  concept: string;
  designer: string;
  colorPalette: ColorSwatch[];
  designFeatures: DesignFeature[];
  turnaroundImages: string[];
  turnaroundLabels: string[];
  poseImages: string[];
  poseLabels: string[];
  usageImages: string[];
  usageLabels: string[];
  tools: string;
}

/** Per-project visual identity for detail views */
export interface ProjectStyle {
  accentColor: string;
  titleFont: string;           // CSS font-family
  titleWeight: number;
  titleItalic: boolean;
  titleUppercase: boolean;
  titleLetterSpacing: string;  // CSS letter-spacing
  titleSize: string;           // CSS clamp() for responsive size
}

export interface Project {
  id: number;
  title: string;
  category: CategoryKey;
  categoryLabel: string;
  year: string;
  client: string;
  image?: string;
  videoUrl: string;
  aspectRatio: AspectRatio;
  description: string;
  storyboardDesc: string;
  fonts: string;
  role: string;
  tools: string;
  process: string;
  storyboardImages: string[];
  style: ProjectStyle;
  // Character-specific
  characterData?: CharacterData;
}

export const categories: Category[] = [
  { key: 'all', label: '전체보기', labelEn: 'All', count: 0 },
  { key: 'youtube', label: '유튜브', labelEn: 'YouTube', count: 0 },
  { key: 'works', label: '작업물', labelEn: 'Works', count: 0 },
  { key: 'did', label: 'DID', labelEn: 'DID', count: 0 },
  { key: 'character', label: '캐릭터 디자인', labelEn: 'Character', count: 0 },
];

export const projects: Project[] = [
  // --- YouTube ---
  {
    id: 1,
    title: 'Midnight Tokyo',
    category: 'youtube',
    categoryLabel: 'YouTube',
    year: '2024',
    client: 'Lexus',
    image:
      'https://images.unsplash.com/photo-1585085007341-a5aadf6e48e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMG5lb24lMjBuaWdodCUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NzA3MjgwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    videoUrl: 'https://youtu.be/IwBghhWtY2I',
    aspectRatio: '16:9',
    description:
      '도쿄의 네온사인을 배경으로 한 럭셔리 세단의 야간 주행 영상입니다. 빛의 반사와 도시의 속도감을 표현하는 데 중점을 두었습니다.',
    storyboardDesc:
      '도시의 복잡한 리듬을 12개의 핵심 프레임으로 나누어 설계했습니다. 각 컷은 빛의 궤적과 차량의 곡선을 강조합니다.',
    fonts: 'Helvetica Now Display, Noto Sans JP',
    role: 'Directing · Editing · Color Grading',
    tools: 'DaVinci Resolve · Premiere Pro',
    process:
      '야간 촬영을 위한 조명 세팅과 후반 작업에서의 컬러 그레이딩(Color Grading)에 3주가 소요되었습니다.',
    storyboardImages: Array(12).fill(null).map((_, i) => `https://picsum.photos/seed/${i + 20}/800/450`),
    style: {
      accentColor: '#c9a96e',
      titleFont: "'Playfair Display', serif",
      titleWeight: 300,
      titleItalic: true,
      titleUppercase: false,
      titleLetterSpacing: '-0.04em',
      titleSize: 'clamp(3.5rem, 8vw, 8rem)',
    },
  },
  {
    id: 2,
    title: 'Behind the Lens',
    category: 'youtube',
    categoryLabel: 'YouTube',
    year: '2024',
    client: 'Personal',
    image:
      'https://images.unsplash.com/photo-1625961332312-8355a9f8c1dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2bG9nJTIwZmlsbWluZyUyMGNhbWVyYSUyMHNldHVwfGVufDF8fHx8MTc3MDcyODM3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    videoUrl: 'https://youtu.be/FCD0PS-DOA0',
    aspectRatio: '16:9',
    description:
      '크리에이터의 제작 과정을 담은 비하인드 브이로그. 촬영 장비 셋업부터 편집 워크플로우까지 투명하게 공개합니다.',
    storyboardDesc:
      'B-roll 컷 구성과 내레이션 타이밍을 동기화하여 몰입감을 극대화했습니다.',
    fonts: 'SF Pro Display, Pretendard',
    role: 'Filming · Editing',
    tools: 'Final Cut Pro · Sony A7S III',
    process:
      'Sony A7S III와 DJI RS3 Pro 조합으로 핸드헬드 촬영 후 Final Cut Pro에서 편집했습니다.',
    storyboardImages: Array(12).fill(null).map((_, i) => `https://picsum.photos/seed/${i + 100}/800/450`),
    style: {
      accentColor: '#7eb8da',
      titleFont: "'Space Grotesk', sans-serif",
      titleWeight: 400,
      titleItalic: false,
      titleUppercase: true,
      titleLetterSpacing: '0.12em',
      titleSize: 'clamp(2.5rem, 6vw, 5.5rem)',
    },
  },
  {
    id: 3,
    title: 'Studio Session',
    category: 'youtube',
    categoryLabel: 'YouTube',
    year: '2025',
    client: 'Studio',
    image:
      'https://images.unsplash.com/photo-1764664035176-8e92ff4f128e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0dWJlJTIwdmlkZW8lMjBzdHVkaW8lMjBjb250ZW50JTIwY3JlYXRpb258ZW58MXx8fHwxNzcwNzI4Mzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    videoUrl: 'https://youtu.be/n06k5VyeO2Q',
    aspectRatio: '16:9',
    description:
      '스튜디오 세션 라이브 녹화 콘텐츠. 조명, 사운드, 카메라 앵글의 삼위일체를 통해 현장감을 전달합니다.',
    storyboardDesc:
      '멀티캠 세팅으로 6대의 카메라 앵글을 실시간 전환하여 편집했습니다.',
    fonts: 'Neue Haas Grotesk, Inter',
    role: 'Technical Direction',
    tools: 'ATEM Mini Pro · OBS',
    process:
      '라이브 멀티캠 수록을 위해 ATEM Mini Pro를 활용한 실시간 스위칭 시스템을 구축했습니다.',
    storyboardImages: Array(12).fill(null).map((_, i) => `https://picsum.photos/seed/${i + 110}/800/450`),
    style: {
      accentColor: '#e07c5a',
      titleFont: "'Playfair Display', serif",
      titleWeight: 700,
      titleItalic: false,
      titleUppercase: false,
      titleLetterSpacing: '-0.03em',
      titleSize: 'clamp(3.5rem, 8vw, 8rem)',
    },
  },

  // --- Works (작업물) ---
  {
    id: 4,
    title: 'Silent Echo',
    category: 'works',
    categoryLabel: '작업물',
    year: '2026',
    client: 'Indie',
    image:
      '/1.png',
    videoUrl: 'https://vimeo.com/1163898030?fl=ip&fe=ec',
    aspectRatio: '21:9',
    description:
      '클링ai 및 에프터이펙트를 이용한 올리브영 광고',
    storyboardDesc:
      '감정의 고조에 따라 화면의 대비와 구도를 점진적으로 변화시켰습니다.',
    fonts: 'Garamond Premier Pro',
    role: 'Directing · Cinematography',
    tools: 'Arri Alexa · DaVinci Resolve',
    process:
      '자연광만을 활용하여 촬영했으며, 필름 그레인 효과를 통해 아날로그 감성을 더했습니다.',
    storyboardImages: Array(12).fill(null).map((_, i) => `https://picsum.photos/seed/${i + 40}/800/450`),
    style: {
      accentColor: '#8b9a7e',
      titleFont: "'Cormorant Garamond', serif",
      titleWeight: 300,
      titleItalic: true,
      titleUppercase: false,
      titleLetterSpacing: '0.02em',
      titleSize: 'clamp(3.5rem, 9vw, 9rem)',
    },
  },
  {
    id: 5,
    title: 'Urban Rhythm',
    category: 'works',
    categoryLabel: '작업물',
    year: '2026',
    client: 'Sony Music',
    image:
      '/2.png',
    videoUrl: 'https://vimeo.com/1163898510?fl=ip&fe=ec',
    aspectRatio: '21:9',
    description:
      'ai로 재해석한 나만의 템버린즈 무드 광고',
    storyboardDesc:
      '비트(Beat)에 맞춰 화면이 전환되도록 1/60초 단위로 컷을 배분했습니다.',
    fonts: 'Druk Wide, Roboto Mono',
    role: 'Motion Graphics · Editing',
    tools: 'After Effects · Premiere Pro',
    process:
      '모션 캡처 기술을 활용하여 댄서의 움직임을 그래픽 요소로 변환했습니다.',
    storyboardImages: Array(12).fill(null).map((_, i) => `https://picsum.photos/seed/${i + 60}/800/450`),
    style: {
      accentColor: '#e84545',
      titleFont: "'Inter', sans-serif",
      titleWeight: 700,
      titleItalic: false,
      titleUppercase: true,
      titleLetterSpacing: '0.2em',
      titleSize: 'clamp(2rem, 5vw, 4.5rem)',
    },
  },
  {
    id: 6,
    title: 'Cinematic Reel',
    category: 'works',
    categoryLabel: '작업물',
    year: '2025',
    client: 'Freelance',
    image:
      'https://images.unsplash.com/photo-1758553026412-bc1da0ebd366?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmclMjBjaW5lbWF0aWMlMjBwcm9kdWN0aW9ufGVufDF8fHx8MTc3MDcyODM3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    videoUrl: 'https://vimeo.com/783455878',
    aspectRatio: '4:3',
    description:
      '다양한 프로젝트의 하이라이트를 모은 시네마틱 쇼릴. 컬러 그레이딩과 트랜지션에 중점을 두었습니다.',
    storyboardDesc:
      '각 프로젝트의 핵심 씬을 3초 단위로 배열하여 리듬감 있는 흐름을 만들었습니다.',
    fonts: 'Monument Extended, Inter',
    role: 'Editing · Color Grading',
    tools: 'DaVinci Resolve · After Effects',
    process:
      'DaVinci Resolve에서 전체 컬러 그레이딩 파이프라인을 구축하고, After Effects로 트랜지션을 제작했습니다.',
    storyboardImages: Array(12).fill(null).map((_, i) => `https://picsum.photos/seed/${i + 120}/800/450`),
    style: {
      accentColor: '#d4a054',
      titleFont: "'Cormorant Garamond', serif",
      titleWeight: 500,
      titleItalic: true,
      titleUppercase: false,
      titleLetterSpacing: '0.01em',
      titleSize: 'clamp(3.5rem, 8vw, 8rem)',
    },
  },

  // --- DID ---
  {
    id: 7,
    title: 'Digital Persona',
    category: 'did',
    categoryLabel: 'DID',
    year: '2024',
    client: 'Tech Startup',
    image:
      'https://images.unsplash.com/photo-1717583191083-cd82ed7f217e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXZhdGFyJTIwdmlydHVhbCUyMGlkZW50aXR5fGVufDF8fHx8MTc3MDcyODM3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    videoUrl: 'https://www.youtube.com/watch?v=_cMxraX_5RE',
    aspectRatio: '1:1',
    description:
      '디지털 아이덴티티(DID)를 기반으로 한 가상 페르소나 디자인. 블록체인 인증 기반의 개인 브랜딩 시스템입니다.',
    storyboardDesc:
      '페르소나의 시각적 변환 과정을 단계별로 기록한 아카이브입니다.',
    fonts: 'Space Grotesk, IBM Plex Mono',
    role: '3D Modeling · UI Design',
    tools: 'Figma · Three.js',
    process:
      'Figma에서 UI 시스템을 설계하고, Three.js로 인터랙티브 3D 아바타를 구현했습니다.',
    storyboardImages: Array(12).fill(null).map((_, i) => `https://picsum.photos/seed/${i + 130}/800/450`),
    style: {
      accentColor: '#00d4ff',
      titleFont: "'Space Grotesk', sans-serif",
      titleWeight: 500,
      titleItalic: false,
      titleUppercase: true,
      titleLetterSpacing: '0.15em',
      titleSize: 'clamp(2.5rem, 6vw, 5.5rem)',
    },
  },
  {
    id: 8,
    title: 'Identity System',
    category: 'did',
    categoryLabel: 'DID',
    year: '2025',
    client: 'Web3 Studio',
    image:
      'https://images.unsplash.com/photo-1765218185091-ecbaa6fb99b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaWRlbnRpdHklMjBkZXNpZ24lMjBhYnN0cmFjdHxlbnwxfHx8fDE3NzA3MjgzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    videoUrl: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
    aspectRatio: '16:9',
    description:
      '분산형 신원증명 시스템의 비주얼 아이덴티티 디자인. 신뢰와 투명성을 시각적으로 구현했습니다.',
    storyboardDesc:
      '아이덴티티 구성 요소들의 모듈화 과정을 시각적으로 문서화했습니다.',
    fonts: 'Satoshi, JetBrains Mono',
    role: 'Brand Identity · Gen Art',
    tools: 'Processing · Illustrator',
    process:
      '제너러티브 아트 기법을 활용하여 각 사용자별 유니크한 비주얼 패턴을 생성하는 알고리즘을 개발했습니다.',
    storyboardImages: Array(12).fill(null).map((_, i) => `https://picsum.photos/seed/${i + 140}/800/450`),
    style: {
      accentColor: '#9b8ce8',
      titleFont: "'Inter', sans-serif",
      titleWeight: 600,
      titleItalic: false,
      titleUppercase: true,
      titleLetterSpacing: '0.1em',
      titleSize: 'clamp(2.5rem, 6vw, 5.5rem)',
    },
  },
  {
    id: 9,
    title: 'Brand Protocol',
    category: 'did',
    categoryLabel: 'DID',
    year: '2024',
    client: 'DAO Collective',
    image:
      'https://images.unsplash.com/photo-1762365189058-7be5b07e038b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGlkZW50aXR5JTIwbW9ja3VwJTIwZGVzaWdufGVufDF8fHx8MTc3MDcyODM3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    videoUrl: 'https://vimeo.com/517301676',
    aspectRatio: '4:5',
    description:
      'DAO 기반 커뮤니티의 브랜드 프로토콜 디자인. 탈중앙화 가치를 반영한 유기적 비주얼 시스템입니다.',
    storyboardDesc:
      '브랜드 가이드라인의 각 섹션을 인터랙티브 프레젠테이션으로 제작했습니다.',
    fonts: 'General Sans, Fira Code',
    role: 'BX Design · Motion',
    tools: 'After Effects · Figma',
    process:
      '커뮤니티 투표를 통해 선정된 디자인 방향성을 기반으로 반복적 이터레이션 프로세스를 진행했습니다.',
    storyboardImages: Array(12).fill(null).map((_, i) => `https://picsum.photos/seed/${i + 150}/800/450`),
    style: {
      accentColor: '#4ecdc4',
      titleFont: "'Space Grotesk', sans-serif",
      titleWeight: 400,
      titleItalic: false,
      titleUppercase: true,
      titleLetterSpacing: '0.2em',
      titleSize: 'clamp(2rem, 5vw, 4.5rem)',
    },
  },

  // --- Character Design ---
  {
    id: 10,
    title: 'Neo Character',
    category: 'character',
    categoryLabel: '캐릭터 디자인',
    year: '2024',
    client: 'Game Studio',
    image:
      'https://images.unsplash.com/photo-1669605140640-d5908ffe8524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGNoYXJhY3RlciUyMG1vZGVsaW5nJTIwcmVuZGVyfGVufDF8fHx8MTc3MDcyODM3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    videoUrl: '',
    aspectRatio: '4:5',
    description:
      '사이버 도시 "네오폴리스"의 수호자. 인간과 AI의 경계에서 태어난 하이브리드 존재로, 디지털 세계와 현실 세계를 넘나든다.',
    storyboardDesc: '',
    fonts: 'Orbitron, Noto Sans KR',
    role: 'Character Design · 3D Modeling',
    tools: 'ZBrush · Unreal Engine 5',
    process:
      'ZBrush로 하이폴리 모델링 후 Substance Painter에서 텍스처를 제작하고 Unreal Engine 5에서 최종 렌더링했습니다.',
    storyboardImages: [],
    style: {
      accentColor: '#2EE59D',
      titleFont: "'Space Grotesk', sans-serif",
      titleWeight: 700,
      titleItalic: false,
      titleUppercase: true,
      titleLetterSpacing: '0.15em',
      titleSize: 'clamp(2.5rem, 6vw, 5rem)',
    },
    characterData: {
      nameKr: '네오',
      story:
        '사이버 도시 "네오폴리스"의 수호자. 인간과 AI의 경계에서 태어난 하이브리드 존재로, 디지털 세계와 현실 세계를 넘나든다. 부드러운 곡선과 날카로운 각선의 대비가 캐릭터의 이중적 정체성을 표현한다.',
      concept: '인간과 기술의 공존을 탐구하는 사이버펑크 캐릭터 디자인',
      designer: '김영민',
      colorPalette: [
        { name: 'Neon Mint', nameKr: '네온 민트', hex: '#2EE59D' },
        { name: 'Deep Violet', nameKr: '딥 바이올렛', hex: '#1B0A3C' },
        { name: 'Electric Blue', nameKr: '일렉트릭 블루', hex: '#00D4FF' },
        { name: 'Hot Pink', nameKr: '핫 핑크', hex: '#FF3366' },
        { name: 'Void Black', nameKr: '보이드 블랙', hex: '#0D0D0D' },
      ],
      designFeatures: [
        { label: '둥근 사각형 바디', labelEn: 'Rounded Rectangular Body', desc: '친근하면서도 미래적인 바디 프레임' },
        { label: '네온 발광 라인', labelEn: 'Neon Glow Lines', desc: '에너지 흐름을 시각화하는 발광 디테일' },
        { label: '모듈형 파츠', labelEn: 'Modular Parts', desc: '교체 가능한 파츠 시스템' },
        { label: 'LED 페이스', labelEn: 'LED Face Panel', desc: '감정 표현을 위한 디지털 페이스 패널' },
      ],
      turnaroundImages: Array(4).fill(null).map((_, i) => `https://picsum.photos/seed/neo-turn-${i}/600/800`),
      turnaroundLabels: ['정면', '3/4 뷰', '측면', '후면'],
      poseImages: Array(6).fill(null).map((_, i) => `https://picsum.photos/seed/neo-pose-${i}/500/500`),
      poseLabels: ['기본 포즈', '인사', '전투 자세', '점프', '앉기', '특수 동작'],
      usageImages: Array(3).fill(null).map((_, i) => `https://picsum.photos/seed/neo-use-${i}/800/500`),
      usageLabels: ['게임 UI 적용', '굿즈 목업', '포스터 디자인'],
      tools: 'ZBrush · Substance Painter · Unreal Engine 5',
    },
  },
  {
    id: 11,
    title: 'Illust Series',
    category: 'character',
    categoryLabel: '캐릭터 디자인',
    year: '2025',
    client: 'Publishing',
    image:
      'https://images.unsplash.com/photo-1648824156751-b994ece57a10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBkZXNpZ24lMjBpbGx1c3RyYXRpb24lMjBhcnR8ZW58MXx8fHwxNzcwNzI4Mzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    videoUrl: '',
    aspectRatio: '4:5',
    description:
      '숲속 깊은 곳에 사는 작은 수호 정령. 계절이 바뀔 때마다 몸의 색이 변하며, 따뜻한 마음으로 숲의 동물 친구들을 돌본다.',
    storyboardDesc: '',
    fonts: 'Recoleta, Nanum Myeongjo',
    role: 'Character Design',
    tools: 'Procreate · Photoshop',
    process:
      'Procreate에서 초기 스케치 후 Photoshop에서 디테일 작업, 최종적으로 벡터 변환하여 다양한 매체에 활용할 수 있도록 했습니다.',
    storyboardImages: [],
    style: {
      accentColor: '#F4A7BB',
      titleFont: "'Cormorant Garamond', serif",
      titleWeight: 300,
      titleItalic: false,
      titleUppercase: false,
      titleLetterSpacing: '0.03em',
      titleSize: 'clamp(3.5rem, 9vw, 9rem)',
    },
    characterData: {
      nameKr: '루미',
      story:
        '숲속 깊은 곳에 사는 작은 수호 정령. 계절이 바뀔 때마다 몸의 색이 변하며, 따뜻한 마음으로 숲의 동물 친구들을 돌본다. 아이들의 첫 친구가 되어줄 수 있는 다정한 캐릭터를 목표로 디자인했다.',
      concept: '자연과 우정을 테마로 한 아동용 일러스트 캐릭터',
      designer: '김영민',
      colorPalette: [
        { name: 'Rose Pink', nameKr: '로즈 핑크', hex: '#F4A7BB' },
        { name: 'Baby Blue', nameKr: '베이비 블루', hex: '#89CFF0' },
        { name: 'Vanilla', nameKr: '바닐라', hex: '#FFF5E1' },
        { name: 'Leaf Green', nameKr: '리프 그린', hex: '#98C379' },
        { name: 'Warm Sand', nameKr: '웜 샌드', hex: '#D4A574' },
      ],
      designFeatures: [
        { label: '둥근 실루엣', labelEn: 'Round Silhouette', desc: '친근하고 포근한 느낌의 2등신 체형' },
        { label: '수채화 텍스처', labelEn: 'Watercolor Texture', desc: '아날로그 감성의 텍스처 기반 피부 표현' },
        { label: '자연 모티브', labelEn: 'Nature Motif', desc: '잎사귀, 꽃 등 자연 요소 액세서리' },
        { label: '계절 변화', labelEn: 'Seasonal Shift', desc: '계절에 따라 바뀌는 컬러 팔레트' },
      ],
      turnaroundImages: Array(4).fill(null).map((_, i) => `https://picsum.photos/seed/lumi-turn-${i}/600/800`),
      turnaroundLabels: ['정면', '3/4 뷰', '측면', '후면'],
      poseImages: Array(6).fill(null).map((_, i) => `https://picsum.photos/seed/lumi-pose-${i}/500/500`),
      poseLabels: ['기본 포즈', '손 흔들기', '꽃 들기', '잠자기', '웃음', '놀람'],
      usageImages: Array(3).fill(null).map((_, i) => `https://picsum.photos/seed/lumi-use-${i}/800/500`),
      usageLabels: ['동화책 표지', '문구 제품', 'SNS 스티커'],
      tools: 'Procreate · Photoshop · Illustrator',
    },
  },
  {
    id: 12,
    title: 'Poster Works',
    category: 'character',
    categoryLabel: '캐릭터 디자인',
    year: '2024',
    client: 'Exhibition',
    image:
      'https://images.unsplash.com/photo-1770581939371-326fc1537f10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwcG9zdGVyJTIwdHlwb2dyYXBoeXxlbnwxfHx8fDE3NzA2NTY3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    videoUrl: '',
    aspectRatio: '4:5',
    description:
      '도시의 에너지를 시각화한 그래픽 캐릭터. 포스터 아트에 최적화된 강렬한 비주얼과 다양한 포즈는 어떤 매체에서도 시선을 사로잡는다.',
    storyboardDesc: '',
    fonts: 'Clash Display, Pretendard',
    role: 'Graphic Design',
    tools: 'Illustrator · InDesign',
    process:
      'Illustrator에서 벡터 캐릭터를 제작하고, InDesign에서 그리드 기반 레이아웃을 완성했습니다.',
    storyboardImages: [],
    style: {
      accentColor: '#E63946',
      titleFont: "'Inter', sans-serif",
      titleWeight: 900,
      titleItalic: false,
      titleUppercase: true,
      titleLetterSpacing: '-0.02em',
      titleSize: 'clamp(3rem, 7vw, 6rem)',
    },
    characterData: {
      nameKr: '포스',
      story:
        '도시의 에너지를 시각화한 그래픽 캐릭터. 포스터 아트에 최적화된 강렬한 비주얼과 다양한 포즈는 어떤 매체에서도 시선을 사로잡는다. 단순한 형태 안에 깊은 존재감을 담는 것이 디자인의 핵심이다.',
      concept: '그래픽 포스터에 최적화된 아이코닉 캐릭터 시스템',
      designer: '김영민',
      colorPalette: [
        { name: 'Signal Red', nameKr: '시그널 레드', hex: '#E63946' },
        { name: 'Gold', nameKr: '골드', hex: '#FFD700' },
        { name: 'Midnight', nameKr: '미드나잇', hex: '#1A1A2E' },
        { name: 'Paper White', nameKr: '페이퍼 화이트', hex: '#F5F5F5' },
        { name: 'Accent Cyan', nameKr: '엑센트 시안', hex: '#00B4D8' },
      ],
      designFeatures: [
        { label: '기하학적 형태', labelEn: 'Geometric Form', desc: '강렬한 실루엣의 기본 도형 조합' },
        { label: '하이 콘트라스트', labelEn: 'High Contrast', desc: '원색 대비로 시각적 임팩트 극대화' },
        { label: '타이포 일체형', labelEn: 'Typo-Integrated', desc: '타이포그래피와 결합된 포즈 설계' },
        { label: '미니멀 구조', labelEn: 'Minimal Structure', desc: '선과 면의 최소 구성으로 상징성 강화' },
      ],
      turnaroundImages: Array(4).fill(null).map((_, i) => `https://picsum.photos/seed/pos-turn-${i}/600/800`),
      turnaroundLabels: ['정면', '3/4 뷰', '측면', '후면'],
      poseImages: Array(6).fill(null).map((_, i) => `https://picsum.photos/seed/pos-pose-${i}/500/500`),
      poseLabels: ['기본 포즈', '역동적', '타이포 결합', '포인팅', '점프', '실루엣'],
      usageImages: Array(3).fill(null).map((_, i) => `https://picsum.photos/seed/pos-use-${i}/800/500`),
      usageLabels: ['전시 포스터', '패키지 디자인', '브랜드 콜라보'],
      tools: 'Illustrator · InDesign · After Effects',
    },
  },
];

// Calculate counts
categories.forEach((cat) => {
  if (cat.key === 'all') {
    cat.count = projects.length;
  } else {
    cat.count = projects.filter((p) => p.category === cat.key).length;
  }
});
