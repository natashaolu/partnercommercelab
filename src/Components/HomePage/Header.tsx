import React, { useContext, useEffect, useState } from "react";
import { Theme } from "../../config/theme";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";
import HomeSearchBox from "./HomeSearchBox";
import { x } from "react-icons-kit/feather/x";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import { HeaderConfig, HeaderLogo, TopHeaderConfig } from "../../config/HomeConfig";
import Popover from "@mui/material/Popover";
import ContextForm from "../CustomContext/ContextForm";
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import { CommerceEngine, buildProductListing } from "@coveo/headless/commerce";
import EngineContext from "../../common/engineContext";
import BasicMenu from "./Menu";
import HomeProductsSearchBox from "./HomeProductsSearchBox";
import { InternationalizationDropdown } from "../Internationalization/InternationalizationDropdown";
import { InternationalizationEnabled, HomeHeaderConfigTranslations } from "../../config/InternationalizationConfig";
import { LanguageContext } from "../Internationalization/LanguageUtils";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart"; 
import { menu } from "react-icons-kit/feather/menu"; 
import CartIcon from "./CartIcon.js";

const Header: React.FC = () => {



  /*   const plpListResponse = await fetch(
      new URL(
        `${organizationEndpoints.admin}/rest/organizations/${process.env.REACT_APP_ORGANIZATION_ID}/commerce/v2/configurations/listings?page=0&perPage=100`,
      ),
      { method: 'GET', headers: { Authorization: `Bearer ${process.env.PRODUCT_LISTING_API_KEY}` } },
    );
  
    const json = await plpListResponse.json();
  
    const urlValidator = /\/browse\/promotions\//;
    const validItems = json.items.filter((item) => urlValidator.test(item.matching.url));
  
    const listings = validItems.map((item) => {
      const splitUrl = item.matching.url.split('/');
      const name = splitUrl[splitUrl.length - 1].replace(/-/g, ' ').trim();
  
      return { name: name.charAt(0).toUpperCase() + name.slice(1), urls: [item.matching.url] };
    }); */





  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const navigate = useNavigate();
  const { getProfile } = useContext(CustomContextContext)
  const { getText } = useContext(LanguageContext)
  const onSearchPage = window.location.pathname.includes("search") || window.location.pathname.includes("browse") || window.location.pathname.includes("product") || window.location.pathname.includes("plp")
  const toggleSearchBox = () => {
    if (onSearchPage) {
      const input = document.querySelector(".search-box input");
      if (input instanceof HTMLElement) {
        input.focus();
      }
      return;
    }
    setOpenSearch(!openSearch);
  };

  useEffect(() => {
    if (openSearch) {
      const input = document.querySelector(".home-search-box input");
      if (input instanceof HTMLElement) {
        input.focus();
      }
    }
  }, [openSearch]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Wrapper>
        <Discount>
          <TopRight>
            <TopLinks>
            <TopLink href="#">10% Discount on Shirts* with Coupon Code: LAB15</TopLink>
            </TopLinks>
          </TopRight>


        </Discount>
        <Navbar>
          <MainNavBar>
            <MainNavBarigth>
              {/* shopLab branding with navigation */}
              <span
                style={{
                  marginLeft: "10px",
                  fontSize: "36px",
                  fontWeight: "bold",
                  textAlign: "right",
                  cursor: "pointer", // Make the span clickable
                  display: "inline-block", // Ensure proper alignment
                  lineHeight: "1.2", // Adjust line spacing
                }}
                onClick={() => navigate("/home")} // Add navigation functionality
              >
                 <img
                  src={HeaderLogo}
                  alt="description"
                  style={{
                    height: "100px", // Set your desired height
                    width: "100px", // Set your desired width
                    objectFit: "cover", // Optional: to control how the image fits the dimensions
                                                    }}
                />
                
               { /*  <Logo src={HeaderLogo} onClick={() => navigate("/home")} 
                      style={HeaderLogo ? {} : {background: "#e9e9e9", objectFit: "contain", padding: "10px", height: "150px",  width: "150px"}}

                />*/}

 
              </span>
            </MainNavBarigth>
            {/* Display search bar on the homepage only */}
            {!onSearchPage && (
              <SearchBarContainer>
                <HomeProductsSearchBox toggleSearchBox={toggleSearchBox} />
              </SearchBarContainer>
            )}

            <MainNavBarleft>

              <LinkWrapper>
                {HeaderConfig.map((item) => {

                 

                  return (
                    <NavigationLink key={item.title} href={item.redirectTo}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {item.icon && <Icon icon={item.icon} size={24} />} {/* Render the icon */}


                        {item.title && (
                          <> {getText(item.title, HomeHeaderConfigTranslations, item.title)}</>

                        )}
                      </span>
                    </NavigationLink>
                  );
                })}
                
                <IconsWrapper>
                  {onSearchPage && (

                    <IconContainer
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleSearchBox()}
                    >
                      
                      {openSearch && !onSearchPage ? (
                        <div style={{ color: Theme.searchIcon }}><Icon icon={x} size={24} /></div>
                      ) : (
                        <div style={{ color: Theme.searchIcon }}><Icon icon={search} size={24} /></div>
                      )}
                    </IconContainer>

                  )}

                  <ProfileIconContainer
                    style={{ color: 'black', cursor: "pointer" }}
                    aria-describedby={id}
                    onClick={(event) => handleClick(event)}
                  >
                    <ProfileAvatar src={getProfile().profile} alt={'profile pic'} />
                    <ProfileName>{getProfile().name.split(' ').slice(0, -1).join(' ')}</ProfileName>
                  </ProfileIconContainer>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <ContextForm />
                  </Popover>
                  {InternationalizationEnabled && <InternationalizationDropdown />}
                </IconsWrapper>
              </LinkWrapper>
              {/* </RightWrapper> */}
            </MainNavBarleft>


          </MainNavBar>

          <TopLeft>

            {TopHeaderConfig.map((item, index) => {
               if (index === 0) return <BasicMenu />
              return (
                <TopNavigationLink key={item.title} href={item.redirectTo}>
                  {
                    // @ts-ignore
                    getText(item.title, "title")
                  }
                </TopNavigationLink>
                  
              );
              

            })
            
            
            }

          </TopLeft>


        </Navbar>
      </Wrapper>
      {/* <Fade in={openSearch && !onSearchPage}>
        <SearchContainer>
          <SearchBoxContainer>
            {!onSearchPage &&
              <HomeProductsSearchBox toggleSearchBox={toggleSearchBox} />
            }
          </SearchBoxContainer>
        </SearchContainer>
      </Fade> */}
    </>
  );
};

