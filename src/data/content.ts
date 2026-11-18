/**
 * 網站所有文字內容集中管理於此檔。
 * 內容依據 Allen Lee 履歷（2026.08）與 LinkedIn 個人檔案整理；修改此檔即可更新全站，元件不需修改。
 */
import type { LucideIcon } from 'lucide-react';
import { Rocket, Droplets, Wrench, Box, ShieldCheck, KanbanSquare } from 'lucide-react';

export const profile = {
  name: '李建霆',
  nameEn: 'Allen Lee',
  initials: 'AL',
  role: 'NPI Advanced Engineer',
  company: 'Garmin Asia',
  location: '桃園，台灣',
  email: 'allenlee31353@hotmail.com',
  avatar: 'avatar.jpg',
  availability: '歡迎交流製程開發與 NPI 合作',
  headline: '用專業與創新，\n打造更好的科技體驗。',
  headlineAccent: '科技體驗',
  tagline: '專注於技術、設計與創新，持續探索科技的更多可能。',
  intro:
    '我是李建霆，現任 Garmin Asia 資深新產品導入（NPI Advanced）工程師。機械工程碩士出身，累積 4 年 CAE 模擬、近 3 年玻璃製程設備與 5 年以上穿戴裝置量產經驗，專注把新產品從設計圖穩定地帶進量產線。',
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
  { id: 'impact', label: '成果' },
  { id: 'insights', label: '文章' },
  { id: 'contact', label: '聯絡' },
] as const;

/* ---------------- About ---------------- */

export const stats = [
  { value: 13, suffix: '+', label: '年製造與研發經驗' },
  { value: 160, prefix: '$', suffix: 'M', label: '主導新產線投資（美元）' },
  { value: 100, suffix: '%', label: 'Forerunner 55 良率' },
  { value: 66, prefix: '+', suffix: '%', label: '通用槽位設計單位面積產能' },
];

export const aboutParagraphs = [
  '我在國立中央大學完成機械工程學士與碩士。畢業後在群光電能先擔任 CAE 工程師，以 Abaqus 預測落球、落摔與超音波熔接等設計表現；之後轉任量產機構工程師，在中國廠完成 EVT、DVT、PVT 到 MP 的導入。',
  '接著我加入康寧（Corning）亞洲區，負責玻璃製程設備與載具設計，與捷克、中國、韓國與新加坡的供應商合作，主導 1.6 億美元的車用玻璃新產線。2021 年起在 Garmin Asia 擔任 NPI 工程師，2025 年晉升為 NPI Advanced Engineer，帶領健身、戶外、航空與手持產品從開發走進量產，並指導新進工程師獨立執行製程。',
];

export const values = [
  { title: '用數據找根因', text: '以 PFMEA、8D 與 Minitab SPC 拆解問題，讓每次改善都有證據、可複製。' },
  { title: '把經驗變成準則', text: '把量產問題寫成設計與治具準則，讓下一個產品在設計階段就避開風險。' },
  { title: '帶人一起成長', text: '透過 Confluence 文件與跨部門討論推動製程標準化，並指導新進工程師獨立作業。' },
];

export interface Experience {
  period: string;
  title: string;
  org: string;
  text: string;
  highlights?: string[];
}

