import styled, { css } from "styled-components";

interface IProps {
  selected?: boolean;
  periodSelected?: boolean;
}

export const Container = styled.div`
  margin: 56px 0;

  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  font-family: "Lato", sans-serif;
`;

export const Switch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px 0 32px 0;

  div {
    background: #f4f7fc;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 100px;
  }
`;

export const ButtonPeriod = styled.button<IProps>`
  border-radius: 100px;
  background: #f4f7fc;
  cursor: pointer;
  padding: 8px 24px;
  color: #333;
  font-weight: bold;
  border: none;

  &:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }

  ${(props) =>
    props.periodSelected === true &&
    css`
      background: #00a6ce;
      color: #fff;
    `}
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
  padding: 0 40px;

  border-left: 1px solid #ddd;

  h6 {
    margin: 16px 0 0 0;
    font-size: 14px;
    font-weight: normal;
    color: #999;
  }

  h3 {
    font-size: 32px;
    color: #00a6ce;
    margin: 16px 0 8px 0;
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

export const Button = styled.button<IProps>`
  width: 300px;
  border-radius: 100px;
  border: none;
  background: #f4f7fc;
  color: #333;
  font-weight: bold;
  font-family: "Lato", sans-serif;
  font-size: 18px;
  padding: 8px 0;
  margin-bottom: 32px;
  cursor: pointer;

  &:focus {
    box-shadow: 0 0 0 0;

    outline: 0;
  }

  ${(props) =>
    props.selected === true &&
    css`
      background: #43b998;
      color: #fff;
      cursor: not-allowed;
    `}
`;

export const PlanItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  div {
    color: #fff;
    background: #43b998;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    margin: 0px 8px;
  }
  p {
    margin: 0;
    color: rgba(0, 0, 0, 0.8);
  }
`;

export const SubFooter = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 16px 40px;

  section {
    margin-right: 16px;
    h3 {
      margin: 0;
      font-weight: normal;
      font-size: 30px;
    }
    p {
      margin: 0;
      color: #00a6ce;
      font-size: 14px;
    }
  }

  div {
    display: flex;
    align-items: center;
    color: #00a6ce;

    h3 {
      font-weight: normal;
      font-size: 32px;
      margin: 0 4px;
    }
  }
`;
export const Footer = styled.div`
  box-sizing: border-box;
  background: #00a6ce;
  border-radius: 0 0 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  section {
    padding: 24px;
    color: #fff;
    h3 {
      margin: 0;
      font-size: 30px;
    }

    p {
      margin: 0;
      color: #f5f5f5;
      font-size: 16px;
    }
  }

  div {
    padding-right: 24px;
    button {
      width: 200px;
      border-radius: 100px;
      border: none;
      background: #43b998;
      color: #fff;
      font-weight: bold;
      font-size: 18px;
      padding: 8px 0;
      cursor: pointer;

      &:focus {
        box-shadow: 0 0 0 0;

        outline: 0;
      }
    }
  }
`;
