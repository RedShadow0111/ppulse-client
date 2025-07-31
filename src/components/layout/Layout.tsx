// app/layout.tsx
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="h-16 border-b bg-white flex items-center px-4">
            <h1 className="text-xl font-bold">PPM Suite</h1>
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}