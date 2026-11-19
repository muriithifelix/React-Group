export default function CategoryFilter({ categories = [], selected, onSelect }) {
  const all = ["All", ...categories.map((c) => c.name)];
  return (
    <div>
      <p className="form-label mb-2">Category</p>
      <div className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
        {all.map((name) => (
          <button key={name} onClick={() => onSelect(name)} aria-pressed={selected === name}
            className={`${selected === name ? "btn-primary" : "btn-secondary"} btn-sm lg:justify-start`}>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
