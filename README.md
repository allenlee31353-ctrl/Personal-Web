# Allen Lee — Personal Portfolio

An Apple-inspired, minimalist personal brand site built with **React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide Icons**.

## 快速開始

```bash
npm install
npm run dev       # 開發模式 http://localhost:5173
npm run build     # 型別檢查 + 正式建置到 dist/
npm run preview   # 預覽正式版 http://localhost:4173
```

需求：Node.js 18 以上。

## 自訂內容

所有文字（姓名、標語、經歷、專業能力、專案、文章、社群連結）都集中在
**`src/data/content.ts`**，修改後畫面自動更新，不需要改元件。

另外請一併更新：

- `index.html`：`<title>`、description、Open Graph、canonical 網址、JSON-LD。
- `public/sitemap.xml`、`public/robots.txt`：換成你的網域。
- `public/favicon.svg`：網站圖示（`apple-touch-icon.png` 由它產生）。

### 聯絡表單

表單具備即時驗證、送出中狀態、成功／錯誤畫面與防垃圾訊息欄位（honeypot）。

- **未設定後端**時：模擬送出，成功畫面提供「以郵件寄出」按鈕（自動帶入主旨與內容的 `mailto:`）。
- **接上真實後端**（如 Formspree、Getform 或自建 API）：建立 `.env.local`

  ```
  VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
  ```

  表單會以 JSON `POST { name, email, subject, message }` 到該網址。

## 專案結構

```
├── index.html               # SEO metadata、字型、主題防閃爍腳本
├── public/                  # favicon、manifest、robots、sitemap
├── src/
│   ├── main.tsx
│   ├── App.tsx              # 頁面組成、MotionConfig（尊重減少動態設定）
│   ├── index.css            # 設計 tokens（淺/深色）、共用元件樣式
│   ├── data/content.ts      # 全站內容
│   ├── hooks/
│   │   ├── useTheme.ts      # 深淺色切換（記憶使用者選擇、跟隨系統）
│   │   └── useScrollLock.ts
│   ├── lib/                 # 動畫參數、日期格式
│   └── components/
│       ├── Loader.tsx       # 載入動畫
│       ├── Navbar.tsx       # 毛玻璃導覽列、目前區塊高亮、閱讀進度、手機選單
│       ├── Hero.tsx         # 全螢幕首頁 + 視差
│       ├── HeroVisual.tsx   # 科技感主視覺（SVG）
│       ├── About.tsx        # 左右分欄、數字動畫、經歷時間軸
│       ├── Expertise.tsx    # Bento 卡片、游標聚光 Hover
│       ├── Projects.tsx     # 作品卡片 + 共享轉場的詳細彈窗
│       ├── ProjectCover.tsx # 原創 SVG 專案封面
│       ├── Insights.tsx     # 分類篩選文章列表 + 閱讀視窗
│       ├── Contact.tsx      # 聯絡資訊 + 表單驗證
│       ├── Footer.tsx
│       └── Modal / Reveal / SectionHeading / CountUp / ThemeToggle
└── tailwind.config.js       # 色彩、字體、間距設計系統
```

## 設計系統

| Token | Light | Dark |
| --- | --- | --- |
| canvas | `#FFFFFF` | `#000000` |
| surface | `#F5F5F7` | `#161617` |
| ink | `#1D1D1F` | `#F5F5F7` |
| muted | `#6E6E73` | `#86868B` |
| accent | `#0071E3` | `#2997FF` |

字體：Inter + Noto Sans TC。在淺色背景上，次要文字使用 `#6E6E73` 而不是 `#86868B`，以符合 WCAG AA 對比度。

## 品質重點

- **動畫**：滾動淡入、平滑捲動、Hero 視差、Hover 微互動、彈窗共享轉場、載入動畫；全面支援 `prefers-reduced-motion`。
- **RWD**：375 / 390 / 768 / 1024 / 1440px 皆已驗證，沒有水平溢出，觸控目標 ≥ 44px。
- **無障礙**：語意化地標、跳至主要內容連結、彈窗焦點鎖定與 Esc 關閉、表單 `aria-invalid` / 錯誤提示、可見的焦點樣式。
- **效能**：圖像全部為內嵌 SVG（零圖片請求），分包載入 React / Framer Motion，gzip 後 JS 約 115 KB。
- **SEO**：meta description、Open Graph、Twitter Card、JSON-LD Person、sitemap、robots。
