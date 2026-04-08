import { useState, useRef, useEffect } from 'react'

// 学科选项
const subjects = [
  { value: 'math', label: '数学', icon: '🔢', color: 'bg-blue-500' },
  { value: 'chinese', label: '语文', icon: '📖', color: 'bg-red-500' },
  { value: 'english', label: '英语', icon: '🔤', color: 'bg-green-500' },
  { value: 'physics', label: '物理', icon: '⚡', color: 'bg-purple-500' },
  { value: 'chemistry', label: '化学', icon: '🧪', color: 'bg-yellow-500' },
  { value: 'biology', label: '生物', icon: '🧬', color: 'bg-pink-500' },
  { value: 'history', label: '历史', icon: '🏛️', color: 'bg-amber-600' },
  { value: 'geography', label: '地理', icon: '🌍', color: 'bg-teal-500' },
  { value: 'politics', label: '政治', icon: '📋', color: 'bg-indigo-500' },
]

const grades = [
  { value: '1', label: '一年级', subjects: ['math', 'chinese', 'english'] },
  { value: '2', label: '二年级', subjects: ['math', 'chinese', 'english'] },
  { value: '3', label: '三年级', subjects: ['math', 'chinese', 'english'] },
  { value: '4', label: '四年级', subjects: ['math', 'chinese', 'english'] },
  { value: '5', label: '五年级', subjects: ['math', 'chinese', 'english'] },
  { value: '6', label: '六年级', subjects: ['math', 'chinese', 'english'] },
  { value: '7', label: '初一', subjects: ['math', 'chinese', 'english', 'history', 'geography', 'biology', 'politics'] },
  { value: '8', label: '初二', subjects: ['math', 'chinese', 'english', 'physics', 'history', 'geography', 'biology', 'politics'] },
  { value: '9', label: '初三', subjects: ['math', 'chinese', 'english', 'physics', 'chemistry', 'history', 'politics'] },
  { value: '10', label: '高一', subjects: ['math', 'chinese', 'english', 'physics', 'chemistry', 'biology', 'history', 'geography', 'politics'] },
  { value: '11', label: '高二', subjects: ['math', 'chinese', 'english', 'physics', 'chemistry', 'biology', 'history', 'geography', 'politics'] },
  { value: '12', label: '高三', subjects: ['math', 'chinese', 'english', 'physics', 'chemistry', 'biology', 'history', 'geography', 'politics'] },
]

const difficulties = [
  { value: 'easy', label: '简单', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: '中等', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'hard', label: '困难', color: 'bg-red-100 text-red-800' },
]

const questionCounts = [5, 10, 15, 20]

const topicTemplates = {
  math: ['几何图形', '面积周长', '分数运算', '方程求解', '应用题', '统计图表'],
  chinese: ['古诗词默写', '阅读理解', '作文素材', '成语填空', '文言文翻译'],
  english: ['单词拼写', '语法填空', '阅读理解', '完形填空', '翻译练习'],
  physics: ['力学基础', '电学计算', '光学实验', '热学原理', '电路分析'],
  chemistry: ['化学方程式', '元素周期表', '酸碱中和', '氧化还原', '实验操作'],
  biology: ['细胞结构', '遗传规律', '生态系统', '人体生理', '生物实验'],
  history: ['中国古代史', '近代史', '世界史', '历史人物', '重大事件'],
  geography: ['中国地理', '世界地理', '气候类型', '地形地貌', '地图判读'],
  politics: ['时政热点', '经济常识', '哲学原理', '法律基础', '道德修养'],
}

