import { Box } from '@mui/system';
import { Tab } from '@mui/material';
import { Settings as SettingsIcon, Search } from '@mui/icons-material';
import Settings from '../Settings';
import View from '../View';
import { useDispatch, useSelector } from 'react-redux';
import { changeTabsValue } from '../../actions/tabs';
import { TabContext, TabList, TabPanel } from '@mui/lab';


function LeftPanel() {
    const dispatch = useDispatch();
    interface RootState {
      tabs : {
        tabsValue: string
      }
    }
    const tabsValue = useSelector((state: RootState) => state.tabs.tabsValue);

    const handleChange = (event: React.SyntheticEvent<Element, Event>, value: string) => {
      dispatch(changeTabsValue(value));
    };

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
              // variant="fullWidth"
              // textcolor="inherit"
              // sx={{ backgroundColor: '#43444d' }}
            >
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='Setting' icon={<SettingsIcon />} value='1' />
                <Tab label='View' icon={<Search />} value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'><Settings /></TabPanel>
            <TabPanel value='2'><View /></TabPanel> 
          </TabContext>
      </Box>
    );
}

export default LeftPanel;