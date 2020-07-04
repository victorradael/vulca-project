import styled from "styled-components";

export const Container = styled.div`
  margin: 56px 0;
  padding: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  border-radius: 16px;
`;
export const Plans = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  box-sizing: border-box;
`;
export const PlanBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 16px;
  font-family: "Lato", sans-serif;

  p {
    margin-top: 4px;
  }

  h6 {
    margin: 4px 0 0 0;
    font-size: 14px;
    font-weight: normal;
    color: #999;
  }
`;

export const Title = styled.div`
  box-sizing: border-box;
  font-family: "Lato", sans-serif;
  color: #00a6ce;
  display: flex;
  h1 {
    padding: 0;
    margin: 0;
  }
  img {
    margin-right: 16px;
  }
`;

export const Button = styled.button`
  width: 300px;
  border-radius: 100px;
  border: none;
  background: #43b998;
  color: #fff;
  font-weight: bold;
  font-family: "Lato", sans-serif;
  font-size: 18px;
  padding: 8px 0;
  margin-bottom: 32px;
`;

export const SubFooter = styled.div`
  box-sizing: border-box;
`;
export const Footer = styled.div`
  box-sizing: border-box;
`;