// 动漫风格插图库
const animeIllustrations = {
  // 语文 - 古诗词
  '古诗词': (
    <svg viewBox="0 0 400 250" className="w-full max-w-sm mx-auto">
      {/* 背景 - 水墨山水 */}
      <defs>
        <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor:'#87CEEB',stopOpacity:0.3}} />
          <stop offset="100%" style={{stopColor:'#E0F7FA',stopOpacity:0.1}} />
        </linearGradient>
        <linearGradient id="mountain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor:'#4A6741',stopOpacity:0.8}} />
          <stop offset="100%" style={{stopColor:'#2D3B2D',stopOpacity:0.9}} />
        </linearGradient>
      </defs>
      {/* 天空 */}
      <rect width="400" height="250" fill="url(#sky)"/>
      {/* 太阳 - 动漫风格圆 */}
      <circle cx="320" cy="60" r="30" fill="#FFD93D" opacity="0.9"/>
      <circle cx="320" cy="60" r="35" fill="#FFD93D" opacity="0.3"/>
      {/* 山 - 水墨风格 */}
      <polygon points="0,250 80,100 160,250" fill="url(#mountain)"/>
      <polygon points="100,250 200,80 300,250" fill="#3D5A3D"/>
      <polygon points="250,250 350,120 400,200 400,250" fill="#2D4A2D"/>
      {/* 云 - 动漫风格 */}
      <ellipse cx="80" cy="50" rx="40" ry="20" fill="white" opacity="0.8"/>
      <ellipse cx="110" cy="45" rx="30" ry="18" fill="white" opacity="0.8"/>
      <ellipse cx="60" cy="55" rx="25" ry="15" fill="white" opacity="0.8"/>
      {/* 树木 - 简笔画风格 */}
      <rect x="30" y="180" width="10" height="40" fill="#5D4037"/>
      <circle cx="35" cy="170" r="25" fill="#4CAF50"/>
      <circle cx="25" cy="165" r="18" fill="#66BB6A"/>
      <circle cx="45" cy="168" r="20" fill="#81C784"/>
      {/* 河流 */}
      <path d="M0 220 Q100 210 200 230 T400 220" stroke="#4FC3F7" strokeWidth="15" fill="none" opacity="0.6"/>
      {/* 飞鸟 */}
      <path d="M180 80 Q190 70 200 80 Q210 70 220 80" stroke="#555" strokeWidth="2" fill="none"/>
      <path d="M200 95 Q210 85 220 95 Q230 85 240 95" stroke="#555" strokeWidth="2" fill="none"/>
    </svg>
  ),
  // 语文 - 阅读理解
  '阅读理解': (
    <svg viewBox="0 0 400 250" className="w-full max-w-sm mx-auto">
      <rect width="400" height="250" fill="#FFF8E1"/>
      {/* 书本 */}
      <rect x="100" y="40" width="200" height="160" rx="5" fill="#8D6E63"/>
      <rect x="105" y="45" width="190" height="150" rx="3" fill="#FFF8E1"/>
      {/* 书页 */}
      <line x1="115" y1="60" x2="285" y2="60" stroke="#BDBDBD" strokeWidth="2"/>
      <line x1="115" y1="80" x2="285" y2="80" stroke="#BDBDBD" strokeWidth="1"/>
      <line x1="115" y1="95" x2="285" y2="95" stroke="#BDBDBD" strokeWidth="1"/>
      <line x1="115" y1="110" x2="285" y2="110" stroke="#BDBDBD" strokeWidth="1"/>
      <line x1="115" y1="125" x2="285" y2="125" stroke="#BDBDBD" strokeWidth="1"/>
      <line x1="115" y1="140" x2="285" y2="140" stroke="#BDBDBD" strokeWidth="1"/>
      <line x1="115" y1="155" x2="285" y2="155" stroke="#BDBDBD" strokeWidth="1"/>
      <line x1="115" y1="170" x2="285" y2="170" stroke="#BDBDBD" strokeWidth="1"/>
      <line x1="115" y1="185" x2="285" y2="185" stroke="#BDBDBD" strokeWidth="1"/>
      {/* 放大镜 - 阅读理解 */}
      <circle cx="280" cy="130" r="35" fill="none" stroke="#607D8B" strokeWidth="4"/>
      <circle cx="280" cy="130" r="30" fill="#E3F2FD" opacity="0.5"/>
      <rect x="305" y="155" width="30" height="8" fill="#607D8B" transform="rotate(45 320 159)"/>
      {/* 星星装饰 */}
      <text x="50" y="80" fontSize="20" fill="#FFD54F">✦</text>
      <text x="350" y="100" fontSize="16" fill="#FFD54F">✦</text>
      <text x="60" y="200" fontSize="14" fill="#FFD54F">✦</text>
    </svg>
  ),
  // 数学 - 几何图形
  '几何图形': (
    <svg viewBox="0 0 400 250" className="w-full max-w-sm mx-auto">
      <rect width="400" height="250" fill="#E3F2FD"/>
      {/* 坐标系 */}
      <line x1="50" y1="200" x2="350" y2="200" stroke="#333" strokeWidth="2"/>
      <line x1="50" y1="200" x2="50" y2="50" stroke="#333" strokeWidth="2"/>
      <polygon points="345,195 350,200 345,205" fill="#333"/>
      <polygon points="45,55 50,50 55,55" fill="#333"/>
      {/* 三角形 */}
      <polygon points="100,180 160,80 220,180" fill="#FF7043" opacity="0.7" stroke="#E64A19" strokeWidth="2"/>
      <text x="140" y="190" fontSize="12" fill="#333">△</text>
      {/* 圆形 */}
      <circle cx="280" cy="130" r="40" fill="#66BB6A" opacity="0.7" stroke="#388E3C" strokeWidth="2"/>
      <text x="280" y="135" fontSize="12" fill="#fff">○</text>
      {/* 正方形 */}
      <rect x="80" y="30" width="50" height="50" fill="#42A5F5" opacity="0.7" stroke="#1976D2" strokeWidth="2"/>
      <text x="95" y="60" fontSize="12" fill="#fff">□</text>
      {/* 长方形 */}
      <rect x="150" y="30" width="70" height="45" fill="#AB47BC" opacity="0.7" stroke="#7B1FA2" strokeWidth="2"/>
      <text x="175" y="58" fontSize="12" fill="#fff">▭</text>
      {/* 坐标点 */}
      <circle cx="200" cy="150" r="5" fill="#F44336"/>
      <text x="210" y="145" fontSize="10" fill="#333">P(4,3)</text>
    </svg>
  ),
  // 数学 - 统计图表
  '统计图表': (
    <svg viewBox="0 0 400 250" className="w-full max-w-sm mx-auto">
      <rect width="400" height="250" fill="#F3E5F5"/>
      {/* 柱状图 */}
      <line x1="60" y1="200" x2="360" y2="200" stroke="#333" strokeWidth="2"/>
      <line x1="60" y1="200" x2="60" y2="40" stroke="#333" strokeWidth="2"/>
      {/* 柱子 */}
      <rect x="80" y="100" width="40" height="100" fill="#9C27B0" rx="3"/>
      <rect x="140" y="60" width="40" height="140" fill="#7B1FA2" rx="3"/>
      <rect x="200" y="80" width="40" height="120" fill="#6A1B9A" rx="3"/>
      <rect x="260" y="120" width="40" height="80" fill="#4A148C" rx="3"/>
      <rect x="320" y="90" width="40" height="110" fill="#38006B" rx="3"/>
      {/* 数值 */}
      <text x="90" y="95" fontSize="10" fill="#333">25</text>
      <text x="150" y="55" fontSize="10" fill="#333">35</text>
      <text x="210" y="75" fontSize="10" fill="#333">30</text>
      <text x="270" y="115" fontSize="10" fill="#333">20</text>
      <text x="330" y="85" fontSize="10" fill="#333">28</text>
      {/* 标签 */}
      <text x="85" y="220" fontSize="10" fill="#666">一月</text>
      <text x="145" y="220" fontSize="10" fill="#666">二月</text>
      <text x="205" y="220" fontSize="10" fill="#666">三月</text>
      <text x="265" y="220" fontSize="10" fill="#666">四月</text>
      <text x="320" y="220" fontSize="10" fill="#666">五月</text>
    </svg>
  ),
  // 英语 - 学习
  '英语': (
    <svg viewBox="0 0 400 250" className="w-full max-w-sm mx-auto">
      <rect width="400" height="250" fill="#E8F5E9"/>
      {/* 字母积木 - 动漫风格 */}
      <rect x="40" y="100" width="50" height="50" rx="8" fill="#FF5722" stroke="#E64A19" strokeWidth="2"/>
      <text x="55" y="135" fontSize="28" fill="white" fontWeight="bold">A</text>
      
      <rect x="100" y="80" width="50" height="50" rx="8" fill="#4CAF50" stroke="#388E3C" strokeWidth="2"/>
      <text x="118" y="115" fontSize="28" fill="white" fontWeight="bold">B</text>
      
      <rect x="160" y="100" width="50" height="50" rx="8" fill="#2196F3" stroke="#1976D2" strokeWidth="2"/>
      <text x="175" y="135" fontSize="28" fill="white" fontWeight="bold">C</text>
      
      <rect x="220" y="70" width="50" height="50" rx="8" fill="#FF9800" stroke="#F57C00" strokeWidth="2"/>
      <text x="235" y="105" fontSize="28" fill="white" fontWeight="bold">D</text>
      
      <rect x="280" y="90" width="50" height="50" rx="8" fill="#9C27B0" stroke="#7B1FA2" strokeWidth="2"/>
      <text x="297" y="125" fontSize="28" fill="white" fontWeight="bold">E</text>
      
      <rect x="340" y="110" width="50" height="50" rx="8" fill="#00BCD4" stroke="#0097A7" strokeWidth="2"/>
      <text x="355" y="145" fontSize="28" fill="white" fontWeight="bold">F</text>
      
      {/* 星星装饰 */}
      <text x="30" y="50" fontSize="24" fill="#FFD54F">★</text>
      <text x="180" y="40" fontSize="18" fill="#FFD54F">★</text>
      <text x="320" y="55" fontSize="20" fill="#FFD54F">★</text>
      
      {/* 书本 */}
      <rect x="100" y="180" width="200" height="50" rx="3" fill="#795548"/>
      <rect x="105" y="185" width="190" height="40" rx="2" fill="#FFF8E1"/>
      <text x="180" y="212" fontSize="16" fill="#5D4037" fontWeight="bold">ABC</text>
    </svg>
  ),
  // 物理 - 力学
  '力学': (
    <svg viewBox="0 0 400 250" className="w-full max-w-sm mx-auto">
      <rect width="400" height="250" fill="#FCE4EC"/>
      {/* 滑轮 */}
      <circle cx="200" cy="60" r="30" fill="#F48FB1" stroke="#E91E63" strokeWidth="3"/>
      <circle cx="200" cy="60" r="8" fill="#E91E63"/>
      <circle cx="200" cy="60" r="4" fill="#FCE4EC"/>
      {/* 绳子 */}
      <line x1="200" y1="30" x2="200" y2="10" stroke="#5D4037" strokeWidth="3"/>
      <line x1="120" y1="60" x2="200" y2="60" stroke="#5D4037" strokeWidth="3"/>
      <line x1="200" y1="60" x2="280" y2="60" stroke="#5D4037" strokeWidth="3"/>
      {/* 物体 */}
      <rect x="80" y="120" width="80" height="80" rx="5" fill="#CE93D8" stroke="#8E24AA" strokeWidth="3"/>
      <text x="105" y="165" fontSize="12" fill="#fff">物体</text>
      {/* 砝码 */}
      <rect x="250" y="150" width="60" height="60" rx="3" fill="#90A4AE" stroke="#546E7A" strokeWidth="3"/>
      <rect x="260" y="155" width="40" height="15" fill="#546E7A"/>
      <rect x="260" y="175" width="40" height="15" fill="#546E7A"/>
      {/* 箭头 - 力 */}
      <line x1="120" y1="200" x2="120" y2="240" stroke="#F44336" strokeWidth="4"/>
      <polygon points="115,235 120,245 125,235" fill="#F44336"/>
      <text x="85" y="230" fontSize="12" fill="#F44336">G</text>
      {/* 地面 */}
      <line x1="40" y1="230" x2="360" y2="230" stroke="#795548" strokeWidth="4"/>
    </svg>
  ),
  // 物理 - 电学
  '电学': (
    <svg viewBox="0 0 400 250" className="w-full max-w-sm mx-auto">
      <rect width="400" height="250" fill="#FFF3E0"/>
      {/* 电池 */}
      <rect x="60" y="80" width="30" height="60" rx="3" fill="#FF7043" stroke="#E64A19" strokeWidth="2"/>
      <rect x="55" y="70" width="40" height="15" rx="2" fill="#FFAB91"/>
      <text x="62" y="115" fontSize="10" fill="white">+</text>
      {/* 电线 */}
      <line x1="90" y1="110" x2="150" y2="110" stroke="#5D4037" strokeWidth="3"/>
      <line x1="150" y1="110" x2="150" y2="60" stroke="#5D4037" strokeWidth="3"/>
      <line x1="150" y1="60" x2="280" y2="60" stroke="#5D4037" strokeWidth="3"/>
      <line x1="280" y1="60" x2="280" y2="110" stroke="#5D4037" strokeWidth="3"/>
      <line x1="280" y1="110" x2="340" y2="110" stroke="#5D4037" strokeWidth="3"/>
      {/* 开关 */}
      <circle cx="150" cy="85" r="8" fill="#5D4037"/>
      <circle cx="150" cy="85" r="4" fill="#8D6E63"/>
      {/* 灯泡 */}
      <ellipse cx="280" cy="90" rx="25" ry="25" fill="#FFF59D" stroke="#FBC02D" strokeWidth="2"/>
      <rect x="272" y="115" width="16" height="10" fill="#5D4037"/>
      {/* 电流符号 */}
      <path d="M100 180 L110 170 L105 180 L120 180" stroke="#FF5722" strokeWidth="2" fill="none"/>
      <text x="130" y="185" fontSize="14" fill="#FF5722">I</text>
      {/* 电压 */}
      <text x="180" y="200" fontSize="14" fill="#E91E63">U = 6V</text>
    </svg>
  ),
  // 化学 - 实验
  '化学': (
    <svg viewBox="0 0 400 250" className="w-full max-w-sm mx-auto">
      <rect width="400" height="250" fill="#E0F7FA"/>
      {/* 试管 */}
      <rect x="100" y="100" width="20" height="100" rx="10" fill="none" stroke="#00BCD4" strokeWidth="3"/>
      <rect x="103" y="130" width="14" height="70" fill="#B2EBF2" opacity="0.6"/>
      {/* 烧瓶 */}
      <path d="M180 100 L180 140 L160 180 Q155 200 180 200 Q205 200 200 180 L220 140 L220 100 Z" fill="none" stroke="#9C27B0" strokeWidth="3"/>
      <rect x="175" y="90" width="50" height="15" rx="2" fill="#E1BEE7"/>
      <rect x="178" y="93" width="44" height="9" rx="1" fill="#BA68C8"/>
      {/* 试剂瓶 */}
      <rect x="280" y="130" width="40" height="70" rx="5" fill="none" stroke="#4CAF50" strokeWidth="3"/>
      <rect x="290" y="120" width="20" height="15" fill="#C8E6C9"/>
      <rect x="285" y="150" width="30" height="50" fill="#81C784" opacity="0.4"/>
      {/* 气泡 */}
      <circle cx="190" cy="170" r="5" fill="#B39DDB" opacity="0.6"/>
      <circle cx="195" cy="155" r="3" fill="#B39DDB" opacity="0.4"/>
      <circle cx="185" cy="160" r="4" fill="#B39DDB" opacity="0.5"/>
      {/* 化学式 */}
      <text x="120" y="235" fontSize="14" fill="#333">H₂O</text>
      <text x="200" y="235" fontSize="14" fill="#333">CO₂</text>
      <text x="290" y="235" fontSize="14" fill="#333">O₂</text>
    </svg>
  ),
  // 生物 - 细胞
  '细胞': (
    <svg viewBox="0 0 400 250" className="w-full max-w-sm mx-auto">
      <rect width="400" height="250" fill="#F1F8E9"/>
      {/* 细胞膜 */}
      <ellipse cx="200" cy="125" rx="120" ry="90" fill="none" stroke="#4CAF50" strokeWidth="4"/>
      <ellipse cx="200" cy="125" rx="115" ry="85" fill="#DCEDC8" opacity="0.5"/>
      {/* 细胞核 */}
      <circle cx="200" cy="125" r="35" fill="#FFEB3B" stroke="#FBC02D" strokeWidth="3"/>
      <circle cx="200" cy="125" r="15" fill="#FDD835"/>
      {/* 核糖体 */}
      <circle cx="150" cy="100" r="5" fill="#8BC34A"/>
      <circle cx="165" cy="90" r="4" fill="#8BC34A"/>
      <circle cx="140" cy="115" r="4" fill="#8BC34A"/>
      <circle cx="240" cy="110" r="5" fill="#8BC34A"/>
      <circle cx="255" cy="125" r="4" fill="#8BC34A"/>
      <circle cx="230" cy="145" r="4" fill="#8BC34A"/>
      {/* 线粒体 */}
      <ellipse cx="130" cy="160" rx="25" ry="12" fill="#FF7043" opacity="0.7" stroke="#E64A19" strokeWidth="2"/>
      <line x1="115" y1="160" x2="145" y2="160" stroke="#E64A19" strokeWidth="1"/>
      <line x1="120" y1="155" x2="140" y2="155" stroke="#E64A19" strokeWidth="1"/>
      <line x1="120" y1="165" x2="140" y2="165" stroke="#E64A19" strokeWidth="1"/>
      {/* 叶绿体 */}
      <ellipse cx="270" cy="80" rx="20" ry="12" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2"/>
      <ellipse cx="270" cy="80" rx="10" ry="5" fill="#81C784" opacity="0.5"/>
      {/* 内质网 */}
      <path d="M160 140 Q180 160 160 180" stroke="#9C27B0" strokeWidth="3" fill="none"/>
      <path d="M170 135 Q190 155 170 175" stroke="#9C27B0" strokeWidth="3" fill="none"/>
    </svg>
  ),
  // 地理 - 地球
  '地理': (
    <svg viewBox="0 0 400 250" className="w-full max-w-sm mx-auto">
      <rect width="400" height="250" fill="#E3F2FD"/>
      {/* 地球 */}
      <circle cx="150" cy="125" r="80" fill="#64B5F6" stroke="#1976D2" strokeWidth="3"/>
      {/* 大陆 - 简化的动漫风格 */}
      <path d="M100 100 Q120 80 140 100 Q150 120 130 140 Q110 130 100 100" fill="#81C784" opacity="0.8"/>
      <path d="M160 90 Q180 70 200 90 Q210 110 190 130 Q170 120 160 90" fill="#81C784" opacity="0.8"/>
      <path d="M120 140 Q140 130 150 150 Q140 170 120 160 Q110 150 120 140" fill="#81C784" opacity="0.8"/>
      {/* 经纬线 */}
      <ellipse cx="150" cy="125" rx="80" ry="25" fill="none" stroke="#BBDEFB" strokeWidth="1" opacity="0.5"/>
      <ellipse cx="150" cy="125" rx="80" ry="50" fill="none" stroke="#BBDEFB" strokeWidth="1" opacity="0.5"/>
      <ellipse cx="150" cy="125" rx="30" ry="80" fill="none" stroke="#BBDEFB" strokeWidth="1" opacity="0.5"/>
      <line x1="70" y1="125" x2="230" y2="125" stroke="#BBDEFB" strokeWidth="1" opacity="0.5"/>
      {/* 经线 */}
      <ellipse cx="150" cy="125" rx="80" ry="80" fill="none" stroke="#BBDEFB" strokeWidth="1" opacity="0.3"/>
      {/* 坐标 */}
      <circle cx="150" cy="45" r="4" fill="#FF5722"/>
      <text x="158" y="50" fontSize="10" fill="#333">90°N</text>
      <circle cx="150" cy="205" r="4" fill="#FF5722"/>
      <text x="155" y="215" fontSize="10" fill="#333">0°</text>
      <circle cx="70" cy="125" r="4" fill="#FF5722"/>
      <text x="30" y="130" fontSize="10" fill="#333">180°</text>
    </svg>
  ),
  // 历史 - 古代建筑
  '历史': (
    <svg viewBox="0 0 400 250" className="w-full max-w-sm mx-auto">
      <rect width="400" height="250" fill="#FFF8E1"/>
      {/* 长城 - 动漫风格简化 */}
      <path d="M0 180 L50 170 L80 175 L120 165 L160 170 L200 160 L240 165 L280 155 L320 160 L360 150 L400 155 L400 250 L0 250 Z" fill="#FFAB91" stroke="#BF360C" strokeWidth="2"/>
      {/* 烽火台 */}
      <rect x="80" y="130" width="30" height="40" fill="#FFCCBC" stroke="#BF360C" strokeWidth="2"/>
      <rect x="75" y="125" width="40" height="10" fill="#FFAB91" stroke="#BF360C" strokeWidth="2"/>
      <polygon points="80,125 95,110 110,125" fill="#EF9A9A" stroke="#BF360C" strokeWidth="2"/>
      {/* 城楼 */}
      <rect x="250" y="120" width="80" height="50" fill="#FFCCBC" stroke="#BF360C" strokeWidth="2"/>
      <rect x="245" y="115" width="90" height="10" fill="#FFAB91" stroke="#BF360C" strokeWidth="2"/>
      <polygon points="250,115 290,95 330,115" fill="#EF9A9A" stroke="#BF360C" strokeWidth="2"/>
      {/* 屋顶 */}
      <polygon points="240,120 290,80 340,120" fill="#FF7043" stroke="#E64A19" strokeWidth="2"/>
      {/* 天空装饰 */}
      <circle cx="50" cy="40" r="20" fill="#FFD54F" opacity="0.8"/>
      <circle cx="350" cy="60" r="15" fill="#FFD54F" opacity="0.6"/>
      <circle cx="80" cy="60" r="8" fill="#FFECB3"/>
      <circle cx="320" cy="30" r="10" fill="#FFECB3"/>
      {/* 云朵 */}
      <ellipse cx="150" cy="50" rx="30" ry="15" fill="white" opacity="0.8"/>
      <ellipse cx="170" cy="45" rx="25" ry="12" fill="white" opacity="0.8"/>
    </svg>
  ),
  // 默认插图
  'default': (
    <svg viewBox="0 0 400 250" className="w-full max-w-sm mx-auto">
      <rect width="400" height="250" fill="#F5F5F5"/>
      <text x="200" y="130" textAnchor="middle" fontSize="40" fill="#9E9E9E">📚</text>
      <text x="200" y="170" textAnchor="middle" fontSize="16" fill="#9E9E9E">点击生成题目</text>
    </svg>
  )
}

