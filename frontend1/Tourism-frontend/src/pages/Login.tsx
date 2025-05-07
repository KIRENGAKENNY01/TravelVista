
  import { useState, useEffect } from 'react';
  import React from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { UserRole } from './lib/auth-context';
  import { Button } from '../components/ui/button';
  import { Input } from '../components/ui/input';
  import { Label } from '../components/ui/label';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
  import { LogIn, User, Building } from 'lucide-react';
  import Layout from '../components/layout';
  import axios from 'axios'
  import { useUser } from './lib/user-context';


  interface FormData{
    email:string,
    password:string
  }

  const Login:React.FC = () => {
    const navigate = useNavigate();
    const [formData,setFormData]=useState<FormData>({
      email:'',
      password:''
    })

    const queryParams = new URLSearchParams(location.search);
      const initialRole = queryParams.get('role') as UserRole || 'tourist';
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>(initialRole);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUser } = useUser();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
    
      const payload = {
        email: email,
        password: password,
        role: role.toUpperCase(),
      };
    
      axios
        .post('http://localhost:8200/Tourism/v1/auth/login', payload)
        .then((response) => {
          console.log("Login was successful");

          const userRole = response.data.role;
          const userName = response.data.name;

          setUser({
            name: userName,
            role: userRole,
            email,
            id: response.data.id // or empty if not available
          });

          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role',response.data.role);
          localStorage.setItem('name',response.data.name);
          localStorage.setItem('email',response.data.email)
          // console.log(response.data.token); 
      

        
    
          // Redirect based on user role
          if (userRole === "COMPANY") {
            navigate('/company-dashboard');
          } else if (userRole === "TOURIST") {
            navigate('/tourist-dashboard');
          } else {
            console.warn("Unknown role, redirecting to fallback page.");
            navigate('/');
          }
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
                <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
              </CardHeader>
              
              <Tabs defaultValue="tourist" onValueChange={(value) =>  {
                            const newRole = value as UserRole;
                            setRole(newRole);
                            setFormData((prev) => ({ ...prev, role: newRole }));
                            }}>
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger value="tourist">
                    <User className="h-4 w-4 mr-2" /> Tourist
                  </TabsTrigger>
                  <TabsTrigger value="company">
                    <Building className="h-4 w-4 mr-2" /> Company
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="tourist">
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                        <div className="flex items-center justify-between">
                          <Label htmlFor="tourist-password">Password</Label>
                          <Link to="/forgot-password" className="text-sm text-tourism-purple hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="tourist-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-tourism-purple hover:bg-tourism-dark-purple"
                        disabled={isSubmitting}
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        {isSubmitting ? 'Logging in...' : 'Login as Tourist'}
                      </Button>
                      
                      {/* Demo account for easy testing */}
                      <div className="text-center text-sm text-gray-500">
                        <p>Demo account: tourist@example.com</p>
                      </div>
                    </form>
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="company">
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                        <div className="flex items-center justify-between">
                          <Label htmlFor="company-password">Password</Label>
                          <Link to="/forgot-password" className="text-sm text-tourism-purple hover:underline">
                            Forgot password?
                          </Link>
                        </div>
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
                        <LogIn className="h-4 w-4 mr-2" />
                        {isSubmitting ? 'Logging in...' : 'Login as Company'}
                      </Button>
                      
                      {/* Demo account for easy testing */}
                      <div className="text-center text-sm text-gray-500">
                        <p>Demo account: company@example.com</p>
                      </div>
                    </form>
                  </CardContent>
                </TabsContent>
              </Tabs>
              
              <CardFooter className="flex flex-col space-y-4 mt-4">
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-tourism-purple hover:underline font-medium">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Layout>
    );
  };

  export default Login;
