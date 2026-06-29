// 塔罗牌数据 - 78张（含唯一 id 与图片路径）

const BASE = import.meta.env.BASE_URL;

const majorImages = [
  "tarot-0-fool.jpg",
  "tarot-1-magician.jpg",
  "tarot-2-high-priestess.jpg",
  "tarot-3-the-empress.jpg",
  "tarot-4-the-emperor.jpg",
  "tarot-5-the-hierophant.jpg",
  "tarot-6-the-lovers.jpg",
  "tarot-7-the-chariot.jpg",
  "tarot-8-strength.jpg",
  "tarot-9-hermit.jpg",
  "tarot-10-wheel-of-fortune.jpg",
  "tarot-11-justice.jpg",
  "tarot-12-the-hanged-man.jpg",
  "tarot-13-death.jpg",
  "tarot-14-temperance.jpg",
  "tarot-15-the-devil.jpg",
  "tarot-16-the-tower.jpg",
  "tarot-17-the-star.jpg",
  "tarot-18-the-moon.jpg",
  "tarot-19-the-sun.jpg",
  "tarot-20-judgement.jpg",
  "tarot-21-the-world.jpg",
];

const suitFolders = { Wands: "wands", Cups: "cups", Swords: "swords", Pentacles: "pents" };

/**
 * 根据 id 和花色从预加载的图片映射中查找 URL
 */
function cardImage(id, suit = "Major") {
  let filename;
  if (suit === "Major") {
    filename = majorImages[id];
  } else {
    const baseId = { Wands: 22, Cups: 36, Swords: 50, Pentacles: 64 }[suit];
    const num = String(id - baseId + 1).padStart(2, "0");
    filename = `${suitFolders[suit]}${num}.jpg`;
  }
  return `${BASE}cards/${filename}`;
}

