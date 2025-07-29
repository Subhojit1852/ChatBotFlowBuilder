import { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import FlowBuilder from './components/FlowBuilder';
import NodeEditor from './components/NodeEditor';
import Sidebar from './components/Sidebar';
import { SnackbarProvider } from './components/SnackbarContext';
import ExportButton from './utils/exportJson';
import RecruiterNoteDialog from './components/RecruiterNoteDialog';

export default function App() {
  const [showNote, setShowNote] = useState(false);

  return (
    <SnackbarProvider>
      {/* ℹ️ Button OUTSIDE the layout so it's always visible */}
      <Tooltip title="Note to Recruiter">
        <IconButton
          onClick={() => setShowNote(true)}
          sx={{
            position: 'fixed',
            top: 12,
            right: 12,
            backgroundColor: '#f5f5f5',
            zIndex: 1300, // above everything
            boxShadow: 1,
          }}
        >
          <InfoOutlinedIcon />
        </IconButton>
      </Tooltip>

      <RecruiterNoteDialog open={showNote} onClose={() => setShowNote(false)} />

      {/* Main Layout */}
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <Sidebar />
        <FlowBuilder />
        <NodeEditor />
      </div>

      <ExportButton />
    </SnackbarProvider>
  );
}
