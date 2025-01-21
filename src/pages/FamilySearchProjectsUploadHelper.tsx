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
      const [id, archRef, dgs, volumes] = row.split("\t");
      if (!volumes) {
        console.log("no volumes", row);
      }
      const parts = volumes.split(/--|;/);
      parts.forEach((vol) => {
        if (!vol) {
          console.log("no parts", parts);
        }
        result.push([id, archRef, dgs, vol.trim()].join("\t"));
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
        /\s(рожд|бра|смер|исп|ведо|фина|церк|рапор|рекрут|реес|\(прод|\(cont|\(будет|\(ошибк|\(стр|метр|перепис|спис|алфав|книга|сборн|крещен|указ|статист|ревизск|посеме|divorc|развод|birth|marr|religio|death|list|cens|alpha|revision).{0,}$/gi,
        ""
      );
      if (/^vol.+/i.test(clear)) {
        const regex = new RegExp(
          `^Volume${del}(\\d+)-(\\d+)/([\\d\\wа-я-]+)`,
          "gi"
        );
        // console.log("vol", regex);
        return clear.replace(regex, "$1\t$2\t$3");
      } else if (/^фонд/i.test(clear)) {
        const regex = new RegExp(
          `^фонд${del}([\\dа-я\\w]+)${del}опись${del}([\\dа-я]+)${del}дело${del}([\\d\\wа-я-]+)`,
          "gi"
        );
        // console.log("фонд", regex);
        return clear.replace(regex, "$1\t$2\t$3");
      } else if (/^ф/i.test(clear)) {
        const regex = new RegExp(
          `^ф${del}([\\dа-я\\w]+)${del}о${del}([\\dа-я]+)${del}д${del}([\\d\\wа-я-]+)`,
          "gi"
        );
        // console.log("фонд", regex);
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
      const parts = c.split(/,|;/).map((part) => part.trim());
      for (const part of parts) {
        const [c1, c2] = part.split("-").sort((a, b) => parseInt(a) - parseInt(b));
        result.push(`${id}\t${meta}\t${dgs}\t${f}\t${d}\t${c1}`);
        for (let i = parseInt(c1) + 1; i < parseInt(c2); i++) {
          result.push(`${id}\t${meta}\t${dgs}\t${f}\t${d}\t${i}`);
        }
        if (c2) {
          result.push(`${id}\t${meta}\t${dgs}\t${f}\t${d}\t${c2}`);
        }
      }
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
          placeholder={`id\tarchRef\tdgs\tvolumes`}
          onChange={handleSplitMultipleCasesChange}
          bg="white"
        />
        <Textarea
          w="50%"
          h="full"
          resize="none"
          placeholder={`id\tarchRef\tdgs\tvolume\nid\tarchRef\tdgs\tvolume\nid\tarchRef\tdgs\tvolume`}
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
          placeholder={`TH-909-55553-54980-83		7807280	9	1	136-137, 139-140`}
          onChange={handleRangesChange}
          bg="white"
        />
        <Textarea
          w="50%"
          h="full"
          resize="none"
          placeholder={`TH-909-55553-54980-83		7807280	9	1	136\nTH-909-55553-54980-83		7807280	9	1	137\nTH-909-55553-54980-83		7807280	9	1	139\nTH-909-55553-54980-83		7807280	9	1	140`}
          bg="white"
          value={rangesText}
          readOnly
        />
      </HStack>
    </>
  );
};

export default FamilySearchProjectsUploadHelper;
