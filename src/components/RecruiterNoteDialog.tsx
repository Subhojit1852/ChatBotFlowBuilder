import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RecruiterNoteDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>📣 Note to the Recruiter</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          Hi there! 👋
        </Typography>
       <Typography variant="body2" mt={2}>
  While the original spec asked for just a single node type, this flow builder supports both:
</Typography>
<ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
  <li><b>Send Message</b> — to simulate messages sent in a chat (from either side)</li>
  <li><b>Bot Input</b> — to capture and label Bot inputs or expected responses</li>
</ul>
<Typography variant="body2" mt={2}>
  This setup can work with only <b>Send Message</b> nodes as well — simulating full WhatsApp-like message flows between two parties (e.g., customer and agent).
</Typography>
<Typography variant="body2" mt={2}>
  If a bot or interactive input step is added, the <b>Bot Input</b> node becomes useful to mark that transition.
</Typography>
<Typography variant="body2" mt={2}>
  The system is designed to be flexible, depending on how conversational or decision-tree-based the chatbot needs to be.
</Typography>

        <Typography variant="body2" mt={2}>
          Happy to adapt it further if needed. Thanks for reviewing! 🙏
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
