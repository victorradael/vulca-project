import React, { useEffect, useState } from "react";

import api from "../../services/api";
import {
  Container,
  Footer,
  SubFooter,
  PlanBox,
  Plans,
  Title,
  Button,
} from "./styles";
import dialog from "../../assets/dialog.svg";

interface IPlans {
  id: number;
  name: "string";
  description: "string";
  prices: {
    monthly: number;
    yearly: number;
  };
  features: [];
}

interface IAttendant {
  cost: number;
}

const Monthly: React.FC = () => {
  const [plans, setPlans] = useState<IPlans[]>();
  const [attendantCoast, setAttendantCoast] = useState<IAttendant>();

  useEffect(() => {
    api.get("plans").then((response) => setPlans(response.data));
    api.get("attendant").then((response) => setAttendantCoast(response.data));
  }, []);

  return (
    <Container>
      <Plans>
        {plans &&
          plans.map((plan) => (
            <PlanBox key={plan.id}>
              <div>
                <Title>
                  <img src={dialog} alt="Balão" />

                  <h1>{plan.name}</h1>
                </Title>
                <h6>{plan.description}</h6>
                <h3>R${plan.prices.monthly}/mês</h3>
                <Button>Selecionar</Button>
                {plan.features.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </PlanBox>
          ))}
      </Plans>

      <SubFooter>
        <div>
          <h3>Atendentes</h3>
          <p>+R${attendantCoast?.cost}/mês por atendente</p>
        </div>
        <div>
          <p> menor </p>
          <h3>1</h3>
          <p> maior </p>
        </div>
      </SubFooter>
      <Footer>
        <div>
          <h3>Total:R$380/mês</h3>
          <p>Plano Selecionado: Plano 2.0 - Mensal</p>
        </div>
        <button>Contratar</button>
      </Footer>
    </Container>
  );
};

export default Monthly;
