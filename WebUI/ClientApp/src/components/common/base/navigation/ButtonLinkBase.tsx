import {Button, ButtonProps} from "@mui/material";
import {Link as RouterLink, LinkProps} from "react-router-dom";
import React from "react";

type Props = LinkProps & React.RefAttributes<HTMLAnchorElement> & ButtonProps;

const ButtonLinkBase = (props: Props) => {
  return (<Button component={RouterLink} {...props} />);
};

export default ButtonLinkBase;