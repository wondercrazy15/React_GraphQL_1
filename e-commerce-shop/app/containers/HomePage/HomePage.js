

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DropzoneComponent from 'react-dropzone-component';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css';
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
import Button from '@material-ui/core/Button';
import { graphql ,compose } from 'react-apollo';
import gql from 'graphql-tag';
import query from '../../graphQL/query/getTemplete';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import CustomizedSnackbars from '../../components/Snackbar/CustomizedSnackbars';
 class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
    this.state = {
      dropFileData:[],
      shopName:'' ,
      bannerImages:[],
      logoImages:[],
      isUpdate: false,
      isSnackbarOpen: false,
      snackbarMsg: "",
      snackbarType:"success",
      isValidShopName:false,
      isValidBanner: false,
      isValidLogo: false
    }
  }
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
    if (this.props.data.loading) {
      return <div></div>
    }
    if (this.props.data.error){
      return <p>Error :(</p>;
    }
    else{
      this.setShopDetail();
    }
    
  }


   handleSaveData = () => {
     debugger
     const {shopName, logo, banner} =this.props;
     const logoArrayFile = _.map(logo, 'dataURL');
     const logoImage = logoArrayFile[0];
     const bannerImage = _.map(banner, 'dataURL');
  
    if(shopName && logo && banner)
    {
      
      this.setState({
        isValidShopName:false
      })
      if(logo.size !== 0 && banner.size !== 0){
      this.setState({
        isUpdate :false,
        isSnackbarOpen: true,
        snackbarMsg: "Data update successfull",
        snackbarType:"success",
      },() => {
        setTimeout(()=> {
            this.setState(()=> ({ isSnackbarOpen: false , snackbarMsg: "",}))
        }, 5000); })
      this.props.setEditMutate({
          variables: {
              id: 5046214,
              shopName: shopName,
              logoImages: logoImage,
              bannerImages: bannerImage
          },
          refetchQueries: [{query: query}]
      })
    }
    if (logo.size == 0) {
      this.setState({
        isUpdate : true,
        isSnackbarOpen: true,
        snackbarMsg: "Please Select Logo Image",
        snackbarType:"error",
        isValidLogo: true
      },() => {
        setTimeout(()=> {
            this.setState(()=> ({ isSnackbarOpen: false , snackbarMsg: "",}))
        }, 5000); })
    }
     if (banner.size == 0) {
      this.setState({
        isUpdate : true,
        isSnackbarOpen: true,
        snackbarMsg: "Please Select Banner Image",
        snackbarType:"error",
        isValidBanner: true
      },() => {
        setTimeout(()=> {
            this.setState(()=> ({ isSnackbarOpen: false , snackbarMsg: "",}))
        }, 5000); })
    }

  }

    else{
      if(!shopName){
        this.setState({
          isValidShopName:true
        })
      }
      this.setState({
        isUpdate : true,
        isSnackbarOpen: true,
        snackbarMsg: "Please Select ShopName",
        snackbarType:"error",
      },() => {
        setTimeout(()=> {
            this.setState(()=> ({ isSnackbarOpen: false , snackbarMsg: "",}))
        }, 5000); })
  
    }
    this.setShopDetail();
  }

  handleCancle = () => {
    this.setState({
      isUpdate : false,
      isSnackbarOpen: true,
      snackbarMsg: "Proceess cancled",
      snackbarType:"warning",
    },() => {
      setTimeout(()=> {
          this.setState(()=> ({ isSnackbarOpen: false , snackbarMsg: "",}))
      }, 5000); })

  }
  setShopDetail = () => {
    const shopName = this.props.data.shops[0].shopName;
    const logoImage = this.props.data.shops[0].logoImages;
    const bannerItem = _.map(this.props.data && this.props.data.shops, 'bannerImages');
    const bannerImage = bannerItem[0];
    this.setState({
      shopName,
      logoImage,
      bannerImage
    })
  }
  handleUpdateData = () => {
    this.setState({
      isUpdate :true
    })
  }
  handleSnackbarClose =() =>{
    this.setState({
        isSnackbarOpen:false
    })
}

  render() {
   

    const { loading, error, repos } = this.props;

    const reposListProps = {
      loading,
      error,
      repos,
    };
    var logoComponentConfig = { iconFiletypes: ['.jpg', '.png', '.gif'],
                                showFiletypeIcon: true,
                                postUrl: 'no-url'};

    var bannerComponentConfig = { iconFiletypes: ['.jpg', '.png', '.gif'],
                                showFiletypeIcon: true,
                                postUrl: 'no-url'};
    

    var logoDjsConfig = {addRemoveLinks: true,
                          autoProcessQueue: false,
                          acceptedFiles: "image/jpeg,image/png,image/gif",
                          maxFiles: '1',
                          dictDefaultMessage: "upload logo image",
                          params: {
                            myParameter: "I'm a parameter!"
                            }
                          }
    var bannerDjsConfig = {addRemoveLinks: true,
                            autoProcessQueue: false,
                            acceptedFiles: "image/jpeg,image/png,image/gif",
                            maxFiles: '15',
                            dictDefaultMessage: "upload banner images",
                            params: {
                              myParameter: "I'm a parameter!"
                              },
                            }                      

    var logoEventHandlers = { addedfiles: this.props.onChangeLogo }
    var bannerEventHandlers = { addedfiles: this.props.onChangeBanner }
    if (this.props.data.loading) {
      return <div>Loading....</div>
    }
    if (this.props.data.error) return <p>Error :(</p>;

    const shopName = this.props.shopName ;
    const bannerItem = _.map(this.props.data && this.props.data.shops, 'bannerImages');
    const bannerList = bannerItem[0];
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div className="home-page">
       {this.state.isUpdate ?
        <Grid container spacing={8}  alignItems="center" justify="center">
    
          <Grid item xs={12} md={6}  >
          <TextField
            error={this.state.isValidShopName}
            id="standard-password-input"
            label="Shop-Name"
            type="text"
            value={shopName}
            fullWidth
            autoComplete="current-password"
            margin="normal"
            onChange ={this.props.onChangeShopName}
          />
          <div style={{margin:"10px 0px"}}>
          <p className={this.state.isValidLogo ? "border-red" : "form-head" }>Logo :</p>
          <DropzoneComponent 
                       config={logoComponentConfig}
                       eventHandlers={logoEventHandlers}
                       djsConfig={logoDjsConfig}
                       className= {this.state.isValidLogo ? "border-red" : "" }/>
          </div>
          <div style={{margin:"10px 0px"}}>
          <p className={this.state.isValidBanner ? "border-red" : "form-head" }>Banner :</p>
           <DropzoneComponent 
                       config={bannerComponentConfig}
                       eventHandlers={bannerEventHandlers}
                       djsConfig={bannerDjsConfig} 
                       className= {this.state.isValidBanner ? "border-red" : "" }/>
          </div>
          <div style={{margin:"10px 0px"}}>
          <Grid container spacing={8}  alignItems="center" justify="center">
              <Grid item xs={12} md={6}  >
                <Button variant="outlined" color="primary" size="large" fullWidth onClick ={this.handleSaveData}>Save</Button>
              </Grid>
              <Grid item xs={12} md={6}  >
                <Button variant="outlined" color="primary" size="large" fullWidth onClick ={this.handleCancle}>Cancle</Button>
              </Grid>
            </Grid>
          </div>
          </Grid>
        
        </Grid>

          :
        <Grid container spacing={8}  alignItems="center" justify="center">
          <Grid item xs={12} md={8}  >
         
          <Paper className="paperStyle">
          {this.props.data.shops[0].shopName &&
            <Grid item xs={12} md={12}  >
                <div>
                  <p className="admin-title-text">Shop-Name : <b className="shopHeadTitle">{this.props.data.shops[0].shopName}</b></p> 
                </div>
            </Grid>
            }
           {this.props.data.shops[0].logoImages &&
            <Grid item xs={12} md={12}  >
            <p className="admin-title-text"> Logo-Image :<img src={this.props.data.shops[0].logoImages} className="admin-logo-display"/></p>
            </Grid>
           }
           {bannerList.length !== 0 &&
            <Grid item xs={12} md={12}  >
            <p className="admin-title-text"> Banner-Images : </p> <Grid container spacing={8}  >
               {bannerList.map( item => (  <Grid item xs={12} md={3} key={item} > <img src={item} className="admin-banner-display"/></Grid>))}
               </Grid>
              </Grid>
           }
           {!this.props.data.shops[0].logoImages && !this.props.data.shops[0].shopName ?
            <Button variant="outlined" color="primary" size="large" fullWidth onClick ={this.handleUpdateData}>Add</Button>
            :
            <Button variant="outlined" color="primary" size="large" fullWidth onClick ={this.handleUpdateData}>Update</Button>
           }
          </Paper>
          </Grid>
          
        </Grid>
       }
      <CustomizedSnackbars
          isSnackbarOpen={ this.state.isSnackbarOpen}
          snackbarMsg={this.state.snackbarMsg}
          handleSnackbarClose={this.handleSnackbarClose}
          verticalAlign= "bottom"
          horizontalAlign="left"
          snackbarType={this.state.snackbarType}
          isIconButtonCloseDisplay={true} />
        </div>
      </article>
    );
  }
}

const Editmutation = gql`
mutation EditShops($id: Int, $shopName: String!, $logoImages: String!, $bannerImages: [String!] ){
    editShops(id: $id, shopName: $shopName, logoImages: $logoImages, bannerImages: $bannerImages){
      id
      shopName
      logoImages
      bannerImages
    }
  }
`;

export default compose(
  graphql(query, {
    options: { pollInterval: 5000 },
}),
  graphql(Editmutation, { name: 'setEditMutate' }),
  )(HomePage);


HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  shopName: PropTypes.string,
  logo: PropTypes.any,
  banner: PropTypes.any,
  onChangeShopName: PropTypes.func,
  onChangeLogo: PropTypes.func,
  onChangeBanner: PropTypes.func,
};
