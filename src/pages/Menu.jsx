import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Coffee,
  CupSoda,
  GlassWater,
  Leaf,
  Search,
  Sparkles,
  Star,
  UtensilsCrossed,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import './Menu.css'

const categoryNavigation = [
  { id: 'all', label: 'All Menu', icon: Sparkles },
  { id: 'coffee', label: 'Coffee', icon: Coffee },
  { id: 'hot-tea', label: 'Hot Tea', icon: GlassWater },
  { id: 'shakes', label: 'Shakes', icon: CupSoda },
  { id: 'signature-beverages', label: 'Signature Beverages', icon: Sparkles },
  { id: 'cold-beverage', label: 'Cold Beverage', icon: CupSoda },
  { id: 'iced-tea', label: 'Iced Tea', icon: GlassWater },
  { id: 'mojito', label: 'Mojito', icon: Sparkles },
  { id: 'appetizers', label: 'Appetizers', icon: UtensilsCrossed },
  { id: 'pasta', label: 'Pasta', icon: UtensilsCrossed },
  { id: 'soups', label: 'Soups', icon: GlassWater },
  { id: 'rice', label: 'Rice', icon: UtensilsCrossed },
  { id: 'salad', label: 'Salad', icon: Leaf },
  { id: 'maggi', label: 'Maggi', icon: UtensilsCrossed },
  { id: 'momos', label: 'Momos', icon: UtensilsCrossed },
  { id: 'wraps', label: 'Wraps', icon: UtensilsCrossed },
  { id: 'breakfast', label: 'Breakfast', icon: Coffee },
  { id: 'sandwiches-panini', label: 'Sandwiches', icon: UtensilsCrossed },
  { id: 'premium-sandwiches', label: 'Premium Sandwiches', icon: UtensilsCrossed },
  { id: 'burgers', label: 'Burger', icon: Star },
  { id: 'pizza', label: 'Thin Breaded Pizza', icon: Star },
  { id: 'steak', label: 'Steak', icon: Star },
  { id: 'desserts-cakes', label: 'Dessert', icon: Sparkles },
]

