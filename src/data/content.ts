/**
 * 網站所有文字內容集中管理於此檔。
 * 替換成你自己的姓名、經歷、作品與聯絡方式即可，元件不需修改。
 */
import type { LucideIcon } from 'lucide-react';
import { Cpu, PenTool, Workflow, KanbanSquare, SearchCheck, FlaskConical } from 'lucide-react';

export const profile = {
  name: '林以恆',
  nameEn: 'Ethan Lin',
  initials: 'EL',
  role: 'Senior Engineer & Product Designer',
  location: '台北，台灣',
  email: 'hello@example.com',
  availability: '目前開放顧問合作與技術諮詢',
  headline: '用專業與創新，\n打造更好的科技體驗。',
  headlineAccent: '科技體驗',
  tagline: '專注於技術、設計與創新，持續探索科技的更多可能。',
  intro:
    '我是一名橫跨軟硬體研發與產品設計的工程師，擁有十年以上的實戰經驗。從嵌入式系統、雲端平台到使用者介面，我相信好的科技應該安靜地運作，讓人專注於真正重要的事。',
};

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', handle: 'linkedin.com/in/ethanlin' },
  { label: 'GitHub', href: 'https://github.com/', handle: 'github.com/ethanlin' },
  { label: 'Medium', href: 'https://medium.com/', handle: 'medium.com/@ethanlin' },
  { label: 'X', href: 'https://x.com/', handle: '@ethanlin' },
] as const;

export const navItems = [
  { id: 'about', label: '關於' },
  { id: 'expertise', label: '專業' },
  { id: 'projects', label: '作品' },
  { id: 'insights', label: '文章' },
  { id: 'contact', label: '聯絡' },
] as const;

/* ---------------- About ---------------- */

export const stats = [
  { value: 12, suffix: '+', label: '年產業經驗' },
  { value: 40, suffix: '+', label: '完成專案' },
  { value: 8, suffix: '', label: '項技術專利' },
  { value: 99.9, suffix: '%', label: '系統可用率', decimals: 1 },
];

export const aboutParagraphs = [
  '我的職涯起點在半導體設備的韌體開發，之後轉向智慧製造與物聯網平台，近年專注於將 AI 與感測技術帶進真實產品。這條路讓我習慣從「系統」的角度看問題——硬體、軟體、使用者與商業，彼此環環相扣。',
  '我重視可量測的成果，也重視細節裡的溫度。每一行程式碼、每一個介面決策，最終都會成為某個人的日常體驗。',
];

export const values = [
  { title: '以人為本', text: '技術是手段，體驗才是目的。先理解人，再設計系統。' },
  { title: '簡單而深刻', text: '把複雜留給自己，把清晰交給使用者。' },
  { title: '持續精進', text: '保持好奇與謙遜，用數據驗證每一個假設。' },
];

export const experience = [
  {
    period: '2021 — 至今',
    title: '資深技術經理',
    org: 'Nova Systems 新創科技',
    text: '帶領 18 人跨職能團隊，打造工業 AI 視覺檢測平台，服務超過 30 家製造業客戶。',
  },
  {
    period: '2017 — 2021',
    title: '產品工程師・技術主管',
    org: 'Horizon IoT 智聯科技',
    text: '主導智慧建築感測平台從 0 到 1，完成軟硬整合與量產導入。',
  },
  {
    period: '2014 — 2017',
    title: '韌體工程師',
    org: 'Precision Semi 精密半導體設備',
    text: '負責晶圓設備控制韌體，將設備停機時間降低 37%。',
  },
  {
    period: '2012 — 2014',
    title: '電機工程碩士',
    org: '國立台灣大學',
    text: '研究方向為嵌入式系統與即時訊號處理。',
  },
];

/* ---------------- Expertise ---------------- */

export interface Expertise {
  icon: LucideIcon;
  title: string;
  en: string;
  text: string;
  tags: string[];
}

