import { css } from 'styled-components';
import { TabDefaultWidth } from '../constants/styleConstants';

export const messageCell = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px black;
  /* border-bottom: solid 1px black; */
  border-top: none;
  padding: ${props => props.padding || '0 10px' };
  height: 30px;
  font-size: 16px;
  width: ${props => props.width || TabDefaultWidth }px;
`