**ReadMe:**

**NextChapter**

**Members:** Sanjana Yadav, Vienna Parnell, Vivian Park  

**Goal:** To create a social media platform that encourages book completion, helps readers discover books worth their time and money, and fosters a vibrant reading community through book-club-style discussions.

**Description:** NextChapter is a social media platform designed for readers to track their progress, engage in meaningful discussions, and discover books tailored to their interests. By integrating book completion incentives, personalized recommendations, and interactive book club features, NextChapter builds a community-driven space where readers can connect, share insights, and stay motivated to finish their next great read.

**Target Group:** Our target audience includes both avid and occasional readers who are active on social media, primarily ranging from late teens to early thirties. We aim to engage those who aspire to make reading a hobby but struggle to do so consistently on their own.

**Value Proposition:** NextChapter enhances the reading experience by combining social engagement with personalized book discovery. It provides structured accountability through book clubs and discussion groups, motivating readers to complete books while fostering a sense of community. Unlike traditional platforms that focus solely on reviews or recommendations, NextChapter integrates interactive features that support engagement throughout the reading journey.

**Problem Description:** Many people want to read more but struggle with motivation, pacing, and finding the right books. While social media plays a significant role in book discovery, it often lacks a structured way to encourage book completion. Readers frequently lack a community that shares their reading speed or taste, making discussions difficult. Additionally, fear of spoilers discourages engagement during the reading process.

**Tech Stack:**

The main arch components \- backend / fronted / database.  
I would also like to see some API specified if you are using any \+  
reasons why you choose this / that. Programming language also kind of  
relates to architecture choice so specify it as well. Any libraries  
being used should be there as well.

**Architecture/ Tech Stack**   
Frontend: 

* React Native / Expo   
  * We are doing this because we have familiarity with it and it supports cross platform development for iOS and Android. 

Authentication:

* Firebase auth- [https://firebase.google.com/docs/auth](https://firebase.google.com/docs/auth)   
  * Easy to use and can be integrated with multiple languages/ platforms   
  * Most commonly used

Backend:

* Rest API calls to the Backend   
  * Have experience with RestAPI calls   
* Flask framework   
* Storage/ scalability \- AWS S3/ cloudflare   
* Content based recommendation system \- cosine similarity and tf-idf type algorithm \- for mvp, this can just be done in python by Convert book descriptions & metadata into numerical representations, Compute similarity scores between books, Return books with the highest similarity scores.  
  * If we want to make it more complicated we can use   
    * [https://www.recombee.com/?utm\_source=chatgpt.com](https://www.recombee.com/?utm_source=chatgpt.com)   
    * [https://www.qloo.com/products/api](https://www.qloo.com/products/api)  
      * need to check in on prices but has been tested on book s and is easily integratable  

Databases:

* MongoDB for book metadata  
  * Books have a lot of flexible fields (multiple genres, missing information potentially)  so it's easier to store more complex data there \- might be able to also do SQL tho cause using API for book data   
* SQLite for caching local data   
  * Use Python for scripting   
* PostgreSQL for storing structured data   
  * Have experience with both of these and creating databases 

  
APIs

* [Google Books API](https://developers.google.com/books)   
  * Retrieve extensive book information, including titles, authors, descriptions, and cover images, need this so that we can create a book database, pretty extensive \- go to api for book information   
* [Open Library Book API](https://openlibrary.org/developers/api)   
  * Same information as google books API, has many different search and list creation features that can be integrated into users page and allows for criteria based searching  
* Discourse