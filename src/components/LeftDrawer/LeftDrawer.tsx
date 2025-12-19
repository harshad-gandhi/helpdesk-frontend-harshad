import { List, ListItem, ListItemText } from "@mui/material";

export default function LeftDrawer() {
  return (
    <List>
      <ListItem>
        <ListItemText primary="Menu Item 1" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Menu Item 2" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Menu Item 3" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Menu Item 4" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Menu Item 5" />
      </ListItem>
    </List>
  );
}
