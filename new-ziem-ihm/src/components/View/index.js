import { Box } from '@mui/system';
import {
    Button,
    List,
    Stack,
    Typography,
  } from '@mui/material';

function Settings() {
    return (
      <Stack
        spacing={2}
        sx={{ padding: '40px' }}
      >
        <Box
          sx={{
            overflow: 'auto',
            maxHeight: '350px',
          }}
        >
          <Typography>Selected Nodes</Typography>
          <List>
            {/* {Object.values(selectedNodes).map((node) => (
              <NodeListItem node={node} key={node.identity} />
            ))} */}
          </List>
        </Box>
        <Button variant="contained">
          Clear Selection
        </Button>
        <Button variant="contained">
          Focus on
        </Button>
        <Box
          sx={{
            overflow: 'auto',
            maxHeight: '350px',
          }}
        >
          <Typography>Selected Links</Typography>
          <List>
            {/* {Object.values(selectedLinks).map((link) => (
              <LinkListItem key={link.identity} link={link} />
            ))} */}
          </List>
        </Box>
      </Stack>
    );
}

export default Settings;