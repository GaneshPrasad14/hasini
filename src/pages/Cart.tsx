import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { imgUrl } from "@/lib/api";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any frames yet.</p>
          <Button asChild className="rounded-full px-8">
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container-main section-padding !py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.product._id || item.product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-4 p-4 bg-card rounded-xl shadow-soft"
              >
                <Link to={`/product/${item.product._id || item.product.id}`} className="w-24 h-24 rounded-lg overflow-hidden bg-surface shrink-0">
                  <img src={imgUrl(item.product.image)} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product._id || item.product.id}`} className="font-medium text-foreground hover:text-primary transition-colors">
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">{item.product.color}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-full">
                      <button onClick={() => updateQuantity(item.product._id || item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-secondary rounded-l-full transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product._id || item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-secondary rounded-r-full transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-semibold text-foreground">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                      <div className="flex items-center gap-3 bg-accent rounded-lg p-1">
                        <button onClick={() => removeFromCart(item.product._id || item.product.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-xl p-6 sticky top-24">
              <h2 className="font-semibold text-foreground text-lg mb-6">Order Summary</h2>
              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">{totalPrice >= 5000 ? "Free" : "₹500"}</span>
                </div>
                <div className="flex justify-between font-bold text-foreground text-lg pt-4 border-t border-border">
                  <span>Total</span>
                  <span>₹{(totalPrice >= 5000 ? totalPrice : totalPrice + 500).toLocaleString()}</span>
                </div>
              </div>

              <Button className="w-full mt-6 py-6 text-lg rounded-xl">
                Checkout
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-3">Free shipping on orders over ₹5,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
