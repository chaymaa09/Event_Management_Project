# Event Management Platform

A full-stack event management application built with Spring Boot, Angular, and Keycloak for authentication. Users can browse events by city and continent, create and manage events, participate in events, and more.

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-fb015b?style=for-the-badge)
![Maven](https://img.shields.io/badge/Maven-3.x-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 📖 Overview

**Event Management Platform** is a modern, full-featured web application designed to connect event organizers with attendees. The platform enables users to discover events based on categories (Music, Learn, Create, Connect, Chill), browse events by geographic location (continents and cities), and participate in events that match their interests.

**Key Highlights:**

- 🎯 **Smart Event Discovery**: Browse events by category vibes (Music, Learn, Create, Connect, Chill) with intelligent tagging system
- 🌍 **Geographic Exploration**: Discover events organized by continents and cities with interactive maps powered by Leaflet
- 🔐 **Secure Authentication**: OAuth2/OIDC authentication via Keycloak with support for social login (Google, GitHub)
- 📝 **Rich Event Creation**: Create events with Markdown-supported descriptions, custom posters, tags, and flexible locations (physical or virtual)
- 👥 **Event Participation**: Join events, track participation status (pending, joined, cancelled), and view attendee lists
- 📱 **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS

**User Journey:**

1. **Landing Page**: Visitors are greeted with trending events and category cards showcasing different event vibes
2. **Authentication**: Users can sign in via Keycloak (with optional Google/GitHub OAuth)
3. **Home Dashboard**: Authenticated users see featured events, trending events, and personalized recommendations
4. **Event Discovery**: Browse events by category tags or explore by continent → city → specific events
5. **Event Details**: View comprehensive event information including location maps, organizer details, and participation options
6. **Event Creation**: Organizers can create events with rich descriptions, poster uploads, pricing, and capacity limits
7. **Profile Management**: Users can view their hosted events, attended events, and manage participation status
8. **Event Participation**: Request to join events, track approval status, and cancel participation

The application uses a modern tech stack with Spring Boot 3.5 backend, Angular 20 frontend, MySQL database, and Flyway migrations for database versioning. Security is handled through Keycloak integration with JWT tokens, and the platform supports both physical and virtual events with integrated mapping capabilities.



## � Features

- **User Authentication**: Secure OAuth2/OIDC authentication via Keycloak
- **Event Management**: Create, update, and delete events with rich text descriptions
- **Geographic Organization**: Browse events by continent and city
- **Live Event Status**: Real-time indication of ongoing events
- **Event Participation**: Users can register and participate in events
- **User Profiles**: Manage user profiles with avatars
- **Responsive Design**: Modern UI with Tailwind CSS
- **Bilingual Support**: English and French localization

## 🏗️ Tech Stack

### Backend

- **Java 17**
- **Spring Boot 3.5.7**
- **Spring Security** with OAuth2 Resource Server
- **Spring Data JPA** with Hibernate
- **MySQL 8** database
- **Flyway** for database migrations
- **Keycloak** for authentication and authorization
- **Lombok** for boilerplate reduction
- **Maven** for dependency management

### Frontend

- **Angular 20.3.0** (Standalone Components)
- **TypeScript**
- **Tailwind CSS** for styling
- **Keycloak Angular 20.0.0** for auth integration
- **Leaflet** for maps
- **Marked** for Markdown rendering
- **Angular Material & CDK**

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK) 17** or higher
- **Node.js 18+** and npm
- **MySQL 8.0+**
- **Keycloak 26+** (or use Docker)
- **Maven 3.6+** (or use the included wrapper)
- **Git**

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/chaymaa09/Event_Management_Project.git
cd Event_Management_Project
```

### 2. Database Setup

#### Create MySQL Database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE IF NOT EXISTS `event-management`;
EXIT;
```

The application uses Flyway for database migrations, which will automatically create and populate tables on first run.

#### Database Configuration

Update `EventMangementProject/src/main/resources/application.properties` if needed:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/event-management?createDatabaseIfNotExist=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

### 3. Keycloak Setup

#### Option A: Using Docker (Recommended)

```bash
docker run -d \
  --name keycloak \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:26.2.2 \
  start-dev
```

