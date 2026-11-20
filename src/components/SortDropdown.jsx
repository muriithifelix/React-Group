export default function SortDropdown({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="sort-products" className="form-label">
        Sort products
      </label>

      <select
        id="sort-products"
        className="form-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="default">Default order</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
        <option value="name-a-z">Name: A to Z</option>
      </select>
    </div>
  );
}
