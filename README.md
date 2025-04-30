# NextChapter

**Members:** Sanjana Yadav, Vienna Parnell, & Vivian Park  

**Goal:**  
To create a social media platform that encourages book completion, helps readers discover books worth their time and money, and fosters a vibrant reading community through book-club-style discussions.

**Description:**  
NextChapter is a social media platform designed for readers to track their progress, engage in meaningful discussions, and discover books tailored to their interests. By integrating book completion incentives, personalized recommendations, and interactive book club features, NextChapter builds a community-driven space where readers can connect, share insights, and stay motivated to finish their next great read.

## Installation & Running Guide

This guide will walk you through setting up and running the app locally from GitHub.

### Prerequisites

- **Node.js** (version 14.x or 16.x)
- **npm** or **Yarn** (package managers)
- **Expo CLI** (Global installation)

If you don't have these installed, follow the respective installation guides before proceeding.

---

### 1. Clone the Repository

Clone the repository to your local machine by running:

```bash
git clone https://github.com/IFSA-Prague/NextChapter.git
```

Navigate to the project directory:
```bash
cd NextChapter
```

### 2. Install dependencies

Once inside the project directory, install the required dependencies by running:

```bash
npm install
```

### 3. Install Expo CLI

```bash
npm install -g expo-cli
```

### 4. Start the development server

```bash
npx expo start
```

To run the app, follow the instructions in the terminal. For example...

- Click the localhost url to view the app on your web browser.

- To run the app on your phone, scan the QR code. You need to have Expo Go installed on your phone.

- To run the app in a iOS emulator on your computer, you need to have installed Xcode.

## Additional Details 

### Target Group
Our target audience includes both avid and occasional readers who are active on social media, primarily ranging from late teens to early thirties. We aim to engage those who aspire to make reading a hobby but struggle to do so consistently on their own.

### Value Proposition
NextChapter enhances the reading experience by combining social engagement with personalized book discovery. It provides structured accountability through book clubs and discussion groups, motivating readers to complete books while fostering a sense of community. Unlike traditional platforms that focus solely on reviews or recommendations, NextChapter integrates interactive features that support engagement throughout the reading journey.

### Problem Description
Many people want to read more but struggle with motivation, pacing, and finding the right books. While social media plays a significant role in book discovery, it often lacks a structured way to encourage book completion. Readers frequently lack a community that shares their reading speed or taste, making discussions difficult. Additionally, fear of spoilers discourages engagement during the reading process.

## Tech Stack

The main architecture components: backend, frontend, database.  
I would also like to see some API specifications if you're using any, and reasons why you chose them. Programming language also relates to architecture choice, so specify it as well. Any libraries being used should be mentioned here as well.

### Architecture/ Tech Stack

#### Frontend: 
* React Native / Expo  
  * We are doing this because we have familiarity with it and it supports cross-platform development for iOS and Android.

#### Authentication:
* Firebase auth - [Firebase Auth Docs](https://firebase.google.com/docs/auth)  
  * Easy to use and can be integrated with multiple languages/platforms  
  * Most commonly used

#### Backend:
* Rest API calls to the Backend  
  * Have experience with RestAPI calls  
* Flask framework  
* Storage/scalability - AWS S3/Cloudflare  
* Content-based recommendation system - cosine similarity and tf-idf algorithm  
  * For MVP, this can just be done in Python by:  
    * Convert book descriptions & metadata into numerical representations  
    * Compute similarity scores between books  
    * Return books with the highest similarity scores  
  * If we want to make it more complicated, we can use:  
    * [Recombee](https://www.recombee.com/?utm_source=chatgpt.com)  
    * [Qloo](https://www.qloo.com/products/api)  
      * Need to check on prices but has been tested on books and is easily integratable

#### Databases:
* MongoDB for book metadata  
  * Books have a lot of flexible fields (multiple genres, missing information) so it's easier to store more complex data here. Might be able to also use SQL, though, because we're using the API for book data.  
* SQLite for caching local data  
  * Use Python for scripting  
* PostgreSQL for storing structured data  
  * Have experience with both of these and creating databases

### APIs

* [Google Books API](https://developers.google.com/books)  
  * Retrieve extensive book information, including titles, authors, descriptions, and cover images. We need this to create a book database; it's a pretty extensive go-to API for book information.
* [Open Library Book API](https://openlibrary.org/developers/api)  
  * Same information as the Google Books API, has many different search and list creation features that can be integrated into users' pages and allows for criteria-based searching.
* Discourse