export const experience: Experience[] = [
  {
    period: '2025.06 — 至今',
    title: 'NPI Advanced Engineer',
    org: 'Garmin Asia｜桃園',
    text: '帶領 Instinct 系列手錶的製程開發專案，指導新進工程師獨立執行製程，並推動製程能力提升與標準化。',
    highlights: ['Instinct 系列製程開發', '新進工程師指導', 'Confluence 製程標準化'],
  },
  {
    period: '2021.03 — 2025.06',
    title: 'NPI Engineer II / Project Lead',
    org: 'Garmin Asia・亞洲製造與營運｜桃園',
    text: '開發鏡片與錶圈 PUR 黏著、蓋板玻璃與 LCM 的 LOCA 光學貼合製程，帶領 Forerunner、Venu、InReach、Lily 2 等健身、戶外、航空與手持產品導入量產。',
    highlights: ['Forerunner 55 良率 97% → 100%', 'InReach 良率 +22.5%', 'Venu 貼合成本 −6.7%', '通用槽位產能 +66%'],
  },
  {
    period: '2017.06 — 2020.04',
    title: 'Process Equipment Engineer',
    org: 'Corning Incorporated (MTE Asia)｜台中',
    text: '主導亞洲區新設備與新產線導入，負責清洗與表面處理設備、載具與治具設計，並以 CAE 評估卡匣與設備結構。',
    highlights: ['US$160M 車用玻璃新產線', 'Varioptic 載具輕量化 18%', 'Gen 8.5 大片玻璃搬運治具'],
  },
  {
    period: '2015.05 — 2017.03',
    title: 'Mechanical Engineer (MP)',
    org: '群光電能 Chicony Power Technology｜新北',
    text: '開發變壓器外殼、散熱片、屏蔽板與線材，於中國廠完成 EVT、DVT、PVT 到 MP，並與模具廠確認材料與設計、執行塑膠外殼超音波熔接。',
  },
  {
    period: '2013.11 — 2015.05',
    title: 'CAE Engineer (ATC)',
    org: '群光電能 Chicony Power Technology｜新北',
    text: '以 Abaqus 模擬落球、落摔、超音波熔接、接觸力、橡膠按鍵力行程、彈簧力與支架強度，預測新品設計趨勢並回饋研發。',
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
    text: '從 EVT、DVT、PVT 到量產，規劃製程能力、成本、良率與風險評估，帶領跨職能團隊把健身、戶外、航空與手持產品穩定送進量產線。',
    tags: ['NPI → MP', 'QCD', 'Fitness', 'Outdoor', 'Aviation', 'Handheld'],
  },
  {
    icon: Droplets,
    title: '黏著與光學貼合製程',
    en: 'Adhesive & Optical Bonding',
    text: '開發鏡片與錶圈的 PUR 黏著、蓋板玻璃與 LCM 的 LOCA 貼合，並評估新膠材。',
    tags: ['PUR', 'LOCA', '新膠材評估'],
  },
  {
    icon: Wrench,
    title: '機構與治具設計',
    en: 'Mechanical & Fixture Design',
    text: '塑膠與金屬件機構設計，以及製程設備、載具與卡匣設計，兼顧強度、輕量化與產能。',
    tags: ['SolidWorks', 'AutoCAD', '超音波熔接'],
  },
  {
    icon: Box,
    title: 'CAE 結構分析',
    en: 'Structural Analysis',
    text: '4 年 CAE 經驗，以有限元素在打樣前預測落摔、接觸、破壞與結構變形。',
    tags: ['Abaqus', 'ANSYS', 'LS-DYNA'],
  },
  {
    icon: ShieldCheck,
    title: '品質與問題解決',
    en: 'Quality & Problem Solving',
    text: '以 PFMEA 預防失效、以 8D 追查根因，用 Minitab SPC 與 ELOT 驗證改善成效，並建立設計準則降低防水失效與溢膠風險。',
    tags: ['PFMEA', '8D', 'Minitab SPC', 'ELOT'],
  },
  {
    icon: KanbanSquare,
    title: '專案與供應商管理',
    en: 'Project & Supplier Management',
    text: '2.5 年設備專案管理經驗，負責 SOW、RFQ、設計審查、FAT、SAT 與製程驗證，協調歐洲、中國、韓國與新加坡供應商。',
    tags: ['SOW / RFQ', 'FAT / SAT', 'Process Validation'],
  },
];

/** Tools listed on the résumé and LinkedIn profile, grouped by use. */
export const toolkit = [
  { label: 'CAD', items: ['SolidWorks', 'AutoCAD', 'DraftSight'] },
  { label: 'CAE', items: ['Abaqus', 'ANSYS', 'ANSYS Fluent', 'LS-DYNA'] },
  { label: '品質與數據', items: ['Minitab (SPC)', 'PFMEA', '8D', 'Origin', 'Material Test System'] },
  { label: '協作', items: ['Confluence', 'Microsoft Office', 'Adobe Acrobat'] },
];

/* ---------------- Projects ---------------- */

