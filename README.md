# 🧠 MindMate

### AI-Powered Mental Wellness & Self-Reflection Platform

MindMate is a full-stack mental wellness platform designed to help users understand and reflect on their emotional well-being through AI-assisted conversations, personal journaling, structured daily check-ins, wellness activities, and interactive analytics.

The platform integrates **Google Gemini AI** with a **Node.js, Express.js, and PostgreSQL** backend to transform conversational input into structured emotional insights such as **mood, stress level, and sentiment**. These insights can then be combined with daily check-in data to help users observe patterns in their emotional well-being over time.

MindMate was developed as a hackathon project to explore how generative AI can be integrated with traditional wellness tracking to create a more interactive and insightful self-reflection experience.

> **Disclaimer:** MindMate is intended for self-reflection and general wellness support. It is not a substitute for professional medical or mental health care.

---

## 📌 Project Overview

Traditional journaling provides space for personal reflection, but the information recorded often remains unstructured and difficult to analyze over time. On the other hand, conventional mood trackers provide structured data but may fail to capture the context and nuance behind a person's emotions.

MindMate brings these approaches together.

The platform allows users to:

- 💬 Have supportive conversations with an AI wellness companion
- 🧠 Automatically derive mood, stress, and sentiment signals from conversations
- 📝 Maintain a private personal journal
- 📅 Complete structured daily mental wellness check-ins
- 📊 View weekly and monthly emotional wellness reports
- 📈 Visualize mood and activity patterns through interactive charts
- 🌿 Access interactive wellness and self-care exercises
- 🎙️ Use voice input for AI conversations

By combining conversational AI with structured wellness data, MindMate turns everyday reflection into information that users can review and understand over time.

---

## ❓ Problem Statement

People who want to understand their emotional patterns often have to choose between two different types of tools.

**Traditional journaling applications** allow users to express themselves freely, but the information remains largely unstructured. Identifying patterns across weeks or months requires manually rereading previous entries.

**Traditional mood trackers**, in contrast, generate structured information that can easily be visualized, but they often reduce complex emotional experiences to a small number of predefined values and require repetitive manual input.

General-purpose AI chatbots introduce another limitation: although they can provide conversational support, their conversations are typically disconnected from a persistent personal wellness tracking system.

MindMate addresses this gap by combining:

1. **Conversational AI** for natural emotional reflection
2. **Structured daily check-ins** for consistent wellness tracking
3. **Personal journaling** for longer-form reflection
4. **Persistent wellness data** stored in PostgreSQL
5. **Analytics and visualization** for identifying emotional patterns over time

---

## 💡 Our Solution

MindMate creates a unified mental wellness experience where different forms of self-reflection contribute to a broader picture of the user's emotional well-being.

When a user interacts with the AI companion, the backend sends the message to **Google Gemini** using a carefully constrained prompt. In addition to generating a supportive response, the AI returns structured emotional information:

- **Mood** — Happy, Calm, Neutral, Sad, Anxious, Angry, or Stressed
- **Stress Level** — represented on a numerical scale
- **Sentiment** — Positive, Neutral, or Negative

This information can be stored alongside the conversation and later incorporated into wellness analytics.

Users can independently complete structured daily check-ins containing information such as mood, stress, energy, sleep quality, selected emotions, and a written reflection.

Together, these features allow MindMate to combine **unstructured conversation** with **structured wellness tracking**, creating data that can be transformed into meaningful weekly and monthly insights.

---

## ✨ Key Features

### 🤖 AI Wellness Companion

MindMate integrates **Google Gemini AI** to provide supportive conversational responses while simultaneously extracting structured emotional signals from user messages.

For each AI interaction, the system can derive:

- Mood classification
- Stress level
- Sentiment
- A supportive conversational response

The AI prompt is designed specifically for the wellness context and explicitly instructs the model not to diagnose medical conditions or prescribe medication.

---

### 📅 Daily Mental Wellness Check-In

Users can complete a structured daily check-in to record different aspects of their well-being.

