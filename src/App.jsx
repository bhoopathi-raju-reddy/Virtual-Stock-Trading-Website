import { useMemo, useState } from 'react'
import './App.css'

const stockData = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'stock',
    sector: 'Consumer Electronics',
    company: 'Apple builds products and services that connect with a global ecosystem across hardware, software, and digital experiences.',
    price: 214.45,
    changePercent: 1.24,
    marketCap: '$3.2T',
    peRatio: '30.4',
    beta: '1.09',
    volume: '64.8M',
    high: 216.4,
    low: 209.3,
    dividend: '0.52%',
    history: {
      '1D': [205.2, 206.4, 207.1, 208.6, 210.1, 209.4, 211, 212.5, 213.1, 214.45],
      '1W': [197.8, 200.4, 201.1, 203.7, 205.2, 206.6, 209.4, 210.9, 212.1, 214.45],
      '1M': [188.4, 192.1, 196.2, 199.9, 203.5, 205.7, 207.2, 210.5, 212.4, 214.45],
      '1Y': [154.2, 159.7, 164.1, 171.5, 178.9, 185.4, 194.3, 201.7, 208.8, 214.45],
    },
    news: [
      { title: 'Apple expands AI features in the next iOS rollout', time: '3 hours ago', source: 'Bloomberg', summary: 'Analysts see a stronger software ecosystem supporting recurring services revenue.' },
      { title: 'Supply chain indicators remain stable for iPhone demand', time: '12 hours ago', source: 'Reuters', summary: 'Production data points toward a steady holiday quarter.' },
    ],
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    type: 'stock',
    sector: 'Automotive',
    company: 'Tesla develops electric vehicles, energy storage, and autonomous driving platforms aimed at sustainable transport at scale.',
    price: 221.14,
    changePercent: -0.82,
    marketCap: '$705B',
    peRatio: '59.1',
    beta: '2.18',
    volume: '94.5M',
    high: 226.5,
    low: 218.1,
    dividend: '0.00%',
    history: {
      '1D': [228, 225.6, 224.1, 223.8, 222.7, 221.9, 223.2, 222.5, 221.4],
      '1W': [233.5, 231.8, 228.7, 226.2, 224.5, 223.1, 222.4, 221.7, 221.14],
      '1M': [214.2, 216.5, 219.1, 221.4, 225.6, 226.8, 224.7, 223.1, 221.14],
      '1Y': [182.4, 187.9, 193.5, 201.1, 205.8, 214.6, 219.4, 223.2, 221.14],
    },
    news: [
      { title: 'Tesla expands charging infrastructure in major metro regions', time: '5 hours ago', source: 'CNBC', summary: 'Infrastructure upgrades are helping support healthier urban demand.' },
      { title: 'Investors continue watching robotaxi milestones closely', time: '1 day ago', source: 'The Wall Street Journal', summary: 'The next product catalyst remains one of the biggest drivers of sentiment.' },
    ],
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    type: 'stock',
    sector: 'Semiconductors',
    company: 'NVIDIA creates accelerated computing platforms that power gaming, AI, data centers, and enterprise workloads.',
    price: 132.2,
    changePercent: 2.31,
    marketCap: '$3.1T',
    peRatio: '55.8',
    beta: '1.64',
    volume: '52.4M',
    high: 133.7,
    low: 128.6,
    dividend: '0.03%',
    history: {
      '1D': [124.8, 125.5, 126.1, 127.4, 129.1, 130.5, 131.8, 132.3, 132.2],
      '1W': [119.7, 120.2, 121.6, 124.5, 126.8, 128.2, 130.7, 132.1, 132.2],
      '1M': [109.4, 111.7, 115.2, 119.8, 123.7, 127.3, 129.8, 131.1, 132.2],
      '1Y': [74.5, 79.1, 84.3, 89.8, 98.2, 105.7, 117.9, 126.4, 132.2],
    },
    news: [
      { title: 'AI chip demand remains strong across enterprise customers', time: '4 hours ago', source: 'TechCrunch', summary: 'Cloud providers are continuing to expand infrastructure spending.' },
      { title: 'NVIDIA unveils new developer tools and platform upgrades', time: '18 hours ago', source: 'Fortune', summary: 'Enhanced software services could increase stickiness for large customers.' },
    ],
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    type: 'stock',
    sector: 'Internet Retail',
    company: 'Amazon combines e-commerce, cloud computing, digital media, and advertising across global online and enterprise markets.',
    price: 186.9,
    changePercent: 0.76,
    marketCap: '$2.0T',
    peRatio: '35.4',
    beta: '1.26',
    volume: '45.9M',
    high: 188.4,
    low: 183.5,
    dividend: '0.00%',
    history: {
      '1D': [181.4, 181.9, 182.6, 183.7, 184.8, 185.2, 186.1, 186.7, 186.9],
      '1W': [176.1, 177.5, 178.8, 180.4, 182.1, 184.6, 185.2, 186.5, 186.9],
      '1M': [168.4, 170.9, 173.8, 176.2, 179.1, 181.6, 183.9, 185.7, 186.9],
      '1Y': [144.2, 148.7, 152.5, 159.8, 166.1, 171.6, 178.3, 182.9, 186.9],
    },
    news: [
      { title: 'AWS growth remains a core driver for Amazon earnings momentum', time: '2 hours ago', source: 'CNBC', summary: 'Analysts highlight strong demand within AI and cloud workloads.' },
      { title: 'Retail margins improve as delivery efficiency gains continue', time: '9 hours ago', source: 'The Verge', summary: 'Operating leverage in the retail business keeps improving.' },
    ],
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    type: 'stock',
    sector: 'Software',
    company: 'Microsoft provides enterprise software, cloud infrastructure, productivity tools, and business applications globally.',
    price: 427.28,
    changePercent: 1.12,
    marketCap: '$3.1T',
    peRatio: '36.8',
    beta: '0.96',
    volume: '31.8M',
    high: 429.1,
    low: 421.8,
    dividend: '0.74%',
    history: {
      '1D': [416.1, 417.5, 419.7, 420.8, 422.4, 423.9, 425.1, 426.7, 427.28],
      '1W': [407.2, 410.3, 412.6, 417.4, 419.8, 421.1, 424.6, 426.4, 427.28],
      '1M': [395.4, 398.1, 401.8, 408.2, 412.9, 419.6, 421.8, 424.8, 427.28],
      '1Y': [347.8, 355.2, 365.1, 382.4, 394.7, 405.9, 415.4, 421.7, 427.28],
    },
    news: [
      { title: 'Microsoft Azure continues to gain traction in AI workloads', time: '1 hour ago', source: 'Bloomberg', summary: 'Enterprise spending on cloud infrastructure remains resilient.' },
      { title: 'Game portfolio expansion supports long-term growth narrative', time: '7 hours ago', source: 'Yahoo Finance', summary: 'Developers and gamers keep driving engagement across the platform.' },
    ],
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    type: 'stock',
    sector: 'Internet Services',
    company: 'Alphabet runs Google Search, Android, YouTube, advertising, and Cloud services across a broad digital ecosystem.',
    price: 175.85,
    changePercent: 0.48,
    marketCap: '$2.1T',
    peRatio: '24.1',
    beta: '1.05',
    volume: '28.2M',
    high: 177.4,
    low: 172.3,
    dividend: '0.42%',
    history: {
      '1D': [171.2, 171.8, 172.7, 173.6, 174.4, 174.9, 175.3, 175.9, 175.85],
      '1W': [165.4, 166.1, 167.4, 169.6, 171.9, 173.2, 174.4, 175.5, 175.85],
      '1M': [158.7, 160.1, 163.3, 166.9, 169.4, 171.6, 173.5, 174.8, 175.85],
      '1Y': [134.5, 139.4, 146.2, 153.7, 161.1, 167.3, 170.4, 173.9, 175.85],
    },
    news: [
      { title: 'Alphabet ad business shows sustained demand from brand spend', time: '6 hours ago', source: 'Reuters', summary: 'Advertising trends remain constructive despite elevated competition.' },
      { title: 'Cloud margins improve as enterprise usage broadens', time: '14 hours ago', source: 'The Information', summary: 'The company\'s growing cloud portfolio continues to support diversified revenue streams.' },
    ],
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    type: 'stock',
    sector: 'Communication Services',
    company: 'Meta builds social media and messaging platforms while investing in AI, AR, and digital advertising infrastructure.',
    price: 509.72,
    changePercent: 1.83,
    marketCap: '$1.3T',
    peRatio: '28.6',
    beta: '1.21',
    volume: '18.5M',
    high: 513.6,
    low: 500.4,
    dividend: '0.35%',
    history: {
      '1D': [491.4, 494.1, 498.2, 500.7, 503.6, 505.4, 507.9, 509.1, 509.72],
      '1W': [482.7, 485.8, 489.9, 495.4, 499.2, 501.8, 507.3, 509.1, 509.72],
      '1M': [468.2, 473.9, 481.3, 488.5, 494.7, 500.6, 505.4, 507.9, 509.72],
      '1Y': [348.4, 366.7, 385.9, 412.2, 435.3, 458.8, 480.1, 501.2, 509.72],
    },
    news: [
      { title: 'Meta AI tools drive stronger ad performance in digital campaigns', time: '2 hours ago', source: 'CNBC', summary: 'The company continues improving ROI for advertisers through new creative tools.' },
      { title: 'Reality Labs spending remains a long-term focus', time: '1 day ago', source: 'Financial Times', summary: 'Investors view the hardware bets as strategically important.' },
    ],
  },
]