export type CoverVariant = 'watch' | 'bonding' | 'glassline' | 'fea' | 'handheld';

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
      '以 8D 追查根因並升級治具設計，建立「點膠治具設計準則」作為 PUR 製程的失效預防規範；解決 Forerunner 溢膠問題，同步評估新膠材並以 ELOT 驗證黏著強度，再導入新一代 PUR 4.0 設備。',
    results: [
      { value: '100%', label: 'Forerunner 55 良率（原 97%）' },
      { value: '−13%', label: 'Forerunner 溢膠不良率' },
      { value: '150%', label: 'PUR 4.0 設備 ROI' },
    ],
  },
  {
    id: 'loca-bonding',
    title: 'LOCA 光學貼合',
    subtitle: '蓋板玻璃與 LCM 全貼合製程',
    category: 'Garmin・戶外產品',
    year: '2021 — 至今',
    cover: 'bonding',
    role: '製程開發',
    stack: ['LOCA', 'Optical Bonding', 'UV Curing', '8D'],
    background:
      '戶外與健身產品需要在強光下保持清晰可讀，蓋板玻璃與顯示模組（LCM）之間採用液態光學膠（LOCA）全貼合。',
    challenge:
      'InReach 系列出現 LOCA 溢漏，Lily 2 則有膠材未完全固化的問題，同時需要降低 Venu 系列的貼合成本。',
    solution:
      '重新定義點膠量與擋牆設計以控制溢漏，調整 UV 固化條件與遮光區處理以解決未固化，並比較 PUR 與 LOCA 方案，為 Venu 選出成本最佳的貼合方式。',
    results: [
      { value: '77.5 → 100%', label: 'InReach LOCA 溢漏良率' },
      { value: '17.5%', label: 'Lily 2 未固化問題改善' },
      { value: '−6.7%', label: 'Venu 貼合成本' },
    ],
  },
  {
    id: 'handheld-guideline',
    title: '手持產品設計準則',
    subtitle: '在設計初期導入量產經驗',
    category: 'Garmin・手持與航空',
    year: '2021 — 至今',
    cover: 'handheld',
    role: 'NPI 工程師',
    stack: ['DFM', 'Design Guideline', 'Universal Slot', 'Confluence'],
    background:
      'Foretrex、Xero、eTrex 等手持產品的防水失效與溢膠風險，過去常在試產後才被發現，修改設計的代價很高。',
    challenge:
      '研發在設計初期缺少製程端的具體建議，產線的單位面積產能也受限於各產品專用的載具。',
    solution:
      '整理歷代量產問題，建立手持產品設計準則，供設計初期跨部門討論；以通用槽位設計讓不同產品共用載具，並將文件發布在 Confluence 上推動製程標準化。',
    results: [
      { value: '+66%', label: '單位面積產能' },
      { value: '3 系列', label: '導入準則（Foretrex・Xero・eTrex）' },
      { value: '4 類', label: 'NPI 產品線（健身・戶外・航空・手持）' },
    ],
  },
  {
    id: 'corning-ags',
    title: '車用玻璃新產線',
    subtitle: 'Corning 玻璃製程設備與載具導入',
    category: 'Corning・玻璃製程',
    year: '2017 — 2020',
    cover: 'glassline',
    role: '製程設備工程師',
    stack: ['Cleaning Process', 'Surface Treatment', 'ANSYS', 'Abaqus', 'FAT / SAT'],
    background:
      'Corning 車用玻璃事業（AGS）要在亞洲建立車用內裝蓋板的新產線，涵蓋清洗與表面處理等後加工製程；同時，各廠區的鏡片與大片玻璃也需要新的載具與治具。',
    challenge:
      '設備供應商分布在捷克、中國、韓國與新加坡，需在時程內完成設計審查、驗收與製程驗證；大長寬比玻璃與滿載機械手臂也需要確認結構安全。',
    solution:
      '主導 SOW、RFQ、設計審查、FAT、SAT 與製程驗證，並於 2018–2020 年將新技術設備導入合肥廠；以 CAE 評估卡匣撓曲、支撐點與機械手臂掛鉤強度，設計 Varioptic 鏡片載具、通用卡匣與 Gen 8.5 大片玻璃搬運治具。',
    results: [
      { value: 'US$160M', label: '新產線投資規模' },
      { value: '> 90%', label: '表面處理良率' },
      { value: '−18%', label: 'Varioptic 鏡片載具重量' },
    ],
  },
  {
    id: 'adapter-cae',
    title: '變壓器開發與模擬',
    subtitle: '群光電能電源產品機構與 CAE',
    category: '群光電能・電源產品',
    year: '2013 — 2017',
    cover: 'fea',
    role: 'CAE 工程師 → 量產機構工程師',
    stack: ['Abaqus', 'SolidWorks', 'AutoCAD', '超音波熔接', 'Material Test System'],
    background:
      '筆電變壓器在運輸與使用中常遭受落摔與撞擊，外殼與內部元件必須同時兼顧強度、散熱與成本。',
    challenge:
      '實體測試需要打樣，週期長、成本高；研發希望在設計階段就能預測落球、落摔、熔接與接觸力的表現，並順利在中國廠量產。',
    solution:
      '以 Abaqus 建立落球、落摔、超音波熔接、接觸力、橡膠按鍵力行程等模擬回饋研發；轉任量產機構後，開發 Lenovo 45W 等變壓器的外殼、散熱片、屏蔽板與線材，並管理 BOM 與模具廠溝通。',
    results: [
      { value: '7 類', label: 'CAE 模擬項目' },
      { value: 'EVT → MP', label: '中國廠量產導入' },
      { value: '4 類', label: '變壓器機構件' },
    ],
  },
];
/* ---------------- Impact (2021–2026) ---------------- */

