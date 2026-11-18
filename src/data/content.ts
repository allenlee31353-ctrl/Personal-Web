/**
 * 網站所有文字內容集中管理於此檔。
 * 內容依據 Allen Lee 履歷（2026.08）整理；修改此檔即可更新全站，元件不需修改。
 */
import type { LucideIcon } from 'lucide-react';
import { Rocket, Droplets, Wrench, Box, ShieldCheck, KanbanSquare } from 'lucide-react';

export const profile = {
  name: '李建霆',
  nameEn: 'Allen Lee',
  initials: 'AL',
  role: 'NPI Engineer II / Project Lead',
  company: 'Garmin Asia',
  location: '桃園，台灣',
  email: 'allenlee31353@hotmail.com',
  avatar: 'avatar.jpg',
  availability: '歡迎交流製程開發與 NPI 合作',
  headline: '用專業與創新，\n打造更好的科技體驗。',
  headlineAccent: '科技體驗',
  tagline: '專注於技術、設計與創新，持續探索科技的更多可能。',
  intro:
    '我是李建霆，現任 Garmin Asia 新產品導入（NPI）工程師暨專案負責人。機械工程碩士出身，十餘年來從 CAE 模擬、玻璃製程設備到穿戴裝置量產，專注把新產品從設計圖穩定地帶進量產線。',
};

export const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jian-ting-allen-lee-99b889186/',
    handle: 'linkedin.com/in/jian-ting-allen-lee',
  },
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
  { value: 13, suffix: '+', label: '年製造與研發經驗' },
  { value: 160, prefix: '$', suffix: 'M', label: '主導新產線投資（美元）' },
  { value: 100, suffix: '%', label: 'Forerunner 45/55 良率' },
  { value: 150, suffix: '%', label: 'PUR 4.0 新設備 ROI' },
];

export const aboutParagraphs = [
  '我在國立中央大學完成機械工程學士與碩士，研究有限元素分析、振動與破壞力學。畢業後在群光電能擔任機構與 CAE 工程師，用模擬預測產品的落球與落摔表現；接著加入康寧（Corning）亞洲區，負責玻璃後加工設備，主導 1.6 億美元的新產線導入。',
  '2021 年起，我在 Garmin Asia 擔任 NPI 工程師與專案負責人，帶領跨職能團隊開發穿戴與戶外產品的新製程，從 PUR、LOCA 光學貼合到新設備設計，持續在品質、成本與交期（QCD）之間找到最佳解。',
];

export const values = [
  { title: '用數據找根因', text: '以 PFMEA 與 8D 拆解問題，讓每次改善都有證據、可複製。' },
  { title: '跨團隊協作', text: '串起研發、品保、供應商與產線，讓新產品準時走進量產。' },
  { title: '持續精進', text: '從模擬、設備到製程，把每個專案累積成下一個專案的能力。' },
];

