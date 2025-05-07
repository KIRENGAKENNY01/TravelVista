import { Link } from 'react-router-dom';
import React from 'react';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-10 mt-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div>
                        <Link to="/" className="flex items-center gap-2 text-tourism-purple">
                            <MapPin className="h-6 w-6" />
                            <span className="text-xl font-bold">TravelVista</span>
                        </Link>
                        <p className="mt-4 text-gray-600">
                            Discover amazing destinations and experiences with our curated selection of attractions.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-600 hover:text-tourism-purple transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-tourism-purple transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-tourism-purple transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-tourism-purple transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/attractions" className="text-gray-600 hover:text-tourism-purple transition-colors">
                                    Attractions
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-gray-600 hover:text-tourism-purple transition-colors">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" className="text-gray-600 hover:text-tourism-purple transition-colors">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">For Tourists</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/tourist-dashboard" className="text-gray-600 hover:text-tourism-purple transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/attractions" className="text-gray-600 hover:text-tourism-purple transition-colors">
                                    Book Tickets
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-tourism-purple transition-colors">
                                    Write Reviews
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-tourism-purple" />
                                <span className="text-gray-600">
                  123 Tourism Street, Travel City, TC 12345
                </span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 mr-2 text-tourism-purple" />
                                <span className="text-gray-600">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 mr-2 text-tourism-purple" />
                                <span className="text-gray-600">info@travelvista.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
                    <p>© 2023 TravelVista. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
