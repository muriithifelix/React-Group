
export default function CategoryFilter({
  categories = [],
  selected = "All",
  onSelect,
}) {
  const categoryNames = categories
    .map((item) =>
      typeof item === "string"
        ? item
        : item.name || item.title || item.category
    )
    .filter(Boolean);

  const uniqueCategories = [...new Set(categoryNames)];

  const options = ["All", ...uniqueCategories];

  return (
    <div className="flex flex-col gap-2">
      {options.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(item)}
          className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
            selected === item
              ? "bg-violet-700 text-white shadow-sm"
              : "bg-gray-50 text-gray-700 hover:bg-violet-50 hover:text-violet-700"
          }`}
        >
          {item === "All" ? "All Categories" : item}
        </button>
      ))}
    </div>
  );
}
