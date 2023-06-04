import * as React from "react";
import MapWrappedComponent from "../../HOC/Map";
import { useParams } from "react-router-dom";
import { get, post, del } from "../../helper/apiHelper";
import { validateResponseAdmin } from "../../helper/validateResponse";
import AddCircleToRoutsView from "../../View/Admin/AddCircleToRoute";
import swal from "sweetalert";

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [radius, setRadius] = React.useState(50);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const [routeData, setRouteData] = React.useState(null);
  const [selectLocation, setSelectLocation] = React.useState(null);
  const [choosedLocation, setChoosedLocation] = React.useState([]);
  const [loding, setLoding] = React.useState(false);

  const [selectedLocationTypeId, setSelectedLocationTypeId] =
    React.useState(null);

  const selectedPoliceStationCallback = (data) => {
    console.log("---->", data);
    setSelectedLocationTypeId(data?.id);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchRoutsData = React.useCallback(async () => {
    const response = await get(`/admin/route/${id}`);
    if (validateResponseAdmin(response)) {
      setChoosedLocation(response?.data?.locations);
      setRouteData(response?.data);
    }
  });

  React.useEffect(() => {
    fetchRoutsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleClick(event) {
    console.log("----event--", event);
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    setSelectLocation({ lat: lat, lng: lng });
    setOpen(true);
  }
  async function handleMapClick(event) {
    var lat = event.lat;
    var lng = event.lng;
    setSelectLocation({ lat: lat, lng: lng });
    setOpen(true);
  }

  const updatedPointer = (coordinate) => {
    setSelectLocation(coordinate);
  };

  const addPlace = async () => {
    setLoding(true);
    setRouteData(null);
    const data = {
      routeId: Number(id),
      locations: [
        {
          name: name,
          lat: selectLocation?.lat,
          long: selectLocation?.lng,
          radius: Number(radius),
          locationTypeId: Number(selectedLocationTypeId),
          files: [],
        },
      ],
    };

    await post("/admin/route/location", data);
    handleClose(false);
    window.location.reload();
  };

  const deletLocation = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        setLoding(true);
        const response = await del(`/admin/route/location/${id}`);
        if (validateResponseAdmin(response)) {
          window.location.reload();
        } else {
          setLoding(false);
        }
      }
    });
  };

  return (
    <>
      {!loding ? (
        <AddCircleToRoutsView
          open={open}
          handleClose={handleClose}
          selectLocation={selectLocation}
          updatedPointer={updatedPointer}
          setName={setName}
          radius={radius}
          setRadius={setRadius}
          addPlace={addPlace}
          routeData={routeData}
          handleClick={handleClick}
          choosedLocation={choosedLocation}
          deletLocation={deletLocation}
          handleMapClick={handleMapClick}
          selectedPoliceStationCallback={selectedPoliceStationCallback}
          loding={loding}
        />
      ) : (
        <center style={{ width: "auto", height: "60vh", paddingTop: "10rem" }}>
          <div className="loader"></div>
        </center>
      )}
    </>
  );
}
