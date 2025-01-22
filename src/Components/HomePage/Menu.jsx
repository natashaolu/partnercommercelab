import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getOrganizationEndpoints } from '@coveo/headless';
import styled from "styled-components";
import { Theme } from "../../config/theme";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [menuitems, setmenuitems] = React.useState([]);

  const fetchlistings = async ()=>{

    try{
            const organizationEndpoints = getOrganizationEndpoints(
        process.env.REACT_APP_ORGANIZATION_ID || 'MISSING__ORG_ID'
      );
      const plpListResponse = await fetch(
        new URL(
          `${organizationEndpoints.admin}/rest/organizations/${process.env.REACT_APP_ORGANIZATION_ID}/commerce/v2/configurations/listings?trackingId=${process.env.REACT_APP_COMMERCE_ENGINE_TRACKING_ID}&page=0&perPage=100`,
        ),
        { method: 'GET', headers: { Authorization: `Bearer ${process.env.REACT_APP_GET_PRODUCT_LISTING_API_KEY}` } },
      );
    
      const json = await plpListResponse.json();
      if(json){
        setmenuitems(json.items);
      }
    }
    catch(e){
      console.log(e);
    }
}

  React.useEffect(()=>{

    fetchlistings();

  },[])

  if(menuitems.length === 0){
    return null;
  }

  return (
    <>
      <TopNavigationLink
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onMouseOver={handleClick}
      >
        Categories
      </TopNavigationLink>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        { menuitems && menuitems.map((item, index)=>{
            if(item.name === "GLOBAL"){
                return null;
            }
            return <MenuItem key={item.id} onClick={()=>window.open(item.patterns[0].url.replace("https://sports.barca.group",""), "_self")}>{item.name}</MenuItem>
        })}
      </Menu>
    </>
  );
}

const TopNavigationLink = styled.a`
 position: relative;
  color: ${Theme.primaryText};
  background-color:#E1F88F;
  justify-content:space-evenly;
  text-align:center;
  box-sizing:border-box;
  border:0;
  margin:0;
  padding:6px 8px;
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