export const expertise: Expertise[] = [
  {
    icon: Cpu,
    title: '技術研發',
    en: 'R&D Engineering',
    text: '從架構設計到落地實作，打造穩定、可擴展且易於維護的軟硬體系統。',
    tags: ['Embedded C/C++', 'TypeScript', 'Python', 'Edge AI'],
  },
  {
    icon: PenTool,
    title: '產品設計',
    en: 'Product Design',
    text: '以使用者研究為基礎，將複雜需求轉化為直覺且有溫度的產品體驗。',
    tags: ['UX Research', 'Prototyping', 'Design System'],
  },
  {
    icon: Workflow,
    title: '工程整合',
    en: 'Systems Integration',
    text: '串接感測器、韌體、雲端與應用層，讓每個環節無縫協作。',
    tags: ['IoT', 'Cloud', 'API Design'],
  },
  {
    icon: KanbanSquare,
    title: '專案管理',
    en: 'Project Management',
    text: '以敏捷方法推動跨部門協作，確保專案準時、準確地交付價值。',
    tags: ['Agile', 'OKR', 'Stakeholder'],
  },
  {
    icon: SearchCheck,
    title: '問題分析與解決',
    en: 'Problem Solving',
    text: '用數據與第一性原理拆解問題，找到真正的根因與最佳解。',
    tags: ['Root Cause', 'Data Analysis'],
  },
  {
    icon: FlaskConical,
    title: '創新技術研究',
    en: 'Emerging Tech',
    text: '持續研究 AI、感測與人機互動等前沿技術，評估其商業化可能。',
    tags: ['Generative AI', 'Computer Vision', 'HCI'],
  },
];

/* ---------------- Projects ---------------- */

export type CoverVariant = 'vision' | 'building' | 'energy' | 'health';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  cover: CoverVariant;
  role: string;
  stack: string[];
  background: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
}

export const projects: Project[] = [
  {
    id: 'lumen-vision',
    title: 'Lumen Vision',
    subtitle: '工業 AI 視覺檢測平台',
    category: 'AI・製造',
    year: '2024',
    cover: 'vision',
    role: '技術負責人・產品架構',
    stack: ['PyTorch', 'TensorRT', 'Rust', 'React', 'Kubernetes'],
    background:
      '傳統產線仰賴人工目檢，檢出率受疲勞與經驗影響，且難以追溯。客戶希望在不更換既有設備的前提下，導入自動化瑕疵檢測。',
    challenge:
      '產線節拍僅 120 毫秒，模型必須在邊緣裝置上即時推論；同時瑕疵樣本稀少，資料嚴重不平衡。',
    solution:
      '設計「邊緣推論 + 雲端再訓練」的混合架構，以合成資料與少樣本學習補足稀有瑕疵，並打造讓產線人員也能標註與回饋的直覺介面。',
    results: [
      { value: '99.2%', label: '瑕疵檢出率' },
      { value: '38ms', label: '平均推論時間' },
      { value: '−62%', label: '人力檢測成本' },
    ],
  },
  {
    id: 'atrium',
    title: 'Atrium',
    subtitle: '智慧建築感測與能源管理系統',
    category: 'IoT・建築',
    year: '2022',
    cover: 'building',
    role: '產品經理・系統整合',
    stack: ['Zephyr RTOS', 'LoRaWAN', 'Go', 'TimescaleDB', 'Swift'],
    background:
      '商辦大樓的空調與照明耗能佔總用電六成以上，但管理者缺乏即時、細緻的數據作為決策依據。',
    challenge:
      '需要在不重新佈線的條件下部署上千個感測點，並確保電池壽命超過五年、資料延遲低於一分鐘。',
    solution:
      '自行設計低功耗感測模組與自組網路協定，整合既有 BMS 系統，並以清晰的儀表板讓管理者一眼掌握建築狀態。',
    results: [
      { value: '24%', label: '年度節能' },
      { value: '5.5 年', label: '感測器電池壽命' },
      { value: '1,200+', label: '部署節點' },
    ],
  },
  {
    id: 'pulse',
    title: 'Pulse',
    subtitle: '穿戴式健康監測裝置',
    category: '硬體・健康',
    year: '2020',
    cover: 'health',
    role: '韌體架構・使用者體驗',
    stack: ['nRF52', 'BLE', 'DSP', 'Kotlin', 'Figma'],
    background:
      '一家醫療器材新創希望推出可長時間配戴的心律監測裝置，提供醫師遠端追蹤病患狀況。',
    challenge:
      '在極小的體積與電量限制下，必須兼顧量測精度、資料安全與長者友善的操作體驗。',
    solution:
      '最佳化訊號處理演算法並採事件觸發傳輸，大幅降低功耗；App 則以大字體、單一主要操作的設計原則，讓長者也能輕鬆上手。',
    results: [
      { value: '14 天', label: '單次充電續航' },
      { value: '±1 bpm', label: '量測誤差' },
      { value: '4.8 ★', label: 'App 使用者評分' },
    ],
  },
  {
    id: 'gridline',
    title: 'Gridline',
    subtitle: '再生能源電網預測平台',
    category: '能源・數據',
    year: '2023',
    cover: 'energy',
    role: '資料架構・前端設計',
    stack: ['Python', 'LightGBM', 'Kafka', 'TypeScript', 'D3.js'],
    background:
      '太陽能與風力發電的波動性，讓電網調度人員難以預先安排備轉容量。',
    challenge:
      '整合氣象、歷史發電與即時電網數據，並在 15 分鐘內提供可信的預測與不確定性區間。',
    solution:
      '建構串流資料管線與集成預測模型，並設計以「信心區間」為核心的視覺化介面，協助調度人員快速判斷。',
    results: [
      { value: '−31%', label: '預測誤差' },
      { value: '15 分鐘', label: '預測更新頻率' },
      { value: '3 座', label: '導入調度中心' },
    ],
  },
];

