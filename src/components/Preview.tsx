import {
  Box,
  Center,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

import FallbackImg from "../assets/fallback.jpg";

interface PreviewProps {
  links: PreviewLink[];
}

const Preview: React.FC<PreviewProps> = ({ links }) => {
  return (
    <VStack w="full" alignItems="flex-start" gap={2} mt={4}>
      <Text>
        Знайдено{" "}
        <Text as="span" fontWeight="bold">
          {links.length}
        </Text>{" "}
        скани до завантаження. Прогляньте перші три:
      </Text>
      <HStack flexWrap="wrap" gap={4} w="full">
        {links.slice(0, 3).map((link) => (
          <Box
            key={link.url}
            as={Link}
            flexBasis="300px"
            flexGrow={1}
            href={link.url}
            target="_blank"
            position="relative"
            borderRadius={4}
            overflow="hidden"
          >
            <Image src={link.url} alt={link.name} fallbackSrc={FallbackImg} />
            <Center
              position="absolute"
              top={0}
              left={0}
              bottom={0}
              right={0}
              textAlign="center"
              _hover={{ bg: "rgba(0, 0, 0, 0.5)", color: "white" }}
            >
              <Text>{link.name}</Text>
            </Center>
          </Box>
        ))}
      </HStack>
    </VStack>
  );
};

export default Preview;
