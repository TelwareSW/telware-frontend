import ChannelResult from "../components/result-items/ChannelResult";
import MessageResult from "../components/result-items/MessageResult";

export const SEARCH_TABS = [
  {
    title: "Chats",
    component: () => (
      <div>
        <MessageResult
          searchTerm="hi"
          message=" Hello hi there"
          title="Telware Testing"
          date={new Date().toString()}
          image="https://placecats.com/200/200"
        />
        <MessageResult
          searchTerm="hi"
          message=" Hello hi there"
          title="Telware Testing"
          date={new Date().toString()}
          image="https://placecats.com/neo/200/200"
          media="https://placecats.com/20/20"
        />

        <ChannelResult
          title="Telware Testing"
          image="https://placecats.com/200/200"
          username="Telware"
          subscribers={100}
        />
      </div>
    ),
  },
  {
    title: "Channnels",
    component: () => <div>Channels</div>,
  },
  {
    title: "Media",
    component: () => <div>Media</div>,
  },
  {
    title: "Links",
    component: () => <div>Links</div>,
  },
  {
    title: "Files",
    component: () => <div>Files</div>,
  },
  {
    title: "Music",
    component: () => <div>Music</div>,
  },
  {
    title: "Voice",
    component: () => <div>Voice</div>,
  },
];
