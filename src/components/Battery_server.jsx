import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, remove } from "firebase/database";
import bgImage from "../bg.jpg";

function Battery_Server() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    checkBookings();
  }, []);

  const checkBookings = async () => {
    const db = getDatabase();
    const bookingsRef = ref(db, "battery/");

    try {
      const snapshot = await get(bookingsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const bookingsList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setBookings(bookingsList);
      }
    } catch (error) {
      console.error("Error reading data:", error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const db = getDatabase();
    const bookingRef = ref(db, `battery/${bookingId}`);

    try {
      await remove(bookingRef);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
      alert("Battery has been Delivered.");
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
      <div className="mx-auto max-w-4xl py-4 px-8 bg-white shadow-lg rounded-lg relative z-10">
        <div className="text-center mb-6">
          <p className="text-lg font-semibold">Our Bookings</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="p-6 bg-gray-100 rounded-lg">
                <p className="text-xl font-bold mb-4">Booking Information:</p>
                <p className="text-lg">
                  <strong>Name:</strong> {booking.name}
                </p>
                <p className="text-lg">
                  <strong>Email:</strong> {booking.email}
                </p>
                <p className="text-lg">
                  <strong>Phone:</strong> {booking.phone}
                </p>
                <p className="text-lg">
                  <strong>Address:</strong> {booking.address}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none"
                  >
                    Delivered
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

//   return (
//     <div
//       className="relative flex items-center justify-center min-h-screen"
//       style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
//     >
//       <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
//       <div className="mx-auto max-w-4xl py-4 px-8 bg-white shadow-lg rounded-lg relative z-10">
//         <div className="text-center mb-6">
//           <p className="text-lg font-semibold">Our Bookings</p>
//         </div>
//         {bookings.length > 0 ? (
//           bookings.map((booking) => (
//             <div key={booking.id} className="mb-8 p-6 bg-gray-100 rounded-lg">
//               <p className="text-xl font-bold mb-4">Booking Information:</p>
//               <p className="text-lg">
//                 <strong>Name:</strong> {booking.name}
//               </p>
//               <p className="text-lg">
//                 <strong>Email:</strong> {booking.email}
//               </p>
//               <p className="text-lg">
//                 <strong>Phone:</strong> {booking.phone}
//               </p>
//               <p className="text-lg">
//                 <strong>Address:</strong> {booking.address}
//               </p>
//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={() => handleCancelBooking(booking.id)}
//                   className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none"
//                 >
//                   Delivered
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No bookings found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

export default Battery_Server;
