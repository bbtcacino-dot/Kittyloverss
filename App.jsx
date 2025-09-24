import React, { useState } from "react";

const config = {
  paymentLink: "https://www.paypal.com/tu-link-aqui",
  socialLinks: {
    tiktok: "https://www.tiktok.com/@tucuenta",
    instagram: "https://www.instagram.com/tucuenta",
    facebook: "https://www.facebook.com/tucuenta"
  },
  products: [
    { id: 1, name: "Producto Kawaii 1", price: 15, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Producto Kawaii 2", price: 25, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Producto Kawaii 3", price: 30, image: "https://via.placeholder.com/150" }
  ]
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activePage, setActivePage] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setShowCart(true);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <header className="bg-pink-200 flex justify-between items-center px-4 py-2 shadow">
        <button onClick={() => { setMenuOpen(true); setActivePage("menu"); }} className="text-2xl" aria-label="Abrir menú">☰</button>
        <h1 className="font-bold text-lg">🌸 Mi Tienda Kawaii</h1>
        <div>
          <button onClick={() => setShowCart((s) => !s)} aria-label="Abrir carrito">🛒 ({cart.length})</button>
        </div>
      </header>

      {menuOpen && activePage === "menu" && (
        <div className="p-4 bg-white shadow-md">
          <ul className="space-y-2">
            <li><button onClick={() => { setActivePage("inicio"); setMenuOpen(false); }}>Inicio</button></li>
            <li><button onClick={() => { setActivePage("productos"); setMenuOpen(false); }}>Productos</button></li>
            <li><button onClick={() => { setActivePage("sobre"); setMenuOpen(false); }}>Sobre Nosotros</button></li>
          </ul>
        </div>
      )}

      <main className="flex-1 p-6">
        {activePage === "inicio" && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">💖 Bienvenidos a nuestra tiendita kawaii 💖</h2>
            <p>Con mucho corazón, productos únicos para ti ✨</p>
            <h3 className="text-xl font-semibold mt-6">Más Vendidos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {config.products.map((p) => (
                <div key={p.id} className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
                  <img src={p.image} alt={p.name} className="w-24 h-24 object-cover mb-2" />
                  <h4>{p.name}</h4>
                  <p>${p.price}</p>
                  <button onClick={() => addToCart(p)} className="mt-2 bg-pink-400 text-white px-3 py-1 rounded-full hover:bg-pink-500">Comprar</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePage === "productos" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Todos los Productos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {config.products.map((p) => (
                <div key={p.id} className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
                  <img src={p.image} alt={p.name} className="w-24 h-24 object-cover mb-2" />
                  <h4>{p.name}</h4>
                  <p>${p.price}</p>
                  <button onClick={() => addToCart(p)} className="mt-2 bg-pink-400 text-white px-3 py-1 rounded-full hover:bg-pink-500">Comprar</button>
                </div>
              ))}
            </div>
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
              <button onClick={() => setActivePage("inicio")} className="bg-pink-400 text-white px-6 py-2 rounded-full shadow">Volver ❤️</button>
            </div>
          </div>
        )}

        {activePage === "sobre" && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">🌸 Sobre Nosotros</h2>
            <p>Soy una creadora de contenido de 19 años 💕 esta plataforma es 100% real y hecha con mucho amor ✨</p>
            <div className="flex justify-center gap-4 mt-4">
              <a href={config.socialLinks.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
              <a href={config.socialLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={config.socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
              <button onClick={() => setActivePage("inicio")} className="bg-pink-400 text-white px-6 py-2 rounded-full shadow">Volver ❤️</button>
            </div>
          </div>
        )}
      </main>

      {showCart && (
        <aside className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">🛒 Carrito</h2>
            <button onClick={() => setShowCart(false)} className="text-red-500 text-lg">✕</button>
          </div>
          <ul className="space-y-2">
            {cart.length === 0 ? <li>No hay productos en el carrito.</li> : cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{item.name}</span>
                <div className="flex items-center gap-2">
                  <span>${item.price}</span>
                  <button onClick={() => removeFromCart(index)} className="text-red-500">✕</button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total: ${total}</p>
          <a href={config.paymentLink || "#"} target="_blank" rel="noopener noreferrer" className={`mt-4 block text-center px-4 py-2 rounded-full ${config.paymentLink ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>❤️ Cobrar</a>
        </aside>
      )}
    </div>
  );
}
