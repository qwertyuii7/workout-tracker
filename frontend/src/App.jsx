import React, { useState, useEffect } from "react";
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutsList from "./components/WorkoutsList";
import ThreeDScene from "./components/ThreeDScene";

const drawerWidth = 260;

export default function App() {
  const [workouts, setWorkouts] = useState(() => {
    try {
      const raw = localStorage.getItem("workouts");
      return raw ? JSON.parse(raw) : [
        { id: 1, name: "Push Ups", reps: 20, date: "2025-08-27" },
        { id: 2, name: "Squats", reps: 15, date: "2025-08-26" },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  function addWorkout(w) {
    setWorkouts((prev) => [{ ...w, id: Date.now() }, ...prev]);
  }

  function removeWorkout(id) {
    setWorkouts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "linear-gradient(90deg,#4c1d95,#7c3aed)" }}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <MenuIcon />
            <Typography variant="h6" noWrap>FitTrack</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', background: '#0b1220', color: '#fff' }
      }}>
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <Typography variant="h5">Menu</Typography>
          <Box sx={{ mt: 2 }}>
            <Button fullWidth sx={{ my: 1 }} variant="contained">Dashboard</Button>
            <Button fullWidth sx={{ my: 1 }} variant="text" color="info">Workouts</Button>
          </Box>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
        <Toolbar />
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Dashboard</Typography>
            <WorkoutForm onAdd={addWorkout} />
            <WorkoutsList workouts={workouts} onDelete={removeWorkout} />
          </Box>

          <Box sx={{ width: 420, height: 420, borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
            <ThreeDScene />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
