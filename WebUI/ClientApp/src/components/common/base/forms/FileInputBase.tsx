import React, {InputHTMLAttributes} from 'react';
import {IconButton, TextField, TextFieldProps} from '@mui/material';
import {Field, useFormikContext} from 'formik';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  name: string;
  onLoad?: (files: string[]) => void;
};

const FileInputBase = (props: Props) => {
  const {name, onLoad, ...inputProps} = props;
  const {setFieldValue} = useFormikContext<any>();
  return <IconButton color="primary" component="label">
    <input
      type="file"
      hidden
      {...inputProps}
      onChange={event => {
        const files = event.currentTarget.files;
        setFieldValue(name, files);
        let readers = [];

        if (!files?.length)
          return;

        for (let i = 0; i < files.length; i++) {
          readers.push(readFile(files[i]));
        }

        Promise.all(readers).then(onLoad);
      }}
    />
    <CloudUploadIcon />
  </IconButton>
};

export default FileInputBase;

function readFile(file: File): Promise<string> {
  return new Promise(function (resolve, reject) {
    let fr = new FileReader();

    fr.onload = function () {
      resolve(fr.result as string);
    };

    fr.onerror = function () {
      reject(fr);
    };

    fr.readAsDataURL(file);
  });
}
