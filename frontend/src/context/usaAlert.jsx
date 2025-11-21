import { useContext } from 'react';
import { AlertContext } from './alert.contex';

export const useAlert = () => useContext(AlertContext);
