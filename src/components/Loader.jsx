export default function Loader({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16" role="status">
      <div className="spinner" />
      <span className="text-sm text-slate-500">{label}</span>
    </div>
  );
}