export interface ImpactItem {
  /** Headline figure exactly as reported. */
  value: string;
  label: string;
  product?: string;
  /** Optional before → after detail shown under the label. */
  detail?: string;
}

export const impactNote =
  '2021–2026 年在 Garmin 的量化成果。2024 年僅含年中報告，2025 年列出晉升里程碑、量化成果尚未納入；各項指標單位不同，請分別解讀、不互相比較。';

export const impactKpis = [
  { label: '2023 PUR 自動化預期效益', value: '5 人力', note: '0.035 man·hr/pcs；0.409 USD/pcs' },
  { label: '2023 FR265 帶動', value: '+130%', note: 'Fitness 營收成長（報告所述）' },
  { label: '2026 量產最終良率', value: '99.7–99.8%', note: 'FR170/70 99.7%；Decaf 99.8%' },
  { label: '2026 PR → MP 標準成本差', value: '1.6–3.8%', note: '目標 < 5%' },
];

export const impactYears: { year: string; note?: string; items: ImpactItem[] }[] = [
  {
    year: '2021',
    items: [{ value: '+12%', label: 'PUR 新膠材黏著力', product: '穿戴裝置' }],
  },
  {
    year: '2022',
    items: [
      { value: '+66%', label: 'Universal Slot 單位面積容量', product: '產線載具' },
      { value: '37.7%', label: '背光漏光良率改善', product: '手持產品' },
      { value: '+22.5%', label: 'LOCA 溢漏良率', product: 'inReach', detail: '77.5% → 100%' },
      { value: '13%', label: 'PUR 溢膠不良率改善', product: 'Forerunner 265' },
      { value: '−6.7%', label: '貼合方案成本降低', product: 'Venu 3' },
    ],
  },
  {
    year: '2023',
    items: [
      { value: '53%', label: 'Tumble fail 問題解決', product: 'Forerunner 265' },
      { value: '41%', label: 'Bezel ledge 外露問題解決', product: 'Lily 2' },
      { value: '17.5%', label: 'LOCA 未固化問題解決', product: 'Lily 2' },
      { value: '16%', label: '防水問題解決', product: 'Lily 2' },
      { value: '+4.3%', label: 'LOCA 溢漏良率提升', product: 'Lily 2' },
    ],
  },
  {
    year: '2024',
    note: '年中報告',
    items: [{ value: '3%', label: 'ALS 脫落問題解決', product: 'Lily 2 Active' }],
  },
  {
    year: '2025',
    note: '里程碑',
    items: [
      {
        value: '晉升',
        label: 'NPI Advanced Engineer',
        product: 'Garmin Asia',
        detail: '2025 年 6 月起帶領 Instinct 系列製程開發，並指導新進工程師。量化成果尚未納入。',
      },
    ],
  },
  {
    year: '2026',
    items: [
      { value: '47.6% → 0%', label: 'Tumble fail 歸零', product: 'Forerunner 170 / 70' },
      { value: '8.4% → 0%', label: 'FPC 金手指斷裂歸零', product: 'Decaf' },
      { value: '+19.4%', label: '產能 UPH 提升（計算值）', product: '產線', detail: 'UPH 180 → 215' },
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
    excerpt: '從畫圖、模擬、帶領新產品進量產，到 2025 年晉升 NPI Advanced Engineer，每一段經歷都在補上一塊系統拼圖。',
    category: '職涯心得',
    date: '2025-08-20',
    readTime: 5,
    body: [
      '我的第一份工作是機構與 CAE 工程師，關心的是單一零件會不會壞。到了康寧，視角變成一整條產線的設備與流程；進入 Garmin 後，則要同時顧到設計、製程、品質與供應鏈。',
      '每次轉換都很不適應，但也讓我看到：很多量產問題在設計階段就埋下了，而很多設計限制其實來自製程。能同時理解兩邊，是 NPI 工程師最大的價值。',
      '2025 年，我晉升為 NPI Advanced Engineer。工作重心從「自己把問題解決」轉向「讓團隊有能力解決問題」：帶領 Instinct 系列的製程開發、把經驗整理成 Confluence 上的標準文件，並指導新進工程師獨立執行製程。',
      '如果你也在考慮從研發轉向製造，我的建議是先學會看懂產線的數據，那會是你和工廠溝通的共同語言。',
    ],
  },
];
