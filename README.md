# Supplement Store

A modern e-commerce application for a supplement store built with Next.js 14, TypeScript, and shadcn/ui components. Features both customer-facing storefront and admin provider portal.

## Features

### Customer Features
- **Homepage**: Product carousel showcasing bestsellers and FAQ section
- **Products Page**: Browse all products with filtering (category, price, bestseller), search, and sorting
- **Product Details**: Dynamic product pages with detailed information
- **Shopping Cart**: Add/remove items with quantity management (max 1 per item)
- **Checkout**: Complete order form with shipping information

### Admin Features
- **Orders Management**: View all orders with pagination (10 per page)
- **Order Search**: Search by order ID, customer name, or product name
- **Order Filtering**: Filter by date range and status
- **Order Details**: View complete order information and update order status

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand with localStorage persistence
- **Theme**: Light/Dark mode support (next-themes)
- **Images**: Unsplash images for product photos

## Project Structure

```
/app
  /page.tsx                    # Homepage
  /products
    /page.tsx                  # Products listing
    /[id]/page.tsx             # Product details
  /cart/page.tsx               # Shopping cart
  /checkout/page.tsx           # Checkout page
  /admin/orders
    /page.tsx                  # Orders list
    /[id]/page.tsx             # Order details
/components
  /ui                          # shadcn/ui components
  /layout                       # Header, Footer
  /product                      # ProductCard, ProductCarousel, Filters
  /cart                         # CartItem, CartSummary
  /admin                        # OrdersTable, OrderDetails
/lib
  /data.ts                     # Dummy data (25 products, 10 orders)
  /types.ts                    # TypeScript interfaces
  /store.ts                    # Zustand stores
  /utils.ts                    # Utility functions
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Data

The application uses dummy data stored in `lib/data.ts`:
- **25 supplement products** across 6 categories (protein, vitamins, pre-workout, post-workout, weight-management, health-wellness)
- **10 sample orders** with various statuses (pending, processing, shipped, delivered, cancelled)

All data persists in localStorage using Zustand's persist middleware.

## Features in Detail

### Cart Management
- Add products to cart (max 1 quantity per product)
- Remove items from cart
- View cart total and item count
- Clear entire cart
- Cart persists in localStorage

### Order Management
- Create orders through checkout
- View order history in admin panel
- Update order status (pending → processing → shipped → delivered)
- Search and filter orders
- Pagination (10 orders per page)

### Theme Support
- Light/Dark mode toggle
- System preference detection
- Theme persists across sessions

## License

This project is for demonstration purposes.
