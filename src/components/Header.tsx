import { Box, Heading, HStack, Image } from "@chakra-ui/react";
import LogoSrc from "../assets/images/logo.png";
import { Link } from "wouter";

const Header: React.FC = () => {
  return (
    <Box as="header" w="full" maxW="1280px">
      <HStack as="nav" w="full" justifyContent="flex-start" gap={4}>
        <HStack as={Link} to="/" gap={1}>
          <Image src={LogoSrc} alt="logo" boxSize="36px" />
          <Heading size="sm">Лапка</Heading>
        </HStack>
        <HStack gap={4} fontSize="md">
          <Link to="/pdf-loader">Завантажувач PDF</Link>
          {/* <Link to="/wiki-upload">Контакты</Link> */}
          {/* <Link to="/archium-2-wiki">Форматування тексту</Link> */}
        </HStack>
      </HStack>
    </Box>
  );
};

export default Header;