export const MAJOR_ARCANA = [
  { id: 0, name: "愚者", image: cardImage(0), upright: "新的开始、冒险、自由、纯真、自发性。你正站在人生新旅程的起点，前方充满无限可能。带着勇气和信任迈出第一步吧。", reversed: "鲁莽、冒失、不负责任、缺乏方向。你可能在没有充分考虑后果的情况下行动，需要更加谨慎。" },
  { id: 1, name: "魔术师", image: cardImage(1), upright: "创造力、技能、意志力、自信、天赋。你拥有实现目标所需的所有工具和能力，只需要运用你的才华和意志力。", reversed: "欺骗、操纵、才能浪费、自我怀疑。你的能力可能被误用或浪费，需要诚实地面对自己。" },
  { id: 2, name: "女祭司", image: cardImage(2), upright: "直觉、神秘、内在智慧、潜意识、神圣女性。倾听你内心的声音，相信直觉的指引，隐藏的真相即将揭示。", reversed: "秘密、压抑直觉、表面知识、与内心声音脱节。你可能忽视了直觉的警告，或是在隐瞒某些真相。" },
  { id: 3, name: "女皇", image: cardImage(3), upright: "丰饶、母性、自然、感官享受、创造力。这是一个滋养和成长的时期，你的创造力和生产力都很强。", reversed: "依赖、创造力阻塞、忽视自我照顾、过度保护。你可能过度关注他人而忽视了自己的需求。" },
  { id: 4, name: "皇帝", image: cardImage(4), upright: "权威、结构、控制、父性、理性。你正处于领导位置，需要运用纪律和理性来建立秩序和稳定。", reversed: "暴政、僵化、缺乏纪律、滥用权力。你可能过于控制或相反地缺乏必要的纪律。" },
  { id: 5, name: "教皇", image: cardImage(5), upright: "传统、信仰、精神指导、从众、教育。寻求传统智慧和指导，跟随既定的道路和信仰体系。", reversed: "反叛、非正统、教条、精神困惑。你可能质疑传统或需要寻找自己的精神道路。" },
  { id: 6, name: "恋人", image: cardImage(6), upright: "爱情、和谐、关系、价值观、选择。重要的关系或选择出现，跟随你心之所向，做出符合你价值观的决定。", reversed: "不和谐、失衡、错误选择、诱惑。关系中可能出现冲突或需要做出艰难的选择。" },
  { id: 7, name: "战车", image: cardImage(7), upright: "决心、意志力、胜利、自律、控制。你拥有克服障碍的力量和决心，坚持前进就能取得胜利。", reversed: "失控、攻击性、缺乏方向、自我破坏。你可能被内心的矛盾所困扰，需要重新获得控制。" },
  { id: 8, name: "力量", image: cardImage(8), upright: "勇气、耐心、控制、同情、内在力量。真正的力量来自内在的勇气和同情心，而非暴力或强制。", reversed: "自我怀疑、软弱、缺乏自我控制、滥用力量。你可能感到无力或对自己的能力缺乏信心。" },
  { id: 9, name: "隐士", image: cardImage(9), upright: "内省、独处、指引、智慧、寻找。这是一个独处和反思的时期，寻求内在的智慧和指引。", reversed: "孤立、孤独、退缩、被拒绝。你可能过度孤立自己，或害怕面对他人。" },
  { id: 10, name: "命运之轮", image: cardImage(10), upright: "命运、转折点、机遇、循环、必然的变化。生命的循环正在转动，接受变化并抓住机遇。", reversed: "坏运气、抗拒改变、缺乏控制、厄运。你可能感到被命运捉弄，但记住循环总会好转。" },
  { id: 11, name: "正义", image: cardImage(11), upright: "公平、真相、法律、因果、诚实。公正和平衡将被恢复，你的行为将带来相应的后果。", reversed: "不公、不诚实、缺乏责任感、失衡。你可能面临不公正的处境或需要为自己的行为负责。" },
  { id: 12, name: "倒吊人", image: cardImage(12), upright: "牺牲、放下、新视角、暂停、顺其自然。从不同的角度看问题，暂停和放下带来新的领悟。", reversed: "拖延、抗拒、停滞、不愿牺牲。你可能抗拒必要的牺牲或拖延做出决定。" },
  { id: 13, name: "死神", image: cardImage(13), upright: "结束、转变、过渡、改变、重生。一个阶段的结束是另一个阶段的开始，接受必要的转变。", reversed: "抗拒改变、无法前行、停滞、恐惧结束。你可能抗拒必要的结束，但改变是不可避免的。" },
  { id: 14, name: "节制", image: cardImage(14), upright: "平衡、适度、耐心、目的、意义。找到生活的平衡点，温和地融合不同的元素。", reversed: "不平衡、过度、缺乏耐心、不和谐。你可能过于极端或缺乏耐心，需要恢复平衡。" },
  { id: 15, name: "恶魔", image: cardImage(15), upright: "束缚、物质主义、成瘾、阴影自我、执着。你可能被某些事物或模式所束缚，需要认识到自己的阴暗面。", reversed: "释放、挣脱、重新获得力量、觉醒。摆脱束缚和限制，重新获得自由和力量。" },
  { id: 16, name: "塔", image: cardImage(16), upright: "突变、剧变、混乱、揭示、觉醒。突如其来的变化可能带来破坏，但也揭示隐藏的真相。", reversed: "避免灾难、延迟改变、恐惧变化、规避危机。你可能试图避免不可避免的变化。" },
  { id: 17, name: "星星", image: cardImage(17), upright: "希望、信念、更新、灵性、灵感。黑暗过后是光明，保持希望和信念，灵感将会降临。", reversed: "绝望、缺乏信念、气馁、脱节。你可能感到失去希望，但记住星星总是在那里。" },
  { id: 18, name: "月亮", image: cardImage(18), upright: "幻觉、恐惧、焦虑、潜意识、直觉。事物可能不像表面看起来那样，相信你的直觉而非表象。", reversed: "释放恐惧、真相大白、清晰、理解。迷雾散去，真相即将大白，恐惧将被理解所取代。" },
  { id: 19, name: "太阳", image: cardImage(19), upright: "快乐、成功、庆祝、积极、活力。阳光普照，这是快乐和成功的时期，享受生命的美好。", reversed: "抑郁、缺乏成功、悲观、暂时的挫折。暂时的阴霾遮挡了阳光，但太阳总会再次闪耀。" },
  { id: 20, name: "审判", image: cardImage(20), upright: "重生、内在召唤、宽恕、觉醒、更新。这是一个觉醒和重生的时刻，回应内心的召唤。", reversed: "自我怀疑、拒绝自爱、忽视召唤。你可能对自己过于苛刻，或忽视了内心的召唤。" },
  { id: 21, name: "世界", image: cardImage(21), upright: "完成、整合、成就、旅行、统一。一个重要周期圆满完成，庆祝你的成就，准备迎接新的开始。", reversed: "未完成、缺乏结束感、延迟、不完整。你可能接近完成但还差最后一步，或需要找到结束的感觉。" },
];