The check-in captures information including:

- Current mood
- Stress level
- Energy level
- Sleep quality
- Selected emotions
- Personal reflection

Server-side validation is applied to the Daily Check-In before information is written to the database.

The system also uses a per-user, per-day check-in model so that submitting another check-in for the same day updates the existing record instead of creating duplicate daily entries.

---

### 📝 Personal Journal

MindMate includes a personal journaling system for longer-form reflection.

Users can:

- Create journal entries
- View previous entries
- Update existing entries
- Delete entries

The journal complements the structured Daily Check-In by giving users a space to capture experiences and thoughts that cannot easily be represented using predefined wellness metrics.

---

### 📊 Wellness Reports & Analytics

MindMate transforms stored wellness information into weekly and monthly reports.

The reporting system uses conversation-derived emotional signals and Daily Check-In activity to generate information such as:

- Mood trends
- Mood distribution
- Average wellness indicators
- Daily or weekly activity
- Check-in consistency
- Current check-in streak
- Total tracked entries
- Generated insight summaries

The frontend uses **Chart.js** to present these results through interactive visualizations, making long-term emotional patterns easier to understand.

---

### 🌿 Wellness Hub

MindMate includes a collection of interactive, self-guided wellness exercises implemented directly in the frontend.

The Wellness Hub provides activities intended to support areas such as:

- Stress management
- Relaxation
- Sleep
- Focus
- Self-care
- Emotional grounding
- General well-being

These exercises operate independently of the backend, allowing users to access wellness activities without requiring an AI request.

---

### 🎙️ Voice-Enabled Interaction

The AI conversation interface supports microphone input through the browser's **Web Speech API**.

Users can speak instead of typing, providing a more natural way to interact with the MindMate AI companion on supported browsers.

---

## ⚙️ How MindMate Works

MindMate follows a three-tier client-server architecture consisting of a static frontend, an application backend, and a relational database, with Google Gemini acting as an external AI service.

