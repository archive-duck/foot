import {
  Box,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

interface GuideItem {
  title: string;
  description: string;
  image?: string;
}

interface GuideProps {
  items: GuideItem[];
}

const Guide: React.FC<GuideProps> = ({ items }) => (
  <Stack divider={<StackDivider />} spacing="4">
    {items.map(({ description, title, image }) => (
      <Box key={title}>
        <Heading size="xs" textTransform="uppercase">
          {title}
        </Heading>
        <Text pt="2" fontSize="sm">
          {description}
        </Text>
        {image && <Image src={image} alt={`${title} | зображення`} />}
      </Box>
    ))}
  </Stack>
);

export default Guide;
