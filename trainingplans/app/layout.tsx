
"use client"
import "./globals.css";
import AuthNavbar from "./components/AuthNavbar"
import { AuthProvider } from "./contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <AuthProvider>
    <html lang="en" className="h-full">
      <body className="h-full">
        <div className="min-h-full flex flex-col">
          <header className="flex items-center justify-between p-8 background black">
            <div className="ml-20">logo</div>
            <ul className="flex items-center gap-5">
              <li><a href={"/"}>Главная</a></li>
              <li><a href={"/preparedplans"}>Планы</a></li>
              <li><a href={"/myplans"}>Мои планы</a></li>
              <li><a href={"/favoriteplans"}>Избранные планы</a></li>
              <li><a href={"/plansconstructor"}>Создать план</a></li>
              <li><a href={"/chat"}>Чат</a></li>
            </ul>
            <AuthNavbar/>
          </header>
          <main className="flex-1 h-full">
            {children}
          </main>
          <footer className="flex items-center flex-col border-t-8 border-blue-950">
            <ul className="p-10 flex items-center justify-center gap-4">
              <li>VK</li>
              <li>TG</li>
              <li>YT</li>
              <li>DS</li>
            </ul>
            <ul className="p-1 flex items-center justify-between gap-x-96">
              <li>Copyright © 2023-2025</li>
              <li>No rights reserved.</li>
            </ul>       
          </footer>
        </div>
      </body>
    </html>
    </AuthProvider>
  );
}
