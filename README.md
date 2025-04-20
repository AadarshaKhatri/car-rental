# 🚗 Car Rental System

The **Car Rental System** is a full-featured web application built using [Next.js](https://nextjs.org), designed to streamline the process of renting vehicles online. It demonstrates end-to-end full-stack development skills, integrating modern technologies and best practices to deliver a responsive and user-friendly platform.

---

## 📌 Introduction

This project showcases full-stack development capabilities by implementing a complete car rental workflow. Users can browse available vehicles, filter based on their preferences (e.g., price, type, availability), and book a car in just a few steps. Admin users can manage vehicle listings and oversee bookings through a dedicated dashboard.

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure you have **Node.js** and **npm** installed.

### 🔧 Installation

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/car-rental-system.git
```
### 🔗 Install dependencies

```bash
npm install
# or
yarn install
```

## 🧩 Features

- 🛻 **Vehicle Listings** – View and add vehicles with brand, model, price, and category.
- 🔍 **Search & Filter** – Filter cars by type, price range, and availability.
- 📆 **Booking System** – Book vehicles by selecting dates and vehicle type.
- 👤 **User Authentication** – Sign up, log in, and manage personal bookings.
- 🛠️ **Admin Dashboard** – Admin panel for managing cars and reservations.
- 📱 **Responsive Design** – Optimized for all screen sizes using modern UI components.

---

## 🧱 Built With

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org) 
- [Tailwind CSS](https://tailwindcss.com) 
- [Supabase](https://supabase.com)
- [Prisma](https://www.prisma.io)



### Project Structure

```bash
/app
  /(authenticated)
    /cars
      /[id]
    /dashboard
    /profile
  /(notauthenticated)
    /login
    /signup
  /api           
  /error             
  /utils             
  gloabls.css
  layout.tsx
  page.tsx                             
README.md
```


### 🔐 Environment Variables
Create a .env.local file in the root and add the following:

```bash
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000

```


### ☁️ Deployment
The project has been deployed on Vercel. Check out the deployment docs for more.