```text
┌─────────────────────────────────────────────────────────────┐
│                           USER                              │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                            │
│                                                             │
│             HTML5 • CSS3 • Vanilla JavaScript              │
│                                                             │
│  AI Chat • Journal • Daily Check-In • Reports • Wellness   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                         Fetch API / JSON
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                          BACKEND                            │
│                                                             │
│                    Node.js • Express.js                     │
│                                                             │
│        API Routes • Validation • Business Logic            │
└───────────────────────┬─────────────────────┬───────────────┘
                        │                     │
                        ▼                     ▼
             ┌──────────────────┐   ┌─────────────────────┐
             │    PostgreSQL    │   │    Google Gemini    │
             │                  │   │         AI          │
             │ Users            │   │                     │
             │ Journals         │   │ AI Responses        │
             │ Chat History     │   │ Mood Analysis       │
             │ Daily Check-Ins  │   │ Stress Analysis     │
             │                  │   │ Sentiment Analysis  │
             └──────────────────┘   └─────────────────────┘

User Message
     │
     ▼
Frontend Chat Interface
     │
     │  POST /chat
     ▼
Express Backend
     │
     ▼
MindMate AI Prompt
     │
     ▼
Google Gemini
     │
     ▼
Structured AI Response
     │
     ├── Supportive Reply
     ├── Mood
     ├── Stress Level
     └── Sentiment
     │
     ▼
PostgreSQL
     │
     ▼
Wellness Analytics


---

## 🛠️ Technology Stack

MindMate uses a lightweight full-stack architecture built with standard web technologies, a Node.js backend, PostgreSQL for persistent storage, and Google Gemini for AI-powered conversation and emotional analysis.

### Frontend

| Technology | Purpose |
|---|---|
| **HTML5** | Defines the structure and content of the application pages |
| **CSS3** | Handles styling, responsive layouts, animations, and visual design |
| **JavaScript (Vanilla)** | Controls frontend interactions, API communication, forms, chat behavior, and wellness exercises |
| **Fetch API** | Communicates with the Express backend through HTTP requests |
| **Chart.js** | Renders interactive charts in the Reports module |
| **Web Speech API** | Provides speech-to-text functionality for AI chat |
| **Font Awesome** | Provides icons used throughout the interface |

The frontend does not use a JavaScript framework or build system. Each page is implemented using standard HTML, CSS, and JavaScript.

### Backend

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime for the backend |
| **Express.js** | Handles HTTP routing and server-side application logic |
| **pg** | Provides connectivity between Node.js and PostgreSQL |
| **@google/genai** | Integrates Google Gemini with the MindMate backend |
| **cors** | Enables controlled cross-origin communication between frontend and backend |
| **dotenv** | Loads environment variables and sensitive configuration |
| **Nodemon** | Automatically restarts the backend server during development |

### Database

**PostgreSQL** is used as MindMate's relational database.

It stores application data associated with:

- User accounts
- Journal entries
- AI conversation history
- AI-derived emotional metadata
- Daily wellness check-ins

### Artificial Intelligence

MindMate integrates **Google Gemini** through the official `@google/genai` SDK.

The AI layer is used for:

- Generating supportive conversational responses
- Classifying user mood
- Estimating stress level
- Identifying overall sentiment
- Converting conversational input into structured wellness information

AI requests are handled by the backend so that the Gemini API key is not exposed in frontend code.

### Development & Version Control

- **Git** — source version control
- **GitHub** — collaborative repository hosting
- **NPM** — backend package and dependency management
- **Nodemon** — backend development workflow

---

## 📁 Project Structure

MindMate follows a page-based frontend structure with a Node.js backend. The frontend consists of independent HTML pages supported by their respective CSS and JavaScript files, while the backend handles API routes, database communication, AI integration, and application logic.

```text
MindMate/
│
├── Frontend/
│   ├── HTML Pages
│   │   ├── Landing Page
│   │   ├── Login / Registration
│   │   ├── Home / AI Chat
│   │   ├── Daily Check-In
│   │   ├── Journal
│   │   ├── Wellness
│   │   └── Reports
│   │
│   ├── CSS/
│   │   └── Page-specific stylesheets
│   │
│   ├── JavaScript/
│   │   └── Page-specific scripts and frontend logic
│   │
│   └── Image Assets/
│       └── Logos, icons, and interface assets
│
├── Backend/
│   ├── server.js
│   ├── daily-checkin.routes.js
│   ├── package.json
│   └── .env
│
└── README.md
```

### Frontend Organization

MindMate uses a multi-page frontend architecture rather than a single-page application framework.

Each major feature is represented through a dedicated page and supporting JavaScript logic. These pages communicate with the backend using the browser's Fetch API.

The main frontend modules include:

- **Landing Page** — introduces MindMate and provides limited access to the AI chat experience.
- **Login / Registration** — provides account creation and login functionality.
- **Home / AI Chat** — contains the primary AI wellness companion experience.
- **Daily Check-In** — collects structured daily wellness information.
- **Journal** — provides personal journal creation and management.
- **Wellness** — contains interactive client-side wellness exercises.
- **Reports** — displays aggregated wellness information and visualizations.

### Backend Organization

The backend is implemented primarily through `server.js`, which contains the majority of MindMate's server-side functionality, including:

- Express server configuration
- PostgreSQL connectivity
- User registration and login endpoints
- Journal API operations
- AI chat integration
- Report generation
- Gemini communication

Daily Check-In functionality is separated into `daily-checkin.routes.js`, which provides dedicated routing and validation for check-in operations.

> **Note:** The current prototype uses a relatively compact backend structure suitable for hackathon development. Further modularization into controllers, services, middleware, and data-access layers is a potential future improvement.

---

## 🔌 API Overview

MindMate's frontend communicates with the Node.js/Express backend through HTTP requests using JSON.

During local development, the backend runs on:

```text
http://localhost:3000
```

The API handles user registration and login, AI conversations, journal operations, Daily Check-In data, and wellness report generation.

### Core API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | Backend health check |
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Validate user login credentials |
| `POST` | `/chat` | Send a message to the MindMate AI companion |
| `POST` | `/journal` | Create a journal entry |
| `GET` | `/journal/:username` | Retrieve a user's journal entries |
| `PUT` | `/journal/:id` | Update an existing journal entry |
| `DELETE` | `/journal/:id` | Delete a journal entry |
| `POST` | `/daily-checkin` | Create or update a Daily Check-In |
| `GET` | `/daily-checkin/:username/today` | Retrieve the user's check-in for the current day |
| `GET` | `/report/weekly/:username` | Generate the user's weekly wellness report |
| `GET` | `/report/monthly/:username` | Generate the user's monthly wellness report |

### AI Chat Request

The frontend sends the user's message to the backend through:

```http
POST /chat
```

Example request:

```json
{
  "username": "exampleUser",
  "message": "I feel a little stressed today."
}
```

The backend processes the message using Google Gemini and returns both the conversational reply and structured emotional information.

Example response structure:

```json
{
  "success": true,
  "reply": "AI-generated supportive response",
  "mood": "Stressed",
  "stressLevel": 6,
  "sentiment": "Negative"
}
```

When a username is available, the conversation and derived emotional metadata are stored in the `chat_history` table for later analysis.

### Daily Check-In API

The Daily Check-In endpoint accepts structured wellness information and performs server-side validation before writing it to PostgreSQL.

The submitted data can include:

```json
{
  "username": "exampleUser",
  "mood": "calm",
  "moodValue": 4,
  "stressLevel": 3,
  "energyLevel": 4,
  "sleepQuality": "good",
  "sleepValue": 4,
  "selectedEmotions": ["calm", "hopeful"],
  "reflection": "Today felt more manageable than yesterday."
}
```

The backend validates the submitted values and uses a per-user, per-day record model to prevent duplicate Daily Check-In entries for the same date.

### Reports API

Weekly and monthly report endpoints aggregate stored information from the AI conversation history and Daily Check-In records.

The generated report data is used by the frontend to display:

- Summary metrics
- Mood trends
- Activity information
- Mood distribution
- Check-in consistency
- Current streak information
- Chart-ready datasets
- Textual wellness insights

Report calculations are performed on demand when the corresponding endpoint is requested.

> **API Status:** MindMate currently uses a prototype-oriented REST-style API. API versioning and an OpenAPI/Swagger specification are not yet implemented.

---

## 🗄️ Database Overview

MindMate uses **PostgreSQL** as its relational database for persistent application and wellness data.

The backend communicates with PostgreSQL using the Node.js `pg` package and uses parameterized SQL queries for database operations.

### Core Data Entities

The current application works with four primary data areas:

| Entity | Purpose |
|---|---|
| **`users`** | Stores registered user account information |
| **`journals`** | Stores personal journal entries created by users |
| **`chat_history`** | Stores user messages, AI responses, and AI-derived emotional metadata |
| **`daily_checkins`** | Stores structured daily wellness check-in information |

### `users`

The `users` data represents registered MindMate accounts and includes information required by the current registration and login flow.

It acts as the primary user identity referenced by other user-specific functionality.

### `journals`

The `journals` data stores personal journal entries associated with users.

Journal records support the application's CRUD functionality, allowing entries to be created, retrieved, updated, and deleted.

### `chat_history`

The `chat_history` data connects MindMate's conversational AI functionality with its wellness analytics.

A conversation record can contain:

- Username
- User message
- AI-generated reply
- Detected mood
- Estimated stress level
- Detected sentiment
- Creation timestamp

This allows AI conversations to contribute structured emotional information to the reporting system.

### `daily_checkins`

The `daily_checkins` data stores structured wellness information submitted through the Daily Check-In module.

The stored information can include:

- Mood and mood value
- Stress level
- Energy level
- Sleep quality and sleep value
- Selected emotions
- Written reflection
- Check-in date
- Creation and update timestamps

MindMate follows a per-user, per-day check-in model so that a user has one Daily Check-In record for a given date.

### Data Relationships

At a conceptual level, the application's data relationships can be represented as:

```text
                         USER
                          │
            ┌─────────────┼─────────────┐
            │             │             │
            ▼             ▼             ▼
       JOURNALS      CHAT HISTORY   DAILY CHECK-INS
                         │
                         ▼
                Emotional Metadata
               ┌─────────┼─────────┐
               │         │         │
               ▼         ▼         ▼
              Mood     Stress   Sentiment
                         │
                         ▼
                 Reports & Analytics