export const experience = [
  {
    period: '2021.03 — 至今',
    title: 'NPI Engineer II / Project Lead',
    org: 'Garmin Asia・亞洲製造與營運｜桃園',
    text: '帶領 Instinct 3 系列產品團隊開發新製程，並主導 Forerunner 265、Foretrex 801、Lily 2 等產品從 NPI 導入量產。',
  },
  {
    period: '2017.06 — 2020.04',
    title: 'Process Equipment Engineer',
    org: 'Corning Incorporated (MTE Asia)｜台中',
    text: '主導亞洲區新設備計畫，導入投資額 1.6 億美元的玻璃後加工新產線，並於合肥廠正式量產。',
  },
  {
    period: '2013.11 — 2017.03',
    title: 'Mechanical Engineer / CAE Engineer',
    org: '群光電能 Chicony Power Technology｜新北',
    text: '開發 Lenovo 45W 變壓器機構件，並以 Abaqus 模擬落球、落摔與接觸力測試，支援研發設計決策。',
  },
  {
    period: '2012.05 — 2013.08',
    title: 'CAE Engineer, Intern',
    org: 'Lih Yeng Co., Ltd.｜桃園',
    text: '以 ANSYS Fluent 模擬太陽能追日支架風壓，進行流固耦合與結構變形分析。',
  },
  {
    period: '2007.09 — 2013.08',
    title: '機械工程 學士・碩士',
    org: '國立中央大學',
    text: '主修機械工程，研究有限元素分析、彈性力學、振動分析與破壞力學。',
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
    icon: Rocket,
    title: '新產品導入',
    en: 'New Product Introduction',
    text: '從 EVT、DVT 到量產，規劃製程能力、成本與良率，帶領跨職能團隊把消費性電子產品穩定送進量產線。',
    tags: ['NPI → MP', 'QCD', 'Fitness', 'Outdoor', 'Handheld'],
  },
  {
    icon: Droplets,
    title: '黏著與光學貼合製程',
    en: 'Adhesive & Optical Bonding',
    text: '開發鏡片與錶圈的 PUR 黏著，以及蓋板玻璃與 LCM 的 LOCA 光學貼合製程。',
    tags: ['PUR', 'LOCA', 'Optical Bonding'],
  },
  {
    icon: Wrench,
    title: '設備與治具設計',
    en: 'Equipment & Fixture Design',
    text: '設計新製程設備、治具與載具，兼顧結構強度、輕量化與產能。',
    tags: ['SolidWorks', 'AutoCAD', 'FAT / SAT'],
  },
  {
    icon: Box,
    title: 'CAE 模擬分析',
    en: 'CAE Simulation',
    text: '以有限元素與流體模擬，在打樣前預測結構、落摔與風壓表現。',
    tags: ['ANSYS', 'Abaqus', 'LS-DYNA'],
  },
  {
    icon: ShieldCheck,
    title: '品質與問題解決',
    en: 'Quality & Problem Solving',
    text: '以 PFMEA 預防失效、以 8D 追查根因，並用 ELOT 等驗證確認改善成效。',
    tags: ['PFMEA', '8D', 'Minitab', 'ELOT'],
  },
  {
    icon: KanbanSquare,
    title: '專案與供應商管理',
    en: 'Project & Supplier Management',
    text: '管理時程規劃、SOW、RFQ 與設計審查，協調歐洲、中國與新加坡等跨國供應商。',
    tags: ['SOW / RFQ', 'Design Review', 'Process Validation'],
  },
];

/* ---------------- Projects ---------------- */

