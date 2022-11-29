import React, {useRef} from 'react';
import {Card, CardActionArea} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {readFileAsDataUrl} from '../../common/utils';
import {useFormikContext} from 'formik';

const AddImageTile = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {setFieldValue, values} = useFormikContext<any>();
  return (
    <Card>
      <CardActionArea sx={{display: 'flex', height: 350}} onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} hidden accept="image/*" type="file"
          onChange={event => {
            if (!event.currentTarget?.files)
              return;
            const file = event.currentTarget.files[0];
            readFileAsDataUrl(file).then(dataUrl => setFieldValue('images', values.images.concat(dataUrl)));
          }}
        />
        <AddCircleOutlineIcon sx={{m: 'auto'}} fontSize="large" />
      </CardActionArea>
    </Card>
  );
};

export default AddImageTile;
