export default function ImageInFullScreen({ openViewerImage, setOpenViewerImage }) {
  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={() => setOpenViewerImage(null)}
    >
      {/* close button */}
      <button
        className="absolute top-6 right-6 text-white bg-black/50 size-10 rounded-full text-2xl cursor-pointer"
        onClick={() => setOpenViewerImage(null)}
      >
        ✕
      </button>

      {/* image */}
      <img
        src={openViewerImage}
        alt="profile"
        className="max-h-[80vh] max-w-[80vw] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
