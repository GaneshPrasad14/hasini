import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Plus, 
  Pencil, 
  Trash2, 
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiUrl, imgUrl } from '@/lib/api';

const API_URL = apiUrl('/api');

const AdminDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0 });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    // Form states
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [formData, setFormData] = useState({ 
        name: '', 
        description: '', 
        price: '', 
        category: '', 
        stock: '' 
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            console.log('Fetching data from:', API_URL);
            const [prodRes, orderRes, statsRes] = await Promise.all([
                fetch(`${API_URL}/products`),
                fetch(`${API_URL}/orders/all`, { headers: { 'x-auth-token': token || '' } }),
                fetch(`${API_URL}/orders/stats`, { headers: { 'x-auth-token': token || '' } })
            ]);

            // Check if all responses are OK
            if (!prodRes.ok) throw new Error(`Products API error: ${prodRes.status}`);
            if (!orderRes.ok) throw new Error(`Orders API error: ${orderRes.status}`);
            if (!statsRes.ok) throw new Error(`Stats API error: ${statsRes.status}`);

            const [prodData, orderData, statsData] = await Promise.all([
                prodRes.json(),
                orderRes.json(),
                statsRes.json()
            ]);

            setProducts(prodData);
            setOrders(orderData);
            setStats(statsData);
        } catch (err: any) {
            console.error('Fetch error details:', err);
            if (err.message.includes('401')) {
                toast.error('Session expired. Please login again.');
                logout();
                navigate('/login');
            } else {
                toast.error(err.message || 'Failed to load dashboard data');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        if (selectedFiles) {
            Array.from(selectedFiles).forEach(file => data.append('images', file));
        }

        try {
            const res = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: {
                    'x-auth-token': localStorage.getItem('token') || ''
                },
                body: data
            });
            if (res.ok) {
                toast.success('Product added successfully');
                setIsAddOpen(false);
                setFormData({ name: '', description: '', price: '', category: '', stock: '' });
                setSelectedFiles(null);
                fetchData();
            } else {
                const data = await res.json();
                toast.error(data.msg || 'Failed to add product');
            }
        } catch (err) {
            toast.error('Failed to add product');
        }
    };

    const handleUpdateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        if (selectedFiles) {
            Array.from(selectedFiles).forEach(file => data.append('images', file));
        }

        try {
            const res = await fetch(`${API_URL}/products/${editingProduct._id}`, {
                method: 'PUT',
                headers: {
                    'x-auth-token': localStorage.getItem('token') || ''
                },
                body: data
            });
            if (res.ok) {
                toast.success('Product updated');
                setIsEditOpen(false);
                setSelectedFiles(null);
                fetchData();
            } else {
                const data = await res.json();
                toast.error(data.msg || 'Failed to update product');
            }
        } catch (err) {
            toast.error('Failed to update product');
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': localStorage.getItem('token') || '' }
            });
            if (res.ok) {
                toast.success('Product deleted');
                fetchData();
            }
        } catch (err) {
            toast.error('Failed to delete product');
        }
    };

    const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
        try {
            const res = await fetch(`${API_URL}/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token') || ''
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                toast.success('Order status updated');
                fetchData();
            }
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    const openEditDialog = (product: any) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock
        });
        setIsEditOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-1">Admin Control Center</h1>
                        <p className="text-slate-500">Manage your store products, orders, and review performance.</p>
                    </div>
                    <Button 
                        variant="outline" 
                        onClick={logout}
                        className="group border-red-200 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                    >
                        <LogOut className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        Logout
                    </Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <TabsList className="bg-white border p-1 rounded-xl shadow-sm">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-6 py-2">
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="products" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-6 py-2">
                            <Package className="w-4 h-4 mr-2" />
                            Products
                        </TabsTrigger>
                        <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-6 py-2">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Orders
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview">
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <Card className="border-none shadow-md bg-gradient-to-br from-indigo-500 to-indigo-600 text-white overflow-hidden relative group">
                                <TrendingUp className="absolute right-[-20px] bottom-[-20px] w-40 h-40 opacity-10 group-hover:scale-110 transition-transform duration-500" />
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-wider">Total Revenue</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
                                    <p className="text-xs mt-2 opacity-70">+12.5% from last month</p>
                                </CardContent>
                            </Card>
                            <Card className="border-none shadow-md bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative group">
                                <PackageCheck className="absolute right-[-20px] bottom-[-20px] w-40 h-40 opacity-10 group-hover:scale-110 transition-transform duration-500" />
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-wider">Total Orders</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{stats.totalOrders}</div>
                                    <p className="text-xs mt-2 opacity-70">{stats.totalOrders - stats.pendingOrders} completed orders</p>
                                </CardContent>
                            </Card>
                            <Card className="border-none shadow-md bg-gradient-to-br from-amber-500 to-amber-600 text-white overflow-hidden relative group">
                                <Clock className="absolute right-[-20px] bottom-[-20px] w-40 h-40 opacity-10 group-hover:scale-110 transition-transform duration-500" />
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-wider">Pending Orders</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{stats.pendingOrders}</div>
                                    <p className="text-xs mt-2 opacity-70">Requires immediate attention</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            <Card className="shadow-lg border-slate-200/60 overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b">
                                    <CardTitle>Recent Orders</CardTitle>
                                    <CardDescription>Visual summary of the latest customer activity.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="hover:bg-transparent">
                                                    <TableHead className="w-[100px]">ID</TableHead>
                                                    <TableHead>Customer</TableHead>
                                                    <TableHead>Total</TableHead>
                                                    <TableHead>Status</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {orders.slice(0, 5).map((order) => (
                                                    <TableRow key={order._id} className="hover:bg-slate-50 transition-colors">
                                                        <TableCell className="font-mono text-xs">#{order._id.slice(-6)}</TableCell>
                                                        <TableCell className="font-medium text-slate-700">{order.user?.name}</TableCell>
                                                        <TableCell className="font-semibold">₹{order.totalAmount}</TableCell>
                                                        <TableCell>
                                                            <Badge 
                                                                variant={order.status === 'delivered' ? 'default' : 'secondary'}
                                                                className={
                                                                    order.status === 'pending' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100 border-none' :
                                                                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-none' :
                                                                    order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none' :
                                                                    'bg-slate-100 text-slate-700 hover:bg-slate-100 border-none'
                                                                }
                                                            >
                                                                {order.status}
                                                            </Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <div className="p-4 bg-slate-50/50 text-center border-t">
                                        <Button variant="link" onClick={() => setActiveTab("orders")} className="text-primary font-semibold">View All Orders</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-lg border-slate-200/60 flex flex-col items-center justify-center p-8 text-center bg-white">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                    <LayoutDashboard className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Detailed Analytics Coming Soon</h3>
                                <p className="text-slate-500 max-w-[300px]">We are building more charts and insights to help you grow your business faster.</p>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Products Tab */}
                    <TabsContent value="products">
                        <Card className="shadow-lg border-slate-200/60 overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between border-b bg-slate-50/50 space-y-0">
                                <div>
                                    <CardTitle>Catalog Management</CardTitle>
                                    <CardDescription>Add, update, or remove products from your storefront.</CardDescription>
                                </div>
                                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="shadow-md hover:shadow-lg transition-all">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Product
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px]">
                                        <form onSubmit={handleAddProduct}>
                                            <DialogHeader>
                                                <DialogTitle>Add New Product</DialogTitle>
                                                <DialogDescription>Enter the details for the new product here.</DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <Input placeholder="Product Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                                                <Textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Input type="number" placeholder="Price (₹)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                                                    <Input type="number" placeholder="Stock" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
                                                </div>
                                                <Input placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Upload Product Images (Max 10)</label>
                                                    <Input type="file" multiple onChange={e => setSelectedFiles(e.target.files)} accept="image/*" />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Create Product</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead className="w-[80px]">Image</TableHead>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Stock</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product._id} className="group hover:bg-slate-50 transition-colors">
                                                <TableCell>
                                                    <img src={imgUrl(product.image)} alt={product.name} className="w-12 h-12 object-cover rounded-lg border shadow-sm" />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-bold text-slate-800">{product.name}</div>
                                                    <div className="text-xs text-slate-500 truncate max-w-[200px]">{product.description}</div>
                                                </TableCell>
                                                <TableCell><Badge variant="outline" className="font-normal">{product.category}</Badge></TableCell>
                                                <TableCell className="font-medium text-slate-900">₹{product.price}</TableCell>
                                                <TableCell>
                                                    <span className={parseInt(product.stock) < 10 ? 'text-red-600 font-bold' : 'text-slate-600'}>
                                                        {product.stock}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right space-x-2">
                                                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)} className="hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product._id)} className="hover:bg-red-50 hover:text-red-600 transition-colors text-slate-400">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Orders Tab */}
                    <TabsContent value="orders">
                        <Card className="shadow-lg border-slate-200/60 overflow-hidden">
                            <CardHeader className="bg-slate-50/50 border-b">
                                <CardTitle>Order Fulfilment</CardTitle>
                                <CardDescription>Track and update the status of customer orders.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead>Order ID</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Items</TableHead>
                                            <TableHead>Address</TableHead>
                                            <TableHead>Total Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.map((order) => (
                                            <TableRow key={order._id} className="hover:bg-slate-50 transition-colors">
                                                <TableCell className="font-mono text-xs font-bold">#{order._id.slice(-8)}</TableCell>
                                                <TableCell>
                                                    <div className="font-semibold text-slate-800">{order.user?.name}</div>
                                                    <div className="text-xs text-slate-500">{order.user?.email}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded-full">
                                                        {order.items?.length || 0} items
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-sm text-slate-600 max-w-[200px] truncate">{order.address}</TableCell>
                                                <TableCell className="font-bold text-slate-900">₹{order.totalAmount}</TableCell>
                                                <TableCell>
                                                    <Badge 
                                                        className={
                                                            order.status === 'pending' ? 'bg-amber-100 text-amber-700 border-none' :
                                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-700 border-none' :
                                                            order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700 border-none' :
                                                            'bg-slate-100 text-slate-700 border-none'
                                                        }
                                                    >
                                                        {order.status.toUpperCase()}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Select 
                                                        defaultValue={order.status} 
                                                        onValueChange={(value) => handleUpdateOrderStatus(order._id, value)}
                                                    >
                                                        <SelectTrigger className="w-[130px] h-8 bg-white">
                                                            <SelectValue placeholder="Status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="pending">Pending</SelectItem>
                                                            <SelectItem value="shipped">Shipped</SelectItem>
                                                            <SelectItem value="delivered">Delivered</SelectItem>
                                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Edit Product Modal */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <form onSubmit={handleUpdateProduct}>
                            <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                                <DialogDescription>Modify the existing product information.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <Input placeholder="Product Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                                <Textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input type="number" placeholder="Price (₹)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                                    <Input type="number" placeholder="Stock" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
                                </div>
                                <Input placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Update Product Images (Max 10)</label>
                                    <Input type="file" multiple onChange={e => setSelectedFiles(e.target.files)} accept="image/*" className="cursor-pointer" />
                                    <p className="text-[10px] text-slate-400 italic">Select new files to replace existing images.</p>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Update Product</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default AdminDashboard;
