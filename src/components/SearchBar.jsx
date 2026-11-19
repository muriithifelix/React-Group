export default function SearchBar({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="search" className="form-label">Search products</label>
      <input id="search" type="search" className="form-input" placeholder="Search by name"
        value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
