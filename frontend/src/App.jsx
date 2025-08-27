import React, { useState, useEffect } from "react";
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, Button, IconButton } from "@mui/material";
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

  const addWorkout = (w) => setWorkouts(prev => [{ ...w, id: Date.now() }, ...prev]);
  const removeWorkout = (id) => setWorkouts(prev => prev.filter(p => p.id !== id));

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1, background: "linear-gradient(90deg,#4c1d95,#7c3aed)" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>FitTrack Pro</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          display: { xs: "none", md: "block" },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', background: '#0b1220', color: '#fff' }
        }}
        open
      >
        <Toolbar />
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Menu</Typography>
          <Button fullWidth sx={{ my: 1 }} variant="contained">Dashboard</Button>
          <Button fullWidth sx={{ my: 1 }} variant="outlined" color="info">Workouts</Button>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto", ml: { md: `${drawerWidth}px` } }}>
        <Toolbar />
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, alignItems: "stretch" }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Dashboard</Typography>
            <WorkoutForm onAdd={addWorkout} />
            <WorkoutsList workouts={workouts} onDelete={removeWorkout} />
          </Box>

          <Box sx={{
            width: { xs: "100%", md: 420 },
            height: { xs: 300, md: 420 },
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 4,
            mt: { xs: 3, md: 0 },
            alignSelf: { xs: "center", md: "flex-start" }
          }}>
            <ThreeDScene />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