const Discount = styled.div`
  background-color: #000;//F7FFDC other color 
  
  padding: 10px 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width:100%
  
`;

const TopRight = styled.div`
  
`;

const TopLinks = styled.ul`
  display: flex;
  gap: 15px;
  list-style: none;
`;


const TopLink = styled.a`
  text-decoration: none;
  color: white;
  font-size: 16px;
  white-space: nowrap; /* Keep the text on one line */
  display: inline-block;
  animation: scroll-text 15s linear infinite; /* Create the scrolling effect */

  &:hover {
    opacity: 0.8;
  }

  @keyframes scroll-text {
    from {
      transform: translateX(100%); /* Start outside the container */
    }
    to {
      transform: translateX(-100%); /* End fully off the left side */
    }
  }
`;

const TopLeft = styled.div`
  display:flex;
  justify-content:center;
  padding:10px;
  width: 100%;
`;

const TopLinkWrapper = styled.ul`
  display: flex;
  flex-direction:row;
  white-space: nowrap; /* Prevents links from wrapping to a new line */
  gap:15px;
  align-items: center;
  width: 850px;
  @media (max-width: 1000px) {
    width: auto;
  }
`;

const TopNavigationLink = styled.a`
 
  color: ${Theme.primaryText};
  text-align:center;
  box-sizing:border-box;
  border:0;
  margin:0;
  padding:5px 15px;
  font-size: 1rem;
  font-weight:500;
  text-decoration:none;
  opacity: 1;
  transition: 0.2s ease-in-out all;
  &:hover {
    opacity: 0.7;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

const Navbar = styled.div`
display:flex;
flex-direction:column;
  width: 70%;

