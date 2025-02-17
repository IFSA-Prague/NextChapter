The main arch components \- backed / fronted / database.  
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




