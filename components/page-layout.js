import Navbar from './navbar.js';
import Footer from './footer.js';

export default function PageLayout({ children }) {
    return (
        <>
        <Navbar />
        {children}
        <Footer />
        </>
    )
    }