// 获取插图函数
function getIllustration(topic, subject) {
  const topicLower = topic.toLowerCase()
  
  // 语文相关
  if (subject === 'chinese' || topicLower.includes('古诗') || topicLower.includes('语文') || topicLower.includes('阅读')) {
    if (topicLower.includes('古诗')) return animeIllustrations['古诗词']
    if (topicLower.includes('阅读')) return animeIllustrations['阅读理解']
    return animeIllustrations['古诗词']
  }
  
  // 数学相关
  if (subject === 'math' || topicLower.includes('数学') || topicLower.includes('几何') || topicLower.includes('统计')) {
    if (topicLower.includes('几何')) return animeIllustrations['几何图形']
    if (topicLower.includes('统计') || topicLower.includes('图表')) return animeIllustrations['统计图表']
    return animeIllustrations['几何图形']
  }
  
  // 英语相关
  if (subject === 'english' || topicLower.includes('英语') || topicLower.includes('单词') || topicLower.includes('语法')) {
    return animeIllustrations['英语']
  }
  
  // 物理相关
  if (subject === 'physics' || topicLower.includes('物理') || topicLower.includes('力学') || topicLower.includes('电学')) {
    if (topicLower.includes('电') || topicLower.includes('电路')) return animeIllustrations['电学']
    return animeIllustrations['力学']
  }
  
  // 化学相关
  if (subject === 'chemistry' || topicLower.includes('化学') || topicLower.includes('实验')) {
    return animeIllustrations['化学']
  }
  
  // 生物相关
  if (subject === 'biology' || topicLower.includes('生物') || topicLower.includes('细胞')) {
    return animeIllustrations['细胞']
  }
  
  // 地理相关
  if (subject === 'geography' || topicLower.includes('地理') || topicLower.includes('地球')) {
    return animeIllustrations['地理']
  }
  
  // 历史相关
  if (subject === 'history' || topicLower.includes('历史') || topicLower.includes('古代')) {
    return animeIllustrations['历史']
  }
  
  return animeIllustrations['古诗词']
}

