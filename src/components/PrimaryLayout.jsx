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