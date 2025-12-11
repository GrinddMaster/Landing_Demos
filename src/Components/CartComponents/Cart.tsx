import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import useCartStore from '@/Stores/cart-store';
import { cartItem } from '@/types';

export default function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const [items, setItems] = useState<cartItem[]>(cartItems);

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  function changeQty(id: string, delta: number) {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, quantity: Math.max(0, (it.quantity || 0) + delta) }
          : it,
      ),
    );
  }

  function cartTotal() {
    return items.reduce(
      (sum, it) => sum + (it.price || 0) * (it.quantity || 0),
      0,
    );
  }

  return (
    <div className="w-[550px] bg-amber-100 p-4 border border-slate-300 rounded-2xl shadow-md">
      
      <h3 className="text-black text-xl font-bold text-center mb-3">Shopping Cart</h3>

      {/* Column headings */}
      <div className="grid grid-cols-4 gap-2 mb-2 text-xs font-semibold text-slate-600 border-b pb-2">
        <div className="col-span-1 text-center">Product</div>
        <div className="col-span-1 text-center">Price</div>
        <div className="col-span-1 text-center">Qty</div>
        <div className="col-span-1 text-center">Total</div>
      </div>

      {/* Items list */}
      <div className="flex flex-col gap-3 min-h-[280px] max-h-[440px] overflow-y-auto pr-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-4 gap-2 min-h-16 items-center bg-white/80 hover:bg-white rounded-lg shadow-sm transition p-2"
          >
            {/* Name */}
            <div className="col-span-1 text-center font-semibold text-slate-800 truncate">
              {item.name}
            </div>

            {/* Price */}
            <div className="col-span-1 text-center text-sm text-emerald-600">
              ${Number(item.price).toFixed(2)}
            </div>

            {/* Quantity controls */}
            <div className="col-span-1 text-center">
              <div className="inline-flex items-center gap-3">
                <Button
                  aria-label={`Decrease ${item.name}`}
                  className="w-2"
                  sx={{
                    borderRadius: '50%',
                    height: 32,
                    width: 32,
                    minWidth: 32,
                  }}
                  onClick={() => changeQty(item.id, -1)}
                  variant="contained"
                >
                  <Remove fontSize="inherit" />
                </Button>

                <div className="text-sm font-mono text-slate-700">
                  {item.quantity}
                </div>

                <Button
                  aria-label={`Increase ${item.name}`}
                  onClick={() => changeQty(item.id, +1)}
                  sx={{
                    borderRadius: '50%',
                    height: 32,
                    width: 32,
                    minWidth: 32,
                  }}
                  variant="contained"
                >
                  <Add fontSize="inherit" />
                </Button>
              </div>
            </div>

            {/* Item total */}
            <div className="col-span-1 text-center font-semibold text-slate-700">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-200 text-center">
        <div className="text-lg font-extrabold text-slate-800 mb-3">
          Total: ${cartTotal().toFixed(2)}
        </div>

        <div className="flex justify-center">
          <Button
            variant="contained"
            sx={{ alignItems: 'center' }}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
