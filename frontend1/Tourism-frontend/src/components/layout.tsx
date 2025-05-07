import Navbar from './Navbar';
import React from 'react';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
    hideFooter?: boolean;
}

const Layout = ({ children, hideFooter = false }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            {!hideFooter && <Footer />}
        </div>
    );
};

export default Layout;