// 简化的几何图形组件（保留原有的技术图形）
const GeometryRenderer = ({ image }) => {
  if (!image || !image.type) return null

  const { type, params } = image

  switch (type) {
    case 'rectangle':
      return (
        <div className="my-3">
          <svg viewBox="0 0 200 120" className="w-48 h-28 border border-gray-300 bg-white rounded">
            <rect x="20" y="20" width="160" height="80" fill="none" stroke="#3B82F6" strokeWidth="2"/>
            <text x="100" y="65" textAnchor="middle" fontSize="12" fill="#3B82F6">{params.width}cm</text>
            <text x="15" y="65" textAnchor="middle" fontSize="12" fill="#3B82F6" transform="rotate(-90, 15, 65)">{params.height}cm</text>
          </svg>
        </div>
      )
    case 'circle':
      return (
        <div className="my-3">
          <svg viewBox="0 0 160 160" className="w-40 h-40 border border-gray-300 bg-white rounded">
            <circle cx="80" cy="80" r="60" fill="none" stroke="#3B82F6" strokeWidth="2"/>
            <line x1="80" y1="80" x2="140" y2="80" stroke="#EF4444" strokeWidth="1" strokeDasharray="5,3"/>
            <text x="110" y="75" fontSize="10" fill="#EF4444">r={params.radius}cm</text>
          </svg>
        </div>
      )
    case 'chart':
      const maxValue = Math.max(...(params.values || []))
      return (
        <div className="my-3">
          <svg viewBox="0 0 280 180" className="w-72 h-44 border border-gray-300 bg-white rounded">
            <line x1="40" y1="140" x2="260" y2="140" stroke="#333" strokeWidth="2"/>
            <line x1="40" y1="140" x2="40" y2="20" stroke="#333" strokeWidth="2"/>
            {params.values?.map((val, i) => (
              <g key={i}>
                <rect x={50 + i * 50} y={140 - (val / maxValue) * 100} width="30" height={(val / maxValue) * 100} fill="#3B82F6" opacity="0.7"/>
                <text x={65 + i * 50} y={155} textAnchor="middle" fontSize="10" fill="#666">{params.labels?.[i]}</text>
              </g>
            ))}
          </svg>
        </div>
      )
    default:
      return null
  }
}

