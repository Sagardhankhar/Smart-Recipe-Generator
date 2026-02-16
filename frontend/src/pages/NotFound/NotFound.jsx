import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-10 text-center">
      <h2 className="text-4xl font-bold text-red-600">404</h2>
      <p className="mt-2 text-gray-600">Page Not Found</p>

      <Link
        to="/"
        className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
      >
        Go Home
      </Link>
    </div>
  );
}
