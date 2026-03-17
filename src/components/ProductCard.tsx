import { Star, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { imgUrl } from "@/lib/api";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-shadow duration-300"
    >
      <Link to={`/product/${product._id || product.id}`} className="block relative overflow-hidden aspect-square bg-surface">
        <img
          src={imgUrl(product.image)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {product.originalPrice && (
          <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded-md">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="bg-background text-foreground p-2.5 rounded-full shadow-card hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <span className="bg-background text-foreground p-2.5 rounded-full shadow-card">
            <Eye className="w-4 h-4" />
          </span>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="font-medium text-sm text-foreground">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
        </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">₹{product.price?.toLocaleString() || '0'}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice?.toLocaleString()}</span>
            )}
          </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
