import React,{useEffect, Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Target from '../Target';
import Regular from '../Regular';
import SaveToLoan from '../SaveToLoan';
import {useParams} from "react-router-dom"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class CustomTab extends Component{
  constructor(props){
    super(props)
    this.state ={
      value:0
    }
    this.handleChange = this.handleChange.bind(this);
  }

handleChange = (event, value) => {
  this.setState({value:value})
};
render(){
  const {theme} = this.props
  const {value} = this.state
  return (
    <div style={{flexGrow: 1}}>
      <AppBar position="static" color="default" >
        <Tabs value={value} indicatorColor="primary"
          textColor="primary" 
          onChange={this.handleChange} aria-label="simple tabs example">
          <Tab label="Regular Savings" {...a11yProps(0)} />
          <Tab label="Target Savings" {...a11yProps(1)} />
          <Tab label="Save To Loan" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Regular />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Target />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SaveToLoan />
      </TabPanel>
    </div>
  );
}
}


export default CustomTab