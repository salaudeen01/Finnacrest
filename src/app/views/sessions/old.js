<div className="signup flex justify-center w-full h-full-screen" style={{
    backgroundImage: `url(${"/assets/images/bg.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    }}>
    <div className="block mt-10">
      <div className="p-8">
        <Grid container className="p-2 " justify="center" alignItems="center">
          <Grid lg={6} md={6} sm={6} xs={6}>
            <img src="/assets/images/Group24.png"/>
          </Grid>
        </Grid>
      </div>
    <div className="p-4">
      <Card className="signup-card ">
        <Grid container className="p-5 bg-light-gray" direction="column" justify="center" alignItems="center">
          <Grid lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h6" className="text-center text-gray mt-5 mb-5">Click the button below to complete your registration.</Typography>
          </Grid>
          <Grid lg={12} md={12} sm={12} xs={12} >
            <Button onClick={this.handleFormSubmit} variant="contained" style={{background:'#04956b'}} className="mt-5 text-white" size="large">Complete Registration</Button>
            {this.props.loggingIn && (
              <CircularProgress
                size={24}
                className={classes.buttonProgress}
              />)}
          </Grid>
        </Grid>
      </Card>
    </div>
  </div>
  </div>
