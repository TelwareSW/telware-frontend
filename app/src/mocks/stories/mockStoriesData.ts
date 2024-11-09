import { story } from "types/story";

const MOCK_MY_STORIES: story[] = [
  {
    id: "1",
    content: `https://i.pravatar.cc/60?=${Math.random()}`,
    timestamp: new Date().toISOString(),
    caption: "",
    views: [],
  },
];
const MOCK_OTHER_USERS_STORIES = [
  {
    id: 1,
    name: "Ahmed Hamdy",
    avatar: `https://i.pravatar.cc/70?=${Math.random()}`,
    stories: [
      {
        content:
          "https://mcprod.hyperone.com.eg/media/catalog/product/cache/1ca275941aea0ae98b372dcb44b7c67a/6/2/6224011241366-300ml.jpg",
        timestamp: "2021-09-01T10:00:00Z",
        caption: "I love cola",
        viewed: false,
      },
    ],
  },
  {
    id: 2,
    name: "Alice Bob",
    avatar: `https://i.pravatar.cc/70?=${Math.random()}`,
    stories: [
      {
        content:
          "https://mcprod.hyperone.com.eg/media/catalog/product/cache/1ca275941aea0ae98b372dcb44b7c67a/6/2/6224011241366-300ml.jpg",
        timestamp: "2021-09-01T10:00:00Z",
        caption: "I love cola",
        viewed: false,
      },
      {
        content:
          "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/133d/live/5afc4bb0-206e-11ef-a787-dfc633433082.jpg.webp",
        timestamp: "2021-09-01T11:00:00Z",
        caption: "Real Madrid is The best",
        viewed: false,
      },
    ],
  },
  {
    id: 3,
    name: "John Doe",
    avatar: `https://i.pravatar.cc/70?=0.25`,
    stories: [
      {
        content: "https://i.pravatar.cc/700?=0.25",
        timestamp: "2021-09-01T12:00:00Z",
        caption: "Hello, I'm John Doe",
        viewed: true,
      },
      {
        content:
          "https://mcprod.hyperone.com.eg/media/catalog/product/cache/1ca275941aea0ae98b372dcb44b7c67a/6/2/6224011241366-300ml.jpg",
        timestamp: "2021-09-01T10:00:00Z",
        caption: "I love cola",
        viewed: false,
      },
      {
        content:
          "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/133d/live/5afc4bb0-206e-11ef-a787-dfc633433082.jpg.webp",
        timestamp: "2021-09-01T11:00:00Z",
        caption: "Real Madrid is The best",
        viewed: false,
      },
      {
        id: 2,
        name: "Alice Bob",
        avatar: `https://i.pravatar.cc/70?=${Math.random()}`,
        stories: [
          {
            content:
              "https://mcprod.hyperone.com.eg/media/catalog/product/cache/1ca275941aea0ae98b372dcb44b7c67a/6/2/6224011241366-300ml.jpg",
            timestamp: "2021-09-01T10:00:00Z",
            caption: "I love cola",
            viewed: false,
          },
          {
            content:
              "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/133d/live/5afc4bb0-206e-11ef-a787-dfc633433082.jpg.webp",
            timestamp: "2021-09-01T11:00:00Z",
            caption: "Real Madrid is The best",
            viewed: false,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Bob Alice",
    avatar: `https://i.pravatar.cc/70?=0.45`,
    stories: [
      {
        content: "https://i.pravatar.cc/700?=0.45",
        timestamp: "2021-09-01T12:00:00Z",
        caption: "Hello, I'm John Doe",
        viewed: true,
      },
      {
        content:
          "https://mcprod.hyperone.com.eg/media/catalog/product/cache/1ca275941aea0ae98b372dcb44b7c67a/6/2/6224011241366-300ml.jpg",
        timestamp: "2021-09-01T10:00:00Z",
        caption: "I love cola",
        viewed: false,
      },
      {
        content:
          "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/133d/live/5afc4bb0-206e-11ef-a787-dfc633433082.jpg.webp",
        timestamp: "2021-09-01T11:00:00Z",
        caption: "Real Madrid is The best",
        viewed: false,
      },
      {
        id: 2,
        name: "Alice Bob",
        avatar: `https://i.pravatar.cc/70?=${Math.random()}`,
        stories: [
          {
            content:
              "https://mcprod.hyperone.com.eg/media/catalog/product/cache/1ca275941aea0ae98b372dcb44b7c67a/6/2/6224011241366-300ml.jpg",
            timestamp: "2021-09-01T10:00:00Z",
            caption: "I love cola",
            viewed: false,
          },
          {
            content:
              "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/133d/live/5afc4bb0-206e-11ef-a787-dfc633433082.jpg.webp",
            timestamp: "2021-09-01T11:00:00Z",
            caption: "Real Madrid is The best",
            viewed: false,
          },
        ],
      },
    ],
  },
];

export { MOCK_MY_STORIES, MOCK_OTHER_USERS_STORIES };
