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
  const freeTrays = totalTraysInWarehouse - totalOccupiedTrays;

  // Sort occupied trays by their arrival dates
  occupiedTrays.sort((a, b) => a.arrivalDate - b.arrivalDate);

  const arrivalDates = [];

  // Calculate the dispatch dates for existing customers
  const dispatchDates = occupiedTrays.map((customer) => {
    const dispatchDate = new Date(customer.arrivalDate);
    dispatchDate.setDate(dispatchDate.getDate() + dispatchWindow);
    return dispatchDate;
  });

  // Find the earliest available date when enough trays will be free
  let availableDate = currentDate;
  let availableTrays = freeTrays;

  for (let i = 0; i < occupiedTrays.length; i++) {
    if (availableDate < occupiedTrays[i].arrivalDate) {
      break;
    }
    availableDate = dispatchDates[i];
    availableTrays += occupiedTrays[i].trays;
  }

  // Calculate the suggested arrival dates for the new customer
  for (let i = 0; i < numDates; i++) {
    if (availableTrays >= numOfTrays) {
      arrivalDates.push(
        availableDate.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "short",
        })
      );
    } else {
      break;
    }
    availableDate.setDate(availableDate.getDate() + 1);
    availableTrays -= numOfTrays;
  }

  return arrivalDates;
};

// Example occupied trays data for existing customers (with arrival dates and tray counts)
const occupiedTrays = [
  { customerId: 1, trays: 50, arrivalDate: new Date("2023-05-12") },
  { customerId: 2, trays: 100, arrivalDate: new Date("2023-05-14") },
  // ... Add more existing customer data as needed
];

const totalTraysInWarehouse = 164; // Total number of trays in the warehouse
const numOfTrays = 20; // Number of trays required by the new customer
const numDates = 3; // Specify the number of suggested arrival dates

// Calculate the suggested arrival dates for the new customer
const newCustomerArrivalDates = calculateMultipleArrivalDates(
  occupiedTrays,
  totalTraysInWarehouse,
  numOfTrays,
  numDates
);

console.log("Suggested Arrival Dates:", newCustomerArrivalDates);
