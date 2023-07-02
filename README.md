
# AirBnb2.0 - holiday booking app

## All features

- Registration
- Login
- Authentication
- Logout
- Displaying user info
  
- Advanced Search: Users can search for accommodations based on location, dates range, number of guests
  
- Add new property: Hosts can create detailed property listings, including property descriptions, amenities, images, pricing, availability calendar etc.
- Uploading many photos at once or uploading photos by link
- Choosing main photo
- Deleting photos
- Edititng properties: Each property can be edited by the owner.
  
- Displaying all listings
- Displaying detailed specific listing
- Photo gallery for a specific listing 

  
- Booking: Users can view available properties, check their availability in real-time, and make bookings directly through the app.
- Bookings tab: Users can display all the bookings and their details for properties as a host or for properties that they booked.




## Tech Stack

[![My Skills](https://skills.thijs.gg/icons?i=html,css,js,tailwind,react,nodejs,express,mongo,vite&theme=light)](https://skills.thijs.gg)


## Lessons Learned

Besides the above mentioned technologies I've used bcrypt for password hashing, jsonwebtoken for authentication, mongoose for database schema, and axios to perform CRUD operations. I also had an opportunity to learn how unpredicatble deployment process may be. Initially I wanted to upload everything using the same hosting as my portfolio website www.michalwoloszyn.com however it turned out the hosting provider doesn't support node and I was forced to find some alternatives. After trying a few platforms railway.com, seemed to be the best option for live demo back end hosting. I also had to refactor a lot of parts in the code to make it run not only locally but also on the server.

## Demo

https://holidaybooking.netlify.app/
## Run Locally

Clone the project

```bash
  git clone https://github.com/michalwoloszyn/HolidayBooking/
```

Go to the api directory

```bash
  cd api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Go to the client directory

```bash
  cd ..
```

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the client

```bash
  npm run dev
```
## Environment Variables

To run this project, you will need to add the following environment variable to your .env file. 

`MONGO_URL` - mongoDB url for database connection




## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
![home](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/d4c4da12-fa73-457b-9aa0-9415e4d6ac48)


## Thank you for viewing my project. 
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://michalwoloszyn.com/)