```

The reporting layer combines information from `chat_history` and `daily_checkins` to calculate wellness summaries and chart-ready data.

### Database Security

Database queries use **parameterized placeholders** such as `$1`, `$2`, and subsequent parameters instead of directly concatenating user input into SQL statements. This provides an important defense against SQL injection.

Database connection information is loaded through the `DATABASE_URL` environment variable rather than being hard-coded into frontend files.

> **Schema Note:** The current repository does not include a dedicated database migration system, ORM model layer, or standalone `schema.sql` file. The database structure is represented through the SQL operations used by the backend. Adding formal migrations and schema management is a recommended future improvement.

---

## 🚀 Installation & Setup

Follow the steps below to run MindMate locally.

### Prerequisites

Before setting up the project, make sure the following are installed or available:

- **Node.js**
- **npm**
- **PostgreSQL**
- **Google Gemini API Key**
- A modern web browser

---

### 1. Clone the Repository

Clone the MindMate repository and navigate into the project directory:

```bash
git clone <repository-url>
cd MindMate
```

Replace `<repository-url>` with the URL of your MindMate GitHub repository.

---

### 2. Install Backend Dependencies

Navigate to the backend directory:

```bash
cd Backend
```

Install the required Node.js packages:

```bash
npm install
```

The backend uses dependencies including:

- `express`
- `pg`
- `cors`
- `dotenv`
- `@google/genai`

Nodemon is included as a development dependency.

---

### 3. Configure Environment Variables

Create a `.env` file inside the `Backend` directory.

Add the required environment variables:

```env
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

