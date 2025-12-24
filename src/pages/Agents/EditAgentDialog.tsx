import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import type { AddAgentDialogProps, ReportsToDropdown } from "../../interfaces";
import { getAllReportsTos } from "../../services/agent-service";

export default function EditAgentDialog({
  open,
  departments,
  onClose,
  onSubmit,
}: AddAgentDialogProps) {
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [reportsTo, setReportsTo] = useState("");
  const [reportPersons, setReportPersons] = useState<ReportsToDropdown[]>([]);

  const handleSubmit = () => {
    onSubmit({ email, department, reportsTo });
  };

  // Call API when department changes
  useEffect(() => {
    const fetchReports = async () => {
      if (!department) return;

      try {
        // Replace 3 with the actual roleId you need
        const data = await getAllReportsTos<ReportsToDropdown[]>(
          3,
          Number(department)
        );
        setReportPersons(data);
      } catch (error) {
        console.error("Failed to fetch reports to:", error);
      }
    };

    fetchReports();
  }, [department]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Agent</DialogTitle>

      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        className="p-3"
      >
        {/* Email */}
        <TextField
          label="Agent Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />

        {/* Department Select */}
        <FormControl fullWidth required>
          <InputLabel id="department-label">Department</InputLabel>
          <Select
            labelId="department-label"
            value={department}
            label="Department"
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.id}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Reports To Select */}
        <FormControl fullWidth>
          <InputLabel id="reports-to-label">Reports To</InputLabel>
          <Select
            labelId="reports-to-label"
            value={reportsTo}
            label="Reports To"
            onChange={(e) => setReportsTo(e.target.value)}
          >
            {reportPersons.map((a) => (
              <MenuItem key={a.name} value={a.id}>
                {a.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