`;

const SearchBarContainer = styled.div`
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom:0;

 
`;

const MainNavBar = styled.div`
   display: flex;
  align-items: center;
  justify-content: center; /* Center-align the content */
  gap: 20px; /* Add space between left and right sections */
  padding: 10px 75px;
`;
const MainNavBarleft = styled.div`
    display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0.75; /* Allow it to grow and take equal space */
`;
const MainNavBarigth = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.75; /* Allow it to grow and take equal space */
`;
const Wrapper = styled.header`
  box-shadow: 0 2px 8px rgb(229 232 232 / 75%);
  position: fixed;
  top: 0;
  z-index: 99;
  padding: 10px 5px;
  width: 100%;
  color: ${Theme.primaryText};
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: max-height .3s ease-out;
`;
const BtmWrapper = styled.header`
  position: fixed;
  top: 40px;
  z-index: 99;
  padding: 12px 0;
  width: 100%;
  height: 64px;
  background-color:rgb(246 241 235 / 73%);
  display: flex;
  align-items: center;
`;

const LeftWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
  margin-left: 20px;

`;
const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center; 
  flex: 1; 
  margin-right: 20px; 
`;

const MenuContainer = styled.button`
  background: none;
  margin-left: 30px;
  border: 0px;
  display: flex;
  align-items: center;
  gap: 8px; 
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(0.95);
  }

  &:active {
    transform: scale(0.85);
  }
`;

const CartWrapper = styled.button`
  margin-right: 80px;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  margin-left: 20px; 
  
  &:hover {
    transform: scale(0.95); 
  }

  &:active {
    transform: scale(0.85);
  }

  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

const CartText = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-left: 8px;
  color: ${Theme.primaryText};

  &:hover {
    opacity: 0.95;
  }
`;
const Logo = styled.img`
  height: 50px;
  width: 150px;
  object-fit: contain;
  padding-left: 10px;
`;

// const RightWrapper = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   flex: 1;
//   margin-right: 50px;
// `;

// const LinkWrapper = styled.ul`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 800px;
//   @media (max-width: 1000px) {
//     width: auto;
//   }
// `;

const LinkWrapper = styled.ul`
  display: flex;
  justify-content:flex-end;
  gap: 20px;
  list-style: none;
`;

// const NavigationLink = styled.a`
//   color: ${Theme.primaryText};
//   text-decoration: none;
//   font-size: 16px;
//   font-weight: 500;
//   opacity: 1;
//   transition: 0.2s ease-in-out all;
//   &:hover {
//     opacity: 0.7;
//   }
//   @media (max-width: 1000px) {
//     display: none;
//   }
// `;
const NavigationLink = styled.a`
  text-decoration: none;
  font-size: 16px;
  color: ${Theme.primaryText};
  &:hover {
    opacity: 0.8;
  }
`;

const Divider = styled.div`
  height: 50px;
  border-right-width: 2px;
  width: 1px;
  height: 48px;
  background: #e5e8e8;
  @media (max-width:1000px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 150px;
  margin-top: 10px;
  box-shadow: 0px 6px 16px rgba(229, 232, 232, 0.75);
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  background-color: white;
  justify-content: center;
  position: fixed;
  z-index: 9;
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.button`
background: none;
border: 0px;
width: 40px;
transition: 0.2s ease-in-out all;
&:hover{
  transform: scale(0.95);
}
&:active{
  transform: scale(0.85);
}
`

const ProfileName = styled.span`
font-size  : 16px;
font-weight: 400;
font-family: inherit;
margin-left: 15px;
color : ${Theme.secondaryText};
text-overflow: ellipsis;
`


const ProfileIconContainer = styled.button`
  background: none;
  border: 0px;
  margin-left: 20px;
  width: 90px;
  display: flex;
  align-items: center;
  transition: 0.2s ease-in-out all;
  &:hover{
  transform: scale(0.95);
}
&:active{
  transform: scale(0.85);
}

`

// const SearchBoxContainer = styled.div`
//   width: 50%;
//   margin-top: 50px;
//   max-width: 800px;
//   min-width: 500px;
//   @media (max-width: 480px) {
//     min-width: 80vw;
//   }
// `;

const SearchBoxContainer = styled.div`
  width: 50%;
  max-width: 800px;
`;


const ProfileAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 24px;
  object-fit: cover;
`



export default Header;