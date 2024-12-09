import { VStack } from "@chakra-ui/react";
import WebRouter from "./WebRouter";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <VStack py={4} px={2} minW="xs" h="100vh">
      <Header />
      <WebRouter />
    </VStack>
  );
};

export default App;
