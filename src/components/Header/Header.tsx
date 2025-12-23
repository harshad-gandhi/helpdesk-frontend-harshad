import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";

type HeaderProps = {
  onLeftToggle: () => void;
  onRightToggle: () => void;
};

export default function Header({ onLeftToggle, onRightToggle }: HeaderProps) {
  const [project, setProject] = useState<string>("10");

  const handleChange = (event: SelectChangeEvent) => {
    setProject(event.target.value as string);
  };
  return (
    <AppBar
      position="fixed"
      style={{ backgroundColor: "white", color: "black" }}
    >
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center" gap={1}>
          <Typography variant="h6">HelpDesk</Typography>
          <IconButton color="inherit" onClick={onLeftToggle}>
            <MenuIcon />
          </IconButton>
        </Box>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="project-select-label">Select Project</InputLabel>

          <Select
            labelId="project-select-label"
            id="project-select"
            value={project}
            label="Select Project"
            onChange={handleChange}
          >
            <MenuItem value="10">Project 1</MenuItem>
            <MenuItem value="20">Project 2</MenuItem>
            <MenuItem value="30">Project 3</MenuItem>
          </Select>
        </FormControl>

        <IconButton color="inherit" onClick={onRightToggle}>
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={onRightToggle}>
          <Badge badgeContent={4} color="error">
            <ChatIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
