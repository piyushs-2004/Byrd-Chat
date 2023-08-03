import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat.js";
import { ChatState } from "../context/chatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { SelectedChat } = ChatState();

  return (
    <Box
      d={{ base: SelectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
