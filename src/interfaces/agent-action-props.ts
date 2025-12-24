import type { Agent } from "./agent";

export interface AgentActionsProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onAdd: (agent: Agent) => void;
}
