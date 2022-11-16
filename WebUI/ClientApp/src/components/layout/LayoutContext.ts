import {createContext} from 'react';
import {LayoutContextType} from './types';

const defaultContext: LayoutContextType = {
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
};

const LayoutContext = createContext(defaultContext);

export default LayoutContext;