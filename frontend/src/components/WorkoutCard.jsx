import React from "react";
import { Card, CardContent, Typography, CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function WorkoutCard({ workout, onDelete }) {
  return (
    <Card sx={{ background: "#1f1f1f" }}>
      <CardContent>
        <Typography variant="h6">{workout.name}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          {workout.reps} reps | {workout.date}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => onDelete(workout.id)} color="error">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
