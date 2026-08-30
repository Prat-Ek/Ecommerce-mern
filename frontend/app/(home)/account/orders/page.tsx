'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface OrderProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  user: string;
  products: OrderProduct[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadOrders = () => {
    try {
      setLoading(true);
      const stored = localStorage.getItem("orders");
      const orders = stored ? JSON.parse(stored) : [];
      setOrders(orders);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    const statusColors: Record<Order['status'], string> = {
      pending: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      processing: 'bg-blue-50 border-blue-200 text-blue-800',
      shipped: 'bg-purple-50 border-purple-200 text-purple-800',
      delivered: 'bg-green-50 border-green-200 text-green-800',
      cancelled: 'bg-red-50 border-red-200 text-red-800',
    };
    return statusColors[status] || statusColors.pending;
  };

  const getStatusBadge = (status: Order['status']) => {
    const badges: Record<Order['status'], string> = {
      pending: 'Pending',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return badges[status] || 'Unknown';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return `$${(price).toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">Track your purchases and order status</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <button
              onClick={loadOrders}
              className="mt-2 text-red-600 hover:text-red-800 font-medium text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {orders.length === 0 && !error && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-600 mb-6">Start shopping to see your order history here</p>
            <Link
              href="/"
              className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      Order #{order.orderNumber}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)} mb-2`}>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">{order.products.length}</span> item{order.products.length !== 1 ? 's' : ''}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {formatPrice(order.totalPrice)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <svg
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      expandedOrder === order._id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </div>

              {/* Order Details - Expandable */}
              {expandedOrder === order._id && (
                <div className="border-t border-gray-200 bg-gray-50 p-6">
                  {/* Products */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Items</h4>
                    <div className="space-y-4">
                      {order.products.map((product) => (
                        <div key={product._id} className="flex gap-4 bg-white p-4 rounded-lg border border-gray-200">
                          {product.image && (
                            <div className="relative w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-gray-900 truncate">
                              {product.name}
                            </h5>
                            {product.category && (
                              <p className="text-sm text-gray-600">{product.category}</p>
                            )}
                            <p className="text-sm text-gray-600 mt-1">
                              Quantity: <span className="font-medium">{product.quantity}</span>
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-semibold text-gray-900">
                              {formatPrice(product.price * product.quantity)}
                            </p>
                            <p className="text-xs text-gray-600">
                              {formatPrice(product.price)} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Shipping Address</h4>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-600">
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">{formatPrice(order.totalPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="text-gray-900 capitalize">{order.paymentMethod}</span>
                    </div>
                    <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(order.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
