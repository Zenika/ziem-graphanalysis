import { Box } from '@mui/system';
import {
    FormControlLabel,
    Slider,
    Stack,
    Switch,
    Typography,
  } from '@mui/material';

function Settings() {
    return (
      <Stack
      spacing={2}
      sx={{ padding: '40px' }}
    >
      <Typography>Settings Menu</Typography>
      <Box>
        <Typography>Curvature</Typography>
        <Slider
          step={0.05}
          min={0}
          max={1}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box>
        <Typography>Exterior Node Opacity</Typography>
        <Slider
          step={0.05}
          min={0.05}
          max={1}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box>
        <Typography>Particle speed range</Typography>
        <Slider
          step={0.001}
          min={0.001}
          max={0.05}
          valueLabelDisplay="auto"
        />
      </Box>

      <FormControlLabel
        sx={{ justifyContent: 'center' }}
        control={<Switch />}
        label="Show Arrow Head"
      />
    </Stack>
    );
}

export default Settings;