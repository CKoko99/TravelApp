import { createSlice, configureStore } from "@reduxjs/toolkit";

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
      console.log(state.citiesList);
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
      console.log(state.hotelsList);
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
        console.log(state.flightsList);
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
        console.log(state.rentalsList);
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
    rentals: rentalsSlice.reducer
  },
});

export const cityActions = citiesSlice.actions;
export const hotelActions = hotelSlice.actions;
export const adminActions = adminSlice.actions;
export const rentalActions = rentalsSlice.actions;
export const flightActions = flightsSlice.actions;
export default store;
