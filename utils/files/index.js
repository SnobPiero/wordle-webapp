import FileSaver from "file-saver";

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

// available category:
// - text
// - pdf
// - doc
// - xls
// - csv
// - ppt
// - image
// - video
// - audio
// - zip
const supportedMimeType = [
  // text
  { mimeType: "text/plain", extension: [".txt"], category: "text" },
  { mimeType: "application/rtf", extension: [".rtf"], category: "text" },
  { mimeType: "text/xml", extension: [".xml"], category: "text" },
  { mimeType: "text/html", extension: [".htm", ".html"], category: "text" },
  { mimeType: "text/calendar", extension: [".ics"], category: "text" },
  { mimeType: "application/json", extension: [".json"], category: "text" },
  { mimeType: "application/ld+json", extension: [".jsonld"], category: "text" },
  { mimeType: "application/vnd.visio", extension: [".vsd"], category: "text" },

  // pdf
  { mimeType: "application/pdf", extension: [".pdf"], category: "pdf" },

  // doc
  { mimeType: "application/msword", extension: [".doc"], category: "doc" },
  {
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    extension: [".docx"],
    category: "doc",
  },
  { mimeType: "application/vnd.oasis.opendocument.text", extension: [".odt"], category: "doc" },

  // xls
  { mimeType: "application/vnd.ms-excel", extension: [".xls"], category: "xls" },
  { mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", extension: [".xlsx"], category: "xls" },
  { mimeType: "application/vnd.oasis.opendocument.spreadsheet", extension: [".ods"], category: "xls" },

  // csv
  { mimeType: "text/csv", extension: [".csv"], category: "csv" },

  // ppt
  { mimeType: "application/vnd.ms-powerpoint", extension: [".ppt"], category: "ppt" },
  {
    mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    extension: [".pptx"],
    category: "ppt",
  },
  { mimeType: "application/vnd.oasis.opendocument.presentation", extension: [".odp"], category: "ppt" },

  // image
  { mimeType: "image/jpeg", extension: [".jpeg", ".jpg"], category: "image" },
  { mimeType: "image/png", extension: [".png"], category: "image" },
  { mimeType: "image/bmp", extension: [".bmp"], category: "image" },
  { mimeType: "image/gif", extension: [".gif"], category: "image" },
  { mimeType: "image/svg+xml", extension: [".svg"], category: "image" },
  { mimeType: "image/tiff", extension: [".tif", ".tiff"], category: "image" },
  { mimeType: "image/webp", extension: [".webp"], category: "image" },

  // video
  { mimeType: "video/mpeg", extension: [".mpeg"], category: "video" },
  { mimeType: "video/mp4", extension: [".mp4"], category: "video" },
  { mimeType: "video/x-msvideo", extension: [".avi"], category: "video" },
  { mimeType: "video/webm", extension: [".webm"], category: "video" },

  // audio
  { mimeType: "audio/aac", extension: [".aac"], category: "audio" },
  { mimeType: "audio/mpeg", extension: [".mp3"], category: "audio" },
  { mimeType: "audio/wav", extension: [".wav"], category: "audio" },
  { mimeType: "audio/webm", extension: [".weba"], category: "audio" },

  // zip
  { mimeType: "application/zip", extension: [".zip"], category: "zip" },
  { mimeType: "application/x-7z-compressed", extension: [".7z"], category: "zip" },
  { mimeType: "application/vnd.rar", extension: [".rar"], category: "zip" },
  { mimeType: "application/x-tar", extension: [".tar"], category: "zip" },
  { mimeType: "application/gzip", extension: [".gz"], category: "zip" },
  { mimeType: "application/x-bzip", extension: [".bz"], category: "zip" },
  { mimeType: "application/x-bzip2", extension: [".bz2"], category: "zip" },
];

const openfile = (file) => {
  //file deve essere un Blob
  const fileURL = URL.createObjectURL(file);
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  window.open(fileURL);
};

const downloadfile = (file, filename) => {
  //file deve essere un Blob
  FileSaver.saveAs(file, filename);
};

export { formatBytes, supportedMimeType, openfile, downloadfile };