const menuSections = [
  {
    id: 'coffee',
    label: 'Coffee',
    description: 'Classic café coffee favourites for a bold, comforting cup.',
    icon: Coffee,
    products: [
      { name: 'Espresso', price: 49, type: 'veg', description: 'A dark and aromatic shot with a bold roasted finish.', image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=900&q=80' },
      { name: 'Double Espresso', price: 59, type: 'veg', description: 'A stronger, richer shot for coffee lovers craving intensity.', image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=900&q=80' },
      { name: 'Café Americano', price: 69, type: 'veg', description: 'Espresso diluted with hot water for a smooth, balanced cup.', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80' },
      { name: 'Cappuccino', price: 99, type: 'veg', description: 'Espresso with silky milk foam and a balanced coffee finish.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80' },
      { name: 'Café Mocha', price: 110, type: 'veg', description: 'Espresso, chocolate and milk combine into a smooth cocoa-rich cup.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80' },
      { name: 'Vanilla Cappuccino', price: 110, type: 'veg', description: 'Cappuccino with a warm vanilla finish and soft sweetness.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80' },
      { name: 'Hazelnut Cappuccino', price: 110, type: 'veg', description: 'Toasty hazelnut notes with rich creamy foam.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80' },
      { name: 'Tiramisu Cappuccino', price: 110, type: 'veg', description: 'An indulgent cappuccino inspired by the classic café dessert.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80' },
      { name: 'Irish Cappuccino', price: 110, type: 'veg', description: 'A creamy coffee with warm, mellow sweetness and a rich finish.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80' },
      { name: 'Turkish Cappuccino', price: 110, type: 'veg', description: 'A thicker, richer cappuccino with a fragrant roasted character.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80' },
      { name: 'Café Latte', price: 110, type: 'veg', description: 'Smooth espresso and steamed milk for a balanced cup.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80' },
      { name: 'Vanilla Café Latte', price: 120, type: 'veg', description: 'Café latte topped with vanilla warmth and a mellow sweetness.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80' },
      { name: 'Hot Chocolate', price: 120, type: 'veg', description: 'A velvety hot chocolate with a rich cocoa finish.', image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=900&q=80' },
      { name: 'Biscoff Latte', price: 150, type: 'veg', description: 'Creamy coffee with the warm caramelised cookie flavour of Biscoff.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'hot-tea',
    label: 'Hot Tea',
    description: 'Aromatic and soothing teas for a comforting pause.',
    icon: GlassWater,
    products: [
      { name: 'Assam Tea', price: 79, type: 'veg', description: 'Strong, malty Assam tea with a rich full-bodied taste.', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80' },
      { name: 'Green Tea', price: 79, type: 'veg', description: 'Light green tea with a fresh and delicate finish.', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80' },
      { name: 'Darjeeling Tea', price: 79, type: 'veg', description: 'A fragrant tea with floral notes and a smooth finish.', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80' },
      { name: 'Ginger Honey Lemon Tea', price: 99, type: 'veg', description: 'A soothing tea with ginger warmth, honey sweetness and citrus lift.', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80' },
      { name: 'Peach Honey Lemon Tea', price: 99, type: 'veg', description: 'A bright tea with peach notes and a mellow honey finish.', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80' },
      { name: 'Masala Chai', price: 50, type: 'veg', description: 'Spiced tea infused with ginger, cardamom and a warm aromatic blend.', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'shakes',
    label: 'Shakes',
    description: 'Creamy, rich shakes designed for dessert lovers.',
    icon: CupSoda,
    products: [
      { name: 'Red Velvet', price: 99, type: 'veg', description: 'Velvety red velvet flavour with a smooth, sweet finish.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80' },
      { name: 'Strawberry Cheesecake', price: 120, type: 'veg', description: 'Creamy cheesecake notes blended with strawberry sweetness.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80' },
      { name: 'Frosty Chocolate', price: 139, type: 'veg', description: 'A thick, ice-cold chocolate shake with rich cocoa depth.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80' },
      { name: 'Blueberry Cheesecake', price: 140, type: 'veg', description: 'Creamy blueberry sweetness with a cheesecake finish.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80' },
      { name: 'Chocobread Cookie', price: 150, type: 'veg', description: 'Chocolate cookie shake with a crunchy, biscuit-like finish.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80' },
      { name: 'Berry Crumble', price: 150, type: 'veg', description: 'A sweet mixed-berry shake with comforting baked-cake notes.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80' },
      { name: 'Oreo Shake', price: 150, type: 'veg', description: 'Classic Oreo cookie shake with creamy, indulgent texture.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80' },
      { name: 'Nutella Shake', price: 150, type: 'veg', description: 'Silky hazelnut chocolate shake with decadent richness.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'signature-beverages',
    label: 'Signature Beverages',
    description: 'Special café signatures built for indulgence and flavour.',
    icon: Sparkles,
    products: [
      { name: 'KitKat', price: 169, type: 'veg', description: 'A creamy chocolatey signature with a sweet, crunchy finish.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80' },
      { name: 'Heavy Dew', price: 179, type: 'veg', description: 'A bold, chilled signature beverage with a rich layered finish.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80' },
      { name: 'Loaded Tiramisu Brownie', price: 189, type: 'veg', description: 'A dessert-inspired sip layered with brownies and creamy notes.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80' },
      { name: 'Biscoff Bliss Shake', price: 189, type: 'veg', description: 'A caramelised biscuit drink with soft sweetness and creamy texture.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'cold-beverage',
    label: 'Cold Beverage',
    description: 'Icy café favourites for a refreshing afternoon reset.',
    icon: CupSoda,
    products: [
      { name: 'Iced Americano', price: 99, type: 'veg', description: 'Crisp cold coffee with a clean espresso finish.', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80' },
      { name: 'Iced Mocha', price: 119, type: 'veg', description: 'Cold mocha with a smooth chocolate finish.', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80' },
      { name: 'Iced Latte', price: 119, type: 'veg', description: 'Smooth espresso over ice with creamy milk.', image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=900&q=80' },
      { name: 'Vietnamese Iced Coffee', price: 119, type: 'veg', description: 'A bold, sweet and creamy iced coffee with a distinct classic profile.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80' },
      { name: 'Café Frappe', price: 119, type: 'veg', description: 'A chilled, foamy frappe with rich café flavour.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80' },
      { name: 'Hazelnut Frappe', price: 120, type: 'veg', description: 'A creamy frappe with roasted hazelnut warmth.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80' },
      { name: 'Vanilla Frappe', price: 120, type: 'veg', description: 'Soft vanilla and creamy ice blended into a smooth frappe.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80' },
      { name: 'Caramel Drizzle Frappe', price: 120, type: 'veg', description: 'Sweet caramel drizzle over a chilled creamy coffee base.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80' },
      { name: 'Irish Frappe', price: 120, type: 'veg', description: 'A bold, creamy frappe with a mellow caramelised finish.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80' },
      { name: 'Tiramisu Frappe', price: 120, type: 'veg', description: 'Creamy tiramisu-inspired flavour in a frosty café format.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80' },
      { name: 'Devil’s Frappe Cream', price: 149, type: 'veg', description: 'A rich, indulgent frappe topped with a creamy devilish finish.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80' },
      { name: 'Java Chip Frappe', price: 149, type: 'veg', description: 'Coffee blended with chocolate chips for a crunchy, creamy sip.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80' },
      { name: 'Mocha Frappe', price: 120, type: 'veg', description: 'Chocolate and espresso combine into a frosty, decadent frappe.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'iced-tea',
    label: 'Iced Tea',
    description: 'Fresh, chilled teas with bright fruit notes and a cooling finish.',
    icon: GlassWater,
    products: [
      { name: 'Lemon Iced Tea', price: 79, type: 'veg', description: 'Citrus-forward iced tea with a crisp, refreshing finish.', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80' },
      { name: 'Peach Iced Tea', price: 79, type: 'veg', description: 'A juicy peach iced tea with a balanced, fragrant finish.', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80' },
      { name: 'Cranberry Iced Tea', price: 89, type: 'veg', description: 'Cool, tart and fragrant with a vibrant berry finish.', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80' },
      { name: 'Strawberry Iced Tea', price: 89, type: 'veg', description: 'Sweet berry iced tea with a refreshing finish.', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80' },
      { name: 'Bubble Gum Iced Tea', price: 89, type: 'veg', description: 'A playful iced tea with a sweet bubblegum twist.', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'mojito',
    label: 'Mojito',
    description: 'Minty, zingy and refreshing mojitos for a cool café break.',
    icon: Sparkles,
    products: [
      { name: 'Classic Mojito', price: 99, type: 'veg', description: 'Fresh mint, lime and soda blended into a crisp, cooling refresher.', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80' },
      { name: 'Peach Mojito', price: 109, type: 'veg', description: 'A juicy peach twist on the minty mojito classic.', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80' },
      { name: 'Cranberry Mojito', price: 109, type: 'veg', description: 'Tart berry notes brighten the classic minty base.', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80' },
      { name: 'Kiwi Mojito', price: 109, type: 'veg', description: 'Bright kiwi and mint for a vibrant, tropical lift.', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80' },
      { name: 'Mango Chilli Mojito', price: 109, type: 'veg', description: 'Sweet mango with a chilli edge and cooling mint finish.', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80' },
      { name: 'Golden River Mojito', price: 120, type: 'veg', description: 'A refreshing signature mojito with lively citrus and tropical balance.', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'appetizers',
    label: 'Appetizers',
    description: 'Hot, crispy starters to kick off the meal.',
    icon: UtensilsCrossed,
    products: [
      { name: 'French Fries', price: 100, type: 'veg', description: 'Classic golden fries with a warm, crunchy finish.', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80' },
      { name: 'Potato Wedges', price: 120, type: 'veg', description: 'Seasoned wedges with a crisp outside and fluffy centre.', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80' },
      { name: 'Hot Garlic Fries', price: 130, type: 'veg', description: 'Fries tossed with hot garlic seasoning and fragrant spice.', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80' },
      { name: 'Cheese Chilli Toast', price: 180, type: 'veg', description: 'Toasted bread loaded with cheese and a chilli kick.', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80' },
      { name: 'Diced Paneer in Hot Garlic Sauce', price: 201, type: 'veg', description: 'Paneer cubes coated in a hot garlic sauce with a savoury bite.', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80' },
      { name: 'Diced Chicken Bell Pepper', price: 250, type: 'non-veg', description: 'Chicken bites tossed with bell peppers and bold seasonings.', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80' },
      { name: 'Crispy Chicken Slices', price: 220, type: 'non-veg', description: 'Tender chicken slices with a golden crust and savoury taste.', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80' },
      { name: 'Spicy Chicken Wings (8 Piece)', price: 250, type: 'non-veg', description: 'Eight spicy wings, hot, crisp and packed with flavour.', image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=900&q=80' },
      { name: 'Crunchy Fried Chicken Wings', price: 240, type: 'non-veg', description: 'Crisp chicken wings with a savoury crispy coating.', image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'pasta',
    label: 'Pasta',
    description: 'Creamy, saucy pastas tailored for comfort and indulgence.',
    icon: UtensilsCrossed,
    products: [
      { name: 'Alfredo Sauce', priceText: 'Veg ₹210 / Non-Veg ₹250', type: 'veg', description: 'Creamy white sauce pasta finished with comforting richness.', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80' },
      { name: 'Cream of Tomato Spicy Sauce', priceText: 'Veg ₹220 / Non-Veg ₹240', type: 'veg', description: 'Tomato-based spice with a creamy kick and layered depth.', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80' },
      { name: 'Mac & Cheese', priceText: 'Veg ₹220 / Non-Veg ₹260', type: 'veg', description: 'Creamy, cheesy comfort pasta with an indulgent finish.', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80' },
      { name: 'Penne Pesto', priceText: 'Veg ₹230 / Non-Veg ₹250', type: 'veg', description: 'Herby pesto pasta with a fresh basil finish and rich olive notes.', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80' },
      { name: 'Pesto Spaghetti Pasta', priceText: 'Veg ₹240 / Non-Veg ₹260', type: 'veg', description: 'Classic spaghetti tossed with pesto and a rich, leafy aroma.', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'soups',
    label: 'Soups',
    description: 'Warm, comforting soups made for a light and hearty start.',
    icon: GlassWater,
    products: [
      { name: 'Trio Clear Soup', priceText: 'Veg ₹100 / Non-Veg ₹120', type: 'veg', description: 'A light clear soup with comforting herbs and warmth.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80' },
      { name: 'Manchow Soup', priceText: 'Veg ₹100 / Non-Veg ₹120', type: 'veg', description: 'A classic Indo-Chinese soup with crunch and bold spice.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80' },
      { name: 'Hot & Sour Soup', priceText: 'Veg ₹100 / Non-Veg ₹120', type: 'veg', description: 'Tangy, spicy and warming with a satisfying depth.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'rice',
    label: 'Rice',
    description: 'Warm, hearty rice plates with rich curries and balanced flavours.',
    icon: UtensilsCrossed,
    products: [
      { name: 'Thai Curry Rice', priceText: 'Veg ₹240 / Non-Veg ₹280', type: 'veg', description: 'Fragrant curry rice folded with delicate flavours and spice.', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'salad',
    label: 'Salad',
    description: 'Fresh and vibrant salads for a lighter, crisp option.',
    icon: Leaf,
    products: [
      { name: 'Caesar Salad', priceText: 'Veg ₹130 / Non-Veg ₹150', type: 'veg', description: 'Crisp greens, dressing and a fresh savoury finish.', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80' },
      { name: 'Prawn Apple Salad', price: 220, type: 'non-veg', description: 'A crisp salad with sweet apple notes and juicy prawns.', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80' },
      { name: 'Greek Salad', priceText: 'Veg ₹120 / Non-Veg ₹160', type: 'veg', description: 'Fresh vegetables, herbs and tangy dressing in a Mediterranean style.', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'maggi',
    label: 'Maggi',
    description: 'Comforting instant classics with bold seasoning and hearty toppings.',
    icon: UtensilsCrossed,
    products: [
      { name: 'Masala Maggi / Chicken', priceText: 'Veg ₹90 / Non-Veg ₹120', type: 'veg', description: 'Classic masala noodles with warm spice and rich flavour.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80' },
      { name: 'Peri Peri Cheese Maggi / Chicken', priceText: 'Veg ₹120 / Non-Veg ₹150', type: 'veg', description: 'Maggi with peri peri heat, cheese and a punchy finish.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'momos',
    label: 'Momos',
    description: 'Soft dumplings with comforting fillings and a spicy finish.',
    icon: UtensilsCrossed,
    products: [
      { name: 'Veg Momos', price: 110, type: 'veg', description: 'Soft steamed momos with a fresh, savoury vegetable filling.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80' },
      { name: 'Cheese Corn Momos', price: 160, type: 'veg', description: 'Sweet corn and cheese-stuffed momos with a creamy finish.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80' },
      { name: 'Veg Schezwan Momos', price: 120, type: 'veg', description: 'A spicy twist with Schezwan flavour and a lively kick.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80' },
      { name: 'Chicken Momos', price: 140, type: 'non-veg', description: 'Juicy chicken dumplings with rich seasoning and tender filling.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80' },
      { name: 'Peri Peri Chicken Cheese Momos', price: 180, type: 'non-veg', description: 'Spicy chicken and cheese dumplings with a fiery peri peri finish.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80' },
      { name: 'Chicken Chilly Spicy Momos', price: 150, type: 'non-veg', description: 'Bold chicken momos with chilli heat and a deep savoury finish.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'wraps',
    label: 'Wraps',
    description: 'Stuffed, handheld favourites for a quick, filling bite.',
    icon: UtensilsCrossed,
    products: [
      { name: 'Peri Peri Paneer / Chicken', priceText: 'Veg ₹100 / Non-Veg ₹140', type: 'veg', description: 'Spicy wraps with a robust blend of filling and herbs.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80' },
      { name: 'Paneer / Chicken Tikka', priceText: 'Veg ₹120 / Non-Veg ₹170', type: 'veg', description: 'Tikka-spiced wraps served warm and packed with flavour.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'breakfast',
    label: 'Breakfast',
    description: 'Hearty breakfast favourites for a satisfying start to the day.',
    icon: Coffee,
    products: [
      { name: 'Masala Omelette', price: 100, type: 'non-veg', description: 'A flavourful omelette packed with spice and a soft, satisfying finish.', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80' },
      { name: 'Fried Egg', price: 137, type: 'non-veg', description: 'A simple classic cooked to order and served with comfort-food appeal.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80' },
      { name: 'Scrambled Egg', price: 137, type: 'non-veg', description: 'Soft and fluffy scrambled eggs with a buttery finish.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80' },
      { name: 'Chicken Sausage Omelette', price: 137, type: 'non-veg', description: 'Savory sausage and eggs with a hearty breakfast bite.', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80' },
      { name: 'Mushroom Omelette', price: 137, type: 'veg', description: 'A soft omelette loaded with juicy mushrooms and gentle herbs.', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80' },
      { name: 'Spanish Potato Omelette', price: 201, type: 'veg', description: 'A hearty potato omelette inspired by classic Spanish comfort cooking.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80' },
      { name: 'African Style Omelette', price: 201, type: 'non-veg', description: 'A robust omelette with bold flavour and a satisfying, filling profile.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'sandwiches-panini',
    label: 'Sandwiches',
    description: 'Classic café sandwiches, served warm, layered and satisfying.',
    icon: UtensilsCrossed,
    products: [
      { name: 'Coleslaw Sandwich', price: 120, type: 'veg', description: 'A crisp and fresh sandwich packed with coleslaw and garden crunch.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80' },
      { name: 'Chicken Ham Cheese Sandwich', price: 150, type: 'non-veg', description: 'Smoky ham, melted cheese and soft bread in a comforting café classic.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80' },
      { name: 'Roasted Chicken Mayo Sandwich', price: 155, type: 'non-veg', description: 'Creamy chicken filling with a comforting, savoury finish.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80' },
      { name: 'Basil Pesto Roasted Chicken Sandwich', price: 160, type: 'non-veg', description: 'Roasted chicken elevated with basil pesto and a fresh herby note.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'premium-sandwiches',
    label: 'Premium Sandwiches',
    description: 'Bigger, layered sandwiches made for a fuller café meal.',
    icon: UtensilsCrossed,
    products: [
      { name: 'Veg Club Sandwich', price: 200, type: 'veg', description: 'A layered veg sandwich with crisp greens and rich spreads.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80' },
      { name: 'Chicken Club Sandwich', price: 240, type: 'non-veg', description: 'A hearty club sandwich layered with grilled chicken and greens.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80' },
      { name: 'Jungle Book Sandwich', price: 240, type: 'veg', description: 'A premium signature sandwich with layered textures and balanced flavours.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'burgers',
    label: 'Burger',
    description: 'Satisfying burgers loaded with flavour, crunch and comforting sauces.',
    icon: Star,
    products: [
      { name: 'Swiss Cheese Burger', price: 214, type: 'veg', description: 'A juicy, layered burger finished with Swiss cheese and a soft toasted bun.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80' },
      { name: 'Spicy Veg Burger', price: 214, type: 'veg', description: 'Crisp veg patty with bold spice, juicy toppings and a rich burger sauce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80' },
      { name: 'BBQ Chicken Burger', price: 265, type: 'non-veg', description: 'Succulent grilled chicken with smoky barbecue flavour and fresh toppings.', image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80' },
      { name: 'Roasted Chicken Burger', price: 285, type: 'non-veg', description: 'A rich roasted chicken burger with crisp greens and signature café sauce.', image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'pizza',
    label: 'Thin Breaded Pizza',
    description: 'Thin crust pizzas with a crisp finish and classic café-inspired toppings.',
    icon: Star,
    products: [
      { name: 'Veg Exotica Pizza', price: 265, type: 'veg', size: '10”', description: 'Loaded with vibrant vegetables, cheese and a balanced tomato base.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80' },
      { name: 'Margherita Pizza', price: 199, type: 'veg', size: '10”', description: 'Classic mozzarella and tomato flavours on a crisp thin crust.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80' },
      { name: 'Pepperoni Chicken Pizza', price: 275, type: 'non-veg', size: '10”', description: 'Spiced chicken pepperoni layered with cheese for a savoury finish.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80' },
      { name: 'Roasted Chicken Pizza', price: 249, type: 'non-veg', size: '10”', description: 'Roasted chicken, herbs and cheese mellowed into a rich pizza bite.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'steak',
    label: 'Steak',
    description: 'Hearty grilled mains for a substantial café feast.',
    icon: Star,
    products: [
      { name: 'Mix Veg Steak', price: 250, type: 'veg', description: 'A hearty veg steak with roasted vegetables and rich savoury depth.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80' },
      { name: 'Chicken Mashed Potato', price: 340, type: 'non-veg', description: 'A hearty chicken main served with creamy mashed potatoes.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80' },
      { name: 'Lamben Chicken Steak', price: 350, type: 'non-veg', description: 'A grilled chicken steak with bold seasoning and a rich finish.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80' },
      { name: 'Mutton Steak Sizzler', price: 550, type: 'non-veg', description: 'A sizzling, hearty mutton steak with a dramatic, rich finish.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80' },
      { name: 'Chicken Sizzler', price: 380, type: 'non-veg', description: 'Chicken steak served sizzling, warm and full of savoury flavour.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80' },
      { name: 'Stuffed Chicken Diane', price: 400, type: 'non-veg', description: 'A rich stuffed chicken dish with a robust, comforting profile.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80' },
      { name: 'Fish Crumble Steak', price: 320, type: 'non-veg', description: 'A flaky fish steak with a crispy, savoury finish.', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'desserts-cakes',
    label: 'Dessert',
    description: 'Sweet endings and decadent additions to complete the meal.',
    icon: Sparkles,
    products: [
      { name: 'Sizzler Brownie With Icecream', price: 150, type: 'veg', description: 'Warm brownie served with ice cream for a rich, indulgent dessert finish.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80' },
      { name: 'Chocolate Sauce', price: 30, type: 'veg', description: 'Extra drizzle for a rich cocoa finish.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80' },
      { name: 'Iced Scoop', price: 30, type: 'veg', description: 'A chilled scoop to cool down your sweet treat.', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=900&q=80' },
      { name: 'Strawberry', price: 30, type: 'veg', description: 'Fruit-forward dessert topping with a bright finish.', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=900&q=80' },
      { name: 'Blueberry', price: 40, type: 'veg', description: 'A berry-laced dessert add-on for a fresh finish.', image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80' },
      { name: 'Chocolate IceCream', price: 40, type: 'veg', description: 'Rich chocolate ice cream for extra indulgence.', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=900&q=80' },
      { name: 'Vanilla IceCream', price: 40, type: 'veg', description: 'Classic vanilla scoop with a smooth, creamy finish.', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=900&q=80' },
      { name: 'Whipped Cream', price: 25, type: 'veg', description: 'A fluffy creamy topper to elevate any dessert.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80' },
      { name: 'Any Syrup', price: 15, type: 'veg', description: 'Choose a syrup to flavour your dessert or beverage.', image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80' },
      { name: 'Cookie', price: 15, type: 'veg', description: 'A crunchy bite to pair with your dessert.', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=80' },
    ],
  },
]

const filterOptions = [
  { value: 'all', label: 'All Items' },
  { value: 'veg', label: 'Veg' },
  { value: 'non-veg', label: 'Non-Veg' },
  { value: 'popular', label: 'Popular' },
  { value: 'best-seller', label: 'Best Sellers' },
]

function formatPrice(value) {
  return `₹${value}`
}

function Menu() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredSections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return menuSections
      .map((section) => ({
        ...section,
        products: section.products.filter((product) => {
          const matchesCategory = activeCategory === 'all' || section.id === activeCategory
          const searchText = [product.name, product.description, product.size, product.priceText, section.label]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
          const matchesQuery = !normalizedQuery || searchText.includes(normalizedQuery)
          const matchesFilter = (() => {
            switch (activeFilter) {
              case 'veg':
                return product.type === 'veg'
              case 'non-veg':
                return product.type === 'non-veg'
              case 'popular':
                return product.badge === 'Popular'
              case 'best-seller':
                return product.badge === 'Best Seller'
              default:
                return true
            }
          })()

          return matchesCategory && matchesQuery && matchesFilter
        }),
      }))
      .filter((section) => section.products.length > 0)
  }, [activeCategory, activeFilter, query])

  const totalVisibleItems = filteredSections.reduce((sum, section) => sum + section.products.length, 0)

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId)
    if (categoryId !== 'all') {
      const section = document.getElementById(categoryId)
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main className="menu-page-shell">
      <div className="menu-page-bar">
        <div className="menu-page-banner">
          <span className="menu-chip">Freshly Crafted</span>
          <h1>Restaurant Menu</h1>
          <p>All prices are in Indian Rupees</p>
        </div>

        <div className="menu-tools">
          <label className="menu-search" htmlFor="menu-search">
            <Search size={18} aria-hidden="true" />
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search your favourite food or drink..."
            />
          </label>

        </div>
      </div>

      <section className="menu-content" id="menu-list">
        <nav className="menu-category-nav" aria-label="Menu categories">
          {categoryNavigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={activeCategory === id ? 'active' : ''}
              type="button"
              onClick={() => handleCategoryClick(id)}
            >
              <span className="category-icon"><Icon size={18} aria-hidden="true" /></span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="menu-filter-row" aria-label="Filter menu by type">
          {filterOptions.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              className={activeFilter === value ? 'active' : ''}
              onClick={() => setActiveFilter(value)}
            >
              {value === 'veg' && <Leaf size={14} aria-hidden="true" />}
              {value === 'non-veg' && <Leaf size={14} aria-hidden="true" />}
              {label}
            </button>
          ))}
        </div>

        <div className="menu-results-line">
          <span>{totalVisibleItems} items available</span>
          <span>All prices in INR (₹)</span>
        </div>

        {filteredSections.length > 0 ? (
          filteredSections.map((section) => (
            <section key={section.id} id={section.id} className="menu-section">
              <div className="menu-section-header">
                <div>
                  <p className="menu-section-kicker">{section.label}</p>
                  <h2>{section.label}</h2>
                </div>
                <div className="menu-section-meta">
                  <span>{section.products.length} items</span>
                  <p>{section.description}</p>
                </div>
              </div>

              <div className="menu-item-list">
                {section.products.map((product) => {
                  const itemPrice = product.priceText || formatPrice(product.price)

                  return (
                    <article key={`${section.id}-${product.name}`} className="menu-item-row">
                      <div className="menu-item-image">
                        <img src={product.image} alt={product.name} loading="lazy" />
                      </div>
                      <div className="menu-item-copy">
                        <div className="menu-item-heading">
                          <h3>{product.name}</h3>
                          <span>{itemPrice}</span>
                        </div>
                        <p>{product.description}</p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          ))
        ) : (
          <div className="menu-empty-state">
            <Coffee size={28} aria-hidden="true" />
            <h3>No menu items found</h3>
            <p>Try another search or switch filters to explore more of The Coffee Chapter.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setActiveFilter('all')
                setActiveCategory('all')
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <div className="menu-reserve-bar">
        <Link className="menu-reserve-link" to="/reservation">
          <CalendarDays size={18} aria-hidden="true" />
          <span>Reserve a Table</span>
        </Link>
      </div>
    </main>
  )
}

export default Menu
