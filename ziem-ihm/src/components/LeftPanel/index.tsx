import { Box } from "@mui/system";
import {
    Tab,
    Tabs,
  } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import Settings from "../Settings";
import View from "../View";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";

function LeftPanel() {
  const dispatch: AppDispatch = useDispatch()

    return (
        <Box
            sx={{
            width: "25%",
            height: "100%",
            bgcolor: "#615d69",
            overflow: "auto",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            }}
        >
        <Tabs
          variant="fullWidth"
          textColor="inherit"
          sx={{ backgroundColor: "#43444d" }}
        >
          <Tab label="Setting" icon={<SettingsIcon />} />
          <Tab label="View" icon={<SearchIcon />} />
        </Tabs>
        <Settings />
        <View />
      </Box>
    )
};

export default LeftPanel