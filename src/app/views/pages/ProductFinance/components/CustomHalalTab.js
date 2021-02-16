import React,{useEffect, Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Market from '../Market';
import Halal from '../Halal';
import Finance from '../Finance';
import {useParams, Link} from "react-router-dom"
import Products from '../Products';
import RequestProduct from '../RequestProduct';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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

class CustomHalalTab extends Component{
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
  const {theme,count} = this.props
  const {value} = this.state
  return (
    <div style={{flexGrow: 1}}>
      {/* <AppBar position="static" color="default" > */}
        <Tabs value={value} indicatorColor="primary"
            textColor="primary" style={{marginLeft:28,float:'left'}}
            onChange={this.handleChange} aria-label="simple tabs example">
            <Tab label="REQUESTED PRODUCTS" {...a11yProps(0)} />
            <Tab label="PENDING REQUEST" {...a11yProps(1)} />
            <span style={{marginLeft:"-10px", marginTop:10,marginBottom:20,paddingLeft:4,paddingRight:4,
            color:'#fff', backgroundColor:'green', borderRadius:6}}>
            {(this.props.tdetails.length)}</span>
        </Tabs>        
        <span style={{float:'right'}}>
          <Link to="/detail/cart">
              <Button style={{float:'right',color:'black'}}>
                    <ShoppingCartIcon/> ({count})
              </Button>
          </Link>
        </span>
      {/* </AppBar> */}
      <TabPanel value={value} index={0}>
        <Products />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RequestProduct/>
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        <Finance />
      </TabPanel> */}
    </div>
  );
}
}


export default CustomHalalTab