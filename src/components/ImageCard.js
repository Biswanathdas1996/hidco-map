import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function ImageCard({ img, text }) {
  return (
    <Card style={{ margin: 15 }}>
      <CardMedia
        style={{ height: 200, width: 250 }}
        image={img}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}
