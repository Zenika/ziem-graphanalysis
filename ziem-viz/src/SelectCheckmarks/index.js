import { Checkbox, Input, ListItemText, MenuItem, Select } from "@mui/material";

export default function SelectCheckmarks({ options, value, handleChange }) {
  return (
    <Select
      id="demo-multiple-checkbox"
      sx={{
        color: "inherit",
        "& .MuiSvgIcon-root": {
          color: "white",
        },
      }}
      multiple
      value={value}
      onChange={handleChange}
      input={
        <Input disableUnderline fullWidth inputProps={{ color: "inherit" }} />
      }
      renderValue={(selected) => selected.join(", ")}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          <Checkbox checked={value.indexOf(option) > -1} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  );
}
