import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen font-sans font-stretch-95%">
      {/* Hero Section */}
      <section className="container mx-auto w-full h-screen flex flex-col justify-center items-center text-center gap-6">
        <h1 className="text-4xl md:text-7xl font-bold max-w-3xl leading-tight">
           Rental Management System
        </h1>
        <p className="max-w-xl text-md text-gray-600">
          A complete web-based solution to manage car rentals efficiently—covering everything
          from fleet management to customer booking and analytics.
        </p>
        <div className="flex gap-10">
          <Button className="py-6 px-7" variant="default">
            <Link href="/signup" className=" text-lg ">Get Started</Link>
          </Button>
          <Button variant="outline" className="py-6 px-7">
            <Link href="/login" className="text-lg">Sign In</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Key Features
        </h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
          The system includes all the essential modules to streamline car rental operations.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Marketplace",
              desc: "Add, edit, and manage all available cars with image uploads, categories, and availability control.",
            },
            {
              title: "Customer Bookings",
              desc: "Allow users to browse and book cars with transparent availability and pricing.",
            },
            {
              title: "Recommendation System",
              desc: "Get personalized car recommendations after completing five successful rentals.",
            },
            {
              title: "Choose Driver",
              desc: "Customers can choose drivers while booking. Admin can also assign drivers manually.",
            },
            {
              title: "Car Records",
              desc: "Maintain detailed service and maintenance logs for every car in the system.",
            },
            {
              title: "Analytics Dashboard",
              desc: "View rental trends, revenue stats, user behavior, and performance metrics.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-[#141414] p-6 rounded-xl shadow-md border border-[#2a2a2a]"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack (Optional) */}
      <section className="container mx-auto px-6 py-12 max-w-4xl text-center">
        <h2 className="text-3xl font-semibold mb-4">Tech Stack Used</h2>
        <p className="text-gray-600 text-md mb-6">
          Built with modern tools to ensure scalability, security, and ease of use.
        </p>
        <div className="flex justify-center flex-wrap gap-6 text-gray-300 text-sm">
          <span className="bg-primary text-background px-4 py-2 rounded-full">Next.js</span>
          <span className="bg-primary text-background px-4 py-2 rounded-full">Tailwind CSS</span>
          <span className="bg-primary text-background px-4 py-2 rounded-full">Prisma</span>
          <span className="bg-primary text-background px-4 py-2 rounded-full">Supabase</span>
          <span className="bg-primary text-background px-4 py-2 rounded-full">ShadCn</span>
          <span className="bg-primary text-background px-4 py-2 rounded-full">Recharts</span>
          <span className="bg-primary text-background px-4 py-2 rounded-full">Axios</span>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-500 text-center py-6 mt-10 text-sm">
        © {new Date().getFullYear()}. All rights reserved.
      </footer>
    </main>
  );
}
