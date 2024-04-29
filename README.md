

  # SETTING UP LOCALLY

  # Prerequisites

- [Node.js & npm](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)

### Installing

- Clone the repository:

   ```bash
   git clone https://github.com/yourusername/project-name.git
- Navigate into the project directory

- create .env.local at root level
## ENV VARIABLES 
## mongodb
-MONGODB_URI="MONGOATLAS URI"

## redis 
-UPSTASH_REDIS_REST_URL="UPSTASH_REDIS URL"

-UPSTASH_REDIS_REST_TOKEN="TOKEN API"


## clerk auth
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="CLERK PUBLISHABLE KEY"


- CLERK_SECRET_KEY="SECRET KEY"

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/home

NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/home

webhook clerk
- WEBHOOK_SECRET="WEBHOOK CLERK KEY"



## node mailer

- SMTP_HOST=smtp.gmail.com

- SMTP_PORT=465

- SMTP_SERVICE=gmail

- SMTP_MAIL=""

- SMTP_PASSWORD=""





NEXT_PUBLIC_MODE=dev
MODE=dev


## socket


- PUSHER_APP_ID=""


- PUSHER_APP_SECRET=""


- NEXT_PUBLIC_PUSHER_APP_KEY=""



  
# APIS
<img width="635" alt="image" src="https://github.com/shishirkj/blinkchat/assets/90249481/fcc55f60-baf6-4a01-a708-5070cd397661">



# Design of the application
## load balancing and sharding not yet added
<img width="779" alt="image" src="https://github.com/shishirkj/blinkchat/assets/90249481/0fb99c73-03a0-4a73-af6b-63236a92a8a4">


