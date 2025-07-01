import React, { useTransition } from "react";

const NewLocationClient = ({ tripId }: { tripId: string }) => {
  const [isPending, startTransation] = useTransition();

  return (
    <div>
      <div>
        <div>
          <h1>Add New Location</h1>
        </div>
      </div>
    </div>
  );
};

export default NewLocationClient;
