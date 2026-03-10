export default function AppSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center gap-2">
      <p className="text-sm">Refreshing your timeline...</p>
      <i>
        <i className="fa-solid fa-spinner animate-spin"></i>
      </i>
    </div>
  );
}
