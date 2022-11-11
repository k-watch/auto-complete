import { css } from 'styled-components';

export const flexBox = (
  direction = 'row',
  justify = 'center',
  align = 'center'
) => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
`;

export const absoluteCenter = () => css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const boxShadow = (alpha = 0.2) => css`
  box-shadow: rgba(0, 0, 0, ${alpha}) 0px 0px 10px;
`;
