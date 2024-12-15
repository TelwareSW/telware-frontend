import { RootState } from "@state/store";
import { useSelector } from "react-redux";
import MessageResult from "../result-items/MessageResult";
import NoResultsFound from "../NoResultsFound";

const MESSAGES = [
  {
    title: "Telware Testing",
    date: new Date().toString(),
    image: "https://placecats.com/200/200",
    message: "Hello hi there",
  },
];

const MessagesTab: React.FC = () => {
  const { searchTerm } = useSelector((state: RootState) => state.globalSearch);

  return (
    <div style={{ height: "100%" }}>
      {MESSAGES.length === 0 && <NoResultsFound />}
      {MESSAGES.map((message) => (
        <MessageResult
          searchTerm={searchTerm}
          message={message.message}
          title={message.title}
          date={message.date}
          image={message.image}
        />
      ))}
    </div>
  );
};

export default MessagesTab;
