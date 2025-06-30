import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { title } from "process";

const TripsPage = async () => {
  const session = await auth();
  const trips = await prisma.trip.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        Please Sign In. First
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1>Dashboard</h1>
        <Link href="/trips/new">
          <Button className="cursor-pointer">New Trips here </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>Welcome back , {session.user?.name}</CardHeader>
        <CardContent>
          <p>
            {trips.length == 0
              ? "Start planning your first trip by clicking the button Above "
              : `You have ${trips.length} ${
                  trips.length === 1 ? "trip" : "trips"
                } planned.
                 ${
                   upcomingTrips.length > 0
                     ? `${upcomingTrips.length} upcoming.`
                     : " "
                 }
            
                `}
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4"> Your Recent Trips</h2>
        {trips.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <h3 className="text-xl font-medium mb-2"> No trips yet.</h3>
              <p className="text-center mb-4 max-w-md">
                Start planning your adventure by creating your first trip.
              </p>
              <Link href="/trips/new">
                <Button>Create Trip</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTrips.slice(0, 6).map((trip, key) => (
              <Link key={key} href={`/trips/${trip.id}`}>
                <Card>
                  <CardHeader className="h-full hover:shadow-md transition-shadow">
                    <CardTitle className="line-clamp-1">{trip.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm line-clamp-2 mb-2">
                      {trip.description}
                    </p>
                    <div className="text-sm">
                      {new Date(trip.startDate).toLocaleDateString()}-
                      {new Date(trip.startDate).toLocaleTimeString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsPage;
