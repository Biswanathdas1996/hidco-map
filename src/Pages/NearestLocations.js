import React from "react";
import { useParams } from "react-router-dom";
import MultiDestinationMap from "../components/MultiDestinationMap";

const Destination = [
  {
    id: 20,
    name: "Royal Bengal Tiger zone",
    lat: 22.53715696945664,
    long: 88.33254039287567,
    radius: 15,
    locationMedia: [],
  },
  {
    id: 25,
    name: "Heritage cafe scoop",
    lat: 22.53640632375058,
    long: 88.33315461874008,
    radius: 10,
    locationMedia: [],
  },
  {
    id: 17,
    name: "Kangaroo zone",
    lat: 22.535871207488427,
    long: 88.33189934492111,
    radius: 10,
    locationMedia: [],
  },
  {
    id: 12,
    name: "Entry gate 1",
    lat: 22.536392532307445,
    long: 88.33340216402426,
    radius: 10,
    locationMedia: [],
  },
  {
    id: 18,
    name: "Leopard enclosure",
    lat: 22.537222619794623,
    long: 88.3312140405178,
    radius: 10,
    locationMedia: [],
  },
  {
    id: 15,
    name: "Zebra Zone",
    lat: 22.535464914126564,
    long: 88.3327616751194,
    radius: 15,
    locationMedia: [],
  },
  {
    id: 21,
    name: "Public Toilet",
    lat: 22.53706933240021,
    long: 88.33327766507864,
    radius: 10,
    locationMedia: [],
  },
  {
    id: 19,
    name: "Giraffe enclosure",
    lat: 22.538162778757485,
    long: 88.33223730325699,
    radius: 10,
    locationMedia: [],
  },
  {
    id: 24,
    name: "Kolkata zoo toilet ",
    lat: 22.537385506819152,
    long: 88.33340406417847,
    radius: 8,
    locationMedia: [],
  },
  {
    id: 16,
    name: "Bear Enclosure",
    lat: 22.534774690297915,
    long: 88.33282330737494,
    radius: 20,
    locationMedia: [],
  },
  {
    id: 23,
    name: "Free male toilet",
    lat: 22.537077693535206,
    long: 88.33335980772972,
    radius: 10,
    locationMedia: [],
  },
  {
    id: 22,
    name: "Tiger enclosure ",
    lat: 22.538539900328985,
    long: 88.33054113784866,
    radius: 10,
    locationMedia: [],
  },
  {
    id: 14,
    name: "Exit gate 1",
    lat: 22.535921302040524,
    long: 88.33338764670329,
    radius: 15,
    locationMedia: [],
  },
];

let watchId;
export default function NearestLocations() {
  const [reCenterLoocation, setReCenterLoocation] = React.useState(null);

  const { id } = useParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const trackFetchLocation = () => {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const positionData = { lat: latitude, lng: longitude };
        setReCenterLoocation(positionData);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, maximumAge: 20000, timeout: 10000 }
    );
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      trackFetchLocation();
    }, 3000);
    return () => {
      navigator.geolocation.clearWatch(watchId);
      clearInterval(intervalId);
    };
  }, [trackFetchLocation]);

  return (
    <>
      {reCenterLoocation && (
        <MultiDestinationMap
          destiNationData={Destination}
          sourceData={reCenterLoocation}
        />
      )}
    </>
  );
}
