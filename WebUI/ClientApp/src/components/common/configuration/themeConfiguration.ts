import {LinkProps, ThemeOptions} from "@mui/material";
import {LinkBase} from "../base/navigation";

const themeConfiguration: ThemeOptions = {
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBase,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBase,
      },
    },
    // MuiListItemButton: {
    //   defaultProps: {
    //     LinkComponent: LinkBase,
    //   },
    // },
  }
};

export default themeConfiguration;