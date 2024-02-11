



import mongoose from "mongoose";
import { dbConnect } from "@/lib/dbconnect";
  
export default async function Home() {
  await mongoose.connect(dbConnect)

  return (
    <main>
      <div className="p-10">
        <div className="container">
         
          <h1 className="text-center">Welcome to Dashboard</h1>
        </div>
      </div>
    </main>
  );
}
