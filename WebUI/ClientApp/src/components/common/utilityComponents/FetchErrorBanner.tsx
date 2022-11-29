import {Alert, Link, Typography} from '@mui/material';
import React from 'react';

type Props = {
  refetch?: () => void;
  children?: React.ReactNode;
};

const FetchErrorBanner = ({refetch, children}: Props) => {
  return (
    <Alert severity="error">
      <Typography>{children}</Typography>
      {refetch && <Link onClick={refetch}>Click to retry...</Link>}
    </Alert>
  );
};

export default FetchErrorBanner;
