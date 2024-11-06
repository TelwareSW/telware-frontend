export const MOCK_USER = {
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
    viewed: false,
  },
  {
    content: "https://cdn.britannica.com/52/128652-050-14AD19CA/Maki-zushi.jpg",
    timestamp: "2021-09-01T11:00:00Z",
    caption: "I love sushi",
    views: 10,
    viewed: true,
  },
  {
    content:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyDcH_MxdsTsK6KMVon-Ybfa2WiT-R70ZjWw&s",
    timestamp: "2021-09-01T10:00:00Z",
    caption: "I love burgers",
    viewed: true,
  },
];

export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vY2tVc2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
