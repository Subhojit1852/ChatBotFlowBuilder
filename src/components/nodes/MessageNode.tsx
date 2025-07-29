import { Box, Typography } from '@mui/material';
import { Handle, Position } from 'reactflow';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function MessageNode({ data }: any) {
  return (
    <Box
      sx={{
        border: '2px solid #1976d2',
        borderRadius: '12px',
        backgroundColor: '#e0f7fa',
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
          backgroundColor: '#b2ebf2',
          padding: '6px 10px',
          borderBottom: '1px solid #1976d2',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          💬 Send Message
        </Typography>
        <WhatsAppIcon fontSize="small" sx={{ color: '#25D366' }} />
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