const cryptoData = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'crypto',
    sector: 'Digital Assets',
    company: 'Bitcoin is a decentralized digital asset secured by cryptography and designed for peer-to-peer value transfer and long-term store of value.',
    price: 64530.12,
    changePercent: 2.47,
    marketCap: '$1.26T',
    peRatio: 'N/A',
    beta: '1.18',
    volume: '$31.4B',
    high: 65120,
    low: 62850,
    dividend: 'N/A',
    history: {
      '1D': [62000, 62500, 63020, 63280, 63750, 64150, 64400, 64660, 64530.12],
      '1W': [60250, 60800, 61470, 62040, 62890, 63300, 63720, 64080, 64530.12],
      '1M': [55200, 56500, 58200, 60140, 61020, 62130, 63380, 63980, 64530.12],
      '1Y': [38500, 40500, 42500, 46800, 50500, 56000, 59880, 63250, 64530.12],
    },
    news: [
      { title: 'Bitcoin demand remains elevated as institutional flows stay positive', time: '1 hour ago', source: 'CoinDesk', summary: 'Market participants continue watching ETF demand and supply constraints.' },
      { title: 'Crypto market breadth improves amid broader risk appetite', time: '8 hours ago', source: 'Decrypt', summary: 'Participants across the sector are seeing stronger engagement and confidence.' },
    ],
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'crypto',
    sector: 'Smart Contracts',
    company: 'Ethereum powers decentralized applications and smart contracts on a programmable blockchain ecosystem.',
    price: 3510.4,
    changePercent: 1.82,
    marketCap: '$424B',
    peRatio: 'N/A',
    beta: '1.38',
    volume: '$18.5B',
    high: 3568,
    low: 3420,
    dividend: 'N/A',
    history: {
      '1D': [3390, 3410, 3440, 3470, 3495, 3510, 3525, 3530, 3510.4],
      '1W': [3260, 3310, 3350, 3390, 3435, 3460, 3490, 3505, 3510.4],
      '1M': [2920, 3050, 3160, 3215, 3290, 3380, 3440, 3488, 3510.4],
      '1Y': [1850, 2010, 2230, 2480, 2740, 3020, 3225, 3435, 3510.4],
    },
    news: [
      { title: 'Ethereum layer-two activity supports network demand', time: '4 hours ago', source: 'The Block', summary: 'Improved utilization across rollups and apps keeps the ecosystem active.' },
      { title: 'Developers continue expanding staking and app ecosystems', time: '15 hours ago', source: 'Cointelegraph', summary: 'Analysts view ongoing development activity as a strong long-term signal.' },
    ],
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    type: 'crypto',
    sector: 'Layer 1 Blockchain',
    company: 'Solana is a high-performance blockchain focused on speed, low-cost transactions, and decentralized applications.',
    price: 164.22,
    changePercent: 3.51,
    marketCap: '$75B',
    peRatio: 'N/A',
    beta: '1.62',
    volume: '$6.2B',
    high: 168.4,
    low: 156.2,
    dividend: 'N/A',
    history: {
      '1D': [150.2, 152.8, 155.1, 156.3, 158.6, 160.9, 162.5, 163.8, 164.22],
      '1W': [142.8, 145.5, 148.8, 150.4, 152.9, 156.7, 159.1, 163.0, 164.22],
      '1M': [122.1, 127.4, 134.2, 139.5, 144.9, 149.6, 155.0, 160.4, 164.22],
      '1Y': [78.5, 86.2, 97.9, 111.3, 125.7, 138.8, 150.5, 160.8, 164.22],
    },
    news: [
      { title: 'Solana ecosystem sees rising dApp activity and user engagement', time: '3 hours ago', source: 'Messari', summary: 'Activity in the ecosystem continues to rise as lower fees attract more projects.' },
      { title: 'Layer-1 competition remains intense but Solana stays in focus', time: '10 hours ago', source: 'Cointelegraph', summary: 'Performance metrics continue to be a central draw for traders and developers.' },
    ],
  },
]

const allAssets = [...stockData, ...cryptoData]
const allAssetMap = Object.fromEntries(allAssets.map((asset) => [asset.symbol, asset]))

const initialHoldings = [
  { symbol: 'AAPL', type: 'stock', quantity: 18, avgPrice: 198.4 },
  { symbol: 'MSFT', type: 'stock', quantity: 9, avgPrice: 406.2 },
  { symbol: 'NVDA', type: 'stock', quantity: 24, avgPrice: 112.8 },
  { symbol: 'AMZN', type: 'stock', quantity: 11, avgPrice: 171.6 },
  { symbol: 'BTC', type: 'crypto', quantity: 0.34, avgPrice: 63000 },
  { symbol: 'ETH', type: 'crypto', quantity: 1.2, avgPrice: 3198 },
]

const initialTransactions = [
  { id: 1, type: 'Buy', symbol: 'AAPL', typeName: 'stock', quantity: 12, price: 210.8, date: 'Today, 9:42 AM', status: 'Completed' },
  { id: 2, type: 'Buy', symbol: 'NVDA', typeName: 'stock', quantity: 10, price: 128.7, date: 'Yesterday, 4:18 PM', status: 'Completed' },
  { id: 3, type: 'Sell', symbol: 'BTC', typeName: 'crypto', quantity: 0.08, price: 64200, date: 'Mon, 1:30 PM', status: 'Completed' },
  { id: 4, type: 'Buy', symbol: 'ETH', typeName: 'crypto', quantity: 1.2, price: 3410.4, date: 'Mon, 10:23 AM', status: 'Completed' },
]

