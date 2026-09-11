import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function ImageViewer({ openViewerImage, setOpenViewerImage }) {
  return (
    <Lightbox
      open={!!openViewerImage}
      close={() => setOpenViewerImage(null)}
      slides={[
        {
          src: openViewerImage,
        },
      ]}
      plugins={[Zoom]}
      zoom={{
        maxZoomPixelRatio: 3,
        zoomInMultiplier: 2,
        doubleTapDelay: 200,
        doubleClickDelay: 200,
        scrollToZoom: true,
      }}
    />
  );
}