export const WANDS = [
  { id: 22, name: "权杖王牌", image: cardImage(22, "Wands"), upright: "新灵感、创造力、新项目、激情。新的创意和机会正在萌芽，抓住这个充满潜力的开始。", reversed: "延迟、缺乏灵感、创意阻塞。新想法可能被推迟或需要更多培育。" },
  { id: 23, name: "权杖二", image: cardImage(23, "Wands"), upright: "计划、决策、离开舒适区、进展。你站在十字路口，需要做出勇敢的决定来推进计划。", reversed: "恐惧改变、安于现状、计划不周。你可能因为害怕而犹豫不决。" },
  { id: 24, name: "权杖三", image: cardImage(24, "Wands"), upright: "扩展、远见、企业、贸易。你的计划开始扩展，展望未来，机会在远方等待。", reversed: "延迟、挫折、缺乏远见。计划可能遇到阻碍或需要重新评估。" },
  { id: 25, name: "权杖四", image: cardImage(25, "Wands"), upright: "庆祝、和谐、放松、归家。这是庆祝和享受成果的时刻，家庭和社区的和谐。", reversed: "冲突、缺乏和谐、不稳定。庆祝可能被推迟或家庭中出现不和谐。" },
  { id: 26, name: "权杖五", image: cardImage(26, "Wands"), upright: "冲突、竞争、分歧、紧张。竞争和冲突出现，需要找到自己的立场。", reversed: "避免冲突、妥协、结束冲突。你可能选择避免对抗或寻求和解。" },
  { id: 27, name: "权杖六", image: cardImage(27, "Wands"), upright: "胜利、成功、公众认可、进展。你取得了值得庆祝的成功，获得公众的认可。", reversed: "失败、缺乏认可、胜利推迟。成功可能被推迟或认可尚未到来。" },
  { id: 28, name: "权杖七", image: cardImage(28, "Wands"), upright: "挑战、竞争、保护、坚持。你需要坚持自己的立场，面对挑战不退缩。", reversed: "放弃、不堪重负、认输。你可能感到不堪重负或考虑放弃。" },
  { id: 29, name: "权杖八", image: cardImage(29, "Wands"), upright: "快速行动、进展、运动、速度。事情快速进展，抓住时机迅速行动。", reversed: "延迟、挫折、抗拒改变。行动可能被推迟或遇到阻力。" },
  { id: 30, name: "权杖九", image: cardImage(30, "Wands"), upright: "韧性、坚持、信仰考验、坚韧。坚持就是胜利，即使困难重重也要继续前进。", reversed: "挣扎、不堪重负、防御。你可能感到精疲力竭或过于防御。" },
  { id: 31, name: "权杖十", image: cardImage(31, "Wands"), upright: "负担、责任、辛苦工作、完成。你承担了太多责任，需要学会放下一些负担。", reversed: "释放负担、授权、放下。是时候放下不必要的负担了。" },
  { id: 32, name: "权杖侍者", image: cardImage(32, "Wands"), upright: "新消息、灵感、发现、热情。新的消息或灵感带来兴奋和探索的欲望。", reversed: "消息延迟、缺乏方向、分心。消息可能被推迟或你缺乏方向。" },
  { id: 33, name: "权杖骑士", image: cardImage(33, "Wands"), upright: "冒险、冲动、激情、探索。充满激情和冲动的行动，追求冒险和新体验。", reversed: "冲动、散漫、缺乏方向。你可能过于冲动或缺乏专注。" },
  { id: 34, name: "权杖王后", image: cardImage(34, "Wands"), upright: "勇气、自信、独立、决心。你拥有内在的力量和决心，能够独立面对挑战。", reversed: "嫉妒、不安全感、缺乏自信。你可能感到嫉妒或缺乏自信。" },
  { id: 35, name: "权杖国王", image: cardImage(35, "Wands"), upright: "领导、远见、企业家、荣誉。你处于领导位置，能够以远见和正直引导他人。", reversed: "冲动、无情、缺乏领导风范。你可能过于冲动或缺乏领导风范。" },
];

