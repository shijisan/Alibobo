import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import ClientSessionProvider from "@/components/ClientSessionProvider"; // Import the new ClientSessionProvider

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Alibobo",
  description: "An e-commerce marketplace for people that are not bobo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <ClientSessionProvider>
          <NavBar />
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
