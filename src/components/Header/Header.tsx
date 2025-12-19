import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";

type HeaderProps = {
  onLeftToggle: () => void;
  onRightToggle: () => void;
};

export default function Header({
  onLeftToggle,
  onRightToggle,
}: HeaderProps) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center" gap={1}>
          <Typography variant="h6">HelpDesk</Typography>
          <IconButton color="inherit" onClick={onLeftToggle}>
            <MenuIcon />
          </IconButton>
        </Box>

        <IconButton color="inherit" onClick={onRightToggle}>
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