export const CUPS = [
  { id: 36, name: "圣杯王牌", image: cardImage(36, "Cups"), upright: "新爱情、同情、创造力、灵性。新的情感开始，心灵被爱和美所充满。", reversed: "情感阻塞、空虚、创意受阻。情感可能被压抑或创造力受阻。" },
  { id: 37, name: "圣杯二", image: cardImage(37, "Cups"), upright: "爱情、伙伴关系、相互吸引。深厚的感情和相互吸引，建立重要的关系。", reversed: "关系破裂、不信任、失衡。关系中可能出现不信任或不平衡。" },
  { id: 38, name: "圣杯三", image: cardImage(38, "Cups"), upright: "庆祝、友谊、社区、喜悦。与朋友和社区分享快乐，庆祝友谊和团结。", reversed: "孤立、孤独、过度社交。你可能过度社交或感到孤立。" },
  { id: 39, name: "圣杯四", image: cardImage(39, "Cups"), upright: "冥想、沉思、冷漠、重新评估。你可能对事物变得冷漠，需要重新评估自己的情感。", reversed: "退缩、内省、重新参与。你可能开始重新参与生活。" },
  { id: 40, name: "圣杯五", image: cardImage(40, "Cups"), upright: "失望、遗憾、悲伤、失落。你可能经历失落和悲伤，但记住雨后总有彩虹。", reversed: "接受、继续前行、找到平静。你开始接受现实并继续前进。" },
  { id: 41, name: "圣杯六", image: cardImage(41, "Cups"), upright: "怀旧、童年记忆、纯真、喜悦。回忆过去的美好时光，寻找内心的纯真。", reversed: "活在过去、缺乏玩乐。你可能过于沉浸在过去或缺乏玩乐。" },
  { id: 42, name: "圣杯七", image: cardImage(42, "Cups"), upright: "选择、幻想、妄想、一厢情愿。面对众多选择，需要区分幻想和现实。", reversed: "结盟、个人价值观、被选择淹没。你可能澄清了自己的价值观或感到选择过多。" },
  { id: 43, name: "圣杯八", image: cardImage(43, "Cups"), upright: "放弃、退缩、寻找更深的意义。你决定离开寻找更深层次的意义。", reversed: "漂泊、试图抓住、犹豫不决。你可能犹豫不决或试图抓住不该抓住的东西。" },
  { id: 44, name: "圣杯九", image: cardImage(44, "Cups"), upright: "满足、感恩、愿望实现、知足。你的愿望得以实现，感到满足和感恩。", reversed: "不满、物质主义、缺乏内在幸福。你可能感到不满足或追求错误的东西。" },
  { id: 45, name: "圣杯十", image: cardImage(45, "Cups"), upright: "幸福、圆满、和谐、一致。情感和家庭生活的圆满，找到真正的幸福。", reversed: "不和谐、不一致、挣扎。家庭或情感生活中可能出现不和谐。" },
  { id: 46, name: "圣杯侍者", image: cardImage(46, "Cups"), upright: "新消息、创意机会、直觉。新的情感消息或创意机会出现。", reversed: "新想法被忽视、情感不成熟。你可能忽视了新的想法或情感不成熟。" },
  { id: 47, name: "圣杯骑士", image: cardImage(47, "Cups"), upright: "浪漫、魅力、想象力、创造力。充满浪漫和创意的提议，跟随内心的声音。", reversed: "不切实际、嫉妒、情绪化。你可能过于情绪化或不切实际。" },
  { id: 48, name: "圣杯王后", image: cardImage(48, "Cups"), upright: "同情、平静、安慰、情感安全。你拥有丰富的情感和同情心，能够安慰他人。", reversed: "内在感受、自我照顾、自爱。你可能需要更多地关注自己的情感需求。" },
  { id: 49, name: "圣杯国王", image: cardImage(49, "Cups"), upright: "情感平衡、同情、外交。你在情感上成熟平衡，能够明智地处理情况。", reversed: "自我同情、内在感受、情绪化。你可能需要更多地自我同情或情绪不稳定。" },
];