const defaultUser = { fullName: 'Maya Chen', email: 'maya.chen@tradesim.io', phone: '+1 (415) 555-0148' }
const defaultWallet = { connected: true, nickname: 'My MetaMask Wallet', address: '0xA1b2...F9e4', network: 'Ethereum', balance: 2.486 }

const navItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'markets', label: 'Markets' },
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'watchlist', label: 'Watchlist' },
  { key: 'learning', label: 'Learn' },
  { key: 'competition', label: 'Competition' },
  { key: 'profile', label: 'Profile' },
]

const chartRanges = ['1D', '1W', '1M', '1Y']
const marketNews = [
  { title: 'Tech stocks lead gains as traders rotate into AI names', time: '32 min ago', source: 'Market Pulse' },
  { title: 'Crypto markets recover as ETF inflows remain positive', time: '1 hour ago', source: 'Crypto Wire' },
  { title: 'Analysts highlight stronger cloud demand ahead of earnings', time: '3 hours ago', source: 'Finance Brief' },
]
const learningCards = [
  { title: 'Trading Basics for Beginners', level: 'Beginner', duration: '8 min', summary: 'Learn how bid-ask spreads, order types, and market hours influence decisions.' },
  { title: 'How to Read Price Charts', level: 'Intermediate', duration: '12 min', summary: 'Understand trendlines, support and resistance, and how volume supports conviction.' },
  { title: 'Smart Diversification Tips', level: 'Beginner', duration: '6 min', summary: 'Build a resilient portfolio by balancing growth, income, and defensive positions.' },
]
const glossaryTerms = ['Market order', 'Stop-loss', 'Dividend', 'Portfolio allocation', 'Volatility', 'P/E ratio']
const leaderboard = [
  { rank: 1, name: 'Mia R.', score: 33650, streak: '12 wins' },
  { rank: 2, name: 'Theo P.', score: 32180, streak: '8 wins' },
  { rank: 3, name: 'You', score: 31590, streak: '5 wins' },
  { rank: 4, name: 'Ava D.', score: 29860, streak: '4 wins' },
]

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value)

const formatCompactCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)

const formatSigned = (value, digits = 2) => `${value >= 0 ? '+' : '-'}${Math.abs(value).toFixed(digits)}`
const formatPercent = (value, digits = 2) => `${value >= 0 ? '+' : ''}${value.toFixed(digits)}%`

const buildSvgPoints = (data, width = 320, height = 100) => {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  return data.map((point, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((point - min) / range) * height
    return { x, y }
  })
}

const buildLinePath = (points) => points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')

const buildAreaPath = (points, height) => {
  if (!points.length) return ''
  const line = buildLinePath(points)
  const first = points[0]
  const last = points[points.length - 1]
  return `${line} L ${last.x} ${height} L ${first.x} ${height} Z`
}

