import { NextResponse } from "next/server";


export async function GET(){
  const facts = [
    "💡 This platform was built by Aadarsha Khatri as a side project using Supabase for the backend!",
    "🛠️ Supabase provides the database and authentication services, powering the platform's functionality.",
    "📦 Prisma is used as the ORM, simplifying database management and making queries more efficient.",
    "🎨 The UI/UX was custom designed with a focus on user experience, leveraging Next.js for server-side rendering and fast page loads.",
    "📚 Each feature was implemented with careful attention to learning new technologies and improving performance.",
    "👨‍💻 Next.js was chosen for its ability to create a seamless, full-stack application with both front-end and back-end integration.",
    "💻 The platform's database is powered by PostgreSQL through Supabase, ensuring scalability and reliability.",
    "🔍 Authentication is handled by Supabase’s OAuth, providing a secure and easy login experience.",
    "🔧 The platform utilizes modern JavaScript technologies, including React, Tailwind CSS, and Prisma, to ensure a sleek and responsive design.",
    "⚡ Performance optimization was a top priority, with tools like Next.js’ static site generation and Prisma’s efficient database queries for smooth user experiences."
  ];
  

  const randomIndex = Math.floor(Math.random() * facts.length);
  const randomFact = facts[randomIndex];

  return NextResponse.json(randomFact);
}