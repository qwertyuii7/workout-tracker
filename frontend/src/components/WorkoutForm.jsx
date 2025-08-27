import React, { useState } from "react";
import { Card, CardContent, Box, TextField, Button } from "@mui/material";

export default function WorkoutForm({ onAdd }) {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !reps) return;
    onAdd({ name, reps: Number(reps), date: new Date().toISOString().slice(0,10) });
    setName(""); setReps("");
  };

  return (
    <Card sx={{ mb: 3, background: "#1a1a1a" }}>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField label="Workout Name" value={name} onChange={e => setName(e.target.value)} size="small" sx={{ flex: 1 }} />
          <TextField label="Reps" type="number" value={reps} onChange={e => setReps(e.target.value)} size="small" sx={{ width: 100 }} />
          <Button type="submit" variant="contained" sx={{ minWidth: 120 }}>Add</Button>
        </Box>
      </CardContent>
    </Card>
  );
}
