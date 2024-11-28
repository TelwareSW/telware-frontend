export const MOCK_USER1 = {
  id: "1",
  email: "johndoe@example.com",
  password: "1234",
  firstName: "John",
  lastName: "Doe",
  bio: "Hello, I'm John Doe",
  photo:
    "https://i.pinimg.com/564x/26/76/a1/2676a1898da6edae9fc648c94332903f.jpg",
  username: "johndoe",
  phoneNumber: "0123456789",
  status: "Online",
  screenName: "John Doe",
};


export const MOCK_USER2 = {
  id: "2",
  email: "ay7aga@example.com",
  password: "1234",
  firstName: "ay",
  lastName: "7aga",
  bio: "Hello, I'm ay 7aga",
  photo:
    "https://i.pinimg.com/564x/26/76/a1/2676a1898da6edae9fc648c94332903f.jpg",
  username: "Ay 7aga",
  phoneNumber: "0123456798",
  status: "Online",
  screenName: "Ay 7aga",
};

export const MOCK_MY_STORIES = [
  {
    content:
      "https://i.pinimg.com/564x/26/76/a1/2676a1898da6edae9fc648c94332903f.jpg",
    timestamp: "2021-09-01T12:00:00Z",
    caption: "Hello, I'm John Doe",
    views: 100,
  },
  {
    content: "https://cdn.britannica.com/52/128652-050-14AD19CA/Maki-zushi.jpg",
    timestamp: "2021-09-01T11:00:00Z",
    caption: "I love sushi",
    views: 10,
  },
  {
    content:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyDcH_MxdsTsK6KMVon-Ybfa2WiT-R70ZjWw&s",
    timestamp: "2021-09-01T10:00:00Z",
    caption: "I love burgers",
    views: 20,
  },
];
export const MOCK_OTHER_USER_STORIES = [
  {
    content:
      "https://i.pinimg.com/564x/26/76/a1/2676a1898da6edae9fc648c94332903f.jpg",
    timestamp: "2021-09-01T12:00:00Z",
    caption: "Hello, I'm John Doe",
    viewed: true,
  },
  {
    content:
      "data:image/jpeg;base64,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",
    timestamp: "2021-09-01T11:00:00Z",
    caption: "I love pizza",
    viewed: false,
  },
  {
    content:
      "https://mcprod.hyperone.com.eg/media/catalog/product/cache/1ca275941aea0ae98b372dcb44b7c67a/6/2/6224011241366-300ml.jpg",
    timestamp: "2021-09-01T10:00:00Z",
    caption: "I love cola",
    viewed: false,
  },
];

export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vY2tVc2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";