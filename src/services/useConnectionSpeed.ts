import { useEffect, useState } from "react";

const SOURCE = "https://examplefile.com/file-download/105";
const SOURCE_SIZE = 26727984;

const getLoadMs = async () =>
  new Promise<number>((resolve) => {
    const download = new Image();
    const start = Date.now();
    download.onload = function() {
      resolve(Date.now() - start);
    };
    download.src = `${SOURCE}?stamp=${start}`;
  });

const ms2Mbps = (ms: number) => {
  const bitsLoaded = SOURCE_SIZE * 8;
  const speedMbps = ((bitsLoaded / ms * 1000) / 1024) / 1024;
  return speedMbps;
};

const useConnectionSpeed = () => {
  const [speed, setSpeed] = useState<number>(0);

  useEffect(() => {
    const run = async () => {
      const newSpeed = await getLoadMs();
      setSpeed(newSpeed);
    };
    run();
  }, []);

  return ms2Mbps(speed);
};

export default useConnectionSpeed;
