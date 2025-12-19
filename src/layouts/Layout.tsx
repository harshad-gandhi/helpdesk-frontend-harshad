import { Box, Drawer, Toolbar } from "@mui/material";
import { useState } from "react";
import Header from "../components/Header";
import LeftDrawer from "../components/LeftDrawer";
import RightDrawer from "../components/RightDrawer";

const drawerWidth = 240;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header
        onLeftToggle={() => setLeftOpen(true)}
        onRightToggle={() => setRightOpen(true)}
      />

      <Toolbar />

      <Box display="flex" flexGrow={1} overflow="hidden">
        <Drawer
          variant="temporary"
          open={leftOpen}
          onClose={() => setLeftOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          <LeftDrawer />
        </Drawer>

        <Box flexGrow={1} p={2} overflow="auto" bgcolor="#f5f5f5">
          {children}
        </Box>

        <Drawer
          variant="temporary"
          anchor="right"
          open={rightOpen}
          onClose={() => setRightOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          <RightDrawer />
        </Drawer>
      </Box>
    </Box>
  );
}
