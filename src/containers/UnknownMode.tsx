import {
  Box,
  CardBody,
  Heading,
  Link,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

const UnknownMode: React.FC = () => {
  return (
    <CardBody>
      <Stack divider={<StackDivider />} spacing="4">
        <Box>
          <Heading size="xs" textTransform="uppercase">
            Невідомі горизонти
          </Heading>
          <Text pt="2" fontSize="sm">
            Качка не вміє працювати з цим сайтом.{' '}
            <Link
              href="https://forms.gle/wRtFXzGowJf4oF5s6"
              isExternal
              textDecoration="underline"
            >
              Заповніть форму
            </Link>
            , якщо вважаєте, що з цим треба розібратись.
          </Text>
        </Box>
      </Stack>
    </CardBody>
  );
};

export default UnknownMode;
