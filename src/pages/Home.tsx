import { Container, Heading, Link, List, ListItem, Text } from "@chakra-ui/react";

const HomePage: React.FC = () => {
  return (
    <Container maxW="xl">
      <Heading fontWeight="normal" mb={4}>Лапка</Heading>
      <Text>
        Це набір інструментів, що допомагають в роботі генеалогів та архівних
        активістів:
      </Text>
      <List styleType="disc" pl={4}>
        <ListItem>
          <Link href="/pdf-loader" textDecoration="underline">
            Завантажувач PDF
          </Link>
        </ListItem>
      </List>
      <Text fontSize="sm" color="blackAlpha.700" mt={4}>
        Маєте ідею, для розширення функціоналу ― пишіть в групі спільноти в{" "}
        <Link href="https://t.me/spravnakachka" textDecoration="underline">Telegram</Link>.
      </Text>
    </Container>
  );
};

export default HomePage;
