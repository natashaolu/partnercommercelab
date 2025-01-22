import HeroImage from "../assets/HeroImage4.jpg";
import CoveoLogo from "../assets/CoveoLogo.svg";
import shopLogo from "../assets/shopLab.png"
import RecommendationDefault from "../assets/Recommendation.jpg";
import { RecommendationType } from "./Types/ConfigTypes";
import { ic_menu } from 'react-icons-kit/md/ic_menu';
import { ic_shopping_bag_outline } from 'react-icons-kit/md/ic_shopping_bag_outline';
import { ic_email_outline } from 'react-icons-kit/md/ic_email_outline';
import { search } from 'react-icons-kit/feather/search';
import {heart} from 'react-icons-kit/feather/heart'
import {plane} from 'react-icons-kit/fa/plane'
import styled from "styled-components";


/* To import your Demo Logo
1. Place the logo in the assets Folder
2. import the logo into this file using the following statement

    import DemoLogo from "../assests/<Logo-Image-filename>"  

    * it is important to add the coorect image extension type in the end of the filename e.g. DemoImage.png, DemoImage.svg or DemoImage.jpg

3. Replace the CoveoLogo with DemoLogo below.
*/

export const HeaderLogo = shopLogo;

export const FooterLogo = shopLogo;

export const DefaultRecommendationImage = RecommendationDefault;


export const HeroConfig = {
  title: "Shop Till You Drop",
  description: "Find clothes that fits you",
  background: HeroImage,
  color: '#F6F1EB',
  buttonText: "Explore",
  onClickButtonRedirect: "/search",
  width : "100%",
  height: "600px",
  


  // Hero Image Text CSS config
  titleFontSize : "78px",
  titleFontWeight : "600",
  titleColor : '#000000',
  titleWidth : "1000px",
  subTitleWidth : "550px",
  subTitleFontSize : "22px",
  subTitleColor : '#000000',

};


export const HeroContainer = styled.div`
  position: relative; /* For stacking elements */
  width: 150%; /* Full-width for background */
  height: 100vh; /* Full viewport height */
  background-image: url(${HeroImage}); /* Set the hero image */
  background-size: cover; /* Ensure the image covers the entire container */
  background-repeat: no-repeat; /* Avoid image repetition */
  background-position: center; /* Centre the image */
  color: ${HeroConfig.color}; /* Text colour from the config */
  display: flex; /* Flexbox for centring content */
  flex-direction: column;
  justify-content: center; /* Vertically centre content */
  align-items: center; /* Horizontally centre content */
  text-align: center;
`;

export const HeroTitle = styled.h1`
  font-size: ${HeroConfig.titleFontSize};
  font-weight: ${HeroConfig.titleFontWeight};
  color: ${HeroConfig.titleColor};
  margin: 0;
  max-width: ${HeroConfig.titleWidth};
`;

export const HeroDescription = styled.p`
  font-size: ${HeroConfig.subTitleFontSize};
  color: ${HeroConfig.subTitleColor};
  max-width: ${HeroConfig.subTitleWidth};
  margin: 10px 0;
`;

export const HeroButton = styled.button`
  padding: 15px 30px;
  font-size: 26px;
  font-weight: bold;
  background-color: ${HeroConfig.color};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

// Usage in your component
export default function Hero() {
  return (
    <HeroContainer>
      <HeroTitle>{HeroConfig.title}</HeroTitle>
      <HeroDescription>{HeroConfig.description}</HeroDescription>
      <HeroButton onClick={() => (window.location.href = HeroConfig.onClickButtonRedirect)}>
        {HeroConfig.buttonText}
      </HeroButton>
    </HeroContainer>
  );
}



// TODO When generating JSON, dynamically generate internationalization config in admin console to include these elements.

export const TopHeaderConfig = [
  {
    title: "Listings",
    redirectTo: "/",
  },
  {
    title: "Men",
    redirectTo: "https://shoplab.netlify.app/plp/men",
  },
  {
    title: "Women",
    redirectTo: "https://shoplab.netlify.app/plp/women",
  },
  {
    title: "Tops",
    redirectTo: "https://shoplab.netlify.app/plp/Shirts",
  },
  {
    title: "Pants",
    redirectTo: "https://shoplab.netlify.app/plp/pants",
  },

  
];


export const HeaderConfig = [

  // {
  //   title: 'Airport Shop',
  //   redirectTo: '/shop',
  //   icon: plane, // Icon object
  // },

  {
    title: '',
    redirectTo: '/search',
    icon: heart, // Icon object
  },

  {
    title: '',
    redirectTo: '/contact',
    icon: ic_shopping_bag_outline, // Icon object
  },
];






export const HomeRecommendationConfig: RecommendationType[] = [
  {
    title: "Recommendations",
    description: "Here are your personalized recommendations",
    numberOfResults: 15,
    imageField: "ec_images",
    pipeline: "cmh-recommendations-sandbox",
    searchHub: "default",
    id: "Recommendation",
    active : true,       // changing to "false" will hide this recommendation
    type: "slider" // "list" | "carousel" | "slider"
  },
  {
    title: "Popular Items",
    description: "Here are your personalized recommendations",
    numberOfResults: 15,
    imageField: "ec_images",
    pipeline: "cmh-recommendations-sandbox",
    searchHub: "default",
    id: "Recommendation",
    active : true,       // changing to "false" will hide this recommendation
    type: "carousel" // "list" | "carousel" | "slider"
  },
  {
    title: "Most Viewed",
    description: "Here are your personalized recommendations",
    numberOfResults: 8,
    imageField: "ec_images",
    pipeline: "cmh-recommendations-sandbox",
    searchHub: "default",
    id: "Recommendation",
    active : true,       // changing to "false" will hide this recommendation
    type: "list" // "list" | "carousel" | "slider"
  },
]

export const EnableAuthentication = false;
