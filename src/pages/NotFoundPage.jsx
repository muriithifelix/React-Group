import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="page-container page-section">
      <div className="empty-state">
        <h1>Page not found</h1>
        <p>The address may be wrong, or the page has moved.</p>
        <Link to="/" className="btn-primary text-white hover:text-white">Go home</Link>
      </div>
    </div>
  );
}
