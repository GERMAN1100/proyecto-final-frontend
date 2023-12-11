import React from "react";
import styled from "styled-components";

const ResultContainer = styled.div`
  margin : 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const AmountWrap = styled.div`
  width: 200px;
  color: #ffffff;
  background-color: #34bfb2;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  margin-top: 20px;
  height:100px;
 
`;

const Result = ({ budgetAmount }) => {
  return (
    <ResultContainer>
      <AmountWrap>Monto de la Cotización: ${budgetAmount}</AmountWrap>
    </ResultContainer>
  );
};

export default Result;


