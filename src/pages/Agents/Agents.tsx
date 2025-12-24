import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type SyntheticEvent,
} from "react";
import {
  getAllAgents,
  getAllDepartments,
  getAllPendingAgents,
} from "../../services/agent-service";
import "./Agents.scss";
import type {
  Agent,
  AgentActionsProps,
  AgentPendingInvitations,
  AgentsGet,
  DepartmentsGet,
  Invitations_Agent,
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
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import type { Column } from "../../core/components/interfaces";
import StickyHeadTable from "../../core/components/StickyHeadTable";
import EditIcon from "@mui/icons-material/Edit";
import AddAgentDialog from "./AddAgentDialog";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Agents() {
  const [agents, setAgents] = useState<AgentsGet[]>([]);
  const [departments, setDepartments] = useState<DepartmentsGet[]>([]);
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);

  const [invitedAgents, setInvitedAgents] = useState<AgentPendingInvitations[]>(
    []
  );

  const [value, setValue] = useState(0);

  const handleChange = async (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleEditAgent = useCallback((agent: Agent) => {
    console.log("Edit agent", agent);
  }, []);

  const handleAddAgent = useCallback(async () => {
    const data: DepartmentsGet[] = await getAllDepartments<DepartmentsGet[]>();
    setDepartments(data);
    setIsAddAgentOpen(true);
  }, []);

  const handleSubmitAddAgent = (data: {
    email: string;
    department: string;
    reportsTo: string;
  }) => {
    console.log("Submitting agent:", data);
    setIsAddAgentOpen(false);
  };

  const AgentActions = ({ agent, onEdit, onAdd }: AgentActionsProps) => (
    <>
      <Tooltip title="Edit Agent">
        <IconButton size="small" color="primary" onClick={() => onEdit(agent)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add Agent">
        <IconButton size="small" color="success" onClick={() => onAdd(agent)}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  const columns = useMemo<Column<Agent>[]>(
    () => [
      { id: "fullName", label: "Name", minWidth: 200 },
      { id: "projects", label: "Project", minWidth: 150 },
      { id: "phoneNumber", label: "Phone", minWidth: 150 },
      { id: "reportsTo", label: "Report To", minWidth: 150 },
      { id: "departmentName", label: "Department", minWidth: 150 },
      {
        id: "actions",
        label: "Actions",
        minWidth: 120,
        align: "center",
        render: (row) => (
          <AgentActions
            agent={row}
            onEdit={handleEditAgent}
            onAdd={handleAddAgent}
          />
        ),
      },
    ],
    [handleEditAgent, handleAddAgent]
  );
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
          setAgents(await getAllAgents<AgentsGet[]>(true));
        } else if (value == 1) {
          setAgents(await getAllAgents<AgentsGet[]>(false));
        } else {
          setInvitedAgents(
            await getAllPendingAgents<AgentPendingInvitations[]>()
          );
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
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                handleAddAgent();
              }}
            >
              Add Agent
            </Button>
          </div>
        </div>
        <div className="search-tabs-section d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 gap-md-4 mb-4">
          <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Search
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
        </div>
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
      <div className="add customer">
        <AddAgentDialog
          open={isAddAgentOpen}
          departments={departments}
          onClose={() => setIsAddAgentOpen(false)}
          onSubmit={handleSubmitAddAgent}
        />
      </div>
      {/* <div className="edit customer">
        <EditAgentDialog
          open={isAddAgentOpen}
          agent={selectedAgent}
          departments={departments}
          agents={agents}
          onClose={() => setIsAddAgentOpen(false)}
          onSubmit={handleSubmitAddAgent}
        />
      </div> */}
    </>
  );
}
