import { useEffect, useState } from "react";
import {
  getAllAgents,
  getAllPendingAgents,
} from "../../services/agent-service";
import "./Agents.scss";
import type {
  Agent,
  AgentPendingInvitations,
  AgentsGet,
  Invitations_Agent,
  TabPanelProps,
} from "../../interfaces";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tab,
  Tabs,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import type { Column } from "../../core/components/interfaces";
import StickyHeadTable from "../../core/components/StickyHeadTable";

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Agents() {
  const [agents, setAgents] = useState<AgentsGet[]>([]);
  const [invitedAgents, setInvitedAgents] = useState<AgentPendingInvitations[]>(
    []
  );

  const [value, setValue] = useState(0);

  const handleChange = async (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const columns: Column<Agent>[] = [
    { id: "fullName", label: "Name", minWidth: 200 },
    { id: "projects", label: "Project", minWidth: 150 },
    { id: "phoneNumber", label: "Phone", minWidth: 150 },
    { id: "reportsTo", label: "Report To", minWidth: 150 },
    { id: "departmentName", label: "Department", minWidth: 150 },
  ];
  const invitations_columns: Column<Invitations_Agent>[] = [
    { id: "invitedEmail", label: "Name", minWidth: 200 },
    { id: "reportsTo", label: "Report To", minWidth: 150 },
    { id: "departmentName", label: "Department", minWidth: 150 },
    { id: "invitedBy", label: "invited By", minWidth: 150 },
    { id: "expiresAt", label: "Expires At", minWidth: 150 },
  ];

  const rows: Agent[] = agents;
  const invited_rows: Invitations_Agent[] = invitedAgents;

  useEffect(() => {
    const loadAgents: () => Promise<void> = async () => {
      try {
        if (value == 0) {
          const data = await getAllAgents<AgentsGet[]>(true);
          setAgents(data);
        } else if (value == 1) {
          const data = await getAllAgents<AgentsGet[]>(false);
          setAgents(data);
        } else {
          const data = await getAllPendingAgents<AgentPendingInvitations[]>();
          setInvitedAgents(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadAgents();
  }, [value]);
  return (
    <>
      <div className="agents-container h-100 p-2 p-lg-3">
        {/* Header */}
        <div className="agents-header d-flex flex-column flex-md-row justify-content-between align-items-start mb-3 pb-3">
          <div className="header-left">
            <h1 className="page-title fs-2">Agents</h1>
            <p className="page-subtitle m-0">Manage agents for all projects</p>
          </div>
          <div className="header-actions d-flex align-items-center gap-3">
            <Button variant="contained" startIcon={<AddIcon />}>
              Add Agent
            </Button>
          </div>
        </div>
        <div className="search-tabs-section d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 gap-md-4 mb-4">
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">{<SearchIcon />}</IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Active" {...a11yProps(0)} />
              <Tab label="InActive" {...a11yProps(1)} />
              <Tab label="Pending" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}></CustomTabPanel>
          <CustomTabPanel value={value} index={1}></CustomTabPanel>
          <CustomTabPanel value={value} index={2}></CustomTabPanel>
        </div>{" "}
        <div className="table-container">
          {value === 0 || value === 1 ? (
            <StickyHeadTable columns={columns} rows={rows} />
          ) : (
            <StickyHeadTable
              columns={invitations_columns}
              rows={invited_rows}
            />
          )}
        </div>
      </div>
    </>
  );
}
