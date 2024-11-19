// Layout.jsx
// export function Layout({ children }) {
//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto min-h-[calc(100vh-4rem)] px-4 py-4 md:py-8"> {/* Reduced padding */}
//         <div className="h-full rounded-lg bg-white p-5">
//           <div className="h-full rounded-lg bg-[#f8f9fa] overflow-y-auto p-6">
//             <div className="flex items-center justify-center min-h-full">
//               {children}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// Layout.jsx
// export function Layout({ children }) {
//   return (
//     <div className="min-h-[calc(100vh-4rem)] w-full bg-background pt-16">
//       <div className="container mx-auto px-4 py-4 md:py-8">
//         <div className="rounded-lg bg-white p-5">
//           <div className="rounded-lg bg-[#f8f9fa] p-6">
//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// Layout.jsx
export function Layout({ children }) {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="rounded-lg bg-white p-5">
        <div className="rounded-lg bg-[#f8f9fa] p-6">
          {children}
        </div>
      </div>
    </div>
  );
}