#### `DATABASE_URL`

Provides the PostgreSQL connection string used by the backend.

Example format:

```text
postgresql://username:password@localhost:5432/database_name
```

#### `GEMINI_API_KEY`

Provides the API key used by the backend to communicate with Google Gemini.

> Never commit your `.env` file or expose API keys and database credentials in frontend JavaScript.

---

### 4. Prepare the PostgreSQL Database

Create a PostgreSQL database for MindMate and configure its connection through `DATABASE_URL`.

The application expects database structures corresponding to:

- `users`
- `journals`
- `chat_history`
- `daily_checkins`

> **Important:** The current repository does not include an automated migration system or standalone database schema script. The required database tables must therefore exist before all backend features can operate correctly.

---

### 5. Start the Backend Server

For normal execution:

```bash
npm start
```

For development with automatic server restart:

```bash
npm run dev
```

The backend runs locally on:

```text
http://localhost:3000
```

A successful backend health check should be available through the root endpoint:

```text
GET /
```

---

### 6. Run the Frontend

The MindMate frontend is built using static HTML, CSS, and JavaScript and therefore does not require a package installation or build process.

Open the frontend through a local development server, such as the **Live Server** extension in Visual Studio Code, and navigate to the landing page.

The frontend will communicate with the backend running on:

```text
http://localhost:3000
```

---

### 7. Verify the Application

Once both the frontend and backend are running, verify the major application flows:

1. Create a user account.
2. Log in using the registered account.
3. Send a message to the MindMate AI companion.
4. Create and manage a journal entry.
5. Complete a Daily Check-In.
6. Open the Reports page to view available wellness analytics.
7. Explore the interactive Wellness Hub.

If these operations work successfully, the core MindMate application is running correctly.

---

## 📸 Application Preview

MindMate provides a unified interface for AI-assisted conversation, self-reflection, wellness tracking, and interactive wellness activities.

### 🏠 Landing Page

