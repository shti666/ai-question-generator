import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
const PORT = 3001

// 中间件
app.use(cors())
app.use(express.json())

// DeepSeek API 配置
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || ''
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions'

// 学科配置
const subjectConfig = {
  math: { name: '数学', teacher: '数学老师' },
  chinese: { name: '语文', teacher: '语文老师' },
  english: { name: '英语', teacher: '英语老师' },
  physics: { name: '物理', teacher: '物理老师' },
  chemistry: { name: '化学', teacher: '化学老师' },
  biology: { name: '生物', teacher: '生物老师' },
  history: { name: '历史', teacher: '历史老师' },
  geography: { name: '地理', teacher: '地理老师' },
  politics: { name: '政治', teacher: '政治老师' },
}

// 年级配置
const gradeConfig = {
  '1': '一年级', '2': '二年级', '3': '三年级',
  '4': '四年级', '5': '五年级', '6': '六年级',
  '7': '初一', '8': '初二', '9': '初三',
  '10': '高一', '11': '高二', '12': '高三',
}

// 生成题目的提示词模板
function buildPrompt(subject, grade, topic, difficulty, count) {
  const gradeText = gradeConfig[grade] || '三年级'
  const subjectData = subjectConfig[subject] || subjectConfig.math
  const subjectName = subjectData.name

  const difficultyText = {
    'easy': '简单',
    'medium': '中等',
    'hard': '困难'
  }[difficulty] || '中等'

  // 根据学科定制提示词
  const subjectPrompts = {
    math: `你是一位经验丰富的数学老师，擅长出高质量的数学题目。
请为${gradeText}学生生成 ${count} 道${difficultyText}难度的数学题，知识点是：「${topic}」
要求：
1. 题目要符合${gradeText}学生的认知水平和数学课程标准
2. 计算题要有实际应用场景，贴近生活
3. 难度要${difficultyText}，题目要有一定的思考性
4. 每题都要有标准答案和详细解题步骤
5. 如果题目涉及几何图形、坐标系、统计图表等，需要在image字段描述图片类型和参数`,

    chinese: `你是一位经验丰富的语文老师，擅长出高质量的语文题目。
请为${gradeText}学生生成 ${count} 道${difficultyText}难度的语文题，知识点是：「${topic}」
要求：
1. 题目要符合${gradeText}学生的语文水平和课程要求
2. 题目类型可以包括：字词填空、病句修改、古诗词默写、阅读理解等
3. 难度要${difficultyText}
4. 每题都要有标准答案和解析`,

    english: `你是一位经验丰富的英语老师，擅长出高质量的英语题目。
请为${gradeText}学生生成 ${count} 道${difficultyText}难度的英语题，知识点是：「${topic}」
要求：
1. 题目要符合${gradeText}学生的英语水平
2. 题目类型可以包括：单词拼写、语法填空、翻译、阅读理解等
3. 难度要${difficultyText}
4. 每题都要有标准答案和解析`,

    physics: `你是一位经验丰富的物理老师，擅长出高质量的物理题目。
请为${gradeText}学生生成 ${count} 道${difficultyText}难度的物理题，知识点是：「${topic}」
要求：
1. 题目要符合${gradeText}学生的物理知识水平
2. 题目类型可以包括：概念理解、计算题、实验分析等
3. 难度要${difficultyText}
4. 每题都要有标准答案和详细解析
5. 如果题目涉及电路图、力学图、光路图等，需要在image字段描述图片类型和参数`,

    chemistry: `你是一位经验丰富的化学老师，擅长出高质量的化学题目。
请为${gradeText}学生生成 ${count} 道${difficultyText}难度的化学题，知识点是：「${topic}」
要求：
1. 题目要符合${gradeText}学生的化学知识水平
2. 题目类型可以包括：方程式书写、实验操作、计算题等
3. 难度要${difficultyText}
4. 每题都要有标准答案和详细解析
5. 如果题目涉及分子结构、实验装置图等，需要在image字段描述图片类型`,

    biology: `你是一位经验丰富的生物老师，擅长出高质量的生物题目。
请为${gradeText}学生生成 ${count} 道${difficultyText}难度的生物题，知识点是：「${topic}」
要求：
1. 题目要符合${gradeText}学生的生物知识水平
2. 题目类型可以包括：概念理解、实验分析、图表分析等
3. 难度要${difficultyText}
4. 每题都要有标准答案和解析
5. 如果题目涉及细胞结构图、遗传图谱等，需要在image字段描述图片类型`,

    history: `你是一位经验丰富的历史老师，擅长出高质量的历史题目。
请为${gradeText}学生生成 ${count} 道${difficultyText}难度的历史题，知识点是：「${topic}」
要求：
1. 题目要符合${gradeText}学生的历史知识水平
2. 题目类型可以包括：选择题、填空题、材料分析题等
3. 难度要${difficultyText}
4. 每题都要有标准答案和解析
5. 如果题目涉及历史地图、时间轴等，需要在image字段描述`,

    geography: `你是一位经验丰富的地理老师，擅长出高质量的地理题目。
请为${gradeText}学生生成 ${count} 道${difficultyText}难度的地理题，知识点是：「${topic}」
要求：
1. 题目要符合${gradeText}学生的地理知识水平
2. 题目类型可以包括：概念理解、地图判读、计算题等
3. 难度要${difficultyText}
4. 每题都要有标准答案和解析
5. 如果题目涉及地图、气候图、地形剖面图等，需要在image字段描述`,

    politics: `你是一位经验丰富的政治老师，擅长出高质量的政治题目。
请为${gradeText}学生生成 ${count} 道${difficultyText}难度的政治题，知识点是：「${topic}」
要求：
1. 题目要符合${gradeText}学生的政治知识水平
2. 题目类型可以包括：概念理解、材料分析、时政热点等
3. 难度要${difficultyText}
4. 每题都要有标准答案和解析`,
  }

  const basePrompt = subjectPrompts[subject] || subjectPrompts.math

  return `${basePrompt}

请严格按照以下 JSON 格式输出，不要输出其他内容：
{
  "questions": [
    {
      "question": "题目内容",
      "answer": "答案",
      "explanation": "解析步骤",
      "image": {
        "type": "图片类型（如：rectangle/triangle/circle/cube/circuit/coordinate/chart等，如果没有图片则为null）",
        "params": {
          "width": 宽度数值,
          "height": 高度数值,
          "radius": 半径（圆形用）,
          "label": "标注文字",
          "labels": ["标注数组"],
          "values": [数值数组]
        }
      }
    }
  ]
}

支持的图片类型：
- rectangle: 长方形 (params: width, height, label)
- square: 正方形 (params: width, label)
- triangle: 三角形 (params: base, height, label)
- circle: 圆形 (params: radius, label)
- cube: 正方体/长方体 (params: width, height, depth)
- cylinder: 圆柱体 (params: radius, height)
- coordinate: 坐标系 (params: points, lines)
- circuit: 电路图 (params: components)
- chart: 统计图表 (params: type, labels, values)
- timeline: 时间轴 (params: events)
- map: 地图示意 (params: regions)
- null: 无图片

只输出 JSON，不要其他文字。`
}

