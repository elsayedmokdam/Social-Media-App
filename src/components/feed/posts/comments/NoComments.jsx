export default function NoComments() {
  return (
    <div className=" border-neutral-200 rounded-3xl  bg-white py-7">
      <div className="flex flex-col items-center gap-3">
        <span className="text-blue-500 bg-blue-200  p-2 rounded-full text-3xl">
          <i className="fa-regular fa-comment"></i>
        </span>
        <div>
          <h5 className="font-bold text-xl mb-1">No comments yet</h5>
          <h6 className="text-neutral-400">Be the first to comment.</h6>
        </div>
      </div>
    </div>
  );
}
