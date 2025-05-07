import { useState, useEffect } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useUser } from '../pages/lib/user-context';
import {
    User,
    LogOut,
    LogIn,
    Menu,
    X,
    Building,
    MapPin,
    LayoutDashboard
} from 'lucide-react';

const Navbar = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate('/');
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 w-full">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-tourism-purple">
                        <MapPin className="h-6 w-6" strokeWidth={2.5} />
                        <span className="text-xl font-bold">TravelVista</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-gray-600 hover:text-tourism-purple transition-colors">Home</Link>
                        <Link to="/attractions" className="text-gray-600 hover:text-tourism-purple transition-colors">Attractions</Link>
                        {user ? (
                            <>
                                <Link to={`/${user.role.toLowerCase()}-dashboard`} className="text-gray-600 hover:text-tourism-purple transition-colors">Dashboard</Link>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-500">
                                        {user.role === "TOURIST" ? <User className="inline-block h-4 w-4 mr-1" /> : <Building className="inline-block h-4 w-4 mr-1" />}
                                        {user.name}
                                    </span>
                                    <Button variant="outline" size="sm" onClick={handleLogout} className="border-tourism-purple text-tourism-purple hover:bg-tourism-soft-purple">
                                        <LogOut className="h-4 w-4 mr-1" /> Logout
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={() => navigate('/login')} className="border-tourism-purple text-tourism-purple hover:bg-tourism-soft-purple">
                                    <LogIn className="h-4 w-4 mr-1" /> Login
                                </Button>
                                <Button size="sm" onClick={() => navigate('/signup')} className="bg-tourism-purple hover:bg-tourism-dark-purple text-white">
                                    <User className="h-4 w-4 mr-1" /> Signup
                                </Button>
                            </div>
                        )}
                    </div>

                    <button className="md:hidden text-gray-600 focus:outline-none" onClick={toggleMobileMenu}>
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg pb-4 px-4">
                    <div className="flex flex-col gap-3">
                        <Link to="/" className="px-2 py-2 text-tourism-purple hover:bg-tourism-soft-purple rounded-md transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                        <Link to="/attractions" className="px-2 py-2 text-tourism-purple hover:bg-tourism-soft-purple rounded-md transition-colors" onClick={() => setMobileMenuOpen(false)}>Attractions</Link>
                        {user ? (
                            <>
                                <Link to={`/${user.role.toLowerCase()}-dashboard`} className="px-2 py-2 text-tourism-purple hover:bg-tourism-soft-purple rounded-md transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                    <LayoutDashboard className="h-4 w-4 inline-block mr-2" />Dashboard
                                </Link>
                                <div className="px-2 py-2 text-sm text-gray-500">
                                    {user.role === "TOURIST" ? <User className="inline-block h-4 w-4 mr-1" /> : <Building className="inline-block h-4 w-4 mr-1" />}
                                    {user.name}
                                </div>
                                <Button variant="outline" size="sm" onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="border-tourism-purple text-tourism-purple hover:bg-tourism-soft-purple">
                                    <LogOut className="h-4 w-4 mr-2" /> Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" size="sm" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="border-tourism-purple text-tourism-purple hover:bg-tourism-soft-purple">
                                    <LogIn className="h-4 w-4 mr-2" /> Login
                                </Button>
                                <Button size="sm" onClick={() => { navigate('/signup'); setMobileMenuOpen(false); }} className="bg-tourism-purple hover:bg-tourism-dark-purple text-white">
                                    <User className="h-4 w-4 mr-2" /> Signup
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;