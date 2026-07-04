// 移除静态课程数据，改由后端 API 动态获取


export const agents = [
  { slug: 'ecommerce-copilot', industry: '电商运营', name: '增长文案官', description: '生成商品卖点、活动主题与分渠道投放文案。', capability: '商品分析 → 人群洞察 → 多渠道文案', sample: '分析春季通勤包的核心人群，并输出小红书推广文案。', result: '已识别“轻通勤、容量焦虑、穿搭适配”三个购买动机，并生成 3 组差异化标题与正文框架。' },
  { slug: 'lesson-planner', industry: '教育培训', name: '课程设计师', description: '根据教学目标生成课程结构、练习与评估方案。', capability: '目标拆解 → 教学活动 → 学习评估', sample: '为零基础用户设计一节 90 分钟的提示词课程。', result: '课程已拆分为概念、示范、练习和复盘四段，并附带 3 个课堂任务与评分标准。' },
  { slug: 'content-studio', industry: '内容创作', name: '内容策划台', description: '把一个主题扩展为稳定、连续的内容栏目。', capability: '选题研究 → 内容结构 → 发布计划', sample: '围绕 AI 独立开发制定 14 天内容计划。', result: '已形成 4 个内容支柱、14 个选题与对应的开场钩子，覆盖认知、实战、复盘和转化。' },
  { slug: 'contract-reviewer', industry: '法律合同', name: '合同风险助手', description: '识别合同中的责任、期限和权利不对等条款。', capability: '条款识别 → 风险分级 → 修改建议', sample: '检查一份软件外包合同的交付与验收条款。', result: '已标记验收标准模糊、需求变更责任缺失和付款节点不匹配三类风险，并给出修改方向。' },
  { slug: 'interview-coach', industry: '招聘面试', name: '面试教练', description: '基于岗位要求生成结构化面试题与追问。', capability: '岗位分析 → 题目设计 → 评价量表', sample: '为高级前端工程师设计一轮技术面试。', result: '已生成架构、性能、工程化与协作四个维度的问题，并为每题配置追问和评分锚点。' },
  { slug: 'data-analyst', industry: '数据分析', name: '经营分析师', description: '将业务数据转化为结论、风险和行动建议。', capability: '指标诊断 → 归因假设 → 行动建议', sample: '解释本月付费转化率下降的可能原因。', result: '已按流量质量、定价阻力、结账流失和渠道结构建立诊断树，并给出优先验证顺序。' },
  { slug: 'support-desk', industry: '客户服务', name: '客户成功台', description: '总结问题、生成回复并识别升级处理信号。', capability: '意图识别 → 回复生成 → 风险升级', sample: '处理用户反馈“会员权益没有生效”。', result: '已生成核验步骤、安抚回复和升级条件，并建议先检查订单状态与账号绑定关系。' },
  { slug: 'product-researcher', industry: '产品研究', name: '产品研究员', description: '梳理用户问题、竞品结构与机会假设。', capability: '问题定义 → 证据整理 → 机会判断', sample: '研究 AI 课程用户购买前最关注的问题。', result: '已归纳结果可信度、学习门槛、持续更新和答疑支持四类核心顾虑，并生成访谈提纲。' },
]

export const plans = [
  { id: 'monthly', title: '月度会员', price: 49, period: '/月', description: '短期项目与集中体验', features: ['全部智能体使用权', '每月 300 次运行', '课程 95 折', '社区答疑'] },
  { id: 'yearly', title: '年度会员', price: 399, period: '/年', description: '持续学习与长期创作', featured: true, features: ['全部智能体使用权', '每月 1000 次运行', '课程 85 折', '新智能体优先体验', '会员专属工作流'] },
  { id: 'lifetime', title: '永久会员', price: 1299, period: '/永久', description: '一次开通，持续更新', features: ['永久智能体使用权', '每月 3000 次运行', '课程 8 折', '终身功能更新', '1 对 1 上手指导'] },
]

export const faqs = [
  ['会员可以使用哪些智能体？', '会员可使用当前上线的全部行业智能体，以及会员有效期内新增的智能体。'],
  ['课程购买后有效期多久？', '课程为一次购买、长期学习，后续课程内容更新无需再次付费。'],
  ['支付宝支付是真实支付吗？', '当前项目仅开发前端页面，支付流程为界面模拟，不会产生真实扣款。'],
  ['会员和课程有什么区别？', '课程提供系统化学习内容；会员提供行业智能体使用权、课程折扣和持续更新权益。'],
  ['可以在手机上使用吗？', '全部页面支持响应式布局，手机、平板和桌面浏览器均可使用。'],
]

export const testimonials = [
  { name: '林然', role: '独立开发者', quote: '课程最大的价值是把“会调用模型”推进到“能交付产品”，每个环节都有明确产出。' },
  { name: '周屿', role: '产品经理', quote: '智能体模板不是演示玩具，任务结构和输出格式都很接近真实工作。' },
  { name: '陈思', role: '前端工程师', quote: '两周完成了第一个可售卖的 AI 工具，也真正理解了模型能力边界。' },
]

export const metrics = [
  ['08', '实战项目'],
  ['78', '核心课时'],
  ['08', '行业智能体'],
  ['持续', '内容更新'],
]
