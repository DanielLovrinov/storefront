import { media, styled } from "@styles";

import { Size } from "./types";

const fontSize = (fontSize: string, smallFontSize: string) => ({
  md: fontSize,
  sm: smallFontSize,
});

export const Primary = styled.button<{
  color: "primary" | "secondary";
  fullWidth?: boolean;
  size: Size;
}>`
  background-color: #fff;
  border: none;
  border-radius: 4px;
  transition: 0.3s;
  outline: none;
  cursor: pointer;
  color: #304252;
  width: 100%;
  height: 48px;
  max-width: 280px;

  &:disabled {
    background-color: ${props => props.theme.colors.disabled};

    &,
    &:hover {
      cursor: default;
    }
  }
  span {
    font-size: 16px;
    font-weight: 600;
  }
  @media (min-width: 540px) {
    max-width: 207px;
    height: 56px;
    span {
      font-size: 17px;
    }
  }
`;

export const Secondary = styled(Primary)`
  box-shadow: inset 0px 0px 0px 3px
    ${props => props.theme.button.colors.secondary.color};
  border-left: 1px solid ${props => props.theme.button.colors.secondary.color};
  border-right: 1px solid ${props => props.theme.button.colors.secondary.color};
`;

export const Text = styled.span<{ size: Size }>`
  font-size: ${({
    size,
    theme: {
      button: { typography },
    },
  }) => fontSize(typography.fontSize, typography.smallFontSize)[size]};
  font-weight: ${props => props.theme.typography.boldFontWeight};
`;
