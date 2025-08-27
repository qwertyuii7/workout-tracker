import React from "react";
import { Box, Typography } from "@mui/material";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutsList({ workouts, onDelete }) {
  if (!workouts.length) return <Typography>No workouts yet!</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {workouts.map((w) => (
        <WorkoutCard key={w.id} workout={w} onDelete={onDelete} />
      ))}
    </Box>
  );
}
