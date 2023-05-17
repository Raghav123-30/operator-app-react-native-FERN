import React, { createContext } from "react";
import { useState, useEffect, useContext } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [phone, setPhone] = useState();
  const [mode, setMode] = useState();
  const [crops, setCrops] = useState([]);
  const [location, setLocation] = useState();
  const [numRacks, setNumRacks] = useState();
  const [numTrays, setNumTrays] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [taluk, setTaluk] = useState("");
  const [village, setVillage] = useState("");
  const [villageCrops, setVillageCrops] = useState([]);
  const [alldocuments, setDocuments] = useState([]);
  const [villageId, setVillageId] = useState();
  const values = {
    phone,
    setPhone,
    mode,
    setMode,
    crops,
    setCrops,
    location,
    setLocation,
    numTrays,
    setNumTrays,
    numRacks,
    setNumRacks,

    loggedIn,
    setLoggedIn,
    taluk,
    setTaluk,
    village,
    setVillage,
    villageCrops,
    setVillageCrops,
    alldocuments,
    setDocuments,
    villageId,
    setVillageId,
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
}
