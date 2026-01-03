import React from 'react';
export default function TableRowSkeleton() {
    return (
        <>

        {/* Show 3-5 skeleton rows while loading */}
        {[1, 2].map((index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
            {/* Date & Time Column */}
            <td className="px-6 py-4">
                <div className="space-y-2">
                <div className="h-5 w-28 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </td>
            
            {/* Session Type Column */}
            <td className="px-6 py-4">
                <div className="h-5 w-36 bg-gray-200 rounded animate-pulse"></div>
            </td>
            
            {/* Session Mode Column */}
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </td>
            
            {/* Duration Column */}
            <td className="px-6 py-4">
                <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
            </td>
            
            {/* Status Column */}
            <td className="px-6 py-4">
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            </td>
            
            {/* Bookings Column */}
            <td className="px-6 py-4">
                <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
            </td>
            
            {/* Actions Column */}
            <td className="px-6 py-4">
                <div className="flex items-center justify-end space-x-2">
                <div className="h-9 w-9 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-9 w-9 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-9 w-9 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
            </td>
            </tr>
        ))}
        </>
  );
}

// USAGE EXAMPLE:
// In your table component, you can use it like this:
/*
<table>
  <thead>
    // ... your table headers
  </thead>
  <tbody>
    {isLoading ? (
      <TableRowSkeleton />
    ) : (
      sessions.map((session) => (
        <tr key={session._id}>
          // ... your actual table row content
        </tr>
      ))
    )}
  </tbody>
</table>
*/