export type CoverVariant = 'watch' | 'bonding' | 'glassline' | 'fea';

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
    id: 'pur-bonding',
    title: 'PUR 黏著製程革新',
    subtitle: 'Garmin 穿戴裝置鏡片與錶圈黏著',
    category: 'Garmin・穿戴裝置',
    year: '2021 — 至今',
    cover: 'watch',
    role: 'NPI 工程師・製程負責人',
    stack: ['PUR 4.0', 'PFMEA', '8D', 'ELOT', '點膠治具'],
    background:
      'Forerunner 系列的鏡片與錶圈以 PUR 熱熔膠黏著。量產初期出現缺膠、溢膠與 CCD 對位偏移等問題，直接影響良率與防水可靠度。',
    challenge:
      '缺陷成因橫跨膠材、點膠路徑、治具干涉與視覺對位，需要在不延誤出貨的前提下逐一找出根因，並防止同類問題在下一代產品重演。',
    solution:
      '以 8D 追查根因並升級治具設計，建立「點膠治具設計準則」作為 PUR 製程的失效預防規範；同步評估新膠材並以 ELOT 驗證黏著強度，再導入新一代 PUR 4.0 設備。',
    results: [
      { value: '100%', label: 'Forerunner 55 良率（原 97%）' },
      { value: '+12%', label: '新 PUR 膠材黏著力' },
      { value: '150%', label: 'PUR 4.0 設備 ROI' },
    ],
  },
  {
    id: 'loca-bonding',
    title: 'LOCA 光學貼合',
    subtitle: '蓋板玻璃與 LCM 全貼合製程',
    category: 'Garmin・戶外產品',
    year: '2022 — 2024',
    cover: 'bonding',
    role: '製程開發',
    stack: ['LOCA', 'Optical Bonding', 'UV Curing', '8D'],
    background:
      '戶外與健身產品需要在強光下保持清晰可讀，蓋板玻璃與顯示模組（LCM）之間採用液態光學膠（LOCA）全貼合。',
    challenge:
      'InReach Messenger 出現 LOCA 溢漏，Lily 2 則有膠材未完全固化的問題，同時需要降低 Venu 3 的貼合成本。',
    solution:
      '重新定義點膠量與擋牆設計以控制溢漏，調整 UV 固化條件與遮光區處理以解決未固化，並比較 PUR 與 LOCA 方案，為 Venu 3 選出成本最佳的貼合方式。',
    results: [
      { value: '+22.5%', label: 'InReach 良率提升' },
      { value: '17.5%', label: 'Lily 2 未固化問題改善' },
      { value: '−6.7%', label: 'Venu 3 貼合成本' },
    ],
  },
  {
    id: 'corning-ags',
    title: '車用玻璃新產線',
    subtitle: 'Corning AGS 玻璃後加工設備導入',
    category: 'Corning・車用玻璃',
    year: '2017 — 2020',
    cover: 'glassline',
    role: '製程設備工程師',
    stack: ['Cleaning Process', 'Surface Treatment', 'CAE', 'FAT / SAT'],
    background:
      'Corning 車用玻璃事業（AGS）要在亞洲建立車用內裝蓋板的新產線，涵蓋清洗與表面處理等後加工製程。',
    challenge:
      '設備供應商分散在捷克、中國與新加坡，需在有限時程內完成設計審查、驗收與製程驗證，並讓良率在量產時達標。',
    solution:
      '定義新製程流程與設備規格，主導 SOW、RFQ、FAT 與 SAT；以 CAE 評估新卡匣的結構強度與撓曲（安全係數 > 1.5），並重新設計治具與載具。',
    results: [
      { value: 'US$160M', label: '新產線投資規模' },
      { value: '> 90%', label: '表面處理良率' },
      { value: '−18%', label: '治具與載具重量' },
    ],
  },
  {
    id: 'adapter-cae',
    title: '變壓器結構模擬',
    subtitle: 'Lenovo 45W 變壓器機構件開發',
    category: '群光電能・電源產品',
    year: '2013 — 2017',
    cover: 'fea',
    role: '機構工程師・CAE 工程師',
    stack: ['Abaqus', 'SolidWorks', 'AutoCAD', 'Drop Test'],
    background:
      '筆電變壓器在運輸與使用中常遭受落摔與撞擊，外殼與內部元件必須同時兼顧強度、散熱與成本。',
    challenge:
      '實體測試需要打樣，週期長、成本高；研發希望在設計階段就能預測落球、落摔與接觸力的結果。',
    solution:
      '以 Abaqus 建立落球、落摔與電子產品接觸力模擬，回饋外殼材料與結構設計；同時完成外殼、散熱片、屏蔽板與線材的 2D／3D 量產圖。',
    results: [
      { value: '3 項', label: '可靠度測試模擬' },
      { value: '45W', label: 'Lenovo 變壓器量產' },
      { value: '4 類', label: '機構件量產圖面' },
    ],
  },
];

/* ---------------- Insights ---------------- */

