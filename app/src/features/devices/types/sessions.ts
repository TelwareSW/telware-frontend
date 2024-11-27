type Session = {
  agent: {
    os?: string;
    browser?: string;
  };
  status: string;
  lastSeenTime: string;
};

export type { Session };
