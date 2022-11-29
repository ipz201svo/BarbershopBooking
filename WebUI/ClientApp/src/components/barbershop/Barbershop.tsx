import React from 'react';
import {useParams} from 'react-router-dom';
import {useDocumentTitle} from '../common/hooks';

const Barbershop = () => {
  useDocumentTitle('Barbershop');
  const {id} = useParams<{id: string}>();

  return (
    <div>
      Barbershop {id}
    </div>
  );
};

export default Barbershop;
