export default {
  aliyunConfig: {
    region: 'oss-cn-hangzhou.aliyuncs.com',
    AccessKeyID: 'LTAIEaHJUkAHsdQU',
    AccessKeySecret: 'Og6qJsGkOP9BmJHiI01knT0f4QBUaZ',
    bucket: 'graduation-product',
    policyText: {
      'expiration': '2020-01-01T12:00:00.000Z', // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
      'conditions': [
        ['content-length-range', 0, 1048576000] // 设置上传文件的大小限制,如果超过了这个大小，文件上传到OSS会报错的
      ]
    }
  },
  solgan: [
    '最好的人，像孩子一样，真诚。像夕阳一样，温暖。像天空一样，宁静',
    '生活不能等别人来安排，要自已去争取和奋斗；而不论其结果是喜是悲，但可以慰藉的是，你总不枉在这世界上活了一场',
    '没有什么人能一路单纯到底，但是要记住，别忘了最初的自己',
    '从今天起，做一个简单而幸福的人。不沉溺幻想，不庸人自扰，不浪费时间，不沉迷过去，不畏惧将来。如此，安好',
    '清醒时做事，糊涂时读书，大怒时睡觉，独处时思考；做一个幸福的人，读书，旅行，努力工作，关心身体和心情',
    '如若相爱，便携手到老；如若错过，便愿他安好',
    '离开了，就别问人家过得好不好。不好你也帮助不了，好也不是你的功劳',
    '很多人不需要再见，因为只是路过而已。遗忘，就是我们给彼此最好的纪念',
    '和聪明人交流，和靠谱的人恋爱，和积极的人共事，和幽默的人随行。人生若能如此，就是最大的幸福',
    '时间会告诉我们，简单的喜欢最长远，平凡的陪伴最心安，懂你的人最温暖',
    '人生遇到的每个人，出场顺序真的很重要，很多人如果换一个时间认识，就会有不同的结局',
    '每一个懂事淡定的现在，都有一个很傻很天真的过去。每一个温暖而淡然的如今，都有一个悲伤而不安的曾经',
    '世界上，唯独骗不了的，是自己的心，它总在你最没提防时，暴露你的欢喜忧愁',
    '很多时候，不经意知道一些事后，表面装得无所谓，用微笑去掩饰，其实心里比什么都疼',
    '往后余生，风雪是你，平淡是你，清贫是你，荣华是你，心底温柔是你，目光所至，也是你',
    '心有多远，你就能走多远，做一个温暖的人，浅浅笑，轻轻爱',
    '你羡慕我一身潇洒，无牵无挂，我却羡慕你，有家，有他，有人等你回家',
    '时间真好，验证了人心，见证了人性，懂得了真的，明白了假的，没有解不开的难题，只有解不开的心绪',
    '很久以后才知道，原来和有些人最好的结局，就是互相杳无音信',
    '愿你我既可以朝九晚五，也可以浪迹天涯；愿你我既可以拈花把酒，也能围炉诗书茶'
  ]
}