export const SWORDS = [
  { id: 50, name: "宝剑王牌", image: cardImage(50, "Swords"), upright: "新想法、清晰、突破、头脑清晰。新的想法和思维突破，清晰和真理的时刻。", reversed: "内在清晰、重新思考、判断不清。你可能需要重新思考或判断不清。" },
  { id: 51, name: "宝剑二", image: cardImage(51, "Swords"), upright: "艰难选择、权衡选项、僵局。面对艰难的选择，需要权衡利弊。", reversed: "困惑、信息过载、优柔寡断。你可能感到困惑或信息过载。" },
  { id: 52, name: "宝剑三", image: cardImage(52, "Swords"), upright: "心碎、悲伤、悲痛、伤害、失落。经历情感上的痛苦和心碎，但治愈是可能的。", reversed: "释放痛苦、宽恕、继续前行。你开始释放痛苦并继续前进。" },
  { id: 53, name: "宝剑四", image: cardImage(53, "Swords"), upright: "休息、放松、冥想、沉思。需要休息和恢复，暂停行动来充电。", reversed: "不安、倦怠、缺乏进展。你可能感到不安或精疲力竭。" },
  { id: 54, name: "宝剑五", image: cardImage(54, "Swords"), upright: "冲突、分歧、竞争、失败。冲突和竞争可能导致不愉快的结局。", reversed: "和解、弥补、放下过去的怨恨。你可能寻求和解或放下过去的怨恨。" },
  { id: 55, name: "宝剑六", image: cardImage(55, "Swords"), upright: "过渡、改变、仪式、前行。过渡时期，离开困难走向更好的环境。", reversed: "个人转变、抗拒、未完成的事情。你可能抗拒改变或有未完成的事情。" },
  { id: 56, name: "宝剑七", image: cardImage(56, "Swords"), upright: "背叛、欺骗、侥幸逃脱。可能存在欺骗或背叛，需要保持警惕。", reversed: "冒名顶替综合征、自欺、保密。你可能对自己不诚实或保守太多秘密。" },
  { id: 57, name: "宝剑八", image: cardImage(57, "Swords"), upright: "消极思维、自我接纳、囚禁。你可能被自己的思维模式所束缚。", reversed: "自我接纳、新视角、自由。你开始接受自己并获得自由。" },
  { id: 58, name: "宝剑九", image: cardImage(58, "Swords"), upright: "焦虑、担忧、恐惧、抑郁。焦虑和恐惧可能困扰你，但记住这只是暂时的。", reversed: "内心动荡、根深蒂固的恐惧、秘密。你可能需要面对内心深处的恐惧。" },
  { id: 59, name: "宝剑十", image: cardImage(59, "Swords"), upright: "痛苦的结局、背叛、失落、危机。痛苦的低谷，但黎明即将到来。", reversed: "恢复、重生、抗拒不可避免的结束。你可能开始恢复或抗拒不可避免的结束。" },
  { id: 60, name: "宝剑侍者", image: cardImage(60, "Swords"), upright: "新想法、好奇心、求知欲。新的想法和知识渴望，好奇心驱动探索。", reversed: "空谈、散漫、不专注。你可能过于分散或缺乏专注。" },
  { id: 61, name: "宝剑骑士", image: cardImage(61, "Swords"), upright: "野心、行动、驱动、快节奏。充满野心和行动力，快速追求目标。", reversed: "不专注、冲动、倦怠。你可能过于冲动或缺乏专注。" },
  { id: 62, name: "宝剑王后", image: cardImage(62, "Swords"), upright: "独立、公正、清晰的界限。你拥有清晰的思维和独立的判断力。", reversed: "过于情绪化、易受影响、刻薄。你可能过于情绪化或容易受影响。" },
  { id: 63, name: "宝剑国王", image: cardImage(63, "Swords"), upright: "头脑清晰、智力、权威。你拥有清晰的思维和权威，能够理性地领导。", reversed: "内在真相、滥用权力、操纵。你可能滥用权力或操纵他人。" },
];

