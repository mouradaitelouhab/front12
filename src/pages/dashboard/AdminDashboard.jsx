import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const mockStats = {
    totalUsers: 1250,
    totalProducts: 89,
    totalOrders: 342,
    totalRevenue: 45678.90
  };

  const mockUsers = [
    { id: 1, username: 'testadmin', email: 'admin@example.com', role: 'Admin', status: 'Active' },
    { id: 2, username: 'testseller', email: 'seller@example.com', role: 'Seller', status: 'Active' },
    { id: 3, username: 'testbuyer', email: 'buyer@example.com', role: 'Buyer', status: 'Active' }
  ];

  const mockProducts = [
    { id: 1, name: 'Bague Diamant', category: 'Bagues', price: 1299.99, stock: 5, status: 'Active' },
    { id: 2, name: 'Collier Perles', category: 'Colliers', price: 899.99, stock: 12, status: 'Active' },
    { id: 3, name: 'Bracelet Or', category: 'Bracelets', price: 599.99, stock: 8, status: 'Active' }
  ];

  const mockOrders = [
    { id: 1, orderNumber: 'ORD-001', customer: 'buyer@example.com', total: 1299.99, status: 'Pending', date: '2024-01-15' },
    { id: 2, orderNumber: 'ORD-002', customer: 'buyer@example.com', total: 899.99, status: 'Completed', date: '2024-01-14' },
    { id: 3, orderNumber: 'ORD-003', customer: 'buyer@example.com', total: 599.99, status: 'Shipped', date: '2024-01-13' }
  ];

  useEffect(() => {
    // Load initial data
    setUsers(mockUsers);
    setProducts(mockProducts);
    setOrders(mockOrders);
  }, []);

  const handleDeleteUser = (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 rounded-lg font-medium ${
        isActive 
          ? 'bg-purple-600 text-white' 
          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Administrateur</h1>
          <p className="text-gray-600">Gérez votre plateforme e-commerce</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Utilisateurs"
            value={mockStats.totalUsers.toLocaleString()}
            icon={Users}
            color="bg-blue-500"
          />
          <StatCard
            title="Total Produits"
            value={mockStats.totalProducts}
            icon={Package}
            color="bg-green-500"
          />
          <StatCard
            title="Total Commandes"
            value={mockStats.totalOrders}
            icon={ShoppingCart}
            color="bg-yellow-500"
          />
          <StatCard
            title="Revenus Total"
            value={`€${mockStats.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            color="bg-purple-500"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6">
          <TabButton
            id="overview"
            label="Vue d'ensemble"
            isActive={activeTab === 'overview'}
            onClick={setActiveTab}
          />
          <TabButton
            id="users"
            label="Utilisateurs"
            isActive={activeTab === 'users'}
            onClick={setActiveTab}
          />
          <TabButton
            id="products"
            label="Produits"
            isActive={activeTab === 'products'}
            onClick={setActiveTab}
          />
          <TabButton
            id="orders"
            label="Commandes"
            isActive={activeTab === 'orders'}
            onClick={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'overview' && (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Vue d'ensemble</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Activité Récente</h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-sm">Nouvelle commande reçue</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Users className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="text-sm">Nouvel utilisateur inscrit</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Package className="w-5 h-5 text-purple-500 mr-3" />
                      <span className="text-sm">Produit ajouté au catalogue</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Actions Rapides</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                      <Plus className="w-5 h-5 mr-2" />
                      Ajouter un Produit
                    </button>
                    <button className="w-full flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Users className="w-5 h-5 mr-2" />
                      Gérer les Utilisateurs
                    </button>
                    <button className="w-full flex items-center justify-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Voir les Commandes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gestion des Utilisateurs</h2>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvel Utilisateur
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'Seller' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gestion des Produits</h2>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau Produit
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          €{product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gestion des Commandes</h2>
                <div className="flex space-x-2">
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrer
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commande</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.orderNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          €{order.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select 
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className={`px-2 py-1 text-xs rounded-full border-0 ${
                              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
