import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/Inbox";
import ContactsIcon from "@mui/icons-material/Contacts";
import FolderIcon from "@mui/icons-material/Folder";
import BookIcon from "@mui/icons-material/Book";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Inbox", icon: <InboxIcon />, path: "/inbox" },
  { label: "Contacts", icon: <ContactsIcon />, path: "/contacts" },
  { label: "Projects", icon: <FolderIcon />, path: "/projects" },
  { label: "Knowledge Base", icon: <BookIcon />, path: "/knowledge-base" },
  { label: "Reporting", icon: <AssessmentIcon />, path: "/reporting" },
  { label: "Departments", icon: <BusinessIcon />, path: "/department" },
  { label: "Agents", icon: <PeopleIcon />, path: "/agents" },
];

interface LeftDrawerProps {
  onClose: () => void;
}

export default function RightDrawer({ onClose }: LeftDrawerProps) {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
    onClose(); 
  };

  return (
    <List>
      {menuItems.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton onClick={() => handleClick(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