export const PENTACLES = [
  { id: 64, name: "星币王牌", image: cardImage(64, "Pentacles"), upright: "新机会、显化、财务机会。新的财务或物质机会出现，抓住这个开始。", reversed: "错失机会、缺乏规划、缺乏远见。你可能错过了机会或缺乏规划。" },
  { id: 65, name: "星币二", image: cardImage(65, "Pentacles"), upright: "多重优先、时间管理、适应性。需要平衡多个优先事项，灵活应对变化。", reversed: "过度承诺、混乱、重新安排优先级。你可能过度承诺或需要重新安排优先级。" },
  { id: 66, name: "星币三", image: cardImage(66, "Pentacles"), upright: "团队合作、协作、学习、实施。团队合作和技能学习，开始实施计划。", reversed: "不和谐、不一致、独自工作。你可能感到不和谐或需要独自工作。" },
  { id: 67, name: "星币四", image: cardImage(67, "Pentacles"), upright: "储蓄、安全、保守、控制。注重储蓄和安全，控制资源。", reversed: "过度消费、贪婪、自我保护。你可能过于贪婪或需要放松保护。" },
  { id: 68, name: "星币五", image: cardImage(68, "Pentacles"), upright: "财务损失、贫困、匮乏心态、孤立。可能面临财务困难或感到匮乏。", reversed: "从财务损失中恢复、精神贫困。你可能开始恢复或需要关注精神财富。" },
  { id: 69, name: "星币六", image: cardImage(69, "Pentacles"), upright: "给予、接受、慷慨、慈善。慷慨给予和接受，分享你的财富和资源。", reversed: "自我照顾、未偿还的债务、单方面的慈善。你可能需要关注自己的需求或债务问题。" },
  { id: 70, name: "星币七", image: cardImage(70, "Pentacles"), upright: "长期视角、可持续成果、坚持。长期视角和持续努力，等待成果。", reversed: "缺乏长期视野、有限的成功、不耐烦。你可能缺乏耐心或视野。" },
  { id: 71, name: "星币八", image: cardImage(71, "Pentacles"), upright: "学徒、重复任务、精通、技能发展。专注于技能发展和精通，重复练习带来精通。", reversed: "自我发展、完美主义、方向错误。你可能追求完美或方向错误。" },
  { id: 72, name: "星币九", image: cardImage(72, "Pentacles"), upright: "丰裕、奢侈、自给自足、财务独立。享受丰裕和自给自足，财务独立。", reversed: "自我价值、过度工作。你可能过度工作或需要关注自我价值。" },
  { id: 73, name: "星币十", image: cardImage(73, "Pentacles"), upright: "财富、财务安全、家庭、长期成功。财务安全和家庭幸福，长期成功的果实。", reversed: "财富的阴暗面、财务失败或损失。你可能面临财务损失或家庭问题。" },
  { id: 74, name: "星币侍者", image: cardImage(74, "Pentacles"), upright: "显化、财务机会、技能发展。新的财务机会或技能发展出现。", reversed: "错失机会、缺乏进展、拖延。你可能拖延或错过机会。" },
  { id: 75, name: "星币骑士", image: cardImage(75, "Pentacles"), upright: "努力工作、生产力、常规、可靠。勤奋工作和可靠，坚持日常。", reversed: "缺乏自律、无聊、感到困住。你可能感到无聊或陷入困境。" },
  { id: 76, name: "星币王后", image: cardImage(76, "Pentacles"), upright: "滋养、实际、提供、财务安全。你拥有滋养和实际的能力，能够提供财务安全。", reversed: "财务独立、自我照顾、工作与家庭平衡。你可能需要关注工作与生活的平衡。" },
  { id: 77, name: "星币国王", image: cardImage(77, "Pentacles"), upright: "财富、商业、领导、安全。你拥有商业头脑和领导能力，能够创造财富和安全。", reversed: "财务能力不足、痴迷财富、固执。你可能过于固执或财务能力不足。" },
];

