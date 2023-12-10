import React from "react";
import styled from "styled-components";




const AmountWrap = styled.div`
  width: 200px;
  color: #ffffff;
  background-color: #34bfb2;
  
  text-align: center;
  box-sizing: border-box;
  display: inline-block;
`;

const ResetButton = styled.button`
 
  background-color: #00838f;
  height:100px;
  width:200px;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color .3s ease;
  box-sizing: border-box;
  display: inline-block;
  &:hover {
    background-color: #26c6da;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const Result = ({ budgetAmount }) => {
  return (
    <div>
     
      <AmountWrap>
        Monto de la Cotización: ${budgetAmount}
      </AmountWrap>
      <ResetButton>
        Resetear costos
      </ResetButton>
     
    </div>
  );
};

export default Result;


// ya hecho con chatgpt