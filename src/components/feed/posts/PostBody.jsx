import { useState } from "react";
import Avatar from "../../../assets/images/avatar-generations_rpge.jpg";
import { $HOOKS_REPOSITORY } from "../../../hooks/hooks_repository";
import ImageInFullScreen from "../../shared-components/images/ImageInFullScreen";

export default function PostBody({ postBody = {} }) {
  const { openViewerImage, setOpenViewerImage } =
    $HOOKS_REPOSITORY.useImageInFullScreen();

  const { content, image } = postBody;

  const [showFullText, setShowFullText] = useState(false);
  const textLimit = 150;

  const hasLongText = content?.length > textLimit;

  const displayedText = showFullText ? content : content?.slice(0, textLimit);

  return (
    <>
      {openViewerImage && (
        <ImageInFullScreen
          openViewerImage={openViewerImage}
          setOpenViewerImage={setOpenViewerImage}
        />
      )}

      <div className="mt-5 wrap-break-word">
        {content && (
          <p className="text-sm mb-2 leading-relaxed">
            {displayedText}
            {hasLongText && !showFullText && "..."}
          </p>
        )}

        {hasLongText && (
          <button
            onClick={() => setShowFullText(!showFullText)}
            className="text-blue-500 text-xs font-semibold mb-3 cursor-pointer"
          >
            {showFullText ? "Show less" : "Show more"}
          </button>
        )}

        {image && image !== "undefined" && (
          <div
            onClick={() => setOpenViewerImage(image)}
            className="w-full overflow-hidden rounded-lg cursor-pointer border border-neutral-100 flex items-center justify-center max-h-125"
          >
            <img
              src={image || Avatar}
              alt="Post"
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </>
  );
}