// API 路由：生成题目
app.post('/api/generate', async (req, res) => {
  try {
    const { subject, grade, topic, difficulty, questionCount } = req.body

    // 参数验证
    if (!topic) {
      return res.status(400).json({ success: false, error: '请输入知识点' })
    }

    // 如果没有配置 API Key，返回模拟数据
    if (!DEEPSEEK_API_KEY) {
      console.log('⚠️ 未配置 DEEPSEEK_API_KEY，返回模拟数据')
      const mockQuestions = generateMockQuestions(subject, grade, topic, difficulty, questionCount)
      return res.json({ success: true, questions: mockQuestions })
    }

    // 调用 DeepSeek API
    const prompt = buildPrompt(subject, grade, topic, difficulty, questionCount)
    
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: `你是一位专业的${subjectConfig[subject]?.name || '数学'}出题老师。` },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('DeepSeek API Error:', data)
      return res.status(500).json({ success: false, error: 'AI 服务暂时不可用' })
    }

    // 解析 AI 返回的 JSON
    const content = data.choices[0].message.content
    let questions
    
    try {
      // 尝试提取 JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]).questions
      } else {
        throw new Error('无法解析 AI 返回的内容')
      }
    } catch (parseError) {
      console.error('Parse Error:', parseError)
      return res.status(500).json({ success: false, error: '生成失败，请重试' })
    }

    res.json({ success: true, questions })

  } catch (error) {
    console.error('Server Error:', error)
    res.status(500).json({ success: false, error: '服务器错误，请稍后重试' })
  }
})