The landing page introduces users to MindMate and provides a limited AI chat experience before account access.

![MindMate Landing Page](Project-SS/landingPage-ss.png)

---

### 🤖 AI Wellness Companion

The AI Wellness Companion allows users to interact with MindMate through text or supported voice input while the backend processes conversations using Google Gemini.

![MindMate AI Wellness Companion](Project-SS/mainAIChat-ss.png)

---

### 📅 Daily Check-In

The Daily Check-In provides a structured interface for users to record their mood, stress level, energy level, sleep quality, emotions, and personal reflections.

![MindMate Daily Check-In](Project-SS/dailyCheck-In-ss.jpeg)

---

### 📝 Personal Journal

The Personal Journal provides users with a dedicated space to create, review, update, and manage their personal reflections.

![MindMate Personal Journal](Project-SS/journal-ss.png)

---

### 🌿 Wellness Hub

The Wellness Hub provides interactive, self-guided wellness activities designed to support different everyday wellness needs.

![MindMate Wellness Hub](Project-SS/wellness-ss.png)

---

### 📊 Reports & Analytics

The Reports module presents weekly and monthly wellness information through summary metrics, generated insights, and interactive visualizations.

![MindMate Reports and Analytics](Project-SS/report-ss.png)

---


## 🚧 Current Limitations

MindMate is currently a functional hackathon prototype designed to demonstrate the integration of conversational AI, structured wellness tracking, journaling, and analytics. While the core workflows are operational, several areas require further development before the platform would be suitable for production use.

### Authentication & Security

The current login system provides basic user registration and credential validation but does not yet implement production-grade authentication mechanisms such as JWT-based authentication or server-side sessions.

Additional security improvements are required, including:

- Secure password hashing
- Server-side session or token-based authentication
- Stronger authorization and ownership validation
- Protected API routes
- Production-level security configuration

### Database Management

The current repository does not include a dedicated database migration system, ORM layer, or standalone schema setup script.

Formal schema management and automated migrations would improve deployment consistency and maintainability.

### AI Safety

The current Gemini prompt includes wellness-oriented behavioral constraints, such as avoiding medical diagnosis and medication recommendations.

However, a dedicated crisis or self-harm detection and escalation system is not currently implemented.

### Rate Limiting

The landing-page AI demo includes a client-side usage limit, but the backend does not currently provide a production-grade server-side rate-limiting mechanism.

### Backend Modularity

Most backend functionality is currently concentrated within `server.js`, with Daily Check-In routing separated into its own module.

A larger production implementation would benefit from further separation into routes, controllers, services, middleware, validation, and data-access layers.

### Prototype Scope

MindMate has been developed primarily as a hackathon prototype. Production deployment would require additional work in areas such as security hardening, automated testing, database migration management, monitoring, scalability, accessibility, and AI safety.

---

## 🔮 Future Improvements

MindMate currently demonstrates the core concept of combining conversational AI, structured wellness tracking, journaling, interactive exercises, and analytics within a single platform.

Future development can focus on strengthening the platform's security, reliability, intelligence, and scalability.

### 🔐 Production-Grade Authentication & Security

The authentication system can be strengthened through:

- Secure password hashing using technologies such as bcrypt or Argon2
- JWT-based authentication or secure server-side sessions
- Protected backend routes
- User ownership validation for personal data
- Improved input validation and sanitization
- Production-ready security headers and configuration

### 🛡️ Enhanced AI Safety

A future version of MindMate could introduce a dedicated safety layer for identifying potentially high-risk conversations.

Potential improvements include:

- Crisis and self-harm risk detection
- Appropriate supportive-resource presentation
- Escalation logic for high-risk interactions
- Stronger AI output validation
- More comprehensive wellness-specific AI guardrails

These capabilities would require careful design, testing, and validation before being used in a real-world mental wellness environment.

### 🧠 Improved AI Personalization

Future versions could make the AI experience more context-aware by safely incorporating relevant historical wellness information.

This could enable:

