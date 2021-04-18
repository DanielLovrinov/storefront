import { styled } from "@styles";

export const VariantPicker = styled.div`
  display: grid;
  margin-top: 20px;

  .react-select-wrapper,
  .input {
    width: 50%;
    margin-bottom: 1rem;
  }
`;

export const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
`;
