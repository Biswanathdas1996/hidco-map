function Polyline({ coordinates }) {
  const path = coordinates.map(({ lat, lng }) => ({ lat, lng }));

  return (
    <Polyline
      path={path}
      options={{
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      }}
    />
  );
}