#### Option B: Manual Installation

1. Download Keycloak from [keycloak.org](https://www.keycloak.org/downloads)
2. Extract and run: `bin/kc.sh start-dev` (Linux/Mac) or `bin\kc.bat start-dev` (Windows)
3. Access Keycloak at http://localhost:8080
4. Login with admin/admin

#### Configure Keycloak Realm

1. Create a new realm named `event-management-realm`
2. Create a client named `event-management-client`:
   - Client authentication: OFF (public client)
   - Standard flow: ENABLED
   - Direct access grants: ENABLED
   - Valid redirect URIs: `http://localhost:4200/*`
   - Web origins: `http://localhost:4200`
3. Create users for testing in the realm

#### Configure OAuth Providers (Optional)

To enable social login with Google and GitHub:

1. **Get OAuth Credentials**:

   - [Google OAuth Console](https://console.developers.google.com/)
   - [GitHub OAuth Apps](https://github.com/settings/developers)

2. **Add to `.env` file** (copy from `.env.example`):

   ```
   GOOGLE_CLIENT_ID=your-google-client-id-here.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-google-client-secret-here
   GITHUB_CLIENT_ID=your-github-client-id-here
   GITHUB_CLIENT_SECRET=your-github-client-secret-here
   ```

3. **In Keycloak Admin Console**:

   - Go to Realm → Identity Providers
   - Add "Google" provider (add credentials)
   - Add "GitHub" provider (add credentials)
   - Map user attributes as needed
   - Update client redirect URIs to include social provider callbacks

4. **Frontend** will automatically show social login buttons on the login page

### 4. Backend Setup

Navigate to the backend directory:

```bash
cd EventMangementProject
```

#### Update Application Properties

Ensure `src/main/resources/application.properties` has correct Keycloak settings:

```properties
spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8080/realms/event-management-realm

keycloak.admin.server-url=http://localhost:8080
keycloak.admin.admin-realm=master
keycloak.admin.target-realm=event-management-realm
keycloak.admin.client-id=admin-cli
keycloak.admin.username=admin
keycloak.admin.password=admin
```

#### Build and Run

Using Maven wrapper (recommended):

```bash
# Windows
mvnw.cmd clean install
mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw clean install
./mvnw spring-boot:run
```

Or using installed Maven:

```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on **http://localhost:8081**

### 5. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd event-management-frontend
```

#### Install Dependencies

```bash
npm install
```

#### Update Keycloak Configuration

Ensure `src/app/app.config.ts` has the correct Keycloak settings:

```typescript
{
  config: {
    url: 'http://localhost:8080',
    realm: 'event-management-realm',
    clientId: 'event-management-client'
  },
  initOptions: {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
  }
}
```

#### Run Development Server

```bash
npm start
```

The frontend will start on **http://localhost:4200**

## 🐳 Docker Setup

Docker Compose configuration for running the entire stack (MySQL, Keycloak, Backend, Frontend).

### Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

This will start:

- **MySQL** on port 3306
- **Keycloak** on port 8080

Then follow steps 4-5 above to run backend and frontend.

### Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f keycloak
docker-compose logs -f mysql

# Stop services
docker-compose down

# Clean everything (including data)
docker-compose down -v
```

## 📁 Project Structure

```
Event_Management_Project/
├── EventMangementProject/          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/eventmanagementproject/
│   │   │   │   ├── domain/         # Entity models
│   │   │   │   ├── dto/            # Data Transfer Objects
│   │   │   │   ├── repository/     # JPA Repositories
│   │   │   │   ├── service/        # Business logic
│   │   │   │   ├── web/            # REST Controllers
│   │   │   │   └── security/       # Security configuration
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── db/migration/   # Flyway migrations
│   │   └── test/
│   └── pom.xml
│
└── event-management-frontend/      # Angular Frontend
    ├── src/
    │   ├── app/
    │   │   ├── components/         # Reusable components
    │   │   ├── pages/              # Page components
    │   │   ├── services/           # API services
    │   │   ├── guards/             # Route guards
    │   │   ├── interceptors/       # HTTP interceptors
    │   │   └── models/             # TypeScript models
    │   ├── assets/
    │   └── environments/
    ├── angular.json
    ├── package.json
    └── tailwind.config.js
```

## 🔌 API Endpoints

### Authentication

All endpoints require Bearer JWT token (except public endpoints)

### Events

- `GET /api/events` - Get all events
- `GET /api/events/{id}` - Get event by ID
- `GET /api/events/city/{cityName}` - Get events by city (case-insensitive)
- `POST /api/events` - Create new event (authenticated)
- `PUT /api/events/{id}` - Update event (authenticated, owner only)
- `DELETE /api/events/{id}` - Delete event (authenticated, owner only)

### Cities & Continents

- `GET /api/continents` - Get all continents
- `GET /api/cities/{continent}` - Get cities by continent with event counts
- `GET /api/cities/name/{cityName}` - Get city details by name

### Users

- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user profile
- `DELETE /api/users/me` - Delete current user account

### Participation

- `POST /api/participations` - Register for event
- `DELETE /api/participations/{id}` - Cancel participation
- `GET /api/participations/event/{eventId}` - Get participants for event
- `GET /api/participations/user/{userId}` - Get user's participations

## 🎨 Key Features Details

### Event Creation

Users can create events with:

- Title, description (Markdown supported), and category
- Date, time, and duration
- Location (city, address, or virtual)
- Maximum participants and pricing
- Tags for better discoverability
- Event poster image upload

### City & Continent Browsing

- Browse continents with event counts
- View cities grouped by continent
- City detail pages show all events in that city
- Dynamic map integration using Leaflet

### User Authentication Flow

1. Users access the platform
2. Click "Sign In" redirects to Keycloak login
3. After authentication, JWT token is stored
4. Token is automatically attached to API requests
5. Protected routes require valid authentication

## 🔧 Development

### Backend Development

```bash
cd EventMangementProject
./mvnw spring-boot:run
```

Hot reload is enabled via Spring Boot DevTools.

### Frontend Development

```bash
cd event-management-frontend
npm start
```

Angular dev server supports hot module replacement.

### Database Migrations

Create new Flyway migration in `src/main/resources/db/migration/`:

```
V{version}__Description.sql
```

Example: `V9__Add_event_rating.sql`

## 🧪 Testing

### Backend Tests

```bash
cd EventMangementProject
./mvnw test
```

### Frontend Tests

```bash
cd event-management-frontend
npm test
```

## 📝 Environment Variables

### Backend (application.properties)

- `spring.datasource.url` - MySQL connection URL
- `spring.datasource.username` - Database username
- `spring.datasource.password` - Database password
- `spring.security.oauth2.resourceserver.jwt.issuer-uri` - Keycloak realm URL
- `keycloak.admin.*` - Keycloak admin configuration
- `app.user-avatar-dir` - Directory for user avatar uploads

### Frontend (environment.ts)

- Keycloak URL, realm, and client ID are configured in `app.config.ts`

### OAuth Configuration (.env file)

Copy `.env.example` to `.env` and add your credentials:

```
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

**Important**: `.env` is in `.gitignore` and should NEVER be committed to git for security.

## 🐛 Troubleshooting

### Backend won't start

- Ensure MySQL is running and accessible
- Check database credentials in application.properties
- Verify Keycloak is running and accessible at http://localhost:8080
- Check port 8081 is not already in use

### Frontend shows CORS errors

- Verify backend is running on port 8081
- Check proxy.conf.json configuration
- Ensure Keycloak web origins includes http://localhost:4200

### Authentication fails

- Verify Keycloak realm and client configuration
- Check issuer-uri matches your Keycloak setup
- Ensure redirect URIs are correctly configured in Keycloak client

### Database migration errors

- Check Flyway migration files for syntax errors
- Verify database connection in application.properties
- You can reset database with: `source reset-database.sql` (use carefully!)

## 👥 Contributors

- Salwa Khattami
- Chaymaa (chaymaa09)

## 📄 License

This project is created for educational purposes as part of JEE course.

## 🙏 Acknowledgments

- Spring Boot for the excellent backend framework
- Angular team for the powerful frontend framework
- Keycloak for authentication and authorization
- Tailwind CSS for styling utilities
