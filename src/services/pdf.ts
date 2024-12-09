import { throttle } from "lodash";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const MIN_SIZE = 2000;

const getOptimalViewport = (page: pdfjsLib.PDFPageProxy) => {
  const viewport = page.getViewport({ scale: 1 });
  const scale = Math.ceil(
    Math.min(MIN_SIZE / viewport.width, MIN_SIZE / viewport.height)
  );
  return page.getViewport({ scale });
};

export const getPdfDocumentFromFile = async (
  pdfFile: File,
  onProgress?: (percent: number) => void
) => {
  const now = Date.now();
  const reader = new FileReader();
  reader.readAsArrayBuffer(pdfFile);
  const data = await new Promise<ArrayBufferLike>((resolve) => {
    reader.onload = () => {
      resolve(reader.result as ArrayBufferLike);
    };
  });
  const pdfData = new Uint8Array(data);
  const getDocumentTask = pdfjsLib.getDocument(pdfData);
  if (onProgress) {
    getDocumentTask.onProgress = throttle(
      ({ loaded, total }: pdfjsLib.OnProgressParameters) => {
        const percent = (loaded / total) * 100;
        onProgress(percent);
      },
      1000
    );
  }
  const result = await getDocumentTask.promise;
  const name = pdfFile.name?.replace(/_/g, " ");
  const pdfTime = Date.now() - now;

  return { result, name, ms: { pdf: pdfTime } };
};

export const getPdfDocumentFromUrl = async (
  url: string,
  onProgress?: (percent: number) => void
) => {
  const now = Date.now();
  const getDocumentTask = pdfjsLib.getDocument(url);
  if (onProgress) {
    getDocumentTask.onProgress = throttle(
      ({ loaded, total }: pdfjsLib.OnProgressParameters) => {
        const percent = (loaded / total) * 100;
        onProgress(percent);
      },
      1000
    );
  }
  const result = await getDocumentTask.promise;
  const name = url.split("/").pop()?.replace(/_/g, " ");
  const pdfTime = Date.now() - now;

  return { result, name, ms: { pdf: pdfTime } };
};

export const convertPdfDocumentToImages = async (
  pdf: pdfjsLib.PDFDocumentProxy,
  start: number,
  end: number,
  onProgress?: (percent: number) => void
) => {
  const a = document.createElement("a");
  document.body.appendChild(a);
  let viewportTime = 0;
  let renderTime = 0;
  let downloadTime = 0;
  for (let i = start; i <= end; i++) {
    const page = await pdf.getPage(i);
    const now_viewport = Date.now();
    const viewport = getOptimalViewport(page);
    viewportTime += Date.now() - now_viewport;
    const canvas = document.createElement("canvas");
    canvas.id = `page-${i}`;
    const context = canvas.getContext("2d");
    if (context) {
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const now_render = Date.now();
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
      renderTime += Date.now() - now_render;
      const now_download = Date.now();
      // download the image
      a.href = canvas.toDataURL("image/jpeg");
      a.download = `${i.toString().padStart(5, "0")}.jpg`;
      a.click();
      downloadTime += Date.now() - now_download;
      // document.getElementById("pages")?.appendChild(canvas);
    }
    if (onProgress) {
      const percent = (((i - start) || 1) / ((end - start) || 1)) * 100;
      onProgress(percent);
    }
  }
  document.body.removeChild(a);
  return {
    ms: {
      viewport: viewportTime,
      render: renderTime,
      download: downloadTime,
    },
  };
};
