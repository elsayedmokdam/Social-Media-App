import { useState } from "react";

export function useImageInFullScreen() {
  const [openViewerImage, setOpenViewerImage] = useState(null);

  return { openViewerImage, setOpenViewerImage };
}
