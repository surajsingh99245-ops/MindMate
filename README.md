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