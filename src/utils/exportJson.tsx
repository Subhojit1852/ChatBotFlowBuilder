import { Button } from '@mui/material';
import { useFlowStore } from '../store/flowStore';

export default function ExportButton() {
  const { nodes, edges } = useFlowStore();

  const handleExport = () => {
    const exportData = nodes.map((node) => {
      const outgoing = edges.find((e) => e.source === node.id);
      return {
        id: node.id,
        type: node.type,
        text: node.data?.label || '',
        next: outgoing?.target || null,
      };
    });

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chatbot-flow.json';
    link.click();
  };

  return (
    <Button
      variant="outlined"
      color="success"
      onClick={handleExport}
      style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}
    >
      ⬇️ Export to JSON
    </Button>
  );
}
