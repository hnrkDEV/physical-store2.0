
# Physical Store 2.0

> **Backend system to find the nearest physical stores based on a postal code, calculate shipping costs, and return store and delivery information.**  
> Challenge PB DEZ24 - Compass UOL

---

## Technologies

- **Node.js**
- **NestJS**
- **TypeScript**
- **MongoDB (Mongoose)**
- **Swagger**
- **Jest**
- **Axios**
- **Winston Logger**

---

## Features

### Implemented Endpoints

| Route                     | Method | Description                                              |
|--------------------------|--------|----------------------------------------------------------|
| `/stores`                | GET    | List all stores or filter by state (UF)                 |
| `/stores`                | POST   | Register a new store                                     |
| `/stores/:id`            | GET    | Retrieve store by ID                                     |
| `/stores/user-location`  | GET    | Get coordinates from a postal code (CEP)                |
| `/stores/by-cep`         | GET    | List stores by postal code and return delivery options  |

---

### External APIs Integrated

| Service                  | Purpose                                            |
|--------------------------|----------------------------------------------------|
| **ViaCEP**               | Converts postal codes into address data           |
| **Google Maps API**      | Gets geolocation from addresses                   |
| **ORS (OpenRouteService)** | Calculates distance between coordinates        |
| **Melhor Envio**         | Calculates shipping options (PAC, SEDEX, etc.)    |

---

## Unit Testing

**Unit Tests Fully Implemented** for:

- Services:
  - `StoresService`
  - `GeoService`
  - `DistanceService`
  - `ViaCepService`
  - `GoogleMapsService`
  - `MelhorEnvioService`
- Controller:
  - `StoresController`

Run the tests:

```bash
npm run test
```

---

## Swagger API Documentation

Access via:  
```
http://localhost:3000/api
```

Generated with `@nestjs/swagger`.

---

## How to Run Locally

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Run in development mode
npm run start:dev
```

---

## Environment Variables

Your `.env` should include:

```env
MONGO_URI=mongodb://localhost:27017/physical-store
ORS_API_KEY=your_openrouteservice_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
MELHOR_ENVIO_USE_SANDBOX=true
MELHOR_ENVIO_TOKEN_SANDBOX=your_sandbox_token
MELHOR_ENVIO_TOKEN=your_production_token
```
