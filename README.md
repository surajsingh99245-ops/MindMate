# 🧠 MindMate

### AI-Powered Mental Wellness Companion

MindMate is an AI-powered mental wellness platform designed to provide users with an accessible and supportive digital space for emotional reflection, self-awareness, and everyday well-being.

The platform brings together conversational AI and practical wellness tools within a unified experience. Users can interact with an AI wellness companion, complete daily emotional check-ins, maintain personal journal entries, access guided wellness exercises, and review wellness-related reports and insights.

MindMate is designed around the idea that small, consistent moments of reflection can help individuals become more aware of their emotional well-being. Rather than focusing on a single wellness activity, the platform provides multiple tools that users can access based on their needs.

---

## 🎯 Problem Statement

Stress, anxiety, loneliness, sleep difficulties, lack of focus, and emotional overwhelm are increasingly common experiences in everyday life. However, individuals may not always have immediate access to simple and approachable tools that help them pause, reflect on their emotions, and take constructive steps toward improving their well-being.

Many existing digital wellness solutions also focus on individual activities in isolation. Users may need separate tools for conversational support, journaling, daily emotional tracking, relaxation exercises, and wellness insights.

This creates an opportunity for a unified platform that brings these experiences together while remaining simple, accessible, and easy to use.

---

## 💡 Proposed Solution

MindMate addresses this challenge by combining conversational AI, structured self-reflection, and interactive wellness activities within a single platform.

The platform provides users with multiple ways to engage with their well-being:

- 🤖 **AI Wellness Companion** for supportive, conversational interactions
- 📅 **Daily Check-In** for structured emotional self-reflection
- 📓 **Personal Journal** for recording thoughts and experiences
- 🌿 **Wellness Hub** containing guided and interactive wellness exercises
- 📊 **Wellness Reports** for presenting wellness-related information and insights
- 🎙️ **Voice Input** for a more convenient conversational experience

By bringing these capabilities together, MindMate aims to make everyday emotional self-reflection and wellness support more accessible and engaging.

---

## 🎯 Project Objectives

The primary objectives of MindMate are to:

- Provide an accessible digital environment for everyday emotional self-reflection.
- Use conversational AI to create a supportive and interactive user experience.
- Encourage users to build a consistent habit of checking in with their emotional well-being.
- Provide structured tools for journaling and daily wellness check-ins.
- Offer practical wellness exercises that users can perform directly within the platform.
- Present wellness-related information through an intuitive reporting experience.
- Maintain a simple, responsive, and user-friendly interface across different devices.

---

## ✨ Key Features

### 🤖 AI Wellness Companion

MindMate provides an AI-powered conversational interface where users can share their thoughts, feelings, or concerns and receive supportive responses.

The chat experience includes:

- Real-time AI-generated responses
- Animated typing indicator while a response is being generated
- Markdown-formatted AI responses for improved readability
- Automatic conversation scrolling
- Speech-to-text input using browser-based speech recognition
- Responsive chat interface across different screen sizes

The landing page also provides limited access to the AI companion, allowing visitors to experience MindMate before signing in.

---

### 📅 Daily Check-In

The Daily Check-In module encourages users to regularly reflect on their current emotional state through a structured check-in experience.

It provides:

- Structured wellness questions
- Interactive input and selection controls
- A guided check-in flow
- Submission-ready data structure for backend processing
- A completion state after a successful daily check-in

The module is designed to make regular emotional self-reflection simple and approachable.

---

### 📓 Personal Journal

The Journal provides users with a dedicated space for recording thoughts, experiences, and personal reflections.

It is designed to encourage consistent self-reflection while keeping journaling integrated with the broader MindMate wellness experience.

---

### 🌿 Interactive Wellness Hub

The Wellness Hub provides practical activities that users can access based on what they currently need, without requiring an AI-generated exercise each time.

Users can explore activities related to areas such as stress, anxiety, sleep, focus, self-care, and loneliness.

The current interactive exercises include:

- 🌬️ **Deep Breathing** — guided breathing exercise
- 🌿 **5-4-3-2-1 Grounding** — structured grounding activity
- 🌙 **Sleep Relaxation** — guided relaxation experience for winding down
- 🎯 **Quick Focus Reset** — short interactive focus exercise
- 💙 **Self-Compassion Break** — guided three-step self-compassion activity
- 🙏 **Gratitude Exercise** — interactive "Three Good Things" reflection
- 🤝 **Connection Reset** — small guided actions designed to encourage connection

Each exercise provides an interactive experience rather than functioning as a static informational card.

---

### 📊 Wellness Reports

MindMate includes a dedicated reporting module designed to present wellness-related information and help users better understand their patterns over time.

The reporting experience complements the Daily Check-In and Journal modules by providing users with a more structured view of their wellness journey.

---

### 🎙️ Voice Input

MindMate supports browser-based speech recognition within the AI chat interface.

Users can speak instead of typing their message manually, providing an additional and more convenient way to interact with the AI companion.

---

### 🔐 User Authentication

MindMate includes account-based access to its primary application features.

Authenticated users can access the main MindMate experience, including the AI companion, Daily Check-In, Journal, Wellness Hub, and Reports. The interface also provides profile and logout functionality across the authenticated pages.

---

### 📱 Responsive User Interface

MindMate is designed to provide a consistent experience across different screen sizes.

The interface includes responsive layouts for:

- Desktop
- Tablet
- Mobile devices

Navigation, chat components, wellness activities, forms, and other interface elements adapt according to the available screen space.

---

## 🔄 How MindMate Works

MindMate is designed around a simple user journey that allows users to move between conversational support, self-reflection, wellness activities, and personal insights from a unified interface.

### User Workflow

1. **Visit MindMate**  
   A user begins on the MindMate landing page, where they can explore the platform and interact with the limited-access AI companion.

2. **Create an Account or Sign In**  
   To access the complete MindMate experience, the user can register or sign in to their account.

3. **Access the MindMate Dashboard**  
   After authentication, the user can navigate between the core modules of the platform.

4. **Talk to the AI Companion**  
   Users can share thoughts, feelings, or concerns with the AI wellness companion through text or voice input.

5. **Complete a Daily Check-In**  
   The Daily Check-In provides a structured way for users to reflect on their current emotional state.

6. **Write in the Journal**  
   Users can record thoughts, experiences, and personal reflections through the Journal module.

7. **Explore the Wellness Hub**  
   Users can select what they currently need and access relevant interactive wellness exercises.

8. **Review Wellness Reports**  
   The Reports module provides a structured view of available wellness-related information and insights.

### Application Flow

```mermaid
flowchart TD

    A[Landing Page] --> B{User Account}

    B -->|Sign In| C[Authentication]
    B -->|Create Account| C

    C --> D[MindMate Home]

    D --> E[AI Wellness Companion]
    D --> F[Daily Check-In]
    D --> G[Personal Journal]
    D --> H[Wellness Hub]
    D --> I[Wellness Reports]

    H --> J[Choose Current Need]
    J --> K[Interactive Wellness Exercise]

    E --> D
    F --> D
    G --> D
    K --> D
    I --> D