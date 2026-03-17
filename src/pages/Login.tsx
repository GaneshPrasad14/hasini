import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { apiUrl } from '@/lib/api';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', username: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUserSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        try {
            const res = await fetch(apiUrl(endpoint), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                login(data.user, data.token);
                toast.success(isLogin ? 'Login successful' : 'Registration successful');
                navigate('/dashboard');
            } else {
                toast.error(data.msg || 'Something went wrong');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    const handleAdminSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(apiUrl('/api/auth/admin/login'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: formData.username, password: formData.password })
            });
            const data = await res.json();
            if (res.ok) {
                login(data.admin, data.token);
                toast.success('Admin login successful');
                navigate('/admin');
            } else {
                toast.error(data.msg || 'Invalid credentials');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 pt-20">
            <Card className="w-[400px]">
                <Tabs defaultValue="user">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="user">User</TabsTrigger>
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                    </TabsList>
                    <TabsContent value="user">
                        <CardHeader>
                            <CardTitle>{isLogin ? 'User Login' : 'User Register'}</CardTitle>
                            <CardDescription>
                                {isLogin ? 'Enter your credentials to login' : 'Create a new account'}
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleUserSubmit}>
                            <CardContent className="space-y-4">
                                {!isLogin && (
                                    <div className="space-y-2">
                                        <label>Name</label>
                                        <Input name="name" onChange={handleChange} required />
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <label>Email</label>
                                    <Input name="email" type="email" onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <label>Password</label>
                                    <Input name="password" type="password" onChange={handleChange} required />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-4">
                                <Button type="submit" className="w-full">{isLogin ? 'Login' : 'Register'}</Button>
                                <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm text-blue-600">
                                    {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                                </button>
                            </CardFooter>
                        </form>
                    </TabsContent>
                    <TabsContent value="admin">
                        <CardHeader>
                            <CardTitle>Admin Login</CardTitle>
                            <CardDescription>Enter your admin credentials</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleAdminSubmit}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label>Username</label>
                                    <Input name="username" onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <label>Password</label>
                                    <Input name="password" type="password" onChange={handleChange} required />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full">Login as Admin</Button>
                            </CardFooter>
                        </form>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
};

export default Login;
