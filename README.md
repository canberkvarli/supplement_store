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
- **Images**: Unsplash API for product images

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

## Unsplash API Integration

Product images are sourced from the Unsplash API. The application includes full support for the Unsplash API with the following features:

### Setup

1. **Get an Unsplash API Key** (Optional but recommended):
   - Register at [https://unsplash.com/developers](https://unsplash.com/developers)
   - Create a new application
   - Copy your Access Key
   - Add it to `.env.local`:
     ```
     NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_access_key_here
     ```

2. **Without API Key**:
   - The app will use Unsplash Source URLs (deprecated but still functional)
   - Images will still work, but with limited control

### API Implementation

The application uses the Unsplash API according to their [official documentation](https://unsplash.com/documentation#search-photos):

- **Search Photos**: `/api/unsplash?query=protein&count=5` - Search for photos by keyword
- **Random Photo**: `/api/unsplash/random?query=supplement` - Get a random photo
- **Image URLs**: Images are hotlinked directly from Unsplash CDN as per their guidelines

### Files

- `lib/unsplash.ts` - Unsplash API utility functions
- `app/api/unsplash/route.ts` - API route for fetching images
- `lib/fetch-products.ts` - Function to generate products with API-fetched images
- `next.config.ts` - Configured to allow Unsplash image domains

### Usage

The current implementation uses Unsplash Source URLs for simplicity. To use the full API:

1. Set `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY` in your environment
2. The API will automatically use authenticated requests
3. You'll get better rate limits and more control over image selection

## License

This project is for demonstration purposes.
