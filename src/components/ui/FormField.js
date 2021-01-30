import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  margin: .5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label`
  display: "block";
  margin-right: 1rem;
`;

export function FormField({ children, label, name }) {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      {children}
    </Container>
  );
}