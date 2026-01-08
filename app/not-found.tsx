import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md">
        <h1 className="text-6xl mb-4">😕</h1>
        <h2 className="text-3xl font-semibold mb-2">Page not found</h2>
        <p className="text-gray-200/90 mb-6">We couldn't find the page you're looking for. It may have been moved or removed.</p>
        <Link href="/" className="inline-block bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">Go back home</Link>
      </div>
    </main>
  );
}
