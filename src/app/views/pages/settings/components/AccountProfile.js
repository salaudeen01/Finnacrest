import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  CircularProgress,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';

// const useStyles = makeStyles(theme => ({
//   root: {},
//   details: {
//     display: 'flex'
//   },
//   avatar: {
//     marginLeft: 'auto',
//     height: 110,
//     width: 100,
//     flexShrink: 0,
//     flexGrow: 0
//   },
//   progress: {
//     marginTop: theme.spacing(2)
//   },
//   uploadButton: {
//     marginRight: theme.spacing(2),
//     color:"#fff"
//   }
// }));
// const classes = useStyles();
class AccountProfile extends Component{
  constructor(props){
    super(props)
    this.uploadedImage = React.createRef();
    this.imageUploader = React.createRef();
    this.state ={
      avatar: '/assets/images/dummy.jpg',
      profile_pic:null,
    }
    this.handleProfileImage = this.handleProfileImage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }

handleSubmit(event) {
  event.preventDefault();
  const { profile_pic } = this.state;
  if(profile_pic != null){
      const fd = new FormData();
      fd.append('profile_pic', profile_pic);
      this.props.updatePicture(fd);
  }
}

handleClick=(e)=> {
    this.imageUploader.current.click();
}
handleProfileImage=(e)=>{
  const [file, name] = e.target.files;
  if(file){
      const reader = new FileReader();
      const { current } = this.uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      this.setState({profile_pic: e.target.files[0]}, ()=>{
        this.handleSubmit(e)
      })
  }
  
}
render(){
  const { className, theme, ...rest } = this.props;
  const {avatar} = this.state
  return (
    <Card
      {...rest}
    >
    <form onSubmit={this.handleSubmit} >    
      <CardContent>
        <div style={{display: 'flex'}}>
          <div>
            <Typography
              gutterBottom
              variant="h6"
            >
              {this.props.data.first_name +" "+ this.props.data.last_name}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {this.props.data.address}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {this.props.data.phone_no}
            </Typography>
          </div>  
          <img
            style={{marginLeft: 'auto', height: 110, width: 100, flexShrink: 0, flexGrow: 0, borderRadius:50}}
            src={this.props.data.profile_pic != "" ? this.props.data.profile_pic:avatar}
            ref={this.uploadedImage}
            onClick={this.handleClick}
            
          />
          <input className="sea" 
              name="profile_pic" 
              type="file" 
              accept="image/*" 
              multiple="false" 
              onChange={this.handleProfileImage} 
              ref={this.imageUploader}
              style={{display:"none"}}/>
        </div>
          <Typography variaant="subtitle">click image to upload</Typography>
      </CardContent>
      <CardActions>
        {/* <Button
          type="submit"
          style={{marginRight: 20, color:"#fff"}}
          color="secondary"
          variant="contained"
        >
          Upload picture
        </Button> */}
        {this.props.savings && (
        <CircularProgress
          size={24}
        />)}
      </CardActions>
      <div style={{marginTop: 20, marginBottom:20}}>
        <Typography variant="body1">Profile Completeness: {this.props.completeness}%</Typography>
        <LinearProgress
          value={this.props.completeness}
          variant="determinate"
        />
      </div>
      <Divider />
    </form>
    </Card>
  );
};
}


AccountProfile.propTypes = {
  className: PropTypes.string
};

// export default AccountProfile;
const actionCreators = {
  updatePicture: userActions.updatePicture,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(AccountProfile))
);