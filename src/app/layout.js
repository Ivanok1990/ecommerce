import { CartProvider } from '@/app/context/CartContext'; // Adjust the path as needed
import './styles/globals.css';

export default function RootLayout({ children }) {
    return (
        <html lang="es">
        <body>
        <CartProvider>
            {children}
        </CartProvider>
        </body>
        </html>
    );
}