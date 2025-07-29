import { Box, Typography, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFlowStore } from '../store/flowStore';
import { useSnackbar } from './SnackbarContext';

export default function NodeEditor() {
  const {
    selectedNodeId,
    nodes,
    updateNodeData,
  } = useFlowStore();

  const { showMessage } = useSnackbar();

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setValue(selectedNode.data.label || '');
    }
  }, [selectedNode]);

  const handleSave = () => {
    if (selectedNode) {
      updateNodeData(selectedNode.id, { label: value });
      showMessage('Changes saved!', 'success');
    }
  };

  if (!selectedNode) return null;

  return (
    <Box
      sx={{
        width: '20%',
        height: '100vh',
        borderLeft: '1px solid #ccc',
        padding: 2,
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Edit Node
      </Typography>

      <TextField
        label="Message Text"
        variant="outlined"
        fullWidth
        multiline
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
        💾 Save
      </Button>
    </Box>
  );
}
