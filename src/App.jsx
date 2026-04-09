import React, { useState, useMemo } from 'react'

// ==================== 数据 ====================

// 省份列表
const PROVINCES = [
  { value: 'beijing', label: '北京', cities: ['北京市'] },
  { value: 'shanghai', label: '上海', cities: ['上海市'] },
  { value: 'guangdong', label: '广东', cities: ['广州', '深圳', '东莞', '佛山', '珠海'] },
  { value: 'zhejiang', label: '浙江', cities: ['杭州', '宁波', '温州', '嘉兴'] },
  { value: 'jiangsu', label: '江苏', cities: ['南京', '苏州', '无锡', '常州'] },
  { value: 'sichuan', label: '四川', cities: ['成都', '绵阳', '德阳'] },
  { value: 'hubei', label: '湖北', cities: ['武汉', '宜昌', '襄阳'] },
  { value: 'hunan', label: '湖南', cities: ['长沙', '株洲', '湘潭'] },
  { value: 'henan', label: '河南', cities: ['郑州', '洛阳', '开封'] },
  { value: 'shandong', label: '山东', cities: ['济南', '青岛', '烟台'] },
  { value: 'fujian', label: '福建', cities: ['福州', '厦门', '泉州'] },
  { value: 'liaoning', label: '辽宁', cities: ['沈阳', '大连'] },
  { value: 'chongqing', label: '重庆', cities: ['重庆市'] },
  { value: 'tianjin', label: '天津', cities: ['天津市'] },
  { value: 'guangxi', label: '广西', cities: ['南宁', '桂林', '柳州'] },
  { value: 'yunnan', label: '云南', cities: ['昆明', '大理', '曲靖'] },
  { value: 'guizhou', label: '贵州', cities: ['贵阳', '遵义'] },
  { value: 'shaanxi', label: '陕西', cities: ['西安', '咸阳'] },
  { value: 'jiangxi', label: '江西', cities: ['南昌', '赣州'] },
  { value: 'anhui', label: '安徽', cities: ['合肥', '芜湖'] },
]

// 年级
const GRADES = [
  { value: '1', label: '一年级' },
  { value: '2', label: '二年级' },
  { value: '3', label: '三年级' },
  { value: '4', label: '四年级' },
  { value: '5', label: '五年级' },
  { value: '6', label: '六年级' },
  { value: '7', label: '初一' },
  { value: '8', label: '初二' },
  { value: '9', label: '初三' },
  { value: '10', label: '高一' },
  { value: '11', label: '高二' },
  { value: '12', label: '高三' },
]

// 学科
const SUBJECTS = [
  { value: 'chinese', label: '语文', color: '#E74C3C', bg: 'bg-red-50', icon: '📖' },
  { value: 'math', label: '数学', color: '#3498DB', bg: 'bg-blue-50', icon: '🔢' },
  { value: 'english', label: '英语', color: '#27AE60', bg: 'bg-green-50', icon: '🔤' },
  { value: 'physics', label: '物理', color: '#F39C12', bg: 'bg-amber-50', icon: '⚡' },
  { value: 'chemistry', label: '化学', color: '#9B59B6', bg: 'bg-purple-50', icon: '🧪' },
  { value: 'biology', label: '生物', color: '#1ABC9C', bg: 'bg-teal-50', icon: '🧬' },
  { value: 'history', label: '历史', color: '#D35400', bg: 'bg-orange-50', icon: '🏛️' },
  { value: 'geography', label: '地理', color: '#2ECC71', bg: 'bg-emerald-50', icon: '🌍' },
  { value: 'politics', label: '道德与法治', color: '#8E44AD', bg: 'bg-violet-50', icon: '📋' },
]

// 学期
const SEMESTERS = [
  { value: '1', label: '上学期' },
  { value: '2', label: '下学期' },
]

// 年份
const YEARS = ['2024', '2023', '2022', '2021']

