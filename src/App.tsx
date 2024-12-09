import { Avatar, Card, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { url2mode, Mode } from "./services";
import { useEffect, useState } from "react";
import ArchiumMode from "./containers/ArchiumMode";
import BabynYarMode from "./containers/BabynYarMode";
import FamilySearchMode from "./containers/FamilySearchMode";
import LogoImg from "./assets/logo.png";
import UnknownMode from "./containers/UnknownMode";
import Settings from "./containers/Settings";
import WebRouter from "./WebRouter";

const App: React.FC = () => {
  const [tabURL, setTabURL] = useState<string>();
  const [userInfo, setUserInfo] = useState<chrome.identity.UserInfo>();

  useEffect(() => {
    chrome.tabs
      ?.query({
        active: true,
        currentWindow: true,
      })
      .then(([tab]) => setTabURL(tab.url));

    chrome.identity.getAuthToken({ interactive: true }).then((tokenResult) => {
      console.log("tokenResult", tokenResult);
    });
    chrome.identity
      .getProfileUserInfo({
        accountStatus: chrome.identity.AccountStatus.ANY,
      })
      .then((userInfo) => {
        console.log("userInfo", userInfo);
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.error("userInfo error", error);
      });
  }, []);

  const mode = url2mode(tabURL);

  return (
    <VStack
      bg="yellow.50"
      py={4}
      px={2}
      minW="xs"
      h={!tabURL ? "100vh" : undefined}
    >
      {tabURL && (
        <Avatar src={LogoImg} name="logo" size="xl" borderRadius={20} />
      )}
      <HStack justifyContent="center" alignItems="center" w="full" gap={0}>
        <Heading as="h2" fontSize="lg" color="gray.700" lineHeight={1}>
          Справна Качка
        </Heading>
        {tabURL && <Settings />}
        <Text>
          {userInfo?.email} ({userInfo?.id})
        </Text>
      </HStack>

      {!tabURL ? (
        <WebRouter />
      ) : (
        <Card w="full">
          {tabURL && mode === Mode.UNKNOWN && <UnknownMode />}
          {tabURL && mode === Mode.FAMILY_SEARCH && (
            <FamilySearchMode tabURL={tabURL} />
          )}
          {tabURL && mode === Mode.ARCHIUM && <ArchiumMode tabURL={tabURL} />}
          {tabURL && mode === Mode.BABYN_YAR && (
            <BabynYarMode tabURL={tabURL} />
          )}
        </Card>
      )}
    </VStack>
  );
};

export default App;
