import {ReactElement} from 'react';

export type ReactChildrenType = ReactElement | ReactElement[] | string;

export interface ReactPropsChildrenType {
   children: ReactChildrenType;
}
