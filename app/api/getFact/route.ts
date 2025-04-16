import { NextResponse } from "next/server";


export async function GET(){
  const facts = [
    "💡 This platform was built by Aadarsha Khatri as a side project!",
    "🛠️ This isn't a commercial product — it's a personal experiment in building cool car tech.",
    "📦 Data is currently mock-based, but the goal is to connect with real APIs soon!",
    "🎨 The UI/UX was custom designed with attention to learning and clean layout.",
    "📚 Every feature here reflects something new learned during development!",
    "👨‍💻 No frameworks were harmed during the making of this platform — just lots of caffeine.",
    "💻 The platform started as an idea to practice full-stack development and became something I’m proud of!",
    "🔍 This platform is a personal project that continues to evolve with new ideas and experiments.",
    "🔧 This platform was built using Next.js, leveraging its powerful features for a fast and dynamic user experience.",
    "⚡ Speed and performance optimization is a major focus to ensure smooth user experiences!"
  ];

  const randomIndex = Math.floor(Math.random() * facts.length);
  const randomFact = facts[randomIndex];

  return NextResponse.json(randomFact);
}