// 题目配图组件
const QuestionImage = ({ image, topic, subject, printMode = false }) => {
  // 打印模式下隐藏动漫插图，只保留技术图形
  if (printMode) {
    // 打印模式：只显示 AI 返回的几何图形
    if (image && image.type) {
      return <GeometryRenderer image={image} />
    }
    return null
  }
  
  // 非打印模式：优先使用 AI 返回的几何图形，否则使用动漫风格插图
  if (image && image.type) {
    return <GeometryRenderer image={image} />
  }
  
  // 否则使用动漫风格插图
  return getIllustration(topic, subject)
}

function App() {
  const [subject, setSubject] = useState('math')
  const [grade, setGrade] = useState('3')
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [questionCount, setQuestionCount] = useState(10)
  const [isGenerating, setIsGenerating] = useState(false)
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState('')
  const [freeCount, setFreeCount] = useState(3)
  const [showPayModal, setShowPayModal] = useState(false)
  const [schoolName, setSchoolName] = useState('育才学校')
  const [isPrinting, setIsPrinting] = useState(false)
  const paperRef = useRef(null)

  // 检测打印状态
  useEffect(() => {
    const handleBeforePrint = () => setIsPrinting(true)
    const handleAfterPrint = () => setIsPrinting(false)
    window.addEventListener('beforeprint', handleBeforePrint)
    window.addEventListener('afterprint', handleAfterPrint)
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint)
      window.removeEventListener('afterprint', handleAfterPrint)
    }
  }, [])

  const availableSubjects = subjects.filter(s => grades.find(g => g.value === grade)?.subjects.includes(s.value))
  const currentTopics = topicTemplates[subject] || []

  function getGradeText(grade) { return grades.find(g => g.value === grade)?.label || '三年级' }
  function getDifficultyText(difficulty) { return difficulties.find(d => d.value === difficulty)?.label || '中等' }
  function getSubjectText(subject) { return subjects.find(s => s.value === subject)?.label || '数学' }

  const handleGradeChange = (newGrade) => {
    setGrade(newGrade)
    const gradeData = grades.find(g => g.value === newGrade)
    if (gradeData && !gradeData.subjects.includes(subject)) setSubject(gradeData.subjects[0])
  }

  const handleGenerate = async () => {
    if (!topic.trim()) { setError('请输入知识点'); return }
    if (freeCount <= 0) { setShowPayModal(true); return }
    
    setIsGenerating(true)
    setError('')
    setQuestions([])
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, grade, topic, difficulty, questionCount }),
      })
      const data = await response.json()
      if (data.success) { setQuestions(data.questions); setFreeCount(prev => prev - 1) }
      else setError(data.error || '生成失败，请重试')
    } catch (err) {
      setError('网络错误，请检查后端服务')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    const text = `${schoolName} ${getGradeText(grade)}${getSubjectText(subject)}试卷\n知识点：${topic}\n\n${questions.map((q, i) => `${i + 1}. ${q.question}`).join('\n\n')}\n\n---答案---\n\n${questions.map((q, i) => `${i + 1}. ${q.answer}`).join('\n')}`
    navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="gradient-bg text-white py-6 px-4 shadow-lg print:hidden">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center gap-3"><span className="text-4xl">📝</span>智出题</h1>
          <p className="mt-2 text-blue-100">全科智能出题工具，AI生成动漫风格配图</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 print:hidden">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><span>⚙️</span> 出题配置</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">学校名称</label>
                <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">年级</label>
                <select value={grade} onChange={(e) => handleGradeChange(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none">
                  {grades.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">学科</label>
              <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
                {availableSubjects.map(s => (
                  <button key={s.value} onClick={() => setSubject(s.value)} className={`py-2.5 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${subject === s.value ? s.color + ' text-white ring-2 ring-offset-2 ring-gray-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-xs">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">知识点</label>
              <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="如：古诗词、几何图形、英语..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
              <div className="flex flex-wrap gap-2 mt-2">
                {currentTopics.map(t => (
                  <button key={t} onClick={() => setTopic(t)} className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors">{t}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">题目数量</label>
                <div className="flex gap-2">
                  {questionCounts.map(count => (
                    <button key={count} onClick={() => setQuestionCount(count)} className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${questionCount === count ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{count}题</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">难度</label>
                <div className="flex gap-3">
                  {difficulties.map(d => (
                    <button key={d.value} onClick={() => setDifficulty(d.value)} className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${difficulty === d.value ? d.color + ' ring-2 ring-offset-1 ring-gray-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{d.label}</button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={handleGenerate} disabled={isGenerating} className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50">
              {isGenerating ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>AI 正在出题中...</span> : '🎯 一键生成试卷'}
            </button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>
        </div>

        {questions.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 print:shadow-none print:border-none print:p-0">
            <div className="flex items-center justify-between mb-4 print:hidden">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><span>📋</span> 生成的试卷</h2>
              <div className="flex gap-2">
                <button onClick={handleGenerate} className="px-4 py-2 text-sm text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100">🔄 重新生成</button>
                <button onClick={handleCopy} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">📋 复制文本</button>
                <button onClick={() => window.print()} className="px-4 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600">🖨️ 打印试卷</button>
              </div>
            </div>
            
            <div ref={paperRef} className="paper-container bg-white">
              <div className="border-4 border-double border-gray-800 p-6 mb-6">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">{schoolName.charAt(0)}</div>
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-widest">{schoolName}</h1>
                    <h2 className="text-2xl font-bold text-gray-700 mt-1">{getGradeText(grade)}{getSubjectText(subject)}试卷</h2>
                  </div>
                  <span className="text-4xl">{subjects.find(s => s.value === subject)?.icon}</span>
                </div>
                <div className="text-center text-gray-600 text-sm mt-2">
                  <span className="inline-block px-3 py-1 bg-blue-50 rounded-full">知识点：{topic}</span>
                  <span className="mx-2">|</span>
                  <span className="inline-block px-3 py-1 bg-purple-50 rounded-full">难度：{getDifficultyText(difficulty)}</span>
                  <span className="mx-2">|</span>
                  <span className="inline-block px-3 py-1 bg-green-50 rounded-full">共 {questions.length} 题</span>
                </div>
              </div>

              <div className="border-2 border-gray-300 rounded-lg p-3 mb-6">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="border-r border-dashed border-gray-300"><p className="text-xs text-gray-500 mb-1">班级</p><div className="h-6 border-b-2 border-gray-400"></div></div>
                  <div className="border-r border-dashed border-gray-300"><p className="text-xs text-gray-500 mb-1">姓名</p><div className="h-6 border-b-2 border-gray-400"></div></div>
                  <div className="border-r border-dashed border-gray-300"><p className="text-xs text-gray-500 mb-1">学号</p><div className="h-6 border-b-2 border-gray-400"></div></div>
                  <div><p className="text-xs text-gray-500 mb-1">得分</p><div className="h-6 border-b-2 border-gray-400"></div></div>
                </div>
              </div>

              {/* 题目部分 */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm mr-3">一</span>
                  {getSubjectText(subject)}题（共 {questions.length} 题，每题 10 分）
                </h3>
                
                <div className="space-y-6">
                  {questions.map((q, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">{index + 1}</div>
                        <div className="flex-1">
                          <p className="text-gray-800 leading-relaxed text-base whitespace-pre-line">{q.question}</p>
                          
                          {/* 动漫风格配图 - 打印时自动隐藏 */}
                          <QuestionImage image={q.image} topic={topic} subject={subject} printMode={isPrinting} />
                          
                          <div className="mt-4 min-h-[80px] border border-dashed border-gray-300 rounded bg-gray-50 p-2">
                            <p className="text-xs text-gray-400 text-center">答题区域</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 答案部分 */}
              <div className="border-t-4 border-double border-gray-400 pt-6 mt-8">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-4 mb-4 text-center">
                  <span className="font-bold text-yellow-800 text-lg">🔐 参考答案与解析</span>
                </div>
                
                <div className="space-y-4">
                  {questions.map((q, index) => (
                    <div key={index} className="flex gap-3 pb-4 border-b border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">{index + 1}</div>
                      <div className="flex-1">
                        <p className="text-gray-800">{q.question}</p>
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-green-700 font-medium">✓ 答案：{q.answer}</p>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 ml-2">💡 解析：{q.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center text-xs text-gray-400 mt-8 pt-4 border-t border-gray-200">
                <p>— 由「智出题」AI 自动生成 —</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .print\\:hidden { display: none !important; } .paper-container { padding: 15px; } }`}</style>

      <footer className="text-center py-6 text-gray-400 text-sm print:hidden">
        <p>智出题 © 2024 - 动漫风格智能出题</p>
      </footer>
    </div>
  )
}

export default App
