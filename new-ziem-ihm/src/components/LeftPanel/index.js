import { Box } from '@mui/system';
import { Tab } from '@mui/material';
import { Settings as SettingsIcon, SearchSharp } from '@mui/icons-material';
import Settings from '../Settings';
import View from '../View';
import { useDispatch, useSelector } from 'react-redux';
import { changeTabsValue } from '../../actions/tabs';
import { useEffect } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';

function LeftPanel() {
    const dispatch = useDispatch();
    const tabsValue = useSelector((state) => state.tabs.tabsValue);
    // const [tabsValue, setTabsValue] = useState(1);

    useEffect(() => {
      console.log(tabsValue);
    }, [tabsValue]);

    const handleChange = (newValue) => {
      console.log(newValue);
      dispatch(changeTabsValue(newValue));
    };
    // function tabsDisplayStyle(index, tabsValue) {
    //   return index === tabsValue ? 'flex' : 'none';
    // }


    // const handleChange = (event, newValue) => {
    //   console.log(newValue);
    //   setTabsValue(newValue);
    // };

    return (
        <Box
            sx={{
            width: '25%',
            height: '100%',
            bgcolor: '#615d69',
            overflow: 'auto',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
            }}
        >
          <TabContext value={tabsValue}>
            <Box
              variant="fullWidth"
              // textColor="inherit"
              sx={{ backgroundColor: '#43444d' }}
            >
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Setting" icon={<SettingsIcon />} value='1' />
                <Tab label="View" icon={<SearchSharp />} value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'><Settings /></TabPanel>
            <TabPanel value='2'><View /></TabPanel> 
          </TabContext>
      </Box>
    );
}

export default LeftPanel;