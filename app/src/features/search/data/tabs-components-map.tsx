import NoResultsFound from "../components/NoResultsFound";
import AudioResult from "../components/result-items/AudioResult";
import ChannelResult from "../components/result-items/ChannelResult";
import FileResult from "../components/result-items/FileResult";
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
        <MessageResult
          searchTerm="hi"
          message=" Hello hi there"
          title="Telware Testing"
          date={new Date().toString()}
          image="https://placecats.com/200/200"
          link="https://placecats.com/20/20"
        />
        <FileResult
          title="Telware Testing"
          image="https://www.svgrepo.com/show/144578/pdf.svg"
          size="20"
          date={new Date().toString()}
        />
        <AudioResult
          title="Telware Testing"
          date={new Date().toString()}
          duration="20"
          file="https://ia802306.us.archive.org/20/items/NeverGonnaGiveYouUp/jocofullinterview41.mp3"
        />
        {Array.from({ length: 10 }).map((_, index) => (
          <MessageResult
            key={index}
            searchTerm="hi"
            message=" Hello hi there"
            title="Telware Testing"
            date={new Date().toString()}
            image="https://placecats.com/200/200"
          />
        ))}
      </div>
    ),
  },
  {
    title: "Channnels",
    component: () => (
      <div>
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
    title: "Media",
    component: () => (
      <div>
        <MessageResult
          searchTerm="hi"
          message=" Hello hi there"
          title="Telware Testing"
          date={new Date().toString()}
          image="https://placecats.com/200/200"
          media="https://placecats.com/20/20"
        />
      </div>
    ),
  },
  {
    title: "Links",
    component: () => (
      <div>
        <MessageResult
          searchTerm="hi"
          message=" Hello hi there"
          title="Telware Testing"
          date={new Date().toString()}
          image="https://placecats.com/200/200"
          link="https://placecats.com/20/20"
        />
      </div>
    ),
  },
  {
    title: "Files",
    component: () => <NoResultsFound />,
  },
  {
    title: "Music",
    component: () => (
      <div>
        <AudioResult
          title="Telware Testing"
          date={new Date().toString()}
          duration="20"
          file="https://ia802306.us.archive.org/20/items/NeverGonnaGiveYouUp/jocofullinterview41.mp3"
        />
      </div>
    ),
  },
  {
    title: "Voice",
    component: () => (
      <div>
        <AudioResult
          title="Telware Testing"
          date={new Date().toString()}
          duration="20"
          file="https://ia802306.us.archive.org/20/items/NeverGonnaGiveYouUp/jocofullinterview41.mp3"
        />
      </div>
    ),
  },
];
