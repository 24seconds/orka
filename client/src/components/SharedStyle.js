import { css } from 'styled-components';
import { TabDefaultWidth, MaterialThemeOceanic } from '../constants/styleConstants';

export const messageCell = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px ${ MaterialThemeOceanic.Border };
  border-top: none;
  padding: ${props => props.padding || '0 10px' };
  height: 30px;
  font-size: 16px;
  width: ${props => props.width || TabDefaultWidth }px;
  min-width: ${props => props.width || TabDefaultWidth }px;
  max-width: ${props => props.width || TabDefaultWidth }px;
`