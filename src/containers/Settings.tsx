import {
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  Text,
  Heading,
  VStack,
  Stack,
  ModalFooter,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoSettings } from "react-icons/io5";

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    chrome.storage?.sync.get(null, (data) => {
      setSettings(data);
    });
  }, [setSettings]);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      chrome.storage?.sync.set({ [field]: e.target.checked.toString() });
    };

  return (
    <>
      <IconButton
        icon={<IoSettings />}
        aria-label="settings"
        onClick={onOpen}
        colorScheme="orange"
        variant="ghost"
        size="sm"
      />
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="sm">Налаштування</ModalHeader>
          <ModalCloseButton />
          <ModalBody as={Stack} gap={7}>
            <VStack gap={2} alignItems="flex-start">
              <Heading size="xs" textTransform="uppercase">
                Family Search
              </Heading>
              <Checkbox
                colorScheme="orange"
                alignItems="flex-start"
                defaultChecked={settings?.fs_table_sort === "true"}
                onChange={handleChange("fs_table_sort")}
              >
                <Text fontSize="sm" lineHeight={1}>
                  Додати сортування на сторінці пошуку
                </Text>
              </Checkbox>
              <Checkbox
                colorScheme="orange"
                alignItems="flex-start"
                defaultChecked={settings?.fs_hide_archive_banner === "true"}
                onChange={handleChange("fs_hide_archive_banner")}
              >
                <Text fontSize="sm" lineHeight={1}>
                  Приховати банери про архіви
                </Text>
              </Checkbox>
            </VStack>
            <VStack gap={2} alignItems="flex-start">
              <Heading size="xs" textTransform="uppercase">
                reabit.org.ua
              </Heading>
              <Checkbox
                colorScheme="orange"
                alignItems="flex-start"
                defaultChecked={settings?.reabit_table_link === "true"}
                onChange={handleChange("reabit_table_link")}
              >
                <Text fontSize="sm" lineHeight={1}>
                  Замінити клік на посилання в таблиці результатів
                </Text>
              </Checkbox>
            </VStack>
          </ModalBody>
          <ModalFooter flexDirection="column">
            <Text fontSize="xs" color="gray.500">
              Не вистачає якоїсь функції/налаштування?{" "}
              <Link
                href="https://forms.gle/wRtFXzGowJf4oF5s6"
                isExternal
                textDecoration="underline"
              >
                Заповніть форму
              </Link>
              , і Качка розбереться 🦆.
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Settings;
