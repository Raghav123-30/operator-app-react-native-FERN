const calculateMultipleArrivalDates = (
  occupiedTrays,
  totalTraysInWarehouse,
  numOfTrays,
  numDates
) => {
  const dispatchWindow = 7; // Dispatch window in days
  const currentDate = new Date();

  // Calculate the total number of occupied trays
  const totalOccupiedTrays = occupiedTrays.reduce(
    (sum, customer) => sum + customer.trays,
    0
  );

  // Calculate the number of free trays in the warehouse
  let freeTrays = totalTraysInWarehouse - totalOccupiedTrays;

  const arrivalDates = [];

  // Check if there are enough trays available for the new customer's arrival
  if (freeTrays >= numOfTrays) {
    // Calculate the arrival date for today
    arrivalDates.push(
      currentDate.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "short",
      })
    );
  } else {
    // Calculate the dispatch dates for the existing customers
    const dispatchDates = occupiedTrays.map((customer) => {
      const dispatchDate = new Date(customer.dispatchDate);
      dispatchDate.setDate(dispatchDate.getDate() + dispatchWindow);
      return dispatchDate;
    });

    // Sort the dispatch dates in ascending order
    dispatchDates.sort((a, b) => a - b);

    // Find the next available dispatch date
    let availableDate = null;
    for (const dispatchDate of dispatchDates) {
      const dispatchTrayCount = occupiedTrays.reduce(
        (sum, customer) =>
          customer.dispatchDate.getTime() === dispatchDate.getTime()
            ? sum + customer.trays
            : sum,
        0
      );

      if (freeTrays + dispatchTrayCount >= numOfTrays) {
        availableDate = dispatchDate;
        break;
      }
    }

    if (!availableDate) {
      // No available dispatch date within the dispatch window
      const lastDispatchDate = dispatchDates[dispatchDates.length - 1];
      const nextDispatchDate = new Date(lastDispatchDate);
      nextDispatchDate.setDate(nextDispatchDate.getDate() + dispatchWindow);
      availableDate = nextDispatchDate;
    }

    // Calculate the corresponding arrival dates
    for (let i = 0; i < numDates; i++) {
      const arrivalDate = new Date(availableDate);
      arrivalDate.setDate(arrivalDate.getDate() + i);
      arrivalDates.push(
        arrivalDate.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "short",
        })
      );
    }
  }

  return arrivalDates;
};

// Example occupied trays data for existing customers (with dispatch dates and tray counts)
const occupiedTrays = [
  { customerId: 1, trays: 50, dispatchDate: new Date("2023-05-12") },
  { customerId: 2, trays: 60, dispatchDate: new Date("2023-05-14") },
  { customerId: 3, trays: 30, dispatchDate: new Date("2023-05-16") },
  // ... Add more existing customer data as needed
];

const totalTraysInWarehouse = 164; // Total number of trays in the warehouse
const numOfTrays = 25; // Number of trays required by the new customer
const numDates = 3; // Specify the number of suggested arrival dates

// Calculate the suggested arrival dates for the new customer
const newCustomerArrivalDates = calculateMultipleArrivalDates(
  occupiedTrays,
  totalTraysInWarehouse,
  numOfTrays,
  numDates
);

console.log("Suggested Arrival Dates:", newCustomerArrivalDates);
