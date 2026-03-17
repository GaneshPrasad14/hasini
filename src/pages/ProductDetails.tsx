import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart, ChevronLeft, Check, Minus, Plus } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { apiUrl, imgUrl } from "@/lib/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(apiUrl(`/api/products/${id}`))
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        if (data && data._id) {
          setProduct(data);
        } else {
          setProduct(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Button asChild><Link to="/shop">Back to Shop</Link></Button>
        </div>
      </div>
    );
  }

  const related: any[] = [];

  return (
    <div className="min-h-screen">
      <div className="container-main section-padding !py-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-8">
          <ChevronLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="aspect-square bg-surface rounded-2xl overflow-hidden group border"
            >
              <img
                src={(product.images && product.images.length > 0) 
                  ? imgUrl(product.images[selectedImage])
                  : imgUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500"
              />
            </motion.div>
            
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {product.images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-24 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img 
                      src={imgUrl(img)} 
                      className="w-full h-full object-cover" 
                      alt={`${product.name} view ${i + 1}`} 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-primary bg-accent px-2 py-1 rounded capitalize">{product.category}</span>
              <span className="text-xs text-muted-foreground capitalize">{product.frameType} · {product.shape}</span>
            </div>

            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-foreground">₹{product.price?.toLocaleString() || '0'}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice?.toLocaleString()}</span>
              )}
            </div>

            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground mb-3">Color: {product.colors[selectedColor]}</h3>
              <div className="flex gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(i)}
                    className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                      selectedColor === i
                        ? "border-primary bg-accent text-accent-foreground"
                        : "border-border text-muted-foreground hover:border-primary"
                    }`}
                  >
                    {selectedColor === i && <Check className="w-3 h-3 inline mr-1" />}
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-border rounded-full">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-secondary rounded-l-full transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-secondary rounded-r-full transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                size="lg"
                className="flex-1 rounded-full"
                onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); }}
              >
                <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-4">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Specs */}
            <div className="mt-10 border-t border-border pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frame Type</span>
                <span className="text-foreground capitalize">{product.frameType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shape</span>
                <span className="text-foreground capitalize">{product.shape}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Category</span>
                <span className="text-foreground capitalize">{product.category}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
