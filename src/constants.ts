import { Pet, User, Chat, Post } from './types';

export const MOCK_USER: User = {
  name: '艾力克斯 · 瑞维拉',
  joinDate: '2022 年',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsmr04JGL0YQWRZvcDhLgUoi4N77MhoIKSZpjKa5jUjhNyOHuVti-MKw0nag-sfHOW-cVQk-X-nc6Ol7YjTJQZUbDL4ef-k52Ln7Lwr4CMzyL2xsh2otJids1yuWlhwLsgq4_7jLlR2G-FrKJCx7CA9pDPIsaZYPOVV6yndxcpQE0mtFU0-3jOyvsZuPRbhnjdea3JyPUK4uxd-coDZCVPh5rXRO96YRduRzPsB0hdF4WdE_ksD3ue5GY0Xn31VcqdZoNeRGRmK5c',
  phone: '13800138000',
  profession: 'UI/UX 设计师',
  stats: {
    applied: 3,
    favorites: 12,
    guides: 8,
  },
  settings: {
    notifications: true,
    language: 'zh',
    theme: 'system',
  },
};

export const MOCK_USERS: User[] = [
  MOCK_USER,
  {
    name: '李明 (Li Ming)',
    joinDate: '2023 年',
    avatarUrl: 'https://picsum.photos/seed/user2/200/200',
    phone: '13912345678',
    profession: '软件工程师',
    stats: {
      applied: 1,
      favorites: 5,
      guides: 2,
    },
    settings: {
      notifications: false,
      language: 'en',
      theme: 'light',
    },
  },
  {
    name: '田中 太郎 (Tanaka)',
    joinDate: '2024 年',
    avatarUrl: 'https://picsum.photos/seed/user3/200/200',
    phone: '09012345678',
    profession: '产品经理',
    stats: {
      applied: 0,
      favorites: 2,
      guides: 0,
    },
    settings: {
      notifications: true,
      language: 'ja',
      theme: 'dark',
    },
  },
];

export const PETS: Pet[] = [
  {
    id: '1',
    name: 'Milo',
    breed: '家养短毛猫',
    age: '2 岁',
    gender: 'male',
    type: 'cat',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFWUNa02sDMBG5Y_WcfKK7aIDJjqAquQMD-XwNxtfZCpN7AhKaefBsrUFoPZMI1HqzTcXT3AldaxcjJyFVatiKYqjb2UhWVBp1kRRtSgA5XsY_9Gknm4g_aWD_EEQ6Y8G_-gMlHO6MA1M6mk8_dZOaTvYfQNY-3M6IfHCu219ZY49ioTHV-BRau6QJE35FRZeRj5cdknTSLev_xtrNSYPxtQlk7Kp1HxEPaAe9uikXL5gmCqR7a1YjAanLigOUYthHBH4cp3QoLlc',
    location: '加利福尼亚州，旧金山',
    isFeatured: true,
    status: 'approved',
  },
  {
    id: '2',
    name: 'Bella',
    breed: '金毛寻回犬',
    age: '6 个月',
    gender: 'female',
    type: 'dog',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHfIYbmOKLVq61q92V8MojOaFi8sgHlgNcewrAF67A5E1nb8QBRN7kxJe2SlWGxkxOHDjsLPt9BMNk98aMO9U8o_a0slGDZf8YMRXuCf7GQxfLUlhmVadkjIML8yETt1nC7-NI4I6dTRHMeRDHnVZjn4MSvognVG1jG9wYAq1fYt03E3mZjc2RvwmApGBZNd3awKnbhS9UTJMU6IfKb1dklfPTr6t8ZqKhQxLESkRUG3QkEEX9sxF9nzFNssullD-2Z3X_Xk3bo8A',
    location: '加利福尼亚州，旧金山',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Cooper',
    breed: '比格犬',
    age: '1 岁',
    gender: 'male',
    type: 'dog',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBngcDgkYkyJbyEfwuWOQzV9JfmA2HrojfaiTo9q1IBrt7IMX8ZMVbj87fsK-brpz1ybbI-y0s5JXOt_bMBIyP4OqrGC8DiZJ2p-2e3X4r52QPbdCESO8UAcmwOuoRtpKGY8EJfwBZmQH46r5M5U1JQmefAKXpzaineb479bbiNNZPZiWCK8zImqY4nv9BHzeCC-yie_9tclWWvaXOruueanlVteUCzQWwKgaYX5ioDrDOX74kRVa7eb13tVFXRuTw4-o7XV-bpLVw',
    location: '加利福尼亚州，旧金山',
    status: 'pending',
  },
  {
    id: '4',
    name: 'Luna',
    breed: '虎斑猫',
    age: '3 岁',
    gender: 'female',
    type: 'cat',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbZcmJA6qAcVGs4P80Aq0J70csoJZ3N_4bHZNd7ToKibVclaZCwrruIdAPPBpqSC221m9Tnl6c55tXqkQr9nfReKmJYdhE8WQ3EI4DfsJuhjf0i8d9f5Acftw7JvV_n2woCli12YBoYCUPu7wHblANDYksiRaeVrD5ybif0EMZzjAWqoWaL7mS_MXkeZAFv2BasPij4_MCCWRqVzvGcyn1ChlsTC5CqNF1hx0B6xnXmL9XXYKl2Sqz1a4vWyKou2Fyr9p7U22r8ks',
    location: '加利福尼亚州，旧金山',
    status: 'approved',
  },
  {
    id: '6',
    name: 'Charlie',
    breed: '寻回犬',
    age: '4 岁',
    gender: 'male',
    type: 'dog',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfKst5zcAalkbQe_LFG58svgHKOFlvVmtVltdd2u_IdP0t4YNKHZFwM8Jd3jsHzDZGfwAxr3JGdDKEo6r6wluWwVFe2tg6reRdzt7rGP2cJLyu807TeH3VWKfUsTg8LtXw0slwyJALc-L7TTZs8XmiGAXn-iwHpiGdlZoDjiJPW_gB9L-F9rt74ZvdoJQOxYmR7db3Ol0ZlsjRH-a4ievbC1uwAhwhaFwasRIxqsp2cJHKp_9yl_WfFp0J0KrnhVopDpONBEY5qzY',
    location: '加利福尼亚州，旧金山',
    isFeatured: true,
  },
  {
    id: '7',
    name: 'Buddy',
    breed: '金毛寻回犬',
    age: '2 岁',
    gender: 'male',
    type: 'dog',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLAjrmPBmRA3HkvDXfSA8uU_VM_CX_zL2PgbU3QzzNTPVwAt3cvQn6GajA_CbKTeGkDrYIrfkPVb3qTKY_uSFudhtCXpms90wYxJ4VcPxvKMtKp2YPRTmyfKa-2idDRuEmNui3TeVW4t_cwmbbbAPQdM2DKV-9k1GjTy2RALO0ycr7SXi13VrFVBgpVkxk8wQ8eoAsIj85uwPFULzQHXXmrprObgrFNxlKkVtrAJxEsMV6demgkkm7We3VycBAaEkCe_sharBiPvo',
    location: '加利福尼亚州，旧金山',
    weight: '30公斤',
    personality: ['亲人 (Friendly)', '活泼 (Energetic)', '聪明 (Intelligent)', '温顺 (Gentle)'],
    about: 'Buddy 是一只友好且精力充沛的金毛寻回犬，它非常喜欢玩接球游戏，也很亲近人。它从当地的一家收容所被救出，目前正在寻找一个能给它提供充足运动空间和关爱的永久家庭。它与孩子和其他狗狗相处得非常好。',
    healthStatus: ['已接种疫苗', '已绝育', '已植入芯片'],
    requirements: ['优先考虑有围栏后院以便活动', '能够保证每日至少2次长距离散步', '有大型犬饲养经验者优先'],
  }
];