/* ---------------- Insights ---------------- */

export const articleCategories = ['全部', '產業趨勢', '技術研究', '知識分享', '觀點心得'] as const;
export type ArticleCategory = Exclude<(typeof articleCategories)[number], '全部'>;

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  date: string; // ISO
  readTime: number;
  body: string[];
}

export const articles: Article[] = [
  {
    id: 'edge-ai-2026',
    title: '邊緣 AI 的下一步：從模型壓縮到系統協同',
    excerpt: '當模型越來越大、裝置越來越小，真正的突破不只在演算法，而在軟硬體的協同設計。',
    category: '產業趨勢',
    date: '2026-10-12',
    readTime: 8,
    body: [
      '過去幾年，邊緣 AI 的討論多半圍繞在模型壓縮：量化、剪枝、知識蒸餾。這些技術確實讓模型得以在有限資源下運行，但在實際專案中，我發現瓶頸往往不在模型本身。',
      '真正影響體驗的，是資料從感測器進入、經過前處理、推論、再到決策輸出的整條路徑。記憶體搬移、排程延遲、功耗峰值，這些系統層級的問題，常常比多 1% 的準確率更關鍵。',
      '因此，我認為下一個階段的競爭力在於「系統協同」：從晶片選型、韌體排程到模型架構一起設計。這需要工程師跨越傳統的職能邊界，也需要組織願意打破部門之間的牆。',
      '對於正在評估邊緣 AI 的團隊，我的建議是：先定義端到端的延遲與功耗預算，再回頭選擇模型，而不是反過來。',
    ],
  },
  {
    id: 'design-system-hardware',
    title: '為硬體產品建立設計系統',
    excerpt: '設計系統不只屬於軟體。實體按鍵、指示燈與聲音回饋，同樣需要一致的語言。',
    category: '知識分享',
    date: '2026-08-28',
    readTime: 6,
    body: [
      '在多數團隊裡，設計系統指的是一套 UI 元件庫。但當產品同時包含實體裝置與 App 時，使用者感受到的是整體——LED 的閃爍節奏、按鍵的觸感、提示音的音色，都在傳遞訊息。',
      '我們在 Atrium 專案中建立了一份「跨媒介設計規範」，定義狀態（正常、注意、警示、錯誤）在不同媒介上的呈現方式，讓 App 上的顏色與裝置上的燈號說同一種語言。',
      '這份規範最大的價值不在美感，而是降低了溝通成本：韌體工程師不必再猜測設計意圖，客服也能用同一套詞彙向客戶解釋。',
    ],
  },
  {
    id: 'root-cause',
    title: '根因分析的五個常見陷阱',
    excerpt: '多數問題反覆發生，不是因為我們不夠努力，而是我們太快停在「看起來合理」的答案。',
    category: '知識分享',
    date: '2026-06-15',
    readTime: 7,
    body: [
      '第一個陷阱是把「症狀」當成「原因」。設備當機是症狀，記憶體洩漏可能也只是中間環節，真正的根因也許是某個邊界條件下的錯誤處理。',
      '第二個陷阱是只找一個原因。複雜系統的失效往往是多個因素同時成立的結果，單點修正只會讓問題換個樣子回來。',
      '第三、四、五個陷阱分別是：缺乏可重現的資料、讓職位高低影響判斷，以及修正後沒有驗證機制。我習慣在每次事件檢討後，留下一份可被搜尋的紀錄，讓組織真正累積經驗。',
    ],
  },
  {
    id: 'llm-in-factory',
    title: '生成式 AI 走進工廠：三個真實案例的觀察',
    excerpt: '從維修知識庫到排程助理，生成式 AI 在製造業的價值，取決於它與現場流程整合的深度。',
    category: '技術研究',
    date: '2026-04-02',
    readTime: 10,
    body: [
      '今年我們與三家製造業客戶合作導入生成式 AI，場景分別是設備維修問答、生產排程建議，以及品質報告自動撰寫。',
      '效果最好的是維修問答。原因很單純：維修手冊與歷史工單本來就是高品質、結構化程度不錯的資料，而技術人員也有明確的提問需求。',
      '最具挑戰的是排程建議。排程牽涉大量約束條件，語言模型並不擅長精確的組合最佳化；最後我們讓模型負責理解需求與解釋結果，最佳化交給傳統求解器，效果才真正穩定。',
      '我的結論是：把生成式 AI 視為「介面」而不是「大腦」，往往能更快帶來價值。',
    ],
  },
  {
    id: 'engineer-to-manager',
    title: '從工程師到技術主管，我學到的事',
    excerpt: '轉換角色後才發現，最難的不是技術決策，而是如何讓團隊在不確定中依然前進。',
    category: '觀點心得',
    date: '2026-01-20',
    readTime: 5,
    body: [
      '剛成為主管時，我仍然習慣親自解決最難的技術問題。短期看起來很有效率，長期卻讓團隊失去成長的機會，也讓我自己成為瓶頸。',
      '後來我學會把時間花在三件事：釐清方向、移除障礙、以及建立讓人敢於提出問題的環境。技術判斷依然重要，但它應該是團隊的能力，而不只是我的能力。',
      '如果要給新手主管一個建議：請把「我的團隊不需要我也能運作」當作目標。',
    ],
  },
  {
    id: 'sustainable-tech',
    title: '永續不是附加功能：談科技產品的能源設計',
    excerpt: '節能常被視為規格表上的一行字，但它其實應該從第一張架構圖就被考慮。',
    category: '產業趨勢',
    date: '2025-11-08',
    readTime: 6,
    body: [
      '隨著淨零目標成為企業共識，產品的能源效率不再只是成本問題，也是品牌與法規問題。',
      '在軟體層面，資料傳輸頻率、運算位置（雲端或邊緣）與閒置策略，都會大幅影響整體耗能；在硬體層面，元件選型與電源管理更是關鍵。',
      '我建議團隊在專案初期就設定「能源預算」，並像對待效能指標一樣持續追蹤。永續，應該是一種工程紀律。',
    ],
  },
];
