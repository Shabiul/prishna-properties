## 1. Architecture Design

```mermaid
graph TB
    A[Frontend] --> B[Home Page]
    A --> C[Listings Page]
    A --> D[Property Details Page]
    A --> E[About Page]
    B --> F[Components]
    C --> F
    D --> F
    E --> F
    F --> G[PropertyCard]
    F --> H[Navbar]
    F --> I[Footer]
    F --> J[ImageCarousel]
    F --> K[ContactForm]
```

## 2. Technology Description
- Frontend: React@18 + TypeScript + Tailwind CSS@3 + Vite
- State Management: Zustand
- Icons: Lucide React
- Routing: React Router DOM
- Initialization Tool: vite-init
- Backend: None (static site with mock data)
- Database: None (mock data in frontend)

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | Home page with hero and featured listings |
| /listings | All property listings with filters |
| /listings/:id | Property details page |
| /about | About Prishna Properties Management |

## 4. API Definitions
No backend - all data is mock data defined in the frontend.

## 5. Server Architecture Diagram
Not applicable - no backend.

## 6. Data Model

### 6.1 Data Model Definition

```mermaid
erDiagram
    PROPERTY {
        string id
        string title
        string location
        number price
        string type
        number bedrooms
        number bathrooms
        number area
        string[] amenities
        string[] images
        string description
        string contactEmail
    }
```

### 6.2 Data Definition Language
Not applicable - no database.
