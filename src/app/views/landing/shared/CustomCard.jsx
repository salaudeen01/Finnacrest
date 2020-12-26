import React, { useState } from 'react';
import Color from 'color';
// import GoogleFont from 'react-google-font-loader';
import { makeStyles } from '@material-ui/core/styles';
// import NoSsr from '@material-ui/core/NoSsr';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import img1 from "../../../../assets/television.jpg";
import img2 from "../../../../assets/shoe.jpg";
import img3 from "../../../../assets/jug.jpg";
import img4 from "../../../../assets/phone.jpg";
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
}));

const useStyles = makeStyles(() => ({
  actionArea: {
    borderRadius: 16,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  card: ({ color }) => ({
    minWidth: 150,
    borderRadius: 16,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => {
    return {
      backgroundColor: color,
      padding: '1rem 1.5rem 1.5rem',
    };
  },
  title: {
    fontFamily: 'Keania One',
    fontSize: '2rem',
    color: '#fff',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Montserrat',
    color: '#fff',
    opacity: 0.87,
    marginTop: '2rem',
    fontWeight: 500,
    fontSize: 14,
  },
}));

const CustomCard = ({ classes, image, title, subtitle, user }) => {
  const mediaStyles = useFourThreeCardMediaStyles();
  return (
    <CardActionArea className={classes.actionArea}>
      <Card className={classes.card}>
        <CardMedia 
        classes={mediaStyles} 
        image={image} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={'h5'} className="text-white">
            {title}
          </Typography>
          <Typography className={classes.subtitle} className="text-white">{subtitle}</Typography>
            {user != null ? (
              <Link to='/product_financing' className="nav-link">
                <Button
                  variant='outlined'
                  color='secondary'
                  style={{ color: "#fff" }}
                >
                  Details
                </Button>
              </Link>
            ) : (
              <Link to='/signin' className="nav-link">
                <Button
                  variant='outlined'
                  color='secondary'
                  style={{ color: "#fff" }}
                >
                  Details
                </Button>
              </Link>
            )}
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export const SolidGameCardDemo = React.memo(function SolidGameCard(props) {
  const gridStyles = useGridStyles();
  const styles = useStyles({ color: '#203f52' });
  const styles2 = useStyles({ color: '#4d137f' });
  const styles3 = useStyles({ color: '#ff9900' });
  const styles4 = useStyles({ color: '#34241e' });
  return (
    <>
      <Grid classes={gridStyles} container spacing={4}>
        <Grid  item lg={3} md={4} sm={6} xs={12}>
          <CustomCard
            classes={styles}
            title={"Television"}
            subtitle={""}
            image={img1}
            user={props.user}
          />
        </Grid> 
        <Grid  item lg={3} md={4} sm={6} xs={12}>
          <CustomCard
              classes={styles}
              title={'Footwares'}
              subtitle={''}
              image={img2}
            />
        </Grid>
        <Grid  item lg={3} md={4} sm={6} xs={12}>
          <CustomCard
              classes={styles}
              title={'Electronics'}
              subtitle={''}
              image={img3}
            />
        </Grid>
        <Grid  item lg={3} md={4} sm={6} xs={12}>
          <CustomCard
              classes={styles}
              title={'Phones'}
              subtitle={''}
              image={img4}
            />
        </Grid>        
      </Grid>
    </>
  );
});
export default SolidGameCardDemo