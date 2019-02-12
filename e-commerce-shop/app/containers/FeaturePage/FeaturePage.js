
import React from 'react';
import './style.scss';
import { graphql } from 'react-apollo';
import query from '../../graphQL/query/getTemplete';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import _ from 'lodash';
class FeaturePage extends React.Component {
  render() {
    debugger
    if (this.props.data.loading) {
      return <div></div>
    }
    if (this.props.data.error) return <p>Error :(</p>;
    const bannerItem = _.map(this.props.data && this.props.data.shops, 'bannerImages');
    const bannerList = bannerItem[0];
    return(
      
      <Carousel  infiniteLoop={true} swipeable={true} interval={2000} transitionTime={200} autoPlay={true} centerSlidePercentage={30}>
        {bannerList.map( item => (<div key={item}>  <img src={item} /></div>))}
      </Carousel>
    );
  }
}
export default  graphql(query)(FeaturePage);