import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TripsPage = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        Please Sign In. First
      </div>
    );
  }

  return <div className="space-y-6 container mx-auto px-4 py-8">
    <h1>Dashboard</h1>
    <Link href='/trips/new'>
    <Button className="cursor-pointer">New Trips</Button>
    </Link>
  </div>;
};

export default TripsPage;