export const ALL_CARDS = [...MAJOR_ARCANA, ...WANDS, ...CUPS, ...SWORDS, ...PENTACLES];

// ──────────────────────────────────────────────
// 牌阵定义
// ──────────────────────────────────────────────
export const SPREADS = {
  daily: {
    id: "daily",
    name: "日常指引与快速解答",
    icon: "☀️",
    description: "快速了解当下状况，获取简单建议。单牌阵代表今日运势与核心建议；三牌阵揭示过去→现在→未来的时间流。",
    layouts: [
      { key: "single", label: "单牌阵 · 今日指引", count: 1, positions: ["今日核心"] },
      { key: "three", label: "三牌阵 · 时间之流", count: 3, positions: ["过去", "现在", "未来"] },
    ],
  },
  relationship: {
    id: "relationship",
    name: "情感与人际关系分析",
    icon: "💕",
    description: "探索恋爱、婚姻、友情或职场人际关系中的互动和走向。",
    layouts: [
      {
        key: "relation3",
        label: "关系牌阵 · 三张",
        count: 3,
        positions: ["你的状态", "对方状态", "关系走向"],
      },
      {
        key: "relation4",
        label: "关系牌阵 · 四张",
        count: 4,
        positions: ["你的状态", "对方状态", "目前互动", "未来发展"],
      },
      {
        key: "venus",
        label: "维纳斯/爱人之十字",
        count: 5,
        positions: ["你的内心", "对方的内心", "你的外在", "对方的外在", "潜在阻碍"],
      },
    ],
  },
  career: {
    id: "career",
    name: "事业选择与抉择困境",
    icon: "⚖️",
    description: "面临两个或多个选择时适用——跳槽还是留任？去A还是B？",
    layouts: [
      {
        key: "choice",
        label: "二选一牌阵",
        count: 5,
        positions: ["目前状况", "选择A现状", "选择A结果", "选择B现状", "选择B结果"],
      },
    ],
  },
  celtic: {
    id: "celtic",
    name: "深入分析与整体运势",
    icon: "🍀",
    description: "最经典、最全面的牌阵，涵盖核心问题、阻碍、潜意识、过去、未来、自我认知、外在环境、恐惧与希望、最终结果。",
    layouts: [
      {
        key: "celtic",
        label: "凯尔特十字牌阵",
        count: 10,
        positions: ["核心问题", "当前阻碍", "潜意识基础", "过去经历", "短期未来", "自我认知", "外在环境", "恐惧与希望", "最终结果", "综合建议"],
      },
    ],
  },
  problem: {
    id: "problem",
    name: "问题解决与寻找盲点",
    icon: "🔍",
    description: "遇到瓶颈，不知道问题出在哪里，或需要具体的行动指南。",
    layouts: [
      {
        key: "problem",
        label: "问题解决牌阵",
        count: 4,
        positions: ["问题本质/盲点", "导致原因", "应采取行动", "行动后走向"],
      },
    ],
  },
  zodiac: {
    id: "zodiac",
    name: "长周期或全方位预测",
    icon: "🌟",
    description: "适合新年、生日或重要人生转折点做整体运势展望。12张牌可代表未来12个月，或生活12个领域。",
    layouts: [
      {
        key: "zodiac",
        label: "黄道十二宫牌阵",
        count: 12,
        positions: ["自我", "财务", "沟通", "家庭", "恋爱", "健康", "婚姻", "投资", "进修", "事业", "人际", "潜意识"],
      },
    ],
  },
};

export const POSITIONS = ["过去", "现在", "未来"];