const MOCK_MY_STORIES = {
  stories: [
    {
      id: "1",
      content:
        "https://scontent.fcai11-1.fna.fbcdn.net/v/t1.6435-9/122032103_3472532366305566_6239088129819761020_n.jpg?stp=dst-jpg_s960x960&_nc_cat=104&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeEXsEzDOwFTqpmb7eVOF_defX6b8GN9_pB9fpvwY33-kK5Gl95eJW0QBmEl_26DnBM80yvcN_GW8-7f9MJZZ1z6&_nc_ohc=bSnTWn4p8x0Q7kNvgHoFcXP&_nc_zt=23&_nc_ht=scontent.fcai11-1.fna&_nc_gid=Ab5Y75GRyvck02dUvRxz55i&oh=00_AYCR6Lf6wZTBAR3XPjJLP8yCvUvhON0c_hM_eUdGYvRwdA&oe=676B5E8E",
      timestamp: new Date().toISOString(),
      caption: "CUFE is the hell",
      views: [
        {
          id: "1",
          userId: "1",
          name: "Ahmed Hamdy",
          photo: "https://i.pravatar.cc/70?=0.2",
          seenTime: new Date().toISOString(),
        },
        {
          id: "2",
          userId: "12",
          name: "John Doe",
          photo: "https://i.pravatar.cc/70?=0.25",
          seenTime: new Date().toISOString(),
        },
        {
          id: "3",
          userId: "13",
          name: "Alice Bob",
          photo: "https://i.pravatar.cc/70?=0.35",
          seenTime: new Date().toISOString(),
        },
        {
          id: "4",
          userId: "14",
          name: "Bob Alice",
          photo: "https://i.pravatar.cc/70?=0.45",
          seenTime: new Date().toISOString(),
        },
      ],
    },
  ],
};
const MOCK_OTHER_USERS_STORIES = [
  {
    userId: "1",
    name: "Ahmed Hamdy",
    photo: "https://i.pravatar.cc/70?=0.7",
    stories: [
      {
        id: "110001",
        content:
          "https://mcprod.hyperone.com.eg/media/catalog/product/cache/1ca275941aea0ae98b372dcb44b7c67a/6/2/6224011241366-300ml.jpg",
        timestamp: new Date().toISOString(),
        caption: "I love cola",
        viewed: false,
      },
    ],
  },
  {
    userId: "3",
    name: "John Doe",
    photo: "https://i.pravatar.cc/70?=0.45",
    stories: [
      {
        id: "110004",
        content: "https://i.imgflip.com/35dq1c.jpg",
        timestamp: new Date().toISOString(),
        caption: "hitler cat",
        viewed: true,
      },
      {
        id: "110005",
        content:
          "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
        timestamp: new Date().toISOString(),
        caption: "Cutest cat ever",
        viewed: false,
      },
    ],
  },
  {
    userId: "4",
    name: "Bob Alice",
    photo: "https://i.pravatar.cc/70?=0.55",
    stories: [
      {
        id: "110008",
        content:
          "https://mcprod.hyperone.com.eg/media/catalog/product/cache/1ca275941aea0ae98b372dcb44b7c67a/6/2/6224011241366-300ml.jpg",
        timestamp: new Date().toISOString(),
        caption: "I love cola",
        viewed: false,
      },
      {
        id: "110009",
        content:
          "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/133d/live/5afc4bb0-206e-11ef-a787-dfc633433082.jpg.webp",
        timestamp: new Date().toISOString(),
        caption: "Real Madrid is the best",
        viewed: false,
      },
    ],
  },
  {
    userId: "5",
    name: "Peter Barker",
    photo: "https://i.pravatar.cc/70?=0.05",
    stories: [
      {
        id: "110010",
        content:
          "https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png",
        timestamp: new Date().toISOString(),
        caption: "Spiderman",
        viewed: true,
      },
    ],
  },
];

export { MOCK_MY_STORIES, MOCK_OTHER_USERS_STORIES };