- Context-aware conversations
- Long-term emotional pattern awareness
- More relevant wellness suggestions
- Personalized reflection prompts
- Improved continuity between conversations

### 📊 Advanced Wellness Analytics

The existing reporting system could be expanded with more sophisticated analytics, including:

- Long-term mood trends
- Stress and sleep correlations
- Energy and mood relationships
- Weekly and monthly comparisons
- Improved streak and consistency tracking
- More detailed visualizations
- Personalized wellness summaries

### 🗄️ Database & Backend Improvements

The backend architecture could be strengthened through:

- Formal database migration scripts
- Version-controlled database schemas
- Improved relational constraints
- Additional database indexes
- Modular controllers and services
- Dedicated middleware
- Centralized error handling
- Stronger server-side validation

### 🧪 Automated Testing

A production-oriented version of MindMate would benefit from a comprehensive automated testing strategy covering:

- Unit testing
- API integration testing
- Database testing
- Authentication testing
- Frontend interaction testing
- End-to-end testing
- AI response validation

### ⚡ Performance & Scalability

Future engineering work could improve scalability through:

- Server-side rate limiting
- Optimized database queries
- Connection and resource management
- Response caching where appropriate
- Improved logging and monitoring
- Production deployment configuration

### ♿ Accessibility & User Experience

MindMate can continue to improve accessibility and usability through:

- Enhanced keyboard navigation
- Improved screen-reader support
- Better semantic HTML
- Accessibility testing
- Additional responsive design improvements
- More configurable user preferences

### 🌐 Deployment & Production Readiness

Future versions could introduce a complete production deployment workflow including:

- Automated deployment pipelines
- Secure environment management
- Database migration automation
- HTTPS configuration
- Application monitoring
- Error tracking
- Backup and recovery strategies

---

## 👥 Team & Contributions

MindMate was developed collaboratively as a hackathon project, with team members contributing across frontend development, backend development, AI integration, database management, user experience, testing, and documentation.

| Team Member | Role / Contribution |
|---|---|
| **[Suraj Singh]** | [Backend & AI Integration] |
| **[Salim Ali]** | [Frontend & UI-UX] |
| **[Vicky Kumar]** | [Research & Testing] |

The project was built through collaborative development using Git and GitHub for source control and team coordination.

---

## 🏆 Hackathon

MindMate was developed as a hackathon project to explore how generative AI can be combined with structured wellness tracking and self-reflection tools to create a more interactive mental wellness experience.

The prototype demonstrates the integration of:

- Conversational Generative AI
- Structured emotional data extraction
- Daily wellness tracking
- Personal journaling
- Interactive wellness activities
- Persistent data storage
- Wellness analytics and visualization

**Hackathon:** Mercer | Mettl AI Arena 3.0

---

## ⚠️ Disclaimer

MindMate is designed for **general wellness, emotional self-reflection, and educational purposes only**.

It is **not a medical device** and is not intended to diagnose, treat, cure, or prevent any mental health or medical condition. MindMate should not be considered a replacement for professional medical advice, diagnosis, therapy, counseling, or treatment.

AI-generated responses may be incomplete, inaccurate, or inappropriate for an individual's specific circumstances. Users should exercise judgment when interacting with AI-generated wellness content.

The current MindMate prototype does not implement a dedicated crisis-intervention or emergency-response system.

If someone is experiencing an immediate mental health emergency or is at risk of harm, they should seek appropriate professional or emergency assistance rather than relying on MindMate.

---

## 📄 Project Status

**MindMate is currently a hackathon prototype.**

The project demonstrates a functional end-to-end implementation of AI-assisted wellness conversations, structured Daily Check-Ins, personal journaling, interactive wellness activities, persistent data storage, and wellness reporting.

Further development is required before the platform would be suitable for production use, particularly in the areas of authentication, security, AI safety, automated testing, scalability, and deployment infrastructure.

---

<p align="center">
  <strong>🧠 MindMate</strong><br>
  AI-Powered Mental Wellness & Self-Reflection Platform
</p>