export const MOCK_CHATS: Chat[] = [
  {
    id: 'chat-1',
    petId: '1',
    petName: 'Milo',
    petImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFWUNa02sDMBG5Y_WcfKK7aIDJjqAquQMD-XwNxtfZCpN7AhKaefBsrUFoPZMI1HqzTcXT3AldaxcjJyFVatiKYqjb2UhWVBp1kRRtSgA5XsY_9Gknm4g_aWD_EEQ6Y8G_-gMlHO6MA1M6mk8_dZOaTvYfQNY-3M6IfHCu219ZY49ioTHV-BRau6QJE35FRZeRj5cdknTSLev_xtrNSYPxtQlk7Kp1HxEPaAe9uikXL5gmCqR7a1YjAanLigOUYthHBH4cp3QoLlc',
    rescuerName: '爪爪救助之家',
    rescuerAvatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu7mRi06Ew5X_p9nxxdHWMHlKKSat7jl4cMmVeBYYOaiFaJYNfBXJCYxR5FL0B14B3fV2EBE9nGCH8tYhjGsnyp7kXpmWD4tVa5Jl1lIfzQrvN9acB_rp9Rl5ofOqJ_vCodtazYJM998FO9l0Fzxy0OhU4s9w4muDmCgyvdVbFwOXw9enMDcWq9JO8yNFQNxcgKLaCTEG4Tojr6UofMaCbaAgqdltWfZ2d3CAz7D_-rbjLXW_iEwbioa-D0r9INcHEL3KXu5Sazi4',
    lastMessage: 'Milo 现在非常健康，欢迎来现场看看！',
    lastMessageTime: '10:30 AM',
    messages: [
      { id: 'm1', senderId: 'rescuer', text: '你好！请问对 Milo 有什么想了解的吗？', timestamp: '10:00 AM' },
      { id: 'm2', senderId: 'user', text: '我想知道它平时喜欢吃什么？', timestamp: '10:15 AM' },
      { id: 'm3', senderId: 'rescuer', text: 'Milo 现在非常健康，欢迎来现场看看！', timestamp: '10:30 AM' },
    ]
  },
  {
    id: 'chat-2',
    petId: '2',
    petName: 'Bella',
    petImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHfIYbmOKLVq61q92V8MojOaFi8sgHlgNcewrAF67A5E1nb8QBRN7kxJe2SlWGxkxOHDjsLPt9BMNk98aMO9U8o_a0slGDZf8YMRXuCf7GQxfLUlhmVadkjIML8yETt1nC7-NI4I6dTRHMeRDHnVZjn4MSvognVG1jG9wYAq1fYt03E3mZjc2RvwmApGBZNd3awKnbhS9UTJMU6IfKb1dklfPTr6t8ZqKhQxLESkRUG3QkEEX9sxF9nzFNssullD-2Z3X_Xk3bo8A',
    rescuerName: '爱心宠物收容所',
    rescuerAvatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFWUNa02sDMBG5Y_WcfKK7aIDJjqAquQMD-XwNxtfZCpN7AhKaefBsrUFoPZMI1HqzTcXT3AldaxcjJyFVatiKYqjb2UhWVBp1kRRtSgA5XsY_9Gknm4g_aWD_EEQ6Y8G_-gMlHO6MA1M6mk8_dZOaTvYfQNY-3M6IfHCu219ZY49ioTHV-BRau6QJE35FRZeRj5cdknTSLev_xtrNSYPxtQlk7Kp1HxEPaAe9uikXL5gmCqR7a1YjAanLigOUYthHBH4cp3QoLlc',
    lastMessage: 'Bella 已经打过疫苗了。',
    lastMessageTime: '昨天',
    messages: [
      { id: 'm1', senderId: 'user', text: 'Bella 打过疫苗了吗？', timestamp: '昨天 09:00 AM' },
      { id: 'm2', senderId: 'rescuer', text: 'Bella 已经打过疫苗了。', timestamp: '昨天 09:30 AM' },
    ]
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    userName: '猫奴小王',
    userAvatar: 'https://picsum.photos/seed/user4/200/200',
    type: 'diary',
    content: '领养 Milo 已经三个月了，它现在变得非常粘人，每天早上都会准时叫我起床。看到它从当初那个胆小的小猫变成现在的样子，真的很欣慰。',
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDFWUNa02sDMBG5Y_WcfKK7aIDJjqAquQMD-XwNxtfZCpN7AhKaefBsrUFoPZMI1HqzTcXT3AldaxcjJyFVatiKYqjb2UhWVBp1kRRtSgA5XsY_9Gknm4g_aWD_EEQ6Y8G_-gMlHO6MA1M6mk8_dZOaTvYfQNY-3M6IfHCu219ZY49ioTHV-BRau6QJE35FRZeRj5cdknTSLev_xtrNSYPxtQlk7Kp1HxEPaAe9uikXL5gmCqR7a1YjAanLigOUYthHBH4cp3QoLlc'],
    timestamp: '2小时前',
    likes: 24,
    comments: 5,
  },
  {
    id: 'p2',
    userId: 'u2',
    userName: '爱心使者',
    userAvatar: 'https://picsum.photos/seed/user5/200/200',
    type: 'stray',
    content: '在公园长椅下发现一只流浪的小金毛，看起来只有几个月大，非常瘦弱。我已经给它喂了一些水和食物，希望有附近的救助站能关注一下。',
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCHfIYbmOKLVq61q92V8MojOaFi8sgHlgNcewrAF67A5E1nb8QBRN7kxJe2SlWGxkxOHDjsLPt9BMNk98aMO9U8o_a0slGDZf8YMRXuCf7GQxfLUlhmVadkjIML8yETt1nC7-NI4I6dTRHMeRDHnVZjn4MSvognVG1jG9wYAq1fYt03E3mZjc2RvwmApGBZNd3awKnbhS9UTJMU6IfKb1dklfPTr6t8ZqKhQxLESkRUG3QkEEX9sxF9nzFNssullD-2Z3X_Xk3bo8A'],
    location: '旧金山金门公园',
    timestamp: '5小时前',
    likes: 45,
    comments: 12,
  },
  {
    id: 'p3',
    userId: 'u3',
    userName: '狗狗之家',
    userAvatar: 'https://picsum.photos/seed/user6/200/200',
    type: 'diary',
    content: '今天带 Cooper 去海边玩了，它第一次见到大海，兴奋得不得了。领养它是我今年做过最正确的决定！',
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBngcDgkYkyJbyEfwuWOQzV9JfmA2HrojfaiTo9q1IBrt7IMX8ZMVbj87fsK-brpz1ybbI-y0s5JXOt_bMBIyP4OqrGC8DiZJ2p-2e3X4r52QPbdCESO8UAcmwOuoRtpKGY8EJfwBZmQH46r5M5U1JQmefAKXpzaineb479bbiNNZPZiWCK8zImqY4nv9BHzeCC-yie_9tclWWvaXOruueanlVteUCzQWwKgaYX5ioDrDOX74kRVa7eb13tVFXRuTw4-o7XV-bpLVw'],
    timestamp: '昨天',
    likes: 18,
    comments: 3,
  }
];
