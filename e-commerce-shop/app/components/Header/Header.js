import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/banner.jpg';
import './style.scss';
import { graphql } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import query from '../../graphQL/query/getTemplete';
class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (this.props.data.loading) {
      return <div>Loading....</div>
    }
    if (this.props.data.error) return <p>Error :(</p>;
    return (
      <div className="header">
       <Grid container spacing={16} >
    
          <Grid item xs={12} md={5}  >        
              <img src={this.props.data.shops[0].logoImages} className="headerLogo"/>
              <b className="titleFont">{this.props.data.shops[0].shopName}</b>
        </Grid>
        <Grid item xs={12} md={7}  >
          <div className="nav-bar">
            <Link className="router-link" to="/">
              Admin
            </Link> 
            <Link className="router-link" to="/features">
              User
            </Link>
          </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default  graphql(query)(Header);
