import { Heading, HStack, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const FamilySearchProjectsUploadHelper: React.FC = () => {
  const [multipleCasesText, setMultipleCasesText] = useState<string>("");
  const [cleanupRawText, setCleanupRawText] = useState<string>("");
  const [rangesText, setRangesText] = useState<string>("");

  const handleSplitMultipleCasesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const rows = value.split("\n");

    const result: string[] = [];
    rows.forEach((row) => {
      const [dgs, f, d, c] = row.split("\t");
      const parts = c.split(/--|;/);
      parts.forEach((el) => {
        result.push([dgs, f, d, el.trim()].join("\t"));
      });
    });

    const formatted = result.join("\n");

    setMultipleCasesText(formatted);
  };

  const handleCleanupRawChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const rows = value.split("\n");
    const del = "[., ]+";
    const result: string[] = rows.map((row) => {
      const clear = row.replace(
        /\s(рожд|бра|смер|исп|ведо|фина|церк|рапор|реес|\(прод|\(cont|\(будет|метр|развод|birth|marr|religio|death|list|cens|alpha).{0,}$/gi,
        ""
      );
      if (/^vol.+/i.test(clear)) {
        const regex = new RegExp(
          `^Volume${del}(\\d+)-(\\d+)/([\\d\\wа-я-]+)`,
          "g"
        );
        console.log("vol", regex);
        return clear.replace(regex, "$1\t$2\t$3");
      } else if (/^ф/.test(clear)) {
        const regex = new RegExp(
          `^ф${del}(.+)${del}о${del}(.+)${del}д${del}([\\d\\wа-я-]+)`,
          "g"
        );
        return clear.replace(regex, "$1\t$2\t$3");
      } else {
        return clear;
      }
    });

    const formatted = result.join("\n");

    setCleanupRawText(formatted);
  };

  const handleRangesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const rows = value.split("\n");

    const result: string[] = [];
    rows.forEach((row) => {
      const [id, meta, dgs, f, d, c] = row.split("\t");
      const [c1, c2] = c.split("-").sort((a, b) => parseInt(a) - parseInt(b));
      result.push(`${id}\t${meta}\t${dgs}\t${f}\t${d}\t${c1}`);
      for (let i = parseInt(c1) + 1; i < parseInt(c2); i++) {
        result.push(`${id}\t${meta}\t${dgs}\t${f}\t${d}\t${i}`);
      }
      result.push(`${id}\t${meta}\t${dgs}\t${f}\t${d}\t${c2}`);
    });

    const formatted = result.join("\n");

    setRangesText(formatted);
  };

  return (
    <>
      <Heading as="h3" size="md">
        Split multiple cases
      </Heading>
      <HStack w="100vw" h="200px" id="split-multiple-cases">
        <Textarea
          w="50%"
          h="full"
          resize="none"
          placeholder={`id	archivalReferenceNumbers	dgs	raw`}
          onChange={handleSplitMultipleCasesChange}
          bg="white"
        />
        <Textarea
          w="50%"
          h="full"
          resize="none"
          placeholder={`id	archivalReferenceNumbers	dgs	raw\nid	archivalReferenceNumbers	dgs	raw\nid	archivalReferenceNumbers	dgs	raw`}
          bg="white"
          value={multipleCasesText}
          readOnly
        />
      </HStack>
      <Heading as="h3" size="md">
        Cleanup raw
      </Heading>
      <HStack w="100vw" h="200px">
        <Textarea
          w="50%"
          h="full"
          resize="none"
          placeholder={`Volume 631-3/48 (cont.) Deaths 1932 (p. 69)`}
          onChange={handleCleanupRawChange}
          bg="white"
        />
        <Textarea
          w="50%"
          h="full"
          resize="none"
          placeholder={`631	3	48`}
          bg="white"
          value={cleanupRawText}
          readOnly
        />
      </HStack>
      <Heading as="h3" size="md">
        Ranges
      </Heading>
      <HStack w="100vw" h="200px">
        <Textarea
          w="50%"
          h="full"
          resize="none"
          placeholder={`TH-909-55553-54980-83		7807280	9	1	136-137`}
          onChange={handleRangesChange}
          bg="white"
        />
        <Textarea
          w="50%"
          h="full"
          resize="none"
          placeholder={`TH-909-55553-54980-83		7807280	9	1	136\nTH-909-55553-54980-83		7807280	9	1	137`}
          bg="white"
          value={rangesText}
          readOnly
        />
      </HStack>
    </>
  );
};

export default FamilySearchProjectsUploadHelper;