// 示例真题数据
const SAMPLE_PAPERS = [
  {
    id: 'bj-hd-3-math-2024s2',
    province: 'beijing', provinceLabel: '北京',
    city: '北京市', district: '海淀区',
    grade: '3', gradeLabel: '三年级',
    subject: 'math', subjectLabel: '数学',
    semester: '2', semesterLabel: '下学期',
    year: '2024',
    title: '北京市海淀区2023-2024学年三年级下学期数学期末质量检测',
    school: '海淀区中关村第一小学',
    totalScore: 100, duration: 90,
    sections: [
      {
        name: '一、选择题', score: 30,
        questions: [
          { no: 1, type: 'choice', text: '下列哪个数是最小的三位数？', options: ['99', '100', '101', '110'], answer: 'B' },
          { no: 2, type: 'choice', text: '小明有12颗糖，小红给了他5颗，小明现在有多少颗糖？', options: ['17颗', '7颗', '16颗', '18颗'], answer: 'A' },
          { no: 3, type: 'choice', text: '下面哪个图形有4条边？', options: ['三角形', '正方形', '圆形', '五边形'], answer: 'B' },
          { no: 4, type: 'choice', text: '45 + 37 = ?', options: ['72', '82', '83', '73'], answer: 'B' },
          { no: 5, type: 'choice', text: '1米 = ?厘米', options: ['10厘米', '100厘米', '1000厘米', '1厘米'], answer: 'B' },
        ]
      },
      {
        name: '二、填空题', score: 24,
        questions: [
          { no: 6, type: 'fill', text: '比38多15的数是______。', answer: '53' },
          { no: 7, type: 'fill', text: '在括号里填上">"、"<"或"="：56 ○ 65。', answer: '<' },
          { no: 8, type: 'fill', text: '一个正方形有______个角。', answer: '4' },
          { no: 9, type: 'fill', text: '80里面有______个十。', answer: '8' },
          { no: 10, type: 'fill', text: '3元5角 = ______角。', answer: '35' },
        ]
      },
      {
        name: '三、计算题', score: 30,
        questions: [
          { no: 11, type: 'calc', text: '25 + 38 = ______', answer: '63' },
          { no: 12, type: 'calc', text: '72 - 35 = ______', answer: '37' },
          { no: 13, type: 'calc', text: '6 × 7 = ______', answer: '42' },
          { no: 14, type: 'calc', text: '56 ÷ 8 = ______', answer: '7' },
          { no: 15, type: 'calc', text: '23 + 47 - 35 = ______', answer: '35' },
        ]
      },
      {
        name: '四、应用题', score: 16,
        questions: [
          { no: 16, type: 'app', text: '水果店上午卖出苹果28个，下午卖出35个。一天一共卖出多少个苹果？', answer: '28 + 35 = 63（个）' },
          { no: 17, type: 'app', text: '一根绳子长72米，第一次用去25米，第二次用去18米。还剩多少米？', answer: '72 - 25 - 18 = 29（米）' },
        ]
      }
    ]
  },
  {
    id: 'gz-th-5-chinese-2024s2',
    province: 'guangdong', provinceLabel: '广东',
    city: '广州', district: '天河区',
    grade: '5', gradeLabel: '五年级',
    subject: 'chinese', subjectLabel: '语文',
    semester: '2', semesterLabel: '下学期',
    year: '2024',
    title: '广州市天河区2023-2024学年五年级下学期语文期末学业水平测试',
    school: '华南师范大学附属小学',
    totalScore: 100, duration: 120,
    sections: [
      {
        name: '一、积累与运用', score: 35,
        questions: [
          { no: 1, type: 'fill', text: '古诗《枫桥夜泊》作者是______，诗句"月落乌啼霜满天，______"。(2分)', answer: '张继，江枫渔火对愁眠' },
          { no: 2, type: 'fill', text: '《草原》一课的作者是______，文章表达了作者对草原的______之情。(2分)', answer: '老舍，喜爱/热爱' },
          { no: 3, type: 'fill', text: '将词语补充完整：波涛汹______  无______无尽  ______然大怒  迫不______待 (4分)', answer: '涌，穷，勃，及' },
          { no: 4, type: 'choice', text: '下面词语中书写全部正确的一项是（  ）(2分)', options: ['A. 阴谋鬼计  各抒己见  B. 水平如镜  汹涌澎湃', 'C. 谈笑风生  再接再励  D. 举世文明  三年五载'], answer: 'B' },
          { no: 5, type: 'choice', text: '"他学习很努力，成绩优秀，可身体却很虚弱。"这句话使用的修辞手法是（  ）(2分)', options: ['比喻', '拟人', '夸张', '对比'], answer: 'D' },
        ]
      },
      {
        name: '二、阅读理解', score: 30,
        questions: [
          { no: 6, type: 'fill', text: '阅读短文回答问题（节选自《威尼斯的小艇》）"船头和船艄向上翘起，像挂在天边的新月。"这句话用了______的修辞手法，把小艇比作______。(3分)', answer: '比喻，新月' },
          { no: 7, type: 'app', text: '《威尼斯的小艇》作者是谁？他用什么手法描写小艇的样子？(4分)', answer: '马克·吐温（美国作家）；用比喻手法，把小艇比作独木舟、水蛇、新月，突出小艇的特点。' },
        ]
      },
      {
        name: '三、写作', score: 35,
        questions: [
          { no: 8, type: 'app', text: '题目：那一刻，我长大了\n要求：①写一件自己成长过程中印象深刻的事；②表达真情实感；③不少于400字。(35分)', answer: '（作文题，学生自由发挥）' },
        ]
      }
    ]
  },
  {
    id: 'sz-ns-8-physics-2024s2',
    province: 'guangdong', provinceLabel: '广东',
    city: '深圳', district: '南山区',
    grade: '8', gradeLabel: '初二',
    subject: 'physics', subjectLabel: '物理',
    semester: '2', semesterLabel: '下学期',
    year: '2024',
    title: '深圳市南山区2023-2024学年八年级下学期物理期末质量抽测',
    school: '深圳外国语学校',
    totalScore: 100, duration: 90,
    sections: [
      {
        name: '一、选择题（共20分）', score: 20,
        questions: [
          { no: 1, type: 'choice', text: '关于力和运动的关系，下列说法正确的是（  ）', options: ['物体需要力来维持运动', '力是改变物体运动状态的原因', '静止的物体一定不受力', '只有相互接触的物体才能产生力'], answer: 'B' },
          { no: 2, type: 'choice', text: '一本书放在水平桌面上，下列说法正确的是（  ）', options: ['书受到重力和支持力是一对平衡力', '书受到重力和书对桌面的压力是一对相互作用力', '书受到的支持力和桌面对书的支持力是同一个力', '书受到重力和桌面受到的重力是一对平衡力'], answer: 'A' },
          { no: 3, type: 'choice', text: '一只鸡蛋沉在盐水中，如果向盐水中缓慢倒入清水，则鸡蛋会（  ）', options: ['下沉一些', '仍悬浮在原处', '上浮一些', '先下沉后上浮'], answer: 'C' },
          { no: 4, type: 'choice', text: '用弹簧测力计测得一物体重为8N，将其一半浸入水中时，测力计示数为6N，则该物体所受的浮力为（  ）', options: ['2N', '4N', '6N', '8N'], answer: 'A' },
        ]
      },
      {
        name: '二、填空题（共24分）', score: 24,
        questions: [
          { no: 5, type: 'fill', text: '踢足球时，脚对球施加力的同时，脚也感到疼，说明力的作用是______的。(2分)', answer: '相互' },
          { no: 6, type: 'fill', text: '浸在液体中的物体，受到向上和向下的______差就是浮力，浮力的方向总是______的。(4分)', answer: '压力，竖直向上' },
          { no: 7, type: 'fill', text: '杠杆的平衡条件是：______。当动力臂大于阻力臂时，杠杆是______杠杆。(4分)', answer: 'F₁L₁=F₂L₂，省力' },
        ]
      },
      {
        name: '三、计算题（共26分）', score: 26,
        questions: [
          { no: 8, type: 'app', text: '一个物体质量为2kg，体积为2.5×10⁻³ m³。求：(1)物体的密度；(2)把该物体放入足够多的水中，物体静止时受到的浮力（g=10N/kg）。(13分)', answer: '(1)ρ=m/V=2kg/2.5×10⁻³m³=0.8×10³kg/m³；(2)因为ρ<ρ水，物体漂浮，F浮=G=mg=2×10=20N' },
          { no: 9, type: 'app', text: '用杠杆撬动一块石头，已知阻力臂为0.5m，阻力为1000N，若动力臂为2m，求至少需要多大的动力？(13分)', answer: '根据杠杆平衡条件F₁L₁=F₂L₂，得F₁=F₂L₂/L₁=1000×0.5/2=250N' },
        ]
      },
      {
        name: '四、实验探究题（共30分）', score: 30,
        questions: [
          { no: 10, type: 'app', text: '在"探究浮力大小与哪些因素有关"的实验中：(1)如图所示，弹簧测力计的示数分别为G、F₁、F₂、F₃，其中F₁>F₂>F₃>G，分析可得浮力大小与______有关；(2)比较F₃与G可知物体在水中受浮力为______N；(3)若要探究浮力与物体体积是否有关，需要控制不变的量是______。(10分)', answer: '(1)排开液体的体积；(2)1N；(3)液体的密度' },
        ]
      }
    ]
  },
  {
    id: 'sh-ps-4-english-2024s2',
    province: 'shanghai', provinceLabel: '上海',
    city: '上海市', district: '普陀区',
    grade: '4', gradeLabel: '四年级',
    subject: 'english', subjectLabel: '英语',
    semester: '2', semesterLabel: '下学期',
    year: '2024',
    title: '上海市普陀区2023-2024学年四年级下学期英语期末学业评价',
    school: '上海市普陀区华东师范大学附属小学',
    totalScore: 100, duration: 60,
    sections: [
      {
        name: 'Part I Listening (40%)', score: 40,
        questions: [
          { no: 1, type: 'choice', text: 'Listen and choose the correct picture. (5分)', options: ['A. 🐱', 'B. 🐶', 'C. 🐰'], answer: 'A' },
          { no: 2, type: 'fill', text: 'Listen and write the missing word: "I like to play _______ (足球) with my friends."', answer: 'football' },
        ]
      },
      {
        name: 'Part II Vocabulary & Grammar (30%)', score: 30,
        questions: [
          { no: 3, type: 'choice', text: 'There _____ a lot of books on the desk.', options: ['is', 'are', 'has', 'have'], answer: 'B' },
          { no: 4, type: 'fill', text: 'The children are having an art class in the ________ (实验室).', answer: 'lab' },
          { no: 5, type: 'fill', text: 'My mother ________ (cook) dinner every evening.', answer: 'cooks' },
        ]
      },
      {
        name: 'Part III Reading & Writing (30%)', score: 30,
        questions: [
          { no: 6, type: 'app', text: 'Read and answer: What does Tom usually do on weekends? (不少于3句话)', answer: 'Tom usually plays football on Saturdays. On Sundays, he visits his grandparents. He also likes reading books at home.' },
          { no: 7, type: 'app', text: 'Write a short passage about your school life. (不少于5句话)', answer: '（写作题，学生自由发挥）' },
        ]
      }
    ]
  },
  {
    id: 'hz-xh-6-chinese-2024s1',
    province: 'zhejiang', provinceLabel: '浙江',
    city: '杭州', district: '西湖区',
    grade: '6', gradeLabel: '六年级',
    subject: 'chinese', subjectLabel: '语文',
    semester: '1', semesterLabel: '上学期',
    year: '2024',
    title: '杭州市西湖区2024-2025学年六年级上学期语文期末学业水平测试',
    school: '杭州市学军小学',
    totalScore: 100, duration: 120,
    sections: [
      {
        name: '一、基础知识（30分）', score: 30,
        questions: [
          { no: 1, type: 'fill', text: '根据拼音写词语：lǐ mào(    )  jǐn shèn(    )  yōu xiù(    )', answer: '礼貌，谨慎，优秀' },
          { no: 2, type: 'choice', text: '下列词语中，加点字读音完全正确的一项是（  ）', options: ['A. 挑逗tiāo B. 似的shì C. 蒙骗mēng D. 给予gěi', 'A. 挑逗tiǎo B. 似的sì C. 蒙骗méng D. 给予jǐ', 'A. 挑逗tiāo B. 似的sì C. 蒙骗méng D. 给予gěi', 'A. 挑逗tiǎo B. 似的shì C. 蒙骗mēng D. 给予jǐ'], answer: 'B' },
          { no: 3, type: 'fill', text: '古诗词填空：死去元知万事空，_______________。', answer: '但悲不见九州同' },
        ]
      },
      {
        name: '二、阅读理解（35分）', score: 35,
        questions: [
          { no: 4, type: 'app', text: '阅读《少年闰土》片段，回答问题：闰土给你留下了怎样的印象？请结合文中描写说明。(6分)', answer: '闰土给我留下了健康可爱、聪明勇敢、见多识广的印象。文中写他"紫色的圆脸，头戴一顶小毡帽，颈上套一个明晃晃的银项圈"，显得健康可爱；雪地捕鸟、海边拾贝等描写说明他见多识广、聪明能干。' },
        ]
      },
      {
        name: '三、写作（35分）', score: 35,
        questions: [
          { no: 5, type: 'app', text: '题目：难忘的小学生活\n要求：①选取一件或几件印象深刻的事；②表达真情实感；③不少于500字。(35分)', answer: '（作文题，学生自由发挥）' },
        ]
      }
    ]
  },
  {
    id: 'wh-wc-7-history-2024s2',
    province: 'hubei', provinceLabel: '湖北',
    city: '武汉', district: '武昌区',
    grade: '7', gradeLabel: '初一',
    subject: 'history', subjectLabel: '历史',
    semester: '2', semesterLabel: '下学期',
    year: '2024',
    title: '武汉市武昌区2023-2024学年七年级下学期历史期末学业水平测试',
    school: '武汉市武昌实验中学',
    totalScore: 100, duration: 60,
    sections: [
      {
        name: '一、选择题（共30分）', score: 30,
        questions: [
          { no: 1, type: 'choice', text: '结束了三国两晋南北朝时期分裂局面，实现全国统一的历史朝代是（  ）', options: ['A. 隋朝', 'B. 唐朝', 'C. 明朝', 'D. 元朝'], answer: 'A' },
          { no: 2, type: 'choice', text: '唐代诗人李白被称为"诗仙"，下列诗句中，哪一句是李白的作品（  ）', options: ['A. 疑是银河落九天', 'B. 烽火连三月', 'C. 夕阳无限好', 'D. 海内存知己'], answer: 'A' },
          { no: 3, type: 'choice', text: '世界上现存最早的标有确切年代的雕版印刷品是（  ）', options: ['A. 《金刚经》', 'B. 《诗经》', 'C. 《史记》', 'D. 《唐诗三百首》'], answer: 'A' },
        ]
      },
      {
        name: '二、材料分析题（共40分）', score: 40,
        questions: [
          { no: 4, type: 'app', text: '阅读下列材料，回答问题。\n材料：唐朝时，中国经济繁荣，文化昌盛，对外交往活跃。长安是当时的国际大都会……\n问题：(1)唐朝实行怎样的对外政策？(2)举出两个唐朝对外交往的史实。(8分)', answer: '(1)唐朝实行开放、包容的对外政策；(2)玄奘西行取经、鉴真东渡日本、遣唐使来华等。' },
        ]
      },
      {
        name: '三、简答题（共30分）', score: 30,
        questions: [
          { no: 5, type: 'app', text: '简述科举制度的主要作用。(10分)', answer: '科举制度打破了门第限制，选官不问出身，有利于选拔人才；促进了社会阶层流动；推动了教育发展和文化繁荣；对后世及世界文官制度产生深远影响。' },
        ]
      }
    ]
  },
  {
    id: 'cd-jy-1-math-2024s2',
    province: 'sichuan', provinceLabel: '四川',
    city: '成都', district: '锦江区',
    grade: '1', gradeLabel: '一年级',
    subject: 'math', subjectLabel: '数学',
    semester: '2', semesterLabel: '下学期',
    year: '2024',
    title: '成都市锦江区2023-2024学年一年级下学期数学期末素质评价',
    school: '成都市龙江路小学',
    totalScore: 100, duration: 60,
    sections: [
      {
        name: '一、我会数（20分）', score: 20,
        questions: [
          { no: 1, type: 'fill', text: '数一数，填一填：🍎🍎🍎🍎🍎🍎🍎🍎 有______个苹果。', answer: '8' },
          { no: 2, type: 'fill', text: '按规律填数：2、4、6、_____、10。', answer: '8' },
          { no: 3, type: 'fill', text: '比10多5的数是______。', answer: '15' },
        ]
      },
      {
        name: '二、我会算（40分）', score: 40,
        questions: [
          { no: 4, type: 'calc', text: '3 + 6 = ______', answer: '9' },
          { no: 5, type: 'calc', text: '10 - 4 = ______', answer: '6' },
          { no: 6, type: 'calc', text: '8 + 5 = ______', answer: '13' },
          { no: 7, type: 'calc', text: '15 - 7 = ______', answer: '8' },
          { no: 8, type: 'calc', text: '9 + 3 = ______', answer: '12' },
          { no: 9, type: 'calc', text: '11 - 5 = ______', answer: '6' },
        ]
      },
      {
        name: '三、我会解决问题（40分）', score: 40,
        questions: [
          { no: 10, type: 'app', text: '小明有7支铅笔，小红又给了他3支。小明现在有多少支铅笔？\n列式：______  答：______', answer: '7+3=10（支）' },
          { no: 11, type: 'app', text: '池塘里有8只天鹅，飞走了3只，还剩多少只？\n列式：______  答：______', answer: '8-3=5（只）' },
        ]
      }
    ]
  },
  {
    id: 'nj-jy-5-biology-2024s2',
    province: 'jiangsu', provinceLabel: '江苏',
    city: '南京', district: '建邺区',
    grade: '10', gradeLabel: '高一',
    subject: 'biology', subjectLabel: '生物',
    semester: '2', semesterLabel: '下学期',
    year: '2024',
    title: '南京市建邺区2023-2024学年高一年级下学期生物期末学业质量监测',
    school: '南京市金陵中学',
    totalScore: 100, duration: 75,
    sections: [
      {
        name: '一、选择题（共40分）', score: 40,
        questions: [
          { no: 1, type: 'choice', text: '细胞膜的结构特点是（  ）', options: ['A. 具有选择透过性 B. 具有一定的流动性 C. 具有识别作用 D. 具有保护作用'], answer: 'B' },
          { no: 2, type: 'choice', text: 'ATP分子的结构简式是（  ）', options: ['A. A～P-P B. A-P-P-P C. A-P～P～P D. A～P～P～P'], answer: 'C' },
          { no: 3, type: 'choice', text: '有氧呼吸和无氧呼吸的相同点是（  ）', options: ['A. 都在线粒体进行 B. 都需要酶催化 C. 都能产生酒精 D. 都能释放大量能量'], answer: 'B' },
        ]
      },
      {
        name: '二、非选择题（共60分）', score: 60,
        questions: [
          { no: 4, type: 'app', text: '图是植物细胞有氧呼吸过程示意图，据图回答问题：\n(1) 有氧呼吸第一阶段的场所是______，产物是______。\n(2) 有氧呼吸第二、三阶段的场所是______。\n(3) 有氧呼吸的总反应式：__________________。', answer: '(1)细胞质基质，丙酮酸和[H]；(2)线粒体；(3)C6H12O6+6H2O+6O2→6CO2+12H2O+大量能量' },
          { no: 5, type: 'app', text: '光合作用分为光反应和暗反应两个阶段。请比较两者的区别（至少写3点）。', answer: '①场所不同：光反应在叶绿体类囊体膜上，暗反应在叶绿体基质中；②条件不同：光反应需要光，暗反应有光无光均可；③物质变化不同；④能量转换不同' },
        ]
      }
    ]
  }
]

