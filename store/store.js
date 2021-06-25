import { createSlice, configureStore } from "@reduxjs/toolkit";
const planInitialState = {
  city: {},
  hotel: {},
  flight: {},
  rental: {},
  startDate: null,
  endDate: null,
  days: 0,
};
const planSlice = createSlice({
  name: "plan",
  initialState: planInitialState,
  reducers: {
    addHotel(state, action) {
      state.hotel = action.payload;
      localStorage.setItem("HotelID", action.payload.id);
    },
    addCity(state, action) {
      state.city = action.payload;
      localStorage.setItem("CityID", action.payload.id);
    },
    addFlight(state, action) {
      state.flight = action.payload;
      localStorage.setItem("FlightID", action.payload.id);
    },
    addRental(state, action) {
      state.rental = action.payload;
      localStorage.setItem("RentalID", action.payload.id);
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
      localStorage.setItem("StartDate", String(action.payload));
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
      localStorage.setItem("EndDate", String(action.payload));
    },
    setDays(state, action) {
      state.days = action.payload;
      localStorage.setItem("Days", action.payload);
    },
    saveTrip(state) {
      localStorage.setItem("SavedRentalID", state.rental.id);
      localStorage.setItem("SavedHotelID", state.hotel.id);
      localStorage.setItem("SavedCityID", state.city.id);
      localStorage.setItem("SavedFlightID", state.flight.id);
      localStorage.setItem("SavedStartDate", state.startDate);
      localStorage.setItem("SavedEndDate", state.endDate);
      localStorage.setItem("SavedDays", state.days);
      localStorage.removeItem("RentalID")
      localStorage.removeItem("HotelID")
      localStorage.removeItem("CityID")
      localStorage.removeItem("FlightID")
      localStorage.removeItem("StartDate")
      localStorage.removeItem("EndDate")
      localStorage.removeItem("Days")
      state.city = {};
      state.hotel = {};
      state.flight = {};
      state.rental = {};
      state.startDate = null;
      state.endDate = null;
      state.days = 0;
    },
  },
});
const savedPlanSlice = createSlice({
  name: "savedPlan",
  initialState: planInitialState,
  reducers: {
    addHotel(state, action) {
      state.hotel = action.payload;
    },
    addCity(state, action) {
      state.city = action.payload;
    },
    addFlight(state, action) {
      state.flight = action.payload;
    },
    addRental(state, action) {
      state.rental = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    setDays(state, action) {
      state.days = action.payload;
    },
  },
});
const citiesInitialState = {
  citiesList: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState: citiesInitialState,
  reducers: {
    updateFromDb(state, action) {
      state.citiesList = [];
      action.payload.forEach((city) => {
        state.citiesList.push(city);
      });
    },
    reset(state) {
      state.citiesList = [];
    },
  },
});
const hotelsInitialState = {
  hotelsList: [],
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState: hotelsInitialState,
  reducers: {
    updateFromDb(state, action) {
      state.hotelsList = [];
      action.payload.forEach((hotel) => {
        state.hotelsList.push(hotel);
      });
    },
    reset(state) {
      state.hotelsList = [];
    },
  },
});

const flightsInitialState = {
  flightsList: [],
};
const flightsSlice = createSlice({
  name: "flights",
  initialState: flightsInitialState,
  reducers: {
    updateFromDb(state, action) {
      state.flightsList = [];
      action.payload.forEach((flight) => {
        state.flightsList.push(flight);
      });
    },
    reset(state) {
      state.flightsList = [];
    },
  },
});
const rentalsInitialState = {
  rentalsList: [],
};
const rentalsSlice = createSlice({
  name: "rentals",
  initialState: rentalsInitialState,
  reducers: {
    updateFromDb(state, action) {
      state.rentalsList = [];
      action.payload.forEach((rental) => {
        state.rentalsList.push(rental);
      });
    },
    reset(state) {
      state.rentalsList = [];
    },
  },
});
const adminInitialState = {
  cityList: [],
  hotelList: [],
};
const adminSlice = createSlice({
  name: "admin",
  initialState: adminInitialState,
  reducers: {
    resetCities(state) {
      state.cityList = [];
    },
    resetHotels(state) {
      state.hotelList = [];
    },
    fillCityList(state, action) {
      state.cityList = [];
      action.payload.forEach((city) => {
        state.cityList.push({ title: city.title, marked: false });
      });
    },
    markCity(state, action) {
      const targetCity = state.cityList.find(
        (item) => item.title === action.payload
      );
      targetCity.marked = !targetCity.marked;
    },
    markHotel(state, action) {
      const targetHotel = state.hotelList.find(
        (item) => item.title === action.payload
      );
      targetHotel.marked = !targetHotel.marked;
    },
  },
});
const store = configureStore({
  reducer: {
    cities: citiesSlice.reducer,
    admin: adminSlice.reducer,
    hotels: hotelSlice.reducer,
    flights: flightsSlice.reducer,
    rentals: rentalsSlice.reducer,
    plan: planSlice.reducer,
    savedPlan: savedPlanSlice.reducer
  },
});

export const cityActions = citiesSlice.actions;
export const hotelActions = hotelSlice.actions;
export const adminActions = adminSlice.actions;
export const rentalActions = rentalsSlice.actions;
export const flightActions = flightsSlice.actions;
export const planActions = planSlice.actions;
export const savedPlanActions = savedPlanSlice.actions;
export default store;
