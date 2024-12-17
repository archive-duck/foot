import {
  AbsoluteCenter,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Input,
  Progress,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  getPdfDocumentFromUrl,
  getPdfDocumentFromFile,
  convertPdfDocumentToImages,
} from "../services/pdf";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoFolderOpen, IoReload, IoTrash, IoWarning } from "react-icons/io5";
import { PDFDocumentProxy } from "pdfjs-dist";

const EXPECTED_SPEED = 2;

const LABELS: Record<string, string> = {
  pdf: "Завантаження PDF",
  viewport: "Визначення розмірів",
  render: "Створення зображення",
  download: "Збереження зображення",
  expectedTime: "Розрахунковий час",
  expectedSpeed: "Розрахункова швидкість",
  actualTime: "Фактичний час",
  actualSpeed: "Фактична швидкість",
};

const PDFLoaderPage: React.FC = () => {
  const [pagesRange, setPagesRange] = useState([1, 1]);
  const [downloadProgress, setDownloadProgress] = useState<number>();
  const [convertProgress, setConvertProgress] = useState<number>();
  const [url, setUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>();
  const [ms, setMs] = useState<Record<string, number>>({});
  const pdfDoc = useRef<PDFDocumentProxy | null>(null);

  useEffect(() => {
    // get url from query params
    const urlParams = new URLSearchParams(window.location.search);
    const urlParam = urlParams.get("url");
    if (urlParam) {
      setUrl(urlParam);
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      const pdfResult = await getPdfDocumentFromUrl(url, setDownloadProgress);
      pdfDoc.current = pdfResult.result;
      setPagesRange([1, pdfResult.result.numPages]);
      setFileName(pdfResult.name);
      setMs(pdfResult.ms);
    };
    if (url) {
      run();
    }
  }, [url]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }
      const pdfResult = await getPdfDocumentFromFile(file, setDownloadProgress);
      pdfDoc.current = pdfResult.result;
      setPagesRange([1, pdfResult.result.numPages]);
      setFileName(pdfResult.name);
      setMs(pdfResult.ms);
    },
    []
  );

  const handleUrlChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedUrl = decodeURIComponent(e.target.value);
      setUrl(parsedUrl);
      e.target.blur();
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (pdfDoc.current) {
      const now = Date.now();
      const convertResult = await convertPdfDocumentToImages(
        pdfDoc.current,
        pagesRange[0],
        pagesRange[1],
        setConvertProgress
      );
      setMs((prev) => ({
        ...prev,
        ...convertResult.ms,
        // convert: prev.convert + (Date.now() - now),
        convert: Date.now() - now,
      }));
    }
  }, [pagesRange]);

  const handleRangeChange = useCallback((value: [number, number]) => {
    setConvertProgress(undefined);
    setPagesRange(value);
    setMs((prev) => ({ pdf: prev.pdf }));
  }, []);

  const handleFileReset = () => {
    setUrl("");
    setFileName("");
    setDownloadProgress(undefined);
    setConvertProgress(undefined);
    setMs({});
    pdfDoc.current = null;
  };

  const handleConvertReset = () => {
    setConvertProgress(undefined);
    setMs((prev) => ({ pdf: prev.pdf }));
  };

  console.log(downloadProgress, convertProgress, ms, pagesRange);

  return (
    <Container>
      <HStack justifyContent="center" alignItems="center" w="full" gap={0}>
        <Heading as="h2" fontSize="lg" color="gray.700" lineHeight={1}>
          Завантажувач PDF
        </Heading>
      </HStack>
      <HStack pt={2}>
        <IoWarning color="orange" size={48} />
        <Text fontSize="sm" color="gray.500">
          Вкладка має бути активною протягом всього процесу обробки PDF. Поки
          так, а далі будемо бачити
        </Text>
      </HStack>
      <Card overflow="hidden">
        <CardHeader as={HStack} bg={fileName ? "green.200" : "gray.100"} py={3}>
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="gray.500"
            textTransform="uppercase"
          >
            Крок 1:
          </Text>
          <Text fontSize="lg" flexGrow={1}>
            {fileName ? "Завантажено" : "Завантаження файлу"}
          </Text>
          {fileName && (
            <IconButton
              aria-label="Очистити"
              size="sm"
              icon={<IoTrash />}
              colorScheme="red"
              variant="outline"
              onClick={handleFileReset}
            />
          )}
        </CardHeader>
        <CardBody position="relative">
          <Text as="label">
            Посилання на PDF
            <Input
              placeholder="https://upload.wikimedia.org/wikipedia/commons/..."
              value={url}
              onChange={handleUrlChange}
              isDisabled={!!downloadProgress}
              borderBottomLeftRadius={url ? 0 : undefined}
              borderBottomRightRadius={url ? 0 : undefined}
            />
          </Text>
          <Box position="relative" py={4}>
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              або
            </AbsoluteCenter>
          </Box>
          <Button
            as="label"
            leftIcon={<IoFolderOpen />}
            w="full"
            colorScheme="orange"
            variant="outline"
            cursor="pointer"
            isDisabled={!!downloadProgress}
          >
            Відкрийте файл PDF
            <Input
              type="file"
              accept=".pdf"
              isDisabled={!!downloadProgress}
              onChange={handleFileChange}
              display="none"
            />
          </Button>
          {downloadProgress && (
            <VStack
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bg={downloadProgress < 100 ? "gray.100" : "green.100"}
              opacity={0.95}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <Heading as="h2" size="md" noOfLines={3}>
                {fileName || `${Math.floor(downloadProgress)}%`}
              </Heading>
            </VStack>
          )}
        </CardBody>
        {downloadProgress && (
          <Progress
            value={downloadProgress}
            size="sm"
            colorScheme="green"
            borderRadius="0 0 var(--chakra-radii-md) var(--chakra-radii-md)"
          />
        )}
      </Card>
      {pdfDoc.current && fileName && (
        <Card mt={2}>
          <CardHeader
            as={HStack}
            bg={convertProgress === 100 ? "green.200" : "gray.100"}
            py={3}
          >
            <Text
              fontSize="sm"
              fontWeight="bold"
              color="gray.500"
              textTransform="uppercase"
            >
              Крок 2:
            </Text>
            <Text fontSize="lg" flexGrow={1}>
              {convertProgress === 100 ? "Завершено" : "Налаштування"}
            </Text>
            {convertProgress === 100 && (
              <IconButton
                aria-label="Перезапустити"
                size="sm"
                icon={<IoReload />}
                colorScheme="red"
                variant="outline"
                onClick={handleConvertReset}
              />
            )}
          </CardHeader>
          <CardBody position="relative">
            <Text as="label">
              Оберіть діапазон сторінок ({pagesRange[0]} - {pagesRange[1]})
            </Text>
            <HStack w="full" gap={3}>
              <Input
                type="number"
                size="sm"
                borderRadius="md"
                value={pagesRange[0]}
                min={1}
                max={pagesRange[1]}
                isDisabled={!!convertProgress && convertProgress < 100}
                onChange={(e) =>
                  handleRangeChange([
                    Number(e.target.value),
                    Math.max(Number(e.target.value), pagesRange[1]),
                  ])
                }
                flexBasis="100px"
              />
              <RangeSlider
                defaultValue={[1, pdfDoc.current.numPages]}
                value={[pagesRange[0], pagesRange[1]]}
                min={1}
                max={pdfDoc.current.numPages}
                step={1}
                isDisabled={!!convertProgress && convertProgress < 100}
                onChange={handleRangeChange}
              >
                <RangeSliderTrack bg="orange.100">
                  <RangeSliderFilledTrack bg="orange" />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0} />
                <RangeSliderThumb boxSize={6} index={1} />
              </RangeSlider>
              <Input
                type="number"
                size="sm"
                borderRadius="md"
                value={pagesRange[1]}
                min={pagesRange[0]}
                max={pdfDoc.current.numPages}
                isDisabled={!!convertProgress && convertProgress < 100}
                onChange={(e) =>
                  handleRangeChange([
                    pagesRange[0],
                    Math.min(
                      Number(e.target.value),
                      pdfDoc.current?.numPages || pagesRange[1]
                    ),
                  ])
                }
                flexBasis="100px"
              />
            </HStack>
            <HStack mt={5}>
              <Stat>
                <StatLabel>{LABELS.expectedTime}</StatLabel>
                <StatNumber>
                  {Math.ceil(
                    (pagesRange[1] - pagesRange[0] + 1) / EXPECTED_SPEED
                  )}
                  <StatHelpText as="span" lineHeight={1} px={0.5}>
                    с
                  </StatHelpText>
                </StatNumber>
              </Stat>
              <Button
                colorScheme="orange"
                mt="4"
                onClick={handleSubmit}
                isLoading={!!convertProgress && convertProgress < 100}
                isDisabled={!!convertProgress && convertProgress < 100}
              >
                Полетіли
              </Button>
            </HStack>
            {convertProgress && (
              <VStack
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                zIndex={2}
                bg={convertProgress < 100 ? "gray.100" : "green.100"}
                opacity={0.95}
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <Heading as="h2" size="md" noOfLines={3}>
                  {`${Math.floor(convertProgress)}%`}
                </Heading>
              </VStack>
            )}
          </CardBody>
          {convertProgress && (
            <Progress
              value={convertProgress}
              size="sm"
              colorScheme="green"
              borderRadius="0 0 var(--chakra-radii-md) var(--chakra-radii-md)"
            />
          )}
        </Card>
      )}
      {pdfDoc.current && convertProgress === 100 && (
        <Card mt={2} bg="orange.100">
          <Grid
            as={CardBody}
            gap={2}
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(4, 1fr)"
          >
            {Object.entries(ms).map(
              ([key, value]) =>
                key !== "convert" && (
                  <GridItem
                    key={key}
                    bg="white"
                    p={2}
                    borderRadius={5}
                    colSpan={1}
                    boxShadow="sm"
                  >
                    <Stat>
                      <StatLabel>{LABELS[key]}</StatLabel>
                      <StatNumber>
                        {(value / 1000).toFixed(2)}
                        <StatHelpText as="span" lineHeight={1} px={0.5}>
                          с
                        </StatHelpText>
                      </StatNumber>
                    </Stat>
                  </GridItem>
                )
            )}
            <GridItem bg="white" p={2} borderRadius={5}>
              <Stat>
                <StatLabel>{LABELS.expectedTime}</StatLabel>
                <StatNumber>
                  {Math.ceil(
                    (pagesRange[1] - pagesRange[0] + 1) / EXPECTED_SPEED
                  )}
                  <StatHelpText as="span" lineHeight={1} px={0.5}>
                    с
                  </StatHelpText>
                </StatNumber>
              </Stat>
            </GridItem>
            <GridItem bg="white" p={2} borderRadius={5}>
              <Stat>
                <StatLabel>{LABELS.actualTime}</StatLabel>
                <StatNumber>
                  {Math.ceil(ms.convert / 1000)}
                  <StatHelpText as="span" lineHeight={1} px={0.5}>
                    с
                  </StatHelpText>
                </StatNumber>
              </Stat>
            </GridItem>
            <GridItem bg="white" p={2} borderRadius={5}>
              <Stat>
                <StatLabel>{LABELS.expectedSpeed}</StatLabel>
                <StatNumber>
                  {EXPECTED_SPEED}
                  <StatHelpText as="span" lineHeight={1} px={0.5}>
                    арк/с
                  </StatHelpText>
                </StatNumber>
              </Stat>
            </GridItem>
            <GridItem bg="white" p={2} borderRadius={5}>
              <Stat>
                <StatLabel>{LABELS.actualSpeed}</StatLabel>
                <StatNumber>
                  {(
                    (pagesRange[1] - pagesRange[0] + 1) /
                    (ms.convert / 1000)
                  ).toFixed(1)}
                  <StatHelpText as="span" lineHeight={1} px={0.5}>
                    арк/с
                  </StatHelpText>
                </StatNumber>
              </Stat>
            </GridItem>
          </Grid>
        </Card>
      )}
    </Container>
  );
};

export default PDFLoaderPage;
