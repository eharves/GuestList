import { useState } from "react";
import GetDataHook from "./Hooks/GetDataHooks";

const API = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2507-Evan/guests";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);

  const { data: guests, loading: loadingGuests } = GetDataHook(API);

  const { data: selectedGuest, loading: loadingDetails } = GetDataHook(
    selectedId ? `${API}/${selectedId}` : null
  );

  if (loadingGuests) return <p>Loading guests...</p>;

  return (
    <div>
      {!selectedId ? (
        <>
          <h1>Guest List</h1>
          <h2>Select a guest to learn more</h2>
          <ul>
            {guests.map((guest) => (
              <li
                key={guest.id}
                onClick={() => setSelectedId(guest.id)}
              >
                {guest.name} – {guest.email}
              </li>
            ))}
          </ul>
        </>
      ) : loadingDetails ? (
        <p>Loading guest details...</p>
      ) : (
        selectedGuest && (
          <>
            <h1> Guest Details </h1>
            <p> Name: {selectedGuest.name}</p>
            <p> Email: {selectedGuest.email}</p>
            <p> Phone: {selectedGuest.phone}</p>
            <p> Bio: {selectedGuest.bio}</p>
            <p> Job: {selectedGuest.job}</p>
            <button onClick={() => setSelectedId(null)}>Back</button>
          </>
        )
      )}
    </div>
  );
}
