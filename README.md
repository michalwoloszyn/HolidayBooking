
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
Home
![home](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/d4c4da12-fa73-457b-9aa0-9415e4d6ac48)
Search
![search](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/cfede926-949a-4e47-a857-fce1c1924457)
![search2](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/2a50178c-a46a-4d4e-adaf-9c29df950f9e)
Single place page
![singleplace](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/2d269e3d-7645-4ec9-93f3-7cd2d491727a)
![singleplace2](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/3233fd5a-fb5d-40d1-8ca1-293441e67b8c)
Single place page - photo gallery
![photogallery](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/d12b1741-4693-44eb-a874-f0f0468aa913)
Single place page - reservation
![reservation](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/afa6de49-1068-4517-830c-1891ecf67858)
Register
![register](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/22312626-fdce-439e-bf0e-3222404dccb9)
Login
![Login](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/178334cf-4c0f-4256-a543-5b15ccbd16e0)
Profile and Logout
![profileAndLogout](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/0c0615d1-bcf6-4762-afce-da0a91e15b59)
Bookings - host
![BookingsHost](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/6cb24601-c10f-4360-a05e-889ec0424f44)
Booings - guest
![BookingsGuest](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/9e30395a-f619-4409-a30e-0a122e85cd55)
Accomodations tab
![accomodations](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/cc3e83fd-aa3a-4459-a457-3c5ea6233d2a)
Edit 
![edit](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/1582e7f4-563b-4aac-a2a0-9c6d60c745d9)
![edit2](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/0f5cb3a9-944a-45dd-9a90-12e36b867b2e)
Add new
![addnew](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/afcd5d9d-41ad-4eb5-94ee-5a3086cc9676)
![addnew2](https://github.com/michalwoloszyn/HolidayBooking/assets/78374996/6358923b-4219-4635-a13c-ca206050c74f)









## Thank you for viewing my project. 
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://michalwoloszyn.com/)


