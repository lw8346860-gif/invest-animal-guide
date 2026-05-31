export type Dimension = 'valuePatience' | 'trendReaction' | 'narrativeImagination' | 'riskElasticity' | 'disciplineControl';

export type Question = {
  id: number;
  text: string;
  dimension: Dimension;
};

export const questions: Question[] = [
  { id: 1, text: '一只股票跌了很多，我的第一反应通常不是恐慌，而是想看看是不是跌过头了。', dimension: 'valuePatience' },
  { id: 2, text: '如果一家公司的长期逻辑没变，短期三个月不涨，我也不太容易动摇。', dimension: 'valuePatience' },
  { id: 3, text: '我买东西时会很在意估值，贵得太离谱的好公司也会让我犹豫。', dimension: 'valuePatience' },
  { id: 4, text: '我喜欢研究那些暂时没人看的公司或行业，觉得冷门里可能有机会。', dimension: 'valuePatience' },
  { id: 5, text: '我相信市场有时候会情绪化，真正的价值需要时间被看见。', dimension: 'valuePatience' },
  { id: 6, text: '我愿意为了一个自己认可的投资逻辑，忍受一段时间的孤独和跑输。', dimension: 'valuePatience' },
  { id: 7, text: '如果一个行业连续走强，我会觉得趋势本身就是重要信息。', dimension: 'trendReaction' },
  { id: 8, text: '我会关注市场最近最强的主线，而不是只看自己原来熟悉的东西。', dimension: 'trendReaction' },
  { id: 9, text: '一只股票涨得越顺，我越觉得它背后可能有我还没理解的信息。', dimension: 'trendReaction' },
  { id: 10, text: '如果价格走势明显变坏，即使估值便宜，我也会变得谨慎。', dimension: 'trendReaction' },
  { id: 11, text: '我不太喜欢和市场硬拧，很多时候顺势比证明自己正确更重要。', dimension: 'trendReaction' },
  { id: 12, text: '我会因为一个板块突然放量、突破或持续强势而想进一步研究它。', dimension: 'trendReaction' },
  { id: 13, text: '我容易被AI、半导体、机器人、创新药、能源革命这类大趋势吸引。', dimension: 'narrativeImagination' },
  { id: 14, text: '如果一个公司站在时代变化的方向上，我愿意给它更长的成长时间。', dimension: 'narrativeImagination' },
  { id: 15, text: '我会被"下一代平台""产业革命""生态重构"这类词打动。', dimension: 'narrativeImagination' },
  { id: 16, text: '即使短期利润不明显，只要空间足够大，我也愿意认真研究。', dimension: 'narrativeImagination' },
  { id: 17, text: '我不太满足于只买稳定资产，我希望组合里有一点面向未来的东西。', dimension: 'narrativeImagination' },
  { id: 18, text: '我相信有些投资机会，早期看起来都不便宜，但回头看可能是时代入口。', dimension: 'narrativeImagination' },
  { id: 19, text: '如果我真的看好一个机会，我可以接受账户短期较大波动。', dimension: 'riskElasticity' },
  { id: 20, text: '比起小幅稳定收益，我有时更想抓住一次真正有弹性的机会。', dimension: 'riskElasticity' },
  { id: 21, text: '我不害怕重仓，真正让我难受的是看对了却买太少。', dimension: 'riskElasticity' },
  { id: 22, text: '如果一个资产可能有很大空间，我可以忍受它先跌一段。', dimension: 'riskElasticity' },
  { id: 23, text: '我更喜欢赔率足够大的机会，哪怕过程会比较颠簸。', dimension: 'riskElasticity' },
  { id: 24, text: '我有时会被高波动资产吸引，因为它至少说明还有变化。', dimension: 'riskElasticity' },
  { id: 25, text: '我会认真考虑仓位，不太愿意让单一标的决定整个账户命运。', dimension: 'disciplineControl' },
  { id: 26, text: '我会关注股息率、现金流、回撤和安全边际，而不是只看上涨空间。', dimension: 'disciplineControl' },
  { id: 27, text: '如果一个机会风险收益不够清楚，我宁愿少赚一点，也不想乱上车。', dimension: 'disciplineControl' },
  { id: 28, text: '我对套利、折价、低风险收益、可转债、打新这类机会有天然兴趣。', dimension: 'disciplineControl' },
  { id: 29, text: '我觉得投资里最难的不是发现机会，而是控制自己不要乱动。', dimension: 'disciplineControl' },
  { id: 30, text: '我会定期复盘自己的持仓，而不是完全靠感觉操作。', dimension: 'disciplineControl' },
];
