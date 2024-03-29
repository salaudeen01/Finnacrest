import React,{useEffect, Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {useParams} from "react-router-dom"
import MyGroup from '../MyGroup';
import MyLoan from '../MyLoan';
import NewLoan from '../NonLoan';
import NonLoan from '../NonLoan';
import { Badge } from '@material-ui/core';

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
  const {theme,tdetails} = this.props
  const {value} = this.state
  return (
    <div style={{flexGrow: 1}}>
      <AppBar position="static" color="default" >
        <Tabs value={value} indicatorColor="primary"
          textColor="primary" style={{marginLeft:28}}
          onChange={this.handleChange} aria-label="simple tabs example">
           <Tab label="MY LOAN" {...a11yProps(0)} />
          <Tab label="MY GROUP" {...a11yProps(1)} />  
          <Tab label="APPROVALS" {...a11yProps(2)} />
          <span style={{marginLeft:"-32px", marginTop:10,marginBottom:20,paddingLeft:4,paddingRight:4,
           color:'#fff', backgroundColor:'green', borderRadius:6}}>
            {(this.props.tdetails.length)}</span>

        </Tabs> 
      </AppBar>
      <TabPanel value={value} index={0}>
        <MyLoan/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyGroup />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NonLoan />
      </TabPanel>
    </div>
  );
}
}


export default CustomTab