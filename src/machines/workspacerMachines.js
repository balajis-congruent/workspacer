import { createMachine } from 'xstate';

export const toggleMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCSAdgIYDGyAlgG5gDEaG2A2gAwC6ioADqrORagQ4gAHogC0AJgCsUnAE4AHHLkB2ACyqZCqXLUAaEAE9xANhwLmyhRIlXmakwpVSAvi4P0suAIJkqtTyY2IW5efkEkEXFpWUVldU0pbV0DYwQARhM5HBVtZmYAZhMTCXTLAoU3dxACVAg4IUCwEJ4+cgEhUQQxNSUcCRV8ipN7FSKC1PFdfqVFKRN5setK6qb8Yj9qFrD2iNAusQLmHHSLZgkC9LkCgp0C50mEa-k5fIlmZyupS4k3D3QvDhfBQtpFQm0OpEDmo1Ol+oNCgoRmoxiYJkZEBYcDopGU1KVnLYClUXEA */
  id: 'toggle',
  initial: "Inactive",
  states: {
    Inactive: {
      on: { toggle: "Active" },
    },
    Active: {
      on: { toggle: "Inactive" },
    },
  },
});