function App() {
  const [theme, setTheme] = useState('dark')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authView, setAuthView] = useState('login')
  const [activePage, setActivePage] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [marketFilter, setMarketFilter] = useState('all')
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL')
  const [selectedRange, setSelectedRange] = useState('1W')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [order, setOrder] = useState({ type: 'buy', symbol: 'AAPL', quantity: 1, orderType: 'Market Order' })
  const [holdings, setHoldings] = useState(initialHoldings)
  const [cashBalance, setCashBalance] = useState(25000)
  const [watchlist, setWatchlist] = useState(['AAPL', 'TSLA', 'NVDA', 'BTC', 'ETH'])
  const [transactions, setTransactions] = useState(initialTransactions)
  const [profile, setProfile] = useState(defaultUser)
  const [walletInfo, setWalletInfo] = useState(defaultWallet)
  const [walletEditorOpen, setWalletEditorOpen] = useState(false)
  const [walletDraft, setWalletDraft] = useState(defaultWallet)
  const [portfolioTab, setPortfolioTab] = useState('all')
  const [notificationSettings, setNotificationSettings] = useState({
    priceAlerts: true,
    dailyDigest: true,
    marketNews: false,
    competitionUpdates: true,
  })
  const [loginForm, setLoginForm] = useState({ email: 'maya.chen@tradesim.io', password: '', rememberMe: true })
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    acceptTerms: false,
    walletAddress: '',
    walletNetwork: 'Ethereum',
    walletNickname: 'My MetaMask Wallet',
  })
  const [authMessage, setAuthMessage] = useState('')

  const selectedAsset = allAssetMap[selectedSymbol] || allAssets[0]

  const filteredAssets = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return allAssets.filter((asset) => {
      const matchesFilter = marketFilter === 'all' || asset.type === marketFilter
      const matchesTerm =
        term.length === 0 ||
        asset.symbol.toLowerCase().includes(term) ||
        asset.name.toLowerCase().includes(term)
      return matchesFilter && matchesTerm
    })
  }, [marketFilter, searchTerm])

  const holdingsWithDetails = useMemo(() => {
    return holdings
      .map((holding) => {
        const asset = allAssetMap[holding.symbol]
        const currentValue = holding.quantity * asset.price
        const gainLoss = currentValue - holding.quantity * holding.avgPrice
        return {
          ...holding,
          currentValue,
          gainLoss,
          currentPrice: asset.price,
          changePercent: asset.changePercent,
          name: asset.name,
          typeName: asset.type,
        }
      })
      .sort((a, b) => b.currentValue - a.currentValue)
  }, [holdings])

  const portfolioValue = useMemo(
    () => holdingsWithDetails.reduce((sum, item) => sum + item.currentValue, 0) + cashBalance,
    [cashBalance, holdingsWithDetails],
  )

  const todaysProfitLoss = useMemo(
    () => holdingsWithDetails.reduce((sum, item) => sum + item.gainLoss, 0),
    [holdingsWithDetails],
  )

  const investedAmount = useMemo(
    () => holdingsWithDetails.reduce((sum, item) => sum + item.quantity * item.avgPrice, 0),
    [holdingsWithDetails],
  )

  const portfolioAllocation = useMemo(() => {
    const total = holdingsWithDetails.reduce((sum, item) => sum + item.currentValue, 0) || 1
    return holdingsWithDetails.map((item) => ({
      symbol: item.symbol,
      value: item.currentValue,
      percent: (item.currentValue / total) * 100,
      color: getColorBySymbol(item.symbol),
    }))
  }, [holdingsWithDetails])

  const portfolioRows = useMemo(() => {
    const rows = portfolioTab === 'all' ? holdingsWithDetails : holdingsWithDetails.filter((item) => item.typeName === portfolioTab)
    return rows
  }, [holdingsWithDetails, portfolioTab])

  const portfolioAllocationFiltered = useMemo(() => {
    const total = portfolioRows.reduce((sum, item) => sum + item.currentValue, 0) || 1
    return portfolioRows.map((item) => ({
      symbol: item.symbol,
      value: item.currentValue,
      percent: (item.currentValue / total) * 100,
      color: getColorBySymbol(item.symbol),
    }))
  }, [portfolioRows])

  const marketSummary = useMemo(() => {
    const assets = allAssets
    const averageChange = assets.reduce((sum, asset) => sum + asset.changePercent, 0) / assets.length
    const topGainer = assets.reduce((top, asset) => (asset.changePercent > top.changePercent ? asset : top), assets[0])
    return { averageChange, topGainer }
  }, [])

  const watchlistAssets = useMemo(
    () => allAssets.filter((asset) => watchlist.includes(asset.symbol)),
    [watchlist],
  )

  const trendingAssets = useMemo(
    () => [...allAssets].sort((a, b) => b.changePercent - a.changePercent).slice(0, 4),
    [],
  )

  const selectedChartPoints = buildSvgPoints(selectedAsset.history[selectedRange], 640, 220)
  const selectedChartPath = buildLinePath(selectedChartPoints)
  const selectedAreaPath = buildAreaPath(selectedChartPoints, 220)

  const openTradeModal = (symbol, type) => {
    setOrder({ type, symbol, quantity: 1, orderType: 'Market Order' })
    setOrderModalOpen(true)
  }

  const handleTrade = () => {
    if (!order.quantity || order.quantity < 1) return

    const asset = allAssetMap[order.symbol]
    const quantity = Number(order.quantity)
    const grossTotal = quantity * asset.price
    const feeRate = order.orderType === 'Stop-Loss Order' ? 0.0015 : order.orderType === 'Limit Order' ? 0.001 : 0.0009
    const fee = grossTotal * feeRate
    const total = order.type === 'buy' ? grossTotal + fee : grossTotal - fee

    if (order.type === 'buy') {
      if (cashBalance < total) return
      setCashBalance((prev) => prev - total)
      setHoldings((prev) => {
        const existing = prev.find((item) => item.symbol === order.symbol)
        if (!existing) {
          return [...prev, { symbol: order.symbol, type: asset.type, quantity, avgPrice: asset.price }]
        }

        const newTotalQuantity = existing.quantity + quantity
        const newAvgPrice =
          (existing.avgPrice * existing.quantity + asset.price * quantity) / newTotalQuantity

        return prev.map((item) =>
          item.symbol === order.symbol ? { ...item, quantity: newTotalQuantity, avgPrice: newAvgPrice } : item,
        )
      })
    } else {
      const existing = holdings.find((item) => item.symbol === order.symbol)
      if (!existing || existing.quantity < quantity) return

      setCashBalance((prev) => prev + total)
      setHoldings((prev) =>
        prev
          .map((item) => (item.symbol === order.symbol ? { ...item, quantity: item.quantity - quantity } : item))
          .filter((item) => item.quantity > 0),
      )
    }

    setTransactions((prev) => [
      {
        id: Date.now(),
        type: order.type === 'buy' ? 'Buy' : 'Sell',
        symbol: order.symbol,
        typeName: asset.type,
        quantity,
        price: asset.price,
        date: 'Just now',
        status: 'Completed',
      },
      ...prev,
    ])

    setOrderModalOpen(false)
  }

  const toggleWatchlist = (symbol) => {
    setWatchlist((prev) =>
      prev.includes(symbol) ? prev.filter((item) => item !== symbol) : [...prev, symbol],
    )
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    if (!loginForm.email || !loginForm.password) {
      setAuthMessage('Please enter both email and password.')
      return
    }

    setProfile((prev) => ({ ...prev, email: loginForm.email.trim() }))
    setIsLoggedIn(true)
    setActivePage('dashboard')
    setAuthMessage('')
  }

  const handleRegisterSubmit = (event) => {
    event.preventDefault()

    if (!registerForm.fullName || !registerForm.email || !registerForm.password) {
      setAuthMessage('Please fill in your full name, email, and password.')
      return
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setAuthMessage('Passwords do not match.')
      return
    }

    if (!registerForm.acceptTerms) {
      setAuthMessage('Please accept the terms and conditions.')
      return
    }

    setProfile({
      fullName: registerForm.fullName,
      email: registerForm.email,
      phone: registerForm.phone,
    })

    if (registerForm.walletAddress.trim()) {
      const nextWallet = {
        connected: true,
        nickname: registerForm.walletNickname || 'My Wallet',
        address: registerForm.walletAddress,
        network: registerForm.walletNetwork,
        balance: 1.428,
      }
      setWalletInfo(nextWallet)
      setWalletDraft(nextWallet)
    } else {
      const clearedWallet = { connected: false, nickname: 'My MetaMask Wallet', address: '', network: 'Ethereum', balance: 0 }
      setWalletInfo(clearedWallet)
      setWalletDraft(clearedWallet)
    }

    setIsLoggedIn(true)
    setActivePage('dashboard')
    setAuthMessage('')
  }

  const saveWalletChanges = () => {
    setWalletInfo(walletDraft)
    setWalletEditorOpen(false)
  }

  const removeWallet = () => {
    const clearedWallet = { connected: false, nickname: 'My MetaMask Wallet', address: '', network: 'Ethereum', balance: 0 }
    setWalletInfo(clearedWallet)
    setWalletDraft(clearedWallet)
    setWalletEditorOpen(false)
  }

  const toggleNotification = (setting) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  if (!isLoggedIn) {
    return (
      <div className={`auth-shell ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
        <div className="background-orb orb-one" />
        <div className="background-orb orb-two" />

        <div className="auth-card">
          <div className="auth-topbar">
            <div className="brand-wrap">
              <div className="brand-mark">T</div>
              <div>
                <span className="brand-label">TradeSim</span>
                <small>Practice trading</small>
              </div>
            </div>
            <button type="button" className="toggle-theme" onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}>
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </div>

          {authView === 'login' ? (
            <>
              <div className="auth-header">
                <p className="eyebrow">Welcome back</p>
                <h1>Login to TradeSim</h1>
              </div>

              <form className="auth-form" onSubmit={handleLoginSubmit}>
                <label>
                  Email
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
                    placeholder="you@example.com"
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                    placeholder="Enter your password"
                  />
                </label>

                <div className="auth-row">
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={loginForm.rememberMe}
                      onChange={(event) => setLoginForm((prev) => ({ ...prev, rememberMe: event.target.checked }))}
                    />
                    Remember me
                  </label>
                  <button type="button" className="link-btn">Forgot password?</button>
                </div>

                {authMessage && <p className="auth-message">{authMessage}</p>}

                <button type="submit" className="primary-btn full-width">Login</button>
              </form>

              <div className="divider"><span>or</span></div>

              <div className="social-row">
                <button type="button" className="social-btn">Google</button>
                <button type="button" className="social-btn">Apple</button>
              </div>

              <p className="auth-footer">
                Don&apos;t have an account?
                <button type="button" className="link-btn" onClick={() => setAuthView('register')}>
                  Register
                </button>
              </p>
            </>
          ) : (
            <>
              <div className="auth-header">
                <p className="eyebrow">Create account</p>
                <h1>Join TradeSim</h1>
              </div>

              <form className="auth-form" onSubmit={handleRegisterSubmit}>
                <div className="auth-form-grid">
                  <label>
                    Full name
                    <input
                      type="text"
                      value={registerForm.fullName}
                      onChange={(event) => setRegisterForm((prev) => ({ ...prev, fullName: event.target.value }))}
                    />
                  </label>
                  <label>
                    Phone number
                    <input
                      type="tel"
                      value={registerForm.phone}
                      onChange={(event) => setRegisterForm((prev) => ({ ...prev, phone: event.target.value }))}
                    />
                  </label>
                </div>

                <label>
                  Email
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(event) => setRegisterForm((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </label>

                <div className="auth-form-grid">
                  <label>
                    Password
                    <input
                      type="password"
                      value={registerForm.password}
                      onChange={(event) => setRegisterForm((prev) => ({ ...prev, password: event.target.value }))}
                    />
                  </label>
                  <label>
                    Confirm password
                    <input
                      type="password"
                      value={registerForm.confirmPassword}
                      onChange={(event) => setRegisterForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
                    />
                  </label>
                </div>

                <div className="wallet-box">
                  <h3>Optional: Connect Crypto Account</h3>
                  <p>
                    You can add a public wallet address later in settings. This is optional and only used for demo wallet displays.
                  </p>
                  <div className="auth-form-grid">
                    <label>
                      Public wallet address
                      <input
                        type="text"
                        value={registerForm.walletAddress}
                        onChange={(event) => setRegisterForm((prev) => ({ ...prev, walletAddress: event.target.value }))}
                        placeholder="0xA1b2...F9e4"
                      />
                    </label>
                    <label>
                      Blockchain network
                      <select
                        value={registerForm.walletNetwork}
                        onChange={(event) => setRegisterForm((prev) => ({ ...prev, walletNetwork: event.target.value }))}
                      >
                        <option>Ethereum</option>
                        <option>Bitcoin</option>
                        <option>Solana</option>
                        <option>Polygon</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    Wallet nickname
                    <input
                      type="text"
                      value={registerForm.walletNickname}
                      onChange={(event) => setRegisterForm((prev) => ({ ...prev, walletNickname: event.target.value }))}
                      placeholder="My MetaMask Wallet"
                    />
                  </label>
                </div>

                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={registerForm.acceptTerms}
                    onChange={(event) => setRegisterForm((prev) => ({ ...prev, acceptTerms: event.target.checked }))}
                  />
                  I accept the terms and conditions.
                </label>

                {authMessage && <p className="auth-message">{authMessage}</p>}

                <button type="submit" className="primary-btn full-width">Create Account</button>
              </form>

              <p className="auth-footer">
                Already have an account?
                <button type="button" className="link-btn" onClick={() => setAuthView('login')}>
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`app-shell ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />

      <div className={`sidebar-backdrop ${mobileNavOpen ? 'visible' : ''}`} onClick={() => setMobileNavOpen(false)} />

      <aside className={`sidebar ${mobileNavOpen ? 'open' : ''}`}>
        <div className="brand-wrap">
          <div className="brand-mark">T</div>
          <div>
            <span className="brand-label">TradeSim</span>
            <small>Practice trading</small>
          </div>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`nav-item ${activePage === item.key ? 'active' : ''}`}
              onClick={() => {
                setActivePage(item.key)
                setMobileNavOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <p className="eyebrow">Competition</p>
          <h3>Spring League</h3>
          <div className="competition-pill">3 days left</div>
        </div>
      </aside>

      <main className="content-panel">
        <header className="topbar">
          <button type="button" className="hamburger" onClick={() => setMobileNavOpen((prev) => !prev)}>
            ☰
          </button>

          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search stocks or crypto"
            />
          </div>

          <div className="topbar-actions">
            <button type="button" className="ghost-btn" onClick={() => setActivePage('markets')}>
              Explore Markets
            </button>
            <button type="button" className="primary-btn" onClick={() => openTradeModal('AAPL', 'buy')}>
              Quick Buy
            </button>
          </div>
        </header>

        {activePage === 'dashboard' && (
          <div className="page-shell">
            <section className="hero-section panel">
              <div className="hero-copy">
                <p className="eyebrow">Virtual investing platform</p>
                <h1>Practice investing without risking real money.</h1>
                <p className="hero-text">
                  TradeSim gives beginners a realistic way to explore the stock and crypto markets, build a virtual portfolio, and learn through simulation.
                </p>
                <div className="hero-actions">
                  <button type="button" className="primary-btn" onClick={() => setActivePage('markets')}>Start trading</button>
                  <button type="button" className="ghost-btn" onClick={() => setActivePage('portfolio')}>View portfolio</button>
                </div>

                <div className="mini-stats">
                  <div>
                    <strong>150K+</strong>
                    <span>simulated trades</span>
                  </div>
                  <div>
                    <strong>4.9/5</strong>
                    <span>user rating</span>
                  </div>
                  <div>
                    <strong>1.2M</strong>
                    <span>market data points</span>
                  </div>
                </div>
              </div>

              <div className="hero-visual">
                <div className="mini-dashboard panel inset">
                  <div className="mini-header">
                    <span>Portfolio overview</span>
                    <span className="pill positive">+2.83%</span>
                  </div>
                  <div className="mini-summary">
                    <div>
                      <small>Virtual cash</small>
                      <strong>{formatCurrency(cashBalance)}</strong>
                    </div>
                    <div>
                      <small>Portfolio</small>
                      <strong>{formatCompactCurrency(portfolioValue)}</strong>
                    </div>
                  </div>

                  <div className="mini-chart">
                    <svg viewBox="0 0 320 120" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="heroFill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#60e3ff" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#60e3ff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d={buildAreaPath(buildSvgPoints(selectedAsset.history['1W'], 320, 110), 110)} fill="url(#heroFill)" />
                      <path d={buildLinePath(buildSvgPoints(selectedAsset.history['1W'], 320, 110))} stroke="#60e3ff" strokeWidth="3" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>
            </section>

            <section className="stats-grid">
              <StatCard label="Virtual balance" value={formatCurrency(cashBalance)} tone="neutral" />
              <StatCard label="Portfolio value" value={formatCurrency(portfolioValue)} tone="positive" />
              <StatCard label="Total P/L" value={formatSigned(todaysProfitLoss, 2)} tone={todaysProfitLoss >= 0 ? 'positive' : 'negative'} />
              <StatCard label="Daily market" value={`${marketSummary.averageChange.toFixed(2)}%`} tone="neutral" />
            </section>

            <section className="content-grid two-col">
              <div className="panel chart-panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Performance</p>
                    <h3>Portfolio trend</h3>
                  </div>
                  <div className="chip-group">
                    {chartRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        className={`chip ${selectedRange === range ? 'active' : ''}`}
                        onClick={() => setSelectedRange(range)}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="large-chart-wrap">
                  <svg viewBox="0 0 640 220" preserveAspectRatio="none" className="large-chart">
                    <defs>
                      <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#60e3ff" stopOpacity="0.38" />
                        <stop offset="100%" stopColor="#60e3ff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={selectedAreaPath} fill="url(#areaGradient)" />
                    <path d={selectedChartPath} fill="none" stroke="#60e3ff" strokeWidth="3" />
                  </svg>
                </div>
              </div>

              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Activity</p>
                    <h3>Recent transactions</h3>
                  </div>
                </div>
                <div className="transaction-list">
                  {transactions.slice(0, 4).map((tx) => (
                    <div key={tx.id} className="transaction-item">
                      <div className="transaction-badge">
                        <span className={tx.type === 'Buy' ? 'buy' : 'sell'}>{tx.type}</span>
                      </div>
                      <div className="transaction-copy">
                        <strong>{tx.symbol}</strong>
                        <small>{tx.quantity} {tx.typeName === 'crypto' ? 'coins' : 'shares'} · {tx.date}</small>
                      </div>
                      <div className={`transaction-value ${tx.type === 'Buy' ? 'negative' : 'positive'}`}>
                        {tx.type === 'Buy' ? '-' : '+'}{formatCurrency(tx.quantity * tx.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="content-grid three-col">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Trending</p>
                    <h3>Hot movers</h3>
                  </div>
                </div>

                <div className="trending-list">
                  {trendingAssets.map((asset) => (
                    <div key={asset.symbol} className="trending-row">
                      <div>
                        <strong>{asset.symbol}</strong>
                        <small>{asset.name}</small>
                      </div>
                      <div className="text-right">
                        <strong>{formatCurrency(asset.price)}</strong>
                        <small className={asset.changePercent >= 0 ? 'positive' : 'negative'}>{formatPercent(asset.changePercent)}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Watchlist</p>
                    <h3>Saved assets</h3>
                  </div>
                </div>

                <div className="watchlist-mini">
                  {watchlistAssets.map((asset) => (
                    <div key={asset.symbol} className="mini-watch-item">
                      <div>
                        <strong>{asset.symbol}</strong>
                        <small>{asset.name}</small>
                      </div>
                      <div className={asset.changePercent >= 0 ? 'positive' : 'negative'}>{formatPercent(asset.changePercent)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">News</p>
                    <h3>Market news</h3>
                  </div>
                </div>

                <div className="news-list nested">
                  {marketNews.map((story) => (
                    <article key={story.title} className="news-item compact">
                      <p className="news-source">{story.source} · {story.time}</p>
                      <h4>{story.title}</h4>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {activePage === 'markets' && (
          <div className="page-shell">
            <SectionHeader title="Markets" subtitle="Search and trade stocks and cryptocurrencies with simulated funds." />

            <div className="filter-bar">
              <div className="chip-group">
                {['all', 'stock', 'crypto'].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`chip ${marketFilter === filter ? 'active' : ''}`}
                    onClick={() => setMarketFilter(filter)}
                  >
                    {filter === 'all' ? 'All assets' : filter === 'stock' ? 'Stocks' : 'Crypto'}
                  </button>
                ))}
              </div>
            </div>

            <section className="market-grid">
              {filteredAssets.map((asset) => (
                <article key={asset.symbol} className="stock-card panel">
                  <div className="stock-topline">
                    <div>
                      <p className="eyebrow">{asset.type === 'crypto' ? 'Crypto' : 'Stock'} · {asset.symbol}</p>
                      <h3>{asset.name}</h3>
                    </div>
                    <button
                      type="button"
                      className={`watch-button ${watchlist.includes(asset.symbol) ? 'active' : ''}`}
                      onClick={() => toggleWatchlist(asset.symbol)}
                    >
                      {watchlist.includes(asset.symbol) ? '★ Saved' : '☆ Save'}
                    </button>
                  </div>

                  <div className="stock-price-row">
                    <div>
                      <strong>{formatCurrency(asset.price)}</strong>
                      <span className={asset.changePercent >= 0 ? 'positive' : 'negative'}>{formatPercent(asset.changePercent)}</span>
                    </div>
                  </div>

                  <MiniSparkline data={asset.history['1D']} color={asset.changePercent >= 0 ? '#60e3ff' : '#ff6f7e'} />

                  <div className="stats-inline">
                    <div>
                      <small>Market cap</small>
                      <strong>{asset.marketCap}</strong>
                    </div>
                    <div>
                      <small>Volume</small>
                      <strong>{asset.volume}</strong>
                    </div>
                  </div>

                  <div className="stock-actions">
                    <button type="button" className="ghost-btn" onClick={() => setSelectedSymbol(asset.symbol)}>Details</button>
                    <button type="button" className="primary-btn" onClick={() => openTradeModal(asset.symbol, 'buy')}>Buy</button>
                    <button type="button" className="danger-btn" onClick={() => openTradeModal(asset.symbol, 'sell')}>Sell</button>
                  </div>
                </article>
              ))}
            </section>

            {selectedAsset && (
              <section className="detail-shell panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Price chart</p>
                    <h3>{selectedAsset.name}</h3>
                  </div>
                  <div className="chip-group">
                    {chartRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        className={`chip ${selectedRange === range ? 'active' : ''}`}
                        onClick={() => setSelectedRange(range)}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="detail-price-row">
                  <div>
                    <strong>{formatCurrency(selectedAsset.price)}</strong>
                    <span className={selectedAsset.changePercent >= 0 ? 'positive' : 'negative'}>{formatPercent(selectedAsset.changePercent)} today</span>
                  </div>
                </div>

                <div className="large-chart-wrap">
                  <svg viewBox="0 0 640 220" preserveAspectRatio="none" className="large-chart">
                    <defs>
                      <linearGradient id="detailAreaGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#82f7d4" stopOpacity="0.42" />
                        <stop offset="100%" stopColor="#82f7d4" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={buildAreaPath(buildSvgPoints(selectedAsset.history[selectedRange], 640, 220), 220)} fill="url(#detailAreaGradient)" />
                    <path d={buildLinePath(buildSvgPoints(selectedAsset.history[selectedRange], 640, 220))} fill="none" stroke="#82f7d4" strokeWidth="3" />
                  </svg>
                </div>

                <div className="content-grid three-col detail-stats-grid">
                  <div className="panel info-panel">
                    <div className="panel-header">
                      <div>
                        <p className="eyebrow">Company</p>
                        <h3>Overview</h3>
                      </div>
                    </div>
                    <p>{selectedAsset.company}</p>
                  </div>

                  <div className="panel stats-panel">
                    <div className="panel-header">
                      <div>
                        <p className="eyebrow">Stats</p>
                        <h3>Key metrics</h3>
                      </div>
                    </div>
                    <div className="metric-grid">
                      <div><span>Market cap</span><strong>{selectedAsset.marketCap}</strong></div>
                      <div><span>P/E ratio</span><strong>{selectedAsset.peRatio}</strong></div>
                      <div><span>Volume</span><strong>{selectedAsset.volume}</strong></div>
                      <div><span>Beta</span><strong>{selectedAsset.beta}</strong></div>
                      <div><span>Day range</span><strong>{formatCurrency(selectedAsset.low)} - {formatCurrency(selectedAsset.high)}</strong></div>
                      <div><span>Dividend</span><strong>{selectedAsset.dividend}</strong></div>
                    </div>
                  </div>

                  <div className="panel news-panel">
                    <div className="panel-header">
                      <div>
                        <p className="eyebrow">News</p>
                        <h3>Recent headlines</h3>
                      </div>
                    </div>
                    <div className="news-list nested">
                      {selectedAsset.news.map((item) => (
                        <article key={item.title} className="news-item compact">
                          <p className="news-source">{item.source} · {item.time}</p>
                          <h4>{item.title}</h4>
                          <p>{item.summary}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {activePage === 'portfolio' && (
          <div className="page-shell">
            <SectionHeader title="Portfolio" subtitle="Track holdings, performance, and allocation across your virtual investments." />

            <section className="stats-grid compact">
              <StatCard label="Portfolio value" value={formatCurrency(portfolioValue)} tone="positive" />
              <StatCard label="Net gain/loss" value={formatSigned(todaysProfitLoss, 2)} tone={todaysProfitLoss >= 0 ? 'positive' : 'negative'} />
              <StatCard label="Invested amount" value={formatCurrency(investedAmount)} tone="neutral" />
            </section>

            <div className="filter-bar">
              <div className="chip-group">
                {['all', 'stock', 'crypto'].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`chip ${portfolioTab === filter ? 'active' : ''}`}
                    onClick={() => setPortfolioTab(filter)}
                  >
                    {filter === 'all' ? 'All assets' : filter === 'stock' ? 'Stocks' : 'Crypto'}
                  </button>
                ))}
              </div>
            </div>

            <section className="content-grid two-col">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Holdings</p>
                    <h3>Position overview</h3>
                  </div>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Asset</th>
                        <th>Qty</th>
                        <th>Avg cost</th>
                        <th>Current</th>
                        <th>Value</th>
                        <th>P/L</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolioRows.map((holding) => (
                        <tr key={holding.symbol}>
                          <td>
                            <div className="table-symbol">
                              <span className="dot" style={{ background: getColorBySymbol(holding.symbol) }} />
                              {holding.symbol}
                            </div>
                          </td>
                          <td>{holding.quantity}</td>
                          <td>{formatCurrency(holding.avgPrice)}</td>
                          <td>{formatCurrency(holding.currentPrice)}</td>
                          <td>{formatCurrency(holding.currentValue)}</td>
                          <td className={holding.gainLoss >= 0 ? 'positive' : 'negative'}>{formatCurrency(holding.gainLoss)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="panel allocation-panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Allocation</p>
                    <h3>{portfolioTab === 'all' ? 'Portfolio mix' : `${portfolioTab.charAt(0).toUpperCase() + portfolioTab.slice(1)} mix`}</h3>
                  </div>
                </div>

                <div className="allocation-chart">
                  <div
                    className="allocation-ring"
                    style={{
                      background: `conic-gradient(${portfolioAllocationFiltered.map((item) => `${item.color} ${item.percent}%`).join(', ')})`,
                    }}
                  >
                    <div className="allocation-center">
                      <strong>{portfolioRows.length}</strong>
                      <small>positions</small>
                    </div>
                  </div>
                </div>

                <ul className="allocation-list">
                  {portfolioAllocationFiltered.map((item) => (
                    <li key={item.symbol}>
                      <div className="allocation-name">
                        <span className="dot" style={{ background: item.color }} />
                        {item.symbol}
                      </div>
                      <div className="allocation-value">{item.percent.toFixed(1)}%</div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="panel table-panel">
              <div className="panel-header">
                <div>
                  <p className="eyebrow">History</p>
                  <h3>Transaction history</h3>
                </div>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Asset</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id}>
                        <td>{tx.type}</td>
                        <td>{tx.symbol}</td>
                        <td>{tx.quantity}</td>
                        <td>{formatCurrency(tx.price)}</td>
                        <td>{tx.date}</td>
                        <td>{tx.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {activePage === 'watchlist' && (
          <div className="page-shell">
            <SectionHeader title="Watchlist" subtitle="Keep track of the assets you want to revisit." />

            <section className="watchlist-grid">
              {watchlistAssets.map((asset) => (
                <article key={asset.symbol} className="panel watchlist-item">
                  <div className="watchlist-header">
                    <div>
                      <p className="eyebrow">{asset.type === 'crypto' ? 'Crypto' : 'Stock'} · {asset.symbol}</p>
                      <h3>{asset.name}</h3>
                    </div>
                    <button type="button" className="watch-button active" onClick={() => toggleWatchlist(asset.symbol)}>
                      ★
                    </button>
                  </div>

                  <div className="watch-price-row">
                    <strong>{formatCurrency(asset.price)}</strong>
                    <span className={asset.changePercent >= 0 ? 'positive' : 'negative'}>{formatPercent(asset.changePercent)}</span>
                  </div>

                  <MiniSparkline data={asset.history['1D']} color={asset.changePercent >= 0 ? '#60e3ff' : '#ff6f7e'} />

                  <div className="stock-actions">
                    <button type="button" className="ghost-btn" onClick={() => setSelectedSymbol(asset.symbol)}>Details</button>
                    <button type="button" className="primary-btn" onClick={() => openTradeModal(asset.symbol, 'buy')}>Buy</button>
                  </div>
                </article>
              ))}
            </section>
          </div>
        )}

        {activePage === 'learning' && (
          <div className="page-shell">
            <SectionHeader title="Learn" subtitle="Build confidence with beginner-friendly lessons and investing tips." />

            <section className="learning-grid">
              {learningCards.map((card) => (
                <article key={card.title} className="panel learning-card">
                  <div className="learning-meta">
                    <span>{card.level}</span>
                    <span>{card.duration}</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.summary}</p>
                  <button type="button" className="ghost-btn full-width">Start lesson</button>
                </article>
              ))}
            </section>

            <section className="content-grid two-col">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Tips</p>
                    <h3>Investing tips</h3>
                  </div>
                </div>
                <ul className="tip-list">
                  <li>Start with a simple plan and avoid chasing every headline.</li>
                  <li>Use diversification to spread risk across sectors and asset types.</li>
                  <li>Keep emotions in check and focus on long-term portfolio health.</li>
                </ul>
              </div>

              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Glossary</p>
                    <h3>Key terms</h3>
                  </div>
                </div>
                <div className="term-grid">
                  {glossaryTerms.map((term) => (
                    <span key={term} className="term-pill">{term}</span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {activePage === 'competition' && (
          <div className="page-shell">
            <SectionHeader title="Mock trading competition" subtitle="Compete with other learners and grow your virtual score." />

            <section className="content-grid two-col">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Leaderboard</p>
                    <h3>Top traders</h3>
                  </div>
                </div>
                <div className="leaderboard-list">
                  {leaderboard.map((entry) => (
                    <div key={entry.rank} className={`leader-row ${entry.name === 'You' ? 'current-user' : ''}`}>
                      <div className="leader-rank">#{entry.rank}</div>
                      <div className="leader-name">{entry.name}</div>
                      <div className="leader-score">{formatCompactCurrency(entry.score)}</div>
                      <div className="leader-streak">{entry.streak}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel competition-panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Details</p>
                    <h3>Spring League</h3>
                  </div>
                </div>
                <ul className="competition-list">
                  <li><span>Prize pool</span><strong>$5,000</strong></li>
                  <li><span>Entry fee</span><strong>Free</strong></li>
                  <li><span>Leaderboard reset</span><strong>Every Friday</strong></li>
                  <li><span>Best metric</span><strong>Portfolio return</strong></li>
                </ul>
              </div>
            </section>
          </div>
        )}

        {activePage === 'profile' && (
          <div className="page-shell">
            <SectionHeader title="Profile & settings" subtitle="Manage account details, wallet information, and preferences." />

            <section className="content-grid two-col">
              <div className="panel profile-panel">
                <div className="profile-header">
                  <div className="avatar">MC</div>
                  <div>
                    <h3>{profile.fullName}</h3>
                    <p>Investor level: Intermediate</p>
                  </div>
                </div>

                <div className="profile-grid">
                  <div>
                    <span>Email</span>
                    <strong>{profile.email}</strong>
                  </div>
                  <div>
                    <span>Phone</span>
                    <strong>{profile.phone || 'Not provided'}</strong>
                  </div>
                  <div>
                    <span>Virtual cash</span>
                    <strong>{formatCurrency(cashBalance)}</strong>
                  </div>
                  <div>
                    <span>Member since</span>
                    <strong>March 2026</strong>
                  </div>
                </div>
              </div>

              <div className="panel settings-panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Preferences</p>
                    <h3>Notification settings</h3>
                  </div>
                </div>

                <div className="toggle-list">
                  <label className="toggle-row">
                    <span>Price alerts</span>
                    <button type="button" className={`toggle ${notificationSettings.priceAlerts ? 'enabled' : ''}`} onClick={() => toggleNotification('priceAlerts')}>
                      <span />
                    </button>
                  </label>
                  <label className="toggle-row">
                    <span>Daily digest</span>
                    <button type="button" className={`toggle ${notificationSettings.dailyDigest ? 'enabled' : ''}`} onClick={() => toggleNotification('dailyDigest')}>
                      <span />
                    </button>
                  </label>
                  <label className="toggle-row">
                    <span>Market news</span>
                    <button type="button" className={`toggle ${notificationSettings.marketNews ? 'enabled' : ''}`} onClick={() => toggleNotification('marketNews')}>
                      <span />
                    </button>
                  </label>
                  <label className="toggle-row">
                    <span>Competition updates</span>
                    <button type="button" className={`toggle ${notificationSettings.competitionUpdates ? 'enabled' : ''}`} onClick={() => toggleNotification('competitionUpdates')}>
                      <span />
                    </button>
                  </label>
                </div>

                <div className="theme-toggle-box">
                  <span>Appearance</span>
                  <button type="button" className="toggle-theme" onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}>
                    {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
                  </button>
                </div>
              </div>
            </section>

            <section className="content-grid two-col">
              <div className="panel wallet-panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Crypto</p>
                    <h3>Wallet settings</h3>
                  </div>
                </div>

                {walletInfo.connected ? (
                  <div className="wallet-summary">
                    <div className="wallet-row"><span>Wallet nickname</span><strong>{walletInfo.nickname}</strong></div>
                    <div className="wallet-row"><span>Address</span><strong>{walletInfo.address}</strong></div>
                    <div className="wallet-row"><span>Network</span><strong>{walletInfo.network}</strong></div>
                    <div className="wallet-row"><span>Mock balance</span><strong>{walletInfo.balance} ETH</strong></div>
                    <div className="wallet-row"><span>Connection status</span><strong className="positive">Connected</strong></div>
                  </div>
                ) : (
                  <div className="wallet-empty">
                    <p>No wallet connected yet. You can skip this for now or add a public wallet address later.</p>
                  </div>
                )}

                <div className="wallet-actions">
                  <button type="button" className="ghost-btn" onClick={() => {
                    setWalletDraft(walletInfo)
                    setWalletEditorOpen((prev) => !prev)
                  }}>
                    {walletInfo.connected ? 'Edit wallet' : 'Add wallet'}
                  </button>
                  {walletInfo.connected && (
                    <button type="button" className="danger-btn" onClick={removeWallet}>Remove wallet</button>
                  )}
                </div>

                {walletEditorOpen && (
                  <div className="wallet-editor">
                    <label>
                      Wallet nickname
                      <input
                        type="text"
                        value={walletDraft.nickname}
                        onChange={(event) => setWalletDraft((prev) => ({ ...prev, nickname: event.target.value }))}
                      />
                    </label>
                    <label>
                      Public wallet address
                      <input
                        type="text"
                        value={walletDraft.address}
                        onChange={(event) => setWalletDraft((prev) => ({ ...prev, address: event.target.value }))}
                      />
                    </label>
                    <label>
                      Blockchain network
                      <select
                        value={walletDraft.network}
                        onChange={(event) => setWalletDraft((prev) => ({ ...prev, network: event.target.value }))}
                      >
                        <option>Ethereum</option>
                        <option>Bitcoin</option>
                        <option>Solana</option>
                        <option>Polygon</option>
                      </select>
                    </label>
                    <div className="wallet-actions">
                      <button type="button" className="ghost-btn" onClick={() => setWalletEditorOpen(false)}>Cancel</button>
                      <button type="button" className="primary-btn" onClick={saveWalletChanges}>Save wallet</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="panel security-panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Security</p>
                    <h3>Privacy and access</h3>
                  </div>
                </div>
                <ul className="security-list">
                  <li>Two-factor authentication available</li>
                  <li>Simulated wallet access only, no private keys stored</li>
                  <li>Secure-looking onboarding for demo and learning purposes</li>
                </ul>
              </div>
            </section>
          </div>
        )}
      </main>

      {orderModalOpen && (
        <div className="modal-backdrop" onClick={() => setOrderModalOpen(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <p className="eyebrow">Trade</p>
                <h3>{order.type === 'buy' ? 'Buy' : 'Sell'} {order.symbol}</h3>
              </div>
              <button type="button" className="close-btn" onClick={() => setOrderModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="trade-summary">
                <span>Selected asset</span>
                <strong>{selectedAsset.name}</strong>
              </div>

              <div className="trade-summary">
                <span>Current price</span>
                <strong>{formatCurrency((allAssetMap[order.symbol] || selectedAsset).price)}</strong>
              </div>

              <div className="trade-actions modal-trade-actions">
                <button type="button" className={`action-btn ${order.type === 'buy' ? 'active' : ''}`} onClick={() => setOrder((prev) => ({ ...prev, type: 'buy' }))}>Buy</button>
                <button type="button" className={`action-btn ${order.type === 'sell' ? 'active' : ''}`} onClick={() => setOrder((prev) => ({ ...prev, type: 'sell' }))}>Sell</button>
              </div>

              <div className="order-type-grid">
                {['Market Order', 'Limit Order', 'Stop-Loss Order'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`order-type-btn ${order.orderType === type ? 'active' : ''}`}
                    onClick={() => setOrder((prev) => ({ ...prev, orderType: type }))}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="order-inputs">
                <label>
                  Quantity
                  <input
                    type="number"
                    min="1"
                    value={order.quantity}
                    onChange={(event) => setOrder((prev) => ({ ...prev, quantity: Number(event.target.value) || 1 }))}
                  />
                </label>
              </div>

              <div className="trade-summary">
                <span>Estimated total</span>
                <strong>{formatCurrency((allAssetMap[order.symbol] || selectedAsset).price * order.quantity)}</strong>
              </div>

              <div className="trade-summary">
                <span>Trading fee</span>
                <strong>{formatCurrency((allAssetMap[order.symbol] || selectedAsset).price * order.quantity * 0.001)}</strong>
              </div>

              <div className="trade-summary">
                <span>Available virtual cash</span>
                <strong>{formatCurrency(cashBalance)}</strong>
              </div>

              <div className="wallet-box compact">
                <h3>Crypto account information</h3>
                <p>Optional public wallet details for simulated crypto trading.</p>
                <div className="mini-wallet-grid">
                  <div>
                    <span>Wallet nickname</span>
                    <strong>{walletInfo.nickname}</strong>
                  </div>
                  <div>
                    <span>Network</span>
                    <strong>{walletInfo.network}</strong>
                  </div>
                  <div>
                    <span>Wallet address</span>
                    <strong>{walletInfo.address || 'Not connected'}</strong>
                  </div>
                  <div>
                    <span>Connection</span>
                    <strong className={walletInfo.connected ? 'positive' : 'negative'}>{walletInfo.connected ? 'Connected' : 'Not connected'}</strong>
                  </div>
                </div>
              </div>

              <p className="order-warning">
                This is simulated trading only. No real money, real payments, or real market orders are involved.
              </p>
            </div>

            <div className="modal-actions">
              <button type="button" className="ghost-btn" onClick={() => setOrderModalOpen(false)}>Cancel</button>
              <button type="button" className={order.type === 'buy' ? 'primary-btn' : 'danger-btn'} onClick={handleTrade}>
                Confirm {order.type === 'buy' ? 'Buy' : 'Sell'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, tone }) {
  return (
    <div className={`panel stat-card ${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  )
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      <div>
        <p className="eyebrow">Overview</p>
        <h2>{title}</h2>
      </div>
      <p>{subtitle}</p>
    </div>
  )
}

function MiniSparkline({ data, color }) {
  const points = buildSvgPoints(data, 220, 52)
  const path = buildLinePath(points)

  return (
    <svg viewBox="0 0 220 52" preserveAspectRatio="none" className="mini-sparkline">
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" />
    </svg>
  )
}

function getColorBySymbol(symbol) {
  const palette = {
    AAPL: '#60e3ff',
    TSLA: '#ff6f7e',
    NVDA: '#43e3a1',
    AMZN: '#ffc857',
    MSFT: '#8ab4ff',
    GOOGL: '#c19eff',
    META: '#7be9cc',
    BTC: '#f5b34d',
    ETH: '#7f8cff',
    SOL: '#6ee7b7',
  }
  return palette[symbol] || '#60e3ff'
}

export default App