// 模拟数据生成（无 API Key 时使用）
function generateMockQuestions(subject, grade, topic, difficulty, count) {
  const templates = {
    math: [
      { 
        question: `求下图长方形的周长和面积。`, 
        answer: '周长：40厘米，面积：96平方厘米', 
        explanation: '周长 = (12 + 8) × 2 = 40（厘米），面积 = 12 × 8 = 96（平方厘米）',
        image: { type: 'rectangle', params: { width: 12, height: 8, label: '单位：厘米' } }
      },
      { 
        question: `计算下面三角形的面积。`, 
        answer: '24平方厘米', 
        explanation: '三角形面积 = 底 × 高 ÷ 2 = 8 × 6 ÷ 2 = 24（平方厘米）',
        image: { type: 'triangle', params: { base: 8, height: 6, label: '单位：厘米' } }
      },
      { 
        question: `求圆的周长和面积（π取3.14）。`, 
        answer: '周长：31.4厘米，面积：78.5平方厘米', 
        explanation: '周长 = 2πr = 2 × 3.14 × 5 = 31.4（厘米），面积 = πr² = 3.14 × 5² = 78.5（平方厘米）',
        image: { type: 'circle', params: { radius: 5, label: 'r = 5cm' } }
      },
      { 
        question: `小明有 25 个苹果，吃了 8 个，又买了 12 个，现在有多少个苹果？`, 
        answer: '29 个', 
        explanation: '先算吃了之后剩下：25 - 8 = 17（个），再算买了之后：17 + 12 = 29（个）',
        image: null
      },
      { 
        question: `下面是某班同学最喜欢的运动项目统计图，请回答问题：
（1）最喜欢哪种运动的人最多？
（2）最喜欢足球的有多少人？`, 
        answer: '（1）篮球（2）12人', 
        explanation: '从统计图可以看出，篮球柱状最高，足球对应的人数是12人',
        image: { type: 'chart', params: { type: 'bar', labels: ['篮球', '足球', '乒乓球', '羽毛球'], values: [15, 12, 8, 10] } }
      },
      { 
        question: `求正方体的表面积和体积。`, 
        answer: '表面积：216平方厘米，体积：216立方厘米', 
        explanation: '表面积 = 6 × 6² = 216（平方厘米），体积 = 6³ = 216（立方厘米）',
        image: { type: 'cube', params: { width: 6, height: 6, depth: 6, label: '6cm' } }
      },
    ],
    chinese: [
      { question: `请写出"春风又绿江南岸"的下一句。`, answer: '明月何时照我还', explanation: '这是王安石《泊船瓜洲》中的名句，表达了作者的思乡之情。', image: null },
      { question: `改正下列句子中的错别字：我们要爱护公物，不乱涂乱画。`, answer: '无错别字', explanation: '这句话书写正确，没有错别字。', image: null },
      { question: `填空：_______，一览众山小。`, answer: '会当凌绝顶', explanation: '这是杜甫《望岳》中的名句，表达了诗人勇攀高峰的壮志。', image: null },
      { question: `解释词语"栩栩如生"的意思。`, answer: '形容艺术形象非常生动逼真，像活的一样。', explanation: '栩栩：生动活泼的样子。常用来形容画作、雕塑等艺术作品。', image: null },
      { question: `用"虽然……但是……"造句。`, answer: '虽然今天下雨，但是同学们都准时到校了。', explanation: '这是一个转折关系的复句，表示前后两个分句的意思相反或相对。', image: null },
    ],
    english: [
      { question: `Translate: 我每天早上七点起床。`, answer: 'I get up at seven every morning.', explanation: '注意：一般现在时表示经常性动作，主语是I，动词用原形。', image: null },
      { question: `Fill in the blank: She _____ (go) to school by bus every day.`, answer: 'goes', explanation: '主语She是第三人称单数，一般现在时动词要加-es。', image: null },
      { question: `Choose the correct word: There _____ many students in the classroom. (is/are)`, answer: 'are', explanation: 'students是复数名词，be动词用are。', image: null },
      { question: `Rewrite the sentence in past tense: I play basketball after school.`, answer: 'I played basketball after school.', explanation: '一般过去时，规则动词play加-ed变成played。', image: null },
      { question: `Translate: What time do you have breakfast?`, answer: '你几点吃早饭？', explanation: 'What time询问具体时间，have breakfast表示"吃早饭"。', image: null },
    ],
    physics: [
      { 
        question: `如图所示电路，电源电压为6V，R₁=10Ω，R₂=20Ω，求电路中的总电流。`, 
        answer: '0.9A', 
        explanation: '并联电路总电阻：1/R = 1/10 + 1/20 = 3/20，R = 20/3Ω，I = U/R = 6 ÷ (20/3) = 0.9A',
        image: { type: 'circuit', params: { components: ['battery', 'resistor1', 'resistor2', 'switch'] } }
      },
      { 
        question: `一辆汽车以 72 km/h 的速度行驶，它每秒行驶多少米？`, 
        answer: '20 米/秒', 
        explanation: '72 km/h = 72 × 1000 ÷ 3600 = 20 m/s',
        image: null
      },
      { 
        question: `一个物体的质量是 5kg，受到的重力是多少？（g=10N/kg）`, 
        answer: '50N', 
        explanation: 'G = mg = 5kg × 10N/kg = 50N',
        image: null
      },
      { 
        question: `在图中标出物体所受的重力方向。`, 
        answer: '竖直向下', 
        explanation: '重力的方向总是竖直向下的，作用在物体的重心上。',
        image: { type: 'force', params: { object: 'box', force: 'gravity', direction: 'down' } }
      },
    ],
    chemistry: [
      { question: `写出水的化学式。`, answer: 'H₂O', explanation: '水由氢元素和氧元素组成，一个水分子含有两个氢原子和一个氧原子。', image: null },
      { question: `完成化学方程式：2H₂ + O₂ = _____`, answer: '2H₂O', explanation: '氢气在氧气中燃烧生成水，注意配平。', image: null },
      { question: `人体中含量最多的元素是？`, answer: '氧元素（O）', explanation: '人体中氧元素约占65%，主要存在于水中。', image: null },
      { question: `下列物质中，属于混合物的是：A.蒸馏水 B.空气 C.氧气 D.二氧化碳`, answer: 'B. 空气', explanation: '空气是由氮气、氧气、二氧化碳等多种气体组成的混合物。', image: null },
      { question: `酸和碱反应生成什么？`, answer: '盐和水', explanation: '酸碱中和反应：酸 + 碱 → 盐 + 水', image: null },
    ],
    biology: [
      { 
        question: `根据下图细胞结构示意图，回答问题：
（1）写出图中序号所指结构的名称
（2）植物细胞特有的结构是什么？`, 
        answer: '（1）①细胞壁 ②细胞膜 ③细胞核 ④细胞质 ⑤液泡（2）细胞壁、液泡、叶绿体', 
        explanation: '植物细胞和动物细胞的主要区别在于植物细胞有细胞壁、液泡和叶绿体。',
        image: { type: 'cell', params: { parts: ['cell-wall', 'cell-membrane', 'nucleus', 'cytoplasm', 'vacuole'] } }
      },
      { 
        question: `植物进行光合作用需要哪些条件？`, 
        answer: '光照、二氧化碳、水、叶绿体', 
        explanation: '光合作用的条件是光照和叶绿体，原料是二氧化碳和水。',
        image: null
      },
      { question: `人体最大的器官是什么？`, answer: '皮肤', explanation: '皮肤是人体最大的器官，成年人的皮肤面积约1.5-2平方米。', image: null },
      { question: `细胞的基本结构包括哪些？`, answer: '细胞膜、细胞质、细胞核', explanation: '植物细胞还有细胞壁、液泡和叶绿体。', image: null },
    ],
    history: [
      { 
        question: `根据以下时间轴，回答问题：
（1）秦朝建立于哪一年？
（2）汉朝持续了多少年？`, 
        answer: '（1）公元前221年（2）约400年', 
        explanation: '秦朝建立于公元前221年，汉朝分为西汉和东汉，共约400年。',
        image: { type: 'timeline', params: { events: [{ year: '-221', event: '秦建立' }, { year: '-206', event: '秦灭亡' }, { year: '-202', event: '西汉建立' }, { year: '220', event: '东汉灭亡' }] } }
      },
      { question: `我国第一个统一的中央集权国家是哪个朝代？`, answer: '秦朝', explanation: '公元前221年，秦始皇统一六国，建立了我国历史上第一个统一的中央集权国家。', image: null },
      { question: `谁被誉为"杂交水稻之父"？`, answer: '袁隆平', explanation: '袁隆平院士培育出的杂交水稻，大大提高了水稻产量。', image: null },
      { question: `四大发明是指什么？`, answer: '造纸术、印刷术、火药、指南针', explanation: '这是中国古代对世界文明发展做出巨大贡献的四项发明。', image: null },
    ],
    geography: [
      { 
        question: `根据下图，判断A、B两地的地形类型。`, 
        answer: 'A地是山地，B地是平原', 
        explanation: '从等高线分布可以看出，A地等高线密集，海拔高，为山地；B地等高线稀疏，海拔低，为平原。',
        image: { type: 'topographic', params: { elevation: [200, 400, 600, 800] } }
      },
      { 
        question: `我国领土的最东端在哪里？`, 
        answer: '黑龙江与乌苏里江主航道中心线交汇处', 
        explanation: '这是我国领土的最东端，位于黑龙江省。',
        image: null
      },
      { question: `世界上最大的沙漠是什么？`, answer: '撒哈拉沙漠', explanation: '撒哈拉沙漠位于非洲北部，面积约906万平方千米。', image: null },
      { question: `我国最长的河流是什么？`, answer: '长江', explanation: '长江全长6300多千米，是我国第一长河，世界第三长河。', image: null },
    ],
    politics: [
      { question: `社会主义核心价值观中，国家层面的价值目标是什么？`, answer: '富强、民主、文明、和谐', explanation: '这是社会主义核心价值观在国家层面的目标要求。', image: null },
      { question: `我国根本政治制度是什么？`, answer: '人民代表大会制度', explanation: '人民代表大会制度是我国的根本政治制度。', image: null },
      { question: `公民最基本的政治权利是什么？`, answer: '选举权和被选举权', explanation: '选举权和被选举权是公民参与管理国家和管理社会的基础和标志。', image: null },
      { question: `党的基本路线的核心内容是什么？`, answer: '一个中心，两个基本点', explanation: '以经济建设为中心，坚持四项基本原则，坚持改革开放。', image: null },
    ],
  }

  const subjectTemplates = templates[subject] || templates.math
  
  // 根据请求数量返回对应数量的题目
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(subjectTemplates[i % subjectTemplates.length])
  }
  
  return result
}

// 启动服务器
app.listen(PORT, () => {
  console.log(`\n🚀 服务器已启动: http://localhost:${PORT}`)
  console.log(`📝 API 端点: POST http://localhost:${PORT}/api/generate`)
  console.log(`\n📚 支持学科：数学、语文、英语、物理、化学、生物、历史、地理、政治`)
  console.log(`🎨 支持图片类型：长方形、三角形、圆形、正方体、圆柱体、电路图、统计图、时间轴等`)
  if (!DEEPSEEK_API_KEY) {
    console.log(`\n⚠️  未配置 DEEPSEEK_API_KEY 环境变量`)
    console.log(`   当前使用模拟数据演示功能`)
    console.log(`\n   配置方法：`)
    console.log(`   export DEEPSEEK_API_KEY=你的key`)
    console.log(`   然后重启服务器\n`)
  }
})
