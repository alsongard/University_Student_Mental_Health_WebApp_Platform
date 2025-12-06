export default function ErrorpPage()
{
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
                <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
                    <div className="text-7xl font-extrabold text-red-600">404</div>
                    <h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">Error Page 404 Not found</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">The page you requested could not be found.</p>
                    <div className="mt-6 flex justify-center gap-3">
                        <a
                            href="/"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                        >
                            Go to Home
                        </a>
                        <button
                            onClick={() => window.history.back()}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}