export const articleCategories = ['全部', '製程技術', '品質管理', '產業觀察', '職涯心得'] as const;
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
    id: 'pur-vs-loca',
    title: 'PUR 還是 LOCA？穿戴裝置貼合製程的選擇',
    excerpt: '兩種膠材各有擅長的場景。選錯了，良率與成本都會在量產時一起反映出來。',
    category: '製程技術',
    date: '2026-09-18',
    readTime: 7,
    body: [
      'PUR 熱熔膠適合結構性黏著，例如鏡片與錶圈，固化後強度高、防水性好；LOCA 液態光學膠則用於蓋板玻璃與顯示模組之間的全貼合，重點在光學表現與消除空氣層。',
      '選擇時我會先看三件事：黏著部位要承受的力、是否在光路上，以及產線能接受的節拍。PUR 對點膠路徑與治具精度很敏感，LOCA 則要嚴格控制溢膠與遮光區的固化。',
      '在 Venu 3 的案例中，我們比較兩種方案的材料、設備與良率成本，最終讓貼合成本下降 6.7%。關鍵不在哪種膠比較好，而是哪種方案最符合這個產品的條件。',
    ],
  },
  {
    id: '8d-in-practice',
    title: '8D 實戰：Forerunner 良率從 97% 到 100%',
    excerpt: '最後那 3% 通常最難。真正有效的不是更努力檢查，而是把根因寫進設計準則。',
    category: '品質管理',
    date: '2026-06-02',
    readTime: 8,
    body: [
      'Forerunner 55 的 PUR 製程良率卡在 97%，不良集中在缺膠、行程干涉與 CCD 對位偏移。這些現象看起來各自獨立，追下去卻都跟點膠治具的設計有關。',
      '我們依照 8D 流程組成跨部門小組，先做臨時圍堵，再用資料區分不同缺陷的發生條件，最後從治具定位、行程與對位標記三個方向同時修正。',
      '真正讓問題不再發生的是第七步「預防再發」：我們把這次的經驗整理成點膠治具設計準則，後續專案在設計階段就能避開同樣的坑。良率最終達到 100%。',
    ],
  },
  {
    id: 'cae-before-prototype',
    title: '讓 CAE 走在打樣之前',
    excerpt: '模擬的價值不在漂亮的應力雲圖，而在於幫團隊少做一次打樣。',
    category: '製程技術',
    date: '2026-03-14',
    readTime: 6,
    body: [
      '在群光開發變壓器時，落球與落摔測試往往要等到打樣後才能進行，一旦失敗就得重新開模。後來我們把 Abaqus 模擬提前到設計階段，讓研發在畫圖時就看到風險位置。',
      '在康寧評估新卡匣時，同樣用 CAE 確認結構強度與撓曲，確保安全係數大於 1.5 才進入製作。',
      '我的經驗是：模擬要和實測互相校正。先用少量實驗驗證模型，之後的設計變更才能放心交給模擬判斷。',
    ],
  },
  {
    id: 'cross-border-equipment',
    title: '跨國設備導入：從 RFQ 到合肥量產',
    excerpt: '供應商在三個國家、產線在另一個城市，時程管理靠的是清楚的規格與驗收標準。',
    category: '產業觀察',
    date: '2025-12-05',
    readTime: 7,
    body: [
      '在康寧車用玻璃專案中，設備供應商分布在捷克、中國與新加坡，產線則落在合肥。任何一方的規格理解不同，都會在現場安裝時放大成延誤。',
      '我們把 SOW 寫到可驗收的程度，在 RFQ 階段就要求供應商回覆關鍵參數，並在 FAT 時盡量模擬實際生產條件，讓 SAT 只剩確認而不是重新除錯。',
      '最後產線順利在合肥量產，表面處理良率超過 90%。跨國專案最重要的工具不是軟體，而是一份所有人都看得懂的規格書。',
    ],
  },
  {
    id: 'mechanical-to-npi',
    title: '從機構設計到 NPI：我的職涯轉折',
    excerpt: '從畫圖、模擬到帶領新產品進量產，每一段經歷都在補上一塊系統拼圖。',
    category: '職涯心得',
    date: '2025-08-20',
    readTime: 5,
    body: [
      '我的第一份工作是機構與 CAE 工程師，關心的是單一零件會不會壞。到了康寧，視角變成一整條產線的設備與流程；進入 Garmin 後，則要同時顧到設計、製程、品質與供應鏈。',
      '每次轉換都很不適應，但也讓我看到：很多量產問題在設計階段就埋下了，而很多設計限制其實來自製程。能同時理解兩邊，是 NPI 工程師最大的價值。',
      '如果你也在考慮從研發轉向製造，我的建議是先學會看懂產線的數據，那會是你和工廠溝通的共同語言。',
    ],
  },
];
