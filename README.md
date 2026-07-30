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