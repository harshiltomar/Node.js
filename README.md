# URL Shortner

- Design a URl shortner service that takes in a valid URL and return a shortened URL, redirecting the users to the prev provided URL
- Also, keep track of total visits/clicks on the URL

- Routes
  - POST /URL
  - GET /:id
  - GET /URL/analytics/:id

# Server Side Rendering

- We will user SSR with the help of template called EJS
- Added login and signup with validation and created cookie handling using cookie-parser
- For having stateless authentication, we will use JWT. JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.
- JWT.IO allows you to decode, verify and generate JWT.
