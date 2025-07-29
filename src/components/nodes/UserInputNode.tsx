import { Box, Typography } from '@mui/material';
import { Handle, Position } from 'reactflow';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export default function UserInputNode({ data }: any) {
  return (
    <Box
      sx={{
        border: '2px solid #ed6c02',
        borderRadius: '12px',
        backgroundColor: '#fff3e0',
        width: 240,
        overflow: 'hidden',
        boxShadow: 2,
        position: 'relative',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#ffe0b2',
          padding: '6px 10px',
          borderBottom: '1px solid #ed6c02',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#ed6c02' }}>
          📝 Bot Input
        </Typography>
        <QuestionMarkIcon fontSize="small" sx={{ color: '#ed6c02' }} />
      </Box>

      {/* Body */}
      <Box sx={{ padding: '10px' }}>
        <Typography variant="body2" color="text.primary">
          {data.label}
        </Typography>
      </Box>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
}
