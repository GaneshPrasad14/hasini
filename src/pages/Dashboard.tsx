import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiUrl } from '@/lib/api';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(apiUrl('/api/orders/myorders'), {
                    headers: { 'x-auth-token': localStorage.getItem('token') || '' }
                });
                const data = await res.json();
                if (res.ok) setOrders(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto pt-24 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
                <Button variant="destructive" onClick={logout}>Logout</Button>
            </div>
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>My Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {orders.length === 0 ? (
                            <p>No orders yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order: any) => (
                                    <div key={order._id} className="border-b pb-4">
                                        <div className="flex justify-between">
                                            <span>Order ID: {order._id}</span>
                                            <span className="font-bold">₹{order.totalAmount}</span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Status: {order.status} | Date: {new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
