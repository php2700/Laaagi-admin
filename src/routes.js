/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Sweets from "layouts/sweets";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Add_Banner from "layouts/billing/add_Banner";
import Add_Sweets from "layouts/sweets/add_Sweets";
import Edit_Sweets from "layouts/sweets/edit_Sweets";
import Decoration from "layouts/decoration/index"
import Add_Decoration from "layouts/decoration/add_Decoration"
import Designer from "layouts/Designer/index";
import Add_Designer from "layouts/Designer/add_Designer"
import Ads from "layouts/ads/index"
import Edit_Ads from "layouts/ads/edit_Ads"
import About from "layouts/about/index"
import Edit_About from "layouts/about/edit_about"
import Review from "layouts/review/index"
import Add_Review from "layouts/review/add_review"
import Edit_Review from "layouts/review/edit_review"
import Invitation from "layouts/invitation/index"
import Add_Invitation from "layouts/invitation/add_Invitation"
import Contact_Us from "layouts/contact/index"
// @mui icons
import Icon from "@mui/material/Icon";
import Wedding from "layouts/wedding/index"
import Add_Wedding from "layouts/wedding/add_wedding"
import DryFruit from "layouts/dry_fruit/index"
import Add_Dry_fruit from "layouts/dry_fruit/add_dry_fruit"
import Best_seller from "layouts/best_selller/index"
import Add_best_seller from "layouts/best_selller/add_best_seller";
import Edit_Invitation from "layouts/invitation/edit_invitation";
import Planning from "layouts/planning/index";
import Add_Planning from "layouts/planning/add_planning";
import Edit_Planning from "layouts/planning/edit_planning"
import Invitation_Boxes from "layouts/invitation_boxes/index"
import Edit_Invitation_box from "layouts/invitation_boxes/edit_invitation_boxes"
import Discover_sweets from "layouts/discover_sweets/index"
import Edit_Discover_sweets from "layouts/discover_sweets/edit_discover_sweets"
import Users from "layouts/users/index"
import Edit_User from "layouts/users/edit_user"
import Customization from "layouts/customization/index"
import Quote from "layouts/quote/index"
import Edit_Banner from "layouts/billing/edit_Banner"

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "About Us",
    key: "about us",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/about",
    component: <About />,
  },
  {
    type: "collapse",
    name: "Ads",
    key: "ads",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ads",
    component: <Ads />,
  },
  {
    type: "collapse",
    name: "Banners",
    key: "banners",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/banners",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Best Sellers",
    key: "best_sellers",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/best-seller",
    component: <Best_seller />,
  },
  {
    type: "collapse",
    name: "Contact Us",
    key: "contact_us",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/contact-us",
    component: <Contact_Us />,
  },
  {
    type: "collapse",
    name: "Customization",
    key: "Customization",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/customization",
    component: <Customization />,
  },
  {
    type: "collapse",
    name: "Designer",
    key: "designer",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/designer",
    component: <Designer />,
  },
  {
    type: "collapse",
    name: "Decoration",
    key: "decoration",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/decoration",
    component: <Decoration />,
  },
  {
    type: "collapse",
    name: "Discover Sweets",
    key: "discover_sweets",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/discover-sweets",
    component: <Discover_sweets />,
  },
  {
    type: "collapse",
    name: "Dry Fruits Treats",
    key: "dry_fruit_treats",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/dry-fruit",
    component: <DryFruit />,
  },
  {
    type: "collapse",
    name: "Invitation",
    key: "invitation",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/invitation",
    component: <Invitation />,
  },
  {
    type: "collapse",
    name: "Invitation Boxes",
    key: "invitation_boxes",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/invitation-boxes",
    component: <Invitation_Boxes />,
  },
  {
    type: "collapse",
    name: "Plannning",
    key: "planning",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/planning",
    component: <Planning />,
  },
  {
    type: "collapse",
    name: "Quote",
    key: "Quote",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/quote",
    component: <Quote />,
  },
  {
    type: "collapse",
    name: "Review",
    key: "review",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/review",
    component: <Review />,
  },
  {
    type: "collapse",
    name: "Sweets",
    key: "sweets",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/sweets",
    component: <Sweets />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Edit Users",
    key: "edit users",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/edit-user",
    component: <Edit_User />,
  },

  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/",
    component: <SignIn />,
  },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
 
 
 
  {
    type: "collapse",
    name: "Add Banner",
    key: "add-banner",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/add-banner",
    component: <Add_Banner />,
  },
  {
    type: "collapse",
    name: "Add Sweets",
    key: "add-sweets",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/add-sweets",
    component: <Add_Sweets />,
  },
  {
    type: "collapse",
    name: "Edit Sweets",
    key: "edit-sweets",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/edit-sweets",
    component: <Edit_Sweets />,
  },
  {
    type: "collapse",
    name: "Add Decoration",
    key: "add-decoration",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/add-decoration",
    component: <Add_Decoration />,
  },
  {
    type: "collapse",
    name: "Add Designer",
    key: "add-designer",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/add-designer",
    component: <Add_Designer />,
  },
  {
    type: "collapse",
    name: "Edit Ads",
    key: "edit-ads",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/edit-ads",
    component: <Edit_Ads />,
  },
  {
    type: "collapse",
    name: "Edit About",
    key: "edit-about",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/edit-about",
    component: <Edit_About />,
  },
  
  {
    type: "collapse",
    name: "Add Review",
    key: "add-review",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/add-review",
    component: <Add_Review />,
  },
  {
    type: "collapse",
    name: "Edit Review",
    key: "edit-review",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/edit-review",
    component: <Edit_Review />,
  },
  {
    type: "collapse",
    name: "Add Invitations",
    key: "add_invitation",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/add-invitation",
    component: <Add_Invitation />,
  },
  {
    type: "collapse",
    name: "Edit Invitation",
    key: "edit invitation",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/edit-invitation",
    component: <Edit_Invitation />,
  },
  
  {
    type: "collapse",
    name: "Wedding Special",
    key: "wedding_special",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/wedding",
    component: <Wedding />,
  },
  {
    type: "collapse",
    name: "Add Wedding",
    key: "add_wedding",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/add-wedding",
    component: <Add_Wedding />,
  },
 
  {
    type: "collapse",
    name: "Add Dry Fruits",
    key: "add_dry_fruit",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/add-dry-fruit",
    component: <Add_Dry_fruit />,
  },
 
  {
    type: "collapse",
    name: "Add Best Seller",
    key: "add_best_seller",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/add-best-seller",
    component: <Add_best_seller />,
  },

  {
    type: "collapse",
    name: "Add Planning",
    key: "add_planning",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/add-planning",
    component: <Add_Planning />,
  },
  {
    type: "collapse",
    name: "Edit Planning",
    key: "edit_planning",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/edit-planning",
    component: <Edit_Planning />,
  },
 
  {
    type: "collapse",
    name: "Edit Invitation Boxes",
    key: "edit_invitation_boxes",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/edit-invitation-boxes",
    component: <Edit_Invitation_box />,
  },
  
  {
    type: "collapse",
    name: "Edit Discover Sweets",
    key: "edit discover_sweets",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/edit-discover-sweets",
    component: <Edit_Discover_sweets />,
  },
  {
    type: "collapse",
    name: "Edit Banner",
    key: "edit banner",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/edit-banner",
    component: <Edit_Banner />,
  }

];

export default routes;
