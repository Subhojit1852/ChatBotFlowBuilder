import { Button, Typography, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useFlowStore } from '../store/flowStore';

export default function Sidebar() {
  const { nodes, setNodes } = useFlowStore();

  const addNode = (type: 'message' | 'BotInput') => {
    const id = uuidv4();
    const newNode = {
      id,
      type,
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 200 + 100,
      },
      data: {
        label: type === 'message' ? 'New Message' : 'Bot Input',
      },
    };

    setNodes([...nodes, newNode]);
  };

  return (
    <Box
      sx={{
        width: '20%',
        height: '100vh',
        borderRight: '1px solid #ccc',
        padding: 2,
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add Node
      </Typography>
      <Button
        variant="contained"
        fullWidth
        color="primary"
        onClick={() => addNode('message')}
        sx={{ marginBottom: 2 }}
      >
        ➕ Add Message
      </Button>
      <Button
        variant="contained"
        fullWidth
        color="warning"
        onClick={() => addNode('BotInput')}
      >
        ➕ Add Bot Input
      </Button>
    </Box>
  );
}