// ==================== 组件 ====================

// 头部组件
function Header({ onBack, title, showBack }) {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {showBack && (
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: 'white',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          ←
        </button>
      )}
      <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>{title}</h1>
    </header>
  )
}

// 试卷卡片
function PaperCard({ paper, onClick }) {
  const subject = SUBJECTS.find(s => s.value === paper.subject)
  return (
    <div onClick={onClick} style={{
      background: 'white',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      cursor: 'pointer',
      transition: 'all 0.2s',
      borderLeft: `4px solid ${subject?.color || '#667eea'}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '20px' }}>{subject?.icon}</span>
            <span style={{ background: subject?.bg, color: subject?.color, padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
              {paper.subjectLabel}
            </span>
            <span style={{ background: '#f0f0f0', color: '#666', padding: '2px 10px', borderRadius: '12px', fontSize: '12px' }}>
              {paper.gradeLabel}
            </span>
          </div>
          <h3 style={{ fontSize: '15px', color: '#333', margin: '0 0 6px 0', fontWeight: '500', lineHeight: '1.4' }}>
            {paper.title}
          </h3>
          <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
            {paper.provinceLabel} · {paper.city} · {paper.year}年{paper.semester === '1' ? '上' : '下'}学期 · 满分{paper.totalScore}分
          </p>
        </div>
        <div style={{ color: '#999', fontSize: '20px' }}>›</div>
      </div>
    </div>
  )
}

// 试卷详情视图
function PaperDetail({ paper, onBack, isPaid, onShowPay }) {
  const [showAnswer, setShowAnswer] = useState(false)
  const subject = SUBJECTS.find(s => s.value === paper.subject)

  const handlePrint = () => {
    if (!isPaid) {
      onShowPay()
      return
    }
    const printContent = document.getElementById('paper-content')
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>${paper.title}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'SimSun', '宋体', serif; padding: 40px; color: #333; }
            .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 15px; }
            .header h1 { font-size: 20px; margin-bottom: 10px; }
            .info { display: flex; justify-content: space-between; font-size: 14px; margin-top: 8px; }
            .section { margin: 20px 0; }
            .section-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; background: #f5f5f5; padding: 8px; }
            .question { margin: 12px 0; padding-left: 5px; }
            .options { margin: 5px 0 5px 25px; }
            .answer-area { height: 40px; border-bottom: 1px solid #ccc; margin-top: 5px; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const handleToggleAnswer = () => {
    if (!isPaid) {
      onShowPay()
      return
    }
    setShowAnswer(!showAnswer)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Header title="试卷详情" onBack={onBack} showBack={true} />
      
      {/* 未付费提示条 */}
      {!isPaid && (
        <div onClick={onShowPay} style={{ background: '#FFF3CD', borderBottom: '1px solid #FFE4B5', padding: '10px 16px', textAlign: 'center', cursor: 'pointer', fontSize: '13px', color: '#856404' }}>
          🔒 预览模式 · <strong>支付 ¥9.9</strong> 解锁打印和查看完整答案
        </div>
      )}
      
      {/* 工具栏 */}
      <div style={{ background: 'white', padding: '12px 20px', display: 'flex', gap: '10px', borderBottom: '1px solid #eee' }}>
        <button onClick={handlePrint} style={{
          flex: 1,
          background: isPaid ? '#667eea' : '#ccc',
          color: 'white',
          border: 'none',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '14px',
          cursor: isPaid ? 'pointer' : 'not-allowed',
          fontWeight: '500'
        }}>
          {isPaid ? '🖨️ 打印试卷' : '🔒 打印（需解锁）'}
        </button>
        <button onClick={handleToggleAnswer} style={{
          flex: 1,
          background: isPaid ? (showAnswer ? '#27AE60' : '#f0f0f0') : '#ccc',
          color: isPaid ? (showAnswer ? 'white' : '#333') : 'white',
          border: 'none',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '14px',
          cursor: isPaid ? 'pointer' : 'not-allowed',
          fontWeight: '500'
        }}>
          {isPaid ? (showAnswer ? '👁️ 隐藏答案' : '👁️ 显示答案') : '🔒 答案（需解锁）'}
        </button>
      </div>

      {/* 试卷内容 */}
      <div style={{ padding: '20px' }}>
        <div id="paper-content" style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          {/* 试卷头 */}
          <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: `linear-gradient(135deg, ${subject?.color}, ${subject?.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                {subject?.icon}
              </div>
              <div>
                <h1 style={{ fontSize: '20px', margin: 0, color: '#333' }}>{paper.title}</h1>
                <p style={{ fontSize: '12px', color: '#999', margin: '4px 0 0 0' }}>{paper.school}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '13px', color: '#666' }}>
              <span>📚 {paper.subjectLabel}</span>
              <span>📅 {paper.year}年</span>
              <span>⏱️ {paper.duration}分钟</span>
              <span>📝 满分{paper.totalScore}分</span>
            </div>
          </div>

          {/* 考生信息栏（模拟真实试卷） */}
          <div style={{ background: '#f8f8f8', border: '1px solid #ddd', borderRadius: '4px', padding: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#666', marginRight: '8px' }}>姓名：</span>
                <div style={{ flex: 1, borderBottom: '1px solid #999', height: '20px' }}></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#666', marginRight: '8px' }}>班级：</span>
                <div style={{ flex: 1, borderBottom: '1px solid #999', height: '20px' }}></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#666', marginRight: '8px' }}>学号：</span>
                <div style={{ flex: 1, borderBottom: '1px solid #999', height: '20px' }}></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#666', marginRight: '8px' }}>得分：</span>
                <div style={{ flex: 1, borderBottom: '1px solid #999', height: '20px' }}></div>
              </div>
            </div>
          </div>

          {/* 题目部分 */}
          {paper.sections.map((section, sIdx) => (
            <div key={sIdx} style={{ marginBottom: '24px' }}>
              <div style={{
                background: `${subject?.color}15`,
                padding: '10px 15px',
                borderRadius: '6px',
                borderLeft: `4px solid ${subject?.color}`,
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: '600', color: '#333', fontSize: '15px' }}>{section.name}</span>
                <span style={{ color: '#666', fontSize: '13px' }}>（本部分共{section.score}分）</span>
              </div>

              {section.questions.map((q, qIdx) => (
                <div key={qIdx} style={{ marginBottom: '16px', paddingLeft: '5px' }}>
                  <div style={{ fontSize: '14px', color: '#333', marginBottom: '8px', lineHeight: '1.6' }}>
                    <span style={{ fontWeight: '500' }}>{q.no}.</span> {q.text}
                  </div>
                  
                  {/* 选择题选项 */}
                  {q.type === 'choice' && q.options && (
                    <div style={{ paddingLeft: '20px' }}>
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} style={{ marginBottom: '4px', fontSize: '14px', color: '#555' }}>
                          {String.fromCharCode(65 + oIdx)}. {opt.replace(/^[A-D]\.\s*/, '')}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 填空/计算/应用题答案区 */}
                  {(q.type === 'fill' || q.type === 'calc' || q.type === 'app') && (
                    <div style={{ paddingLeft: '20px' }}>
                      {q.type === 'app' && (
                        <div style={{ 
                          background: '#f9f9f9', 
                          border: '1px dashed #ddd',
                          borderRadius: '6px',
                          padding: '15px',
                          minHeight: '60px',
                          color: showAnswer ? '#27AE60' : '#999',
                          fontSize: '14px',
                          lineHeight: '1.6'
                        }}>
                          {showAnswer ? `【参考答案】${q.answer}` : '（请在此作答）'}
                        </div>
                      )}
                      {q.type === 'fill' && (
                        <div style={{
                          background: '#f9f9f9',
                          border: '1px dashed #ddd',
                          borderRadius: '6px',
                          padding: '10px 15px',
                          color: showAnswer ? '#27AE60' : '#999',
                          fontSize: '14px'
                        }}>
                          {showAnswer ? `【参考答案】${q.answer}` : '（请在此填写答案）'}
                        </div>
                      )}
                      {q.type === 'calc' && (
                        <div style={{
                          background: '#f9f9f9',
                          border: '1px dashed #ddd',
                          borderRadius: '6px',
                          padding: '10px 15px',
                          width: '150px',
                          color: showAnswer ? '#27AE60' : '#999',
                          fontSize: '14px'
                        }}>
                          {showAnswer ? `= ${q.answer}` : '（    ）'}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 选择题答案提示 */}
                  {q.type === 'choice' && showAnswer && (
                    <div style={{ paddingLeft: '20px', marginTop: '8px', color: '#27AE60', fontSize: '14px' }}>
                      ✓ 【答案】{q.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* 试卷尾 */}
          <div style={{ marginTop: '30px', paddingTop: '15px', borderTop: '2px solid #333', textAlign: 'center', color: '#999', fontSize: '13px' }}>
            <p>— {paper.provinceLabel}省{paper.city}市{paper.district}区 —</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 购买弹窗
function PayModal({ onClose, onSuccess }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [showQR, setShowQR] = useState(true)

  const verifyCode = () => {
    const c = code.trim().toUpperCase()
    if (c === '9900') {
      localStorage.setItem('paid_v1', 'true')
      onSuccess()
      onClose()
    } else {
      setError('验证码错误，请检查支付截图后重试')
      setCode('')
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'flex-end',
      zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: 'white',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        borderRadius: '20px 20px 0 0',
        padding: '24px',
        animation: 'slideUp 0.3s ease'
      }} onClick={e => e.stopPropagation()}>
        <style>{`@keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } } @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>解锁全部真题</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', color: '#999', cursor: 'pointer' }}>×</button>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          padding: '20px',
          color: 'white',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '700' }}>¥9.9</div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>永久解锁 · 全部真题 · 持续更新</div>
        </div>

        {/* 步骤切换 */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button
            onClick={() => setShowQR(true)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              background: showQR ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#f0f0f0',
              color: showQR ? 'white' : '#666'
            }}
          >
            💬 扫码支付
          </button>
          <button
            onClick={() => setShowQR(false)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              background: !showQR ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#f0f0f0',
              color: !showQR ? 'white' : '#666'
            }}
          >
            🔑 输入验证码
          </button>
        </div>

        {showQR ? (
          <>
            {/* 微信收款码 */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ background: '#f8f8f8', borderRadius: '12px', padding: '16px', display: 'inline-block' }}>
                <img
                  src="/wechat-pay.jpg"
                  alt="微信收款码"
                  style={{ width: '220px', height: 'auto', borderRadius: '8px' }}
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
                />
                <div style={{ display: 'none', textAlign: 'center', color: '#999', padding: '20px' }}>
                  <div style={{ fontSize: '40px', marginBottom: '8px' }}>💬</div>
                  <p style={{ fontSize: '14px' }}>请添加客服微信获取收款码</p>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#666', marginTop: '10px' }}>
                👆 长按识别上方收款码，支付 <strong style={{ color: '#E74C3C', fontSize: '18px' }}>¥9.9</strong>
              </p>
            </div>

            <div style={{
              background: '#FFF7E6',
              border: '1px solid #FFE4B5',
              borderRadius: '10px',
              padding: '12px',
              marginBottom: '16px',
              fontSize: '13px',
              color: '#8B6914',
              lineHeight: '1.6'
            }}>
              <strong>💡 开通流程：</strong><br/>
              ① 截图保存此页面<br/>
              ② 截图发给客服微信<br/>
              ③ 客服发送验证码<br/>
              ④ 返回此处输入验证码解锁
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '8px' }}>
                请输入客服发送的验证码
              </label>
              <input
                type="text"
                value={code}
                onChange={e => { setCode(e.target.value); setError('') }}
                placeholder="例如：9900"
                maxLength={8}
                style={{
                  width: '100%',
                  padding: '14px',
                  border: `2px solid ${error ? '#E74C3C' : '#ddd'}`,
                  borderRadius: '10px',
                  fontSize: '18px',
                  textAlign: 'center',
                  letterSpacing: '4px',
                  fontWeight: '600',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {error && (
                <p style={{ color: '#E74C3C', fontSize: '12px', marginTop: '6px' }}>{error}</p>
              )}
            </div>

            <button
              onClick={verifyCode}
              disabled={!code.trim()}
              style={{
                width: '100%',
                background: code.trim() ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#ccc',
                color: 'white',
                border: 'none',
                padding: '14px',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: code.trim() ? 'pointer' : 'not-allowed',
                marginBottom: '12px'
              }}
            >
              🔓 立即解锁
            </button>

            <p style={{ textAlign: 'center', fontSize: '12px', color: '#999' }}>
              还未支付？<button onClick={() => setShowQR(true)} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontSize: '12px' }}>去扫码支付 →</button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

// 首页
function Home({ onSearch }) {
  const [searchFilters, setSearchFilters] = useState({
    province: '',
    city: '',
    grade: '',
    subject: ''
  })

  const popularPapers = SAMPLE_PAPERS.slice(0, 3)

  const handleSubjectClick = (subject) => {
    setSearchFilters(prev => ({ ...prev, subject }))
    onSearch({ ...searchFilters, subject })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Hero 区域 */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '30px 24px 50px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 装饰 */}
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
        <div style={{ position: 'absolute', bottom: '-20px', left: '50%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', transform: 'translateX(-50%)' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '6px' }}>📚 真题库</h1>
          <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '20px' }}>各省市历年期末真题，复习备考必备</p>

          {/* 搜索框 */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '14px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '18px' }}>🔍</span>
            <input
              type="text"
              placeholder="搜索学校、地区或科目..."
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px', color: '#333' }}
              onFocus={() => onSearch({})}
            />
            <button
              onClick={() => onSearch(searchFilters)}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              搜索
            </button>
          </div>
        </div>
      </div>

      {/* 学科快捷入口 */}
      <div style={{ background: 'white', marginTop: '-30px', marginLeft: '16px', marginRight: '16px', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'relative', zIndex: 2 }}>
        <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>📖 按科目查找</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {SUBJECTS.map(sub => (
            <div
              key={sub.value}
              onClick={() => handleSubjectClick(sub.value)}
              style={{
                background: sub.bg,
                borderRadius: '12px',
                padding: '14px 10px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>{sub.icon}</div>
              <div style={{ fontSize: '13px', color: sub.color, fontWeight: '500' }}>{sub.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 热门试卷 */}
      <div style={{ padding: '20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#333', margin: 0 }}>🔥 热门真题</h2>
          <button onClick={() => onSearch({})} style={{ background: 'none', border: 'none', color: '#667eea', fontSize: '13px', cursor: 'pointer' }}>
            查看全部 →
          </button>
        </div>
        {popularPapers.map(paper => (
          <PaperCard key={paper.id} paper={paper} onClick={() => onSearch({ subject: paper.subject, grade: paper.grade })} />
        ))}
      </div>

      {/* 功能入口 */}
      <div style={{ padding: '0 16px 20px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '14px' }}>🎯 更多功能</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '12px',
            padding: '16px',
            color: 'white'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>🤖</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>AI出题</div>
            <div style={{ fontSize: '11px', opacity: 0.85 }}>智能生成练习题</div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '12px',
            padding: '16px',
            color: 'white'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>📝</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>错题本</div>
            <div style={{ fontSize: '11px', opacity: 0.85 }}>记录复习薄弱点</div>
          </div>
        </div>
      </div>

      {/* 底部提示 */}
      <div style={{ textAlign: 'center', padding: '10px', color: '#ccc', fontSize: '12px' }}>
        <p>真题持续收集中 · 联系我们：微信添加客服</p>
      </div>
    </div>
  )
}

// 搜索/筛选页
function SearchPage({ filters, onBack, onSelectPaper, onSearch, onShowPay, isPaid }) {
  // 筛选真题
  const filteredPapers = useMemo(() => {
    return SAMPLE_PAPERS.filter(paper => {
      if (filters.province && paper.province !== filters.province) return false
      if (filters.grade && paper.grade !== filters.grade) return false
      if (filters.subject && paper.subject !== filters.subject) return false
      return true
    })
  }, [filters])

  const currentProvince = PROVINCES.find(p => p.value === filters.province)

  const resultDesc = useMemo(() => {
    const parts = []
    if (filters.subject) {
      const sub = SUBJECTS.find(s => s.value === filters.subject)
      parts.push(sub?.label || filters.subject)
    }
    if (filters.grade) {
      const g = GRADES.find(g => g.value === filters.grade)
      parts.push(g?.label || filters.grade)
    }
    if (filters.province) {
      const p = PROVINCES.find(p => p.value === filters.province)
      parts.push(p?.label || filters.province)
    }
    return parts.length ? `关于"${parts.join(' · ')}"的真题` : '全部真题'
  }, [filters])

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Header title="查找真题" onBack={onBack} showBack={true} />

      {/* 筛选区 */}
      <div style={{ background: 'white', padding: '16px', borderBottom: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <select value={filters.province || ''} onChange={e => onSearch({ ...filters, province: e.target.value, city: '' })}
            style={{ flex: 1, minWidth: '100px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', background: 'white', color: filters.province ? '#333' : '#999', minHeight: '36px' }}>
            <option value="">🏠 全部省份</option>
            {PROVINCES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
          <select value={filters.city || ''} onChange={e => onSearch({ ...filters, city: e.target.value })} disabled={!currentProvince}
            style={{ flex: 1, minWidth: '100px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', background: 'white', color: filters.city ? '#333' : '#999', cursor: currentProvince ? 'pointer' : 'not-allowed', minHeight: '36px' }}>
            <option value="">🏙️ 全部城市</option>
            {currentProvince?.cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <select value={filters.grade || ''} onChange={e => onSearch({ ...filters, grade: e.target.value })}
            style={{ flex: 1, minWidth: '100px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', background: 'white', color: filters.grade ? '#333' : '#999', minHeight: '36px' }}>
            <option value="">📚 全部年级</option>
            {GRADES.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
          </select>
          <select value={filters.subject || ''} onChange={e => onSearch({ ...filters, subject: e.target.value })}
            style={{ flex: 1, minWidth: '100px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', background: 'white', color: filters.subject ? '#333' : '#999', minHeight: '36px' }}>
            <option value="">📖 全部科目</option>
            {SUBJECTS.map(s => <option key={s.value} value={s.value}>{s.icon} {s.label}</option>)}
          </select>
        </div>

        {Object.values(filters).some(v => v) && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {Object.entries(filters).map(([key, val]) => {
              if (!val) return null
              const labelMaps = { province: PROVINCES, grade: GRADES, subject: SUBJECTS }
              const label = labelMaps[key]?.find(l => l.value === val)?.label || val
              return (
                <span key={key} style={{ background: '#667eea', color: 'white', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {label}
                  <button onClick={() => onSearch({ ...filters, [key]: '' })} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0', fontSize: '14px', lineHeight: 1 }}>×</button>
                </span>
              )
            })}
            <button onClick={() => onSearch({})} style={{ background: 'none', border: 'none', color: '#999', fontSize: '12px', cursor: 'pointer' }}>清除全部</button>
          </div>
        )}
      </div>

      {/* 结果 */}
      <div style={{ padding: '16px' }}>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
          共找到 <span style={{ color: '#667eea', fontWeight: '600' }}>{filteredPapers.length}</span> 份{resultDesc}
        </div>

        {filteredPapers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
            <p style={{ fontSize: '14px' }}>暂无相关真题</p>
            <p style={{ fontSize: '12px', color: '#ccc' }}>试试调整筛选条件</p>
          </div>
        ) : (
          filteredPapers.map(paper => (
            <PaperCard key={paper.id} paper={paper} onClick={() => {
              const idx = filteredPapers.indexOf(paper)
              if (idx < 3 || isPaid) {
                onSelectPaper(paper)
              } else {
                onShowPay()
              }
            }} />
          ))
        )}

        {filteredPapers.length > 3 && (
          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', padding: '20px', textAlign: 'center', color: 'white', marginTop: '16px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔓</div>
            <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>查看完整真题库</div>
            <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '12px' }}>解锁全部{filteredPapers.length}+份历年真题</div>
            <button onClick={onShowPay} style={{ background: 'white', color: '#667eea', border: 'none', padding: '10px 24px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              立即解锁 ¥9.9
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// 主应用
export default function App() {
  const [view, setView] = useState('home') // home | search
  const [filters, setFilters] = useState({})
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [isPaid, setIsPaid] = useState(() => localStorage.getItem('paid_v1') === 'true')
  const [showPay, setShowPay] = useState(false)

  const handleSearch = (newFilters) => {
    setFilters(newFilters)
    setView('search')
  }

  const handlePaySuccess = () => {
    setIsPaid(true)
    setShowPay(false)
  }

  if (selectedPaper) {
    return <PaperDetail paper={selectedPaper} onBack={() => setSelectedPaper(null)} isPaid={isPaid} onShowPay={() => setShowPay(true)} />
  }

  if (view === 'search') {
    return (
      <>
        <SearchPage
          filters={filters}
          onBack={() => setView('home')}
          onSearch={handleSearch}
          onSelectPaper={(paper) => {
            const idx = SAMPLE_PAPERS.indexOf(paper)
            if (idx < 3 || isPaid) {
              setSelectedPaper(paper)
            }
          }}
          onShowPay={() => setShowPay(true)}
          isPaid={isPaid}
        />
        {showPay && <PayModal onClose={() => setShowPay(false)} onSuccess={handlePaySuccess} />}
      </>
    )
  }

  return <Home onSearch={handleSearch} />
}
