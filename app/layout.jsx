import { Inter, Roboto, Poppins } from 'next/font/google';
import "./globals.css";

import Nav from './components/Nav';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

// Import Google Fonts with desired styles
const inter = Inter({
  subsets: ['latin'],
  variable: "--inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: "--roboto",
  weight: ["100", "300", "400", "500", "700", "900"]
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: "--poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata = {
  title: "Alibobo",
  description: "A Marketplace in One Place!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto.variable} antialiased`}
      >

        <Nav />

        {children}
      </body>
    </html>
  );
}
