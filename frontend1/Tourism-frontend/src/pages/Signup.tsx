
import { useState, useEffect } from 'react';
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from './lib/auth-context';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { UserPlus, User, Building } from 'lucide-react';
import Layout from '../components/layout';
import { useToast } from '../components/ui/use-toast';
import axios from 'axios';
import 'react-phone-input-2/lib/style.css';


import PhoneInput from "react-phone-input-2";

interface FormData {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  role:UserRole;

}

const Signup:React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  
  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get('role') as UserRole || 'tourist';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<UserRole>(initialRole);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const [formData,setFormData] = useState<FormData>({
  username: "",
  email: "",
  phoneNumber: "",
  password: "",
  role: role,
  })

  


  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const payload = {
      name: name,
      email: email,
      password: password,
      phone: phoneNumber,
      role: role.toUpperCase(),
    };
  
    axios
      .post('http://localhost:8200/Tourism/v1/auth/register', payload)
      .then(() => {
        console.log("Signup was successful");
        navigate('/login');
      })
      .catch((err) => {
        if (err.response) {
          console.error("Error response:", err.response.data);
        } else if (err.request) {
          console.error("Error request:", err.request);
        } else {
          console.error("Error message:", err.message);
        }
      })
      .finally(() => setIsSubmitting(false));
  };
  
  

  return (
    <Layout hideFooter>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50">
        <div className="w-full max-w-md px-4 py-8">
          <Card className="border-0 shadow-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
              <CardDescription>
                Join our platform to explore and book amazing experiences
              </CardDescription>
            </CardHeader>
            
            <Tabs defaultValue={role} onValueChange={(value) => {
              const newRole = value as UserRole;
              setRole(newRole);
              setFormData((prev) => ({ ...prev, role: newRole }));
              setRole(value as UserRole)}}>
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="Tourist">
                  <User className="h-4 w-4 mr-2" /> Tourist
                </TabsTrigger>
                <TabsTrigger value="Company">
                  <Building className="h-4 w-4 mr-2" /> Company
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="Tourist">
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tourist-name">Full Name</Label>
                      <Input
                        id="tourist-name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tourist-email">Email</Label>
                      <Input
                        id="tourist-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tourist-phone">Phone Number</Label>

      <PhoneInput
        country={'rw'} // Preselect Rwanda (+250)
        enableSearch={true} // Enable search in dropdown
        value={phoneNumber}
        onChange={(value, data) => {
          const nationalNumber = value.slice(data.dialCode.length);
          if (nationalNumber.length <= 12 && nationalNumber.length>=4 ) {
            setPhoneNumber(value);
          }
        }}
        inputProps={{
          name: 'phone',
          required: true,
          autoFocus: true,
        }}
        inputStyle={{
          width: '100%',
          height: '40px',
          border: '2px solid #e2e8f0',
          borderRadius: '8px',
          padding: '0 10px 0 50px', // Space for flag and code
          fontSize: '16px',
          fontFamily: 'Inter, sans-serif',
          backgroundColor: '#f7fafc',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        containerStyle={{
          width: '100%',
          maxWidth: '400px', // Limit width for better UX
          margin: '10px 0',
        }}
        buttonStyle={{
          border: '2px solid #e2e8f0',
          borderRight: 'none',
          borderRadius: '8px 0 0 8px',
          backgroundColor: '#ffffff',
          padding: '0 10px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
        }}
        dropdownStyle={{
          maxHeight: '250px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
          fontFamily: 'Inter, sans-serif',
        }}
        countryCodeEditable={false}
        placeholder="Enter phone number"
        preferredCountries={['rw', 'us', 'cn']} // Prioritize Rwanda, USA, China
      />
    </div>
 

                    
                    
              

                  
                    
                    
                    <div className="space-y-2">
                      <Label htmlFor="tourist-password">Password</Label>
                      <Input
                        id="tourist-password"
                        type="password"
                        placeholder="••••••••"
                        name=''
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    
                   
                    
                    <Button
                      type="submit"
                      className="w-full bg-tourism-purple hover:bg-tourism-dark-purple"
                      disabled={isSubmitting}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      {isSubmitting ? 'Signing up...' : 'Sign up as Tourist'}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="Company">
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input
                        id="company-name"
                        placeholder="Adventure Tours Inc."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company-email">Email</Label>
                      <Input
                        id="company-email"
                        type="email"
                        placeholder="company@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>


                    <div className="space-y-2">
                      <Label htmlFor="tourist-email">Phone Number</Label>
                      <PhoneInput
        country={'rw'} // Preselect Rwanda (+250)
        enableSearch={true} // Enable search in dropdown
        value={phoneNumber}
        onChange={(value, data) => {
          const nationalNumber = value.slice(data.dialCode.length);
          if (nationalNumber.length <= 12 && nationalNumber.length>=4 ) {
            setPhoneNumber(value);
          }
        }}
        inputProps={{
          name: 'phone',
          required: true,
          autoFocus: true,
        }}
        inputStyle={{
          width: '100%',
          height: '40px',
          border: '2px solid #e2e8f0',
          borderRadius: '8px',
          padding: '0 10px 0 50px', // Space for flag and code
          fontSize: '16px',
          fontFamily: 'Inter, sans-serif',
          backgroundColor: '#f7fafc',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        containerStyle={{
          width: '100%',
          maxWidth: '400px', // Limit width for better UX
          margin: '10px 0',
        }}
        buttonStyle={{
          border: '2px solid #e2e8f0',
          borderRight: 'none',
          borderRadius: '8px 0 0 8px',
          backgroundColor: '#ffffff',
          padding: '0 10px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
        }}
        dropdownStyle={{
          maxHeight: '250px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
          fontFamily: 'Inter, sans-serif',
        }}
        countryCodeEditable={false}
        placeholder="Enter phone number"
        preferredCountries={['rw', 'us', 'cn']} // Prioritize Rwanda, USA, China
      />
    
                    </div>


                  

                 

                    <div className="space-y-2">
                      <Label htmlFor="company-password">Password</Label>
                      <Input
                        id="company-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    
                    
                    
                    <Button
                      type="submit"
                      className="w-full bg-tourism-blue hover:bg-blue-600"
                      disabled={isSubmitting}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      {isSubmitting ? 'Signing up...' : 'Sign up as Company'}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
            </Tabs>
            
            <CardFooter className="flex flex-col space-y-4 mt-4">
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-tourism-purple hover:underline font-medium">
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
