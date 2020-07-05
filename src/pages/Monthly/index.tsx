import React, { useEffect, useState, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GoCheck } from "react-icons/go";

import api from "../../services/api";
import {
  Container,
  Footer,
  SubFooter,
  PlanBox,
  Plans,
  Title,
  Button,
  Switch,
  PlanItem,
  ButtonPeriod,
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

interface IPlanSelected {
  id: number;
  name: string;
  price: number;
}

interface IAttendantCoast {
  cost: number;
}

interface IPeriod {
  name: string;
  value: string;
}

const Monthly: React.FC = () => {
  const [plans, setPlans] = useState<IPlans[]>([]);
  const [attendantCost, setAttendantCost] = useState<IAttendantCoast>();
  const [selected, setSelected] = useState<IPlanSelected>({} as IPlanSelected);
  const [periodSelect, setPeriodSelected] = useState<IPeriod>({} as IPeriod);
  const [numberOfAttendants, setNumberOfAttendants] = useState<number>(0);
  const [total, setTotal] = useState<number>();

  const loadData = useCallback(async () => {
    const attendant = await api.get("attendant");
    setAttendantCost(attendant.data);

    const responsePlans = await api.get("plans");
    const dataPlans: IPlans[] = responsePlans.data;
    setPlans(dataPlans);

    setSelected({
      id: dataPlans[1].id,
      name: dataPlans[1].name,
      price: dataPlans[1].prices.monthly,
    });
    setTotal(dataPlans[1].prices.monthly);
    setPeriodSelected({ name: "Mensal", value: "monthly" });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const calcTotalAddAttendant = useCallback(() => {
    if (attendantCost) {
      const result =
        (numberOfAttendants + 1) * attendantCost.cost + selected.price;

      setTotal(result);
    }
  }, [attendantCost, numberOfAttendants, selected.price]);

  const calcTotalRemoveAttendant = useCallback(() => {
    if (attendantCost) {
      const result =
        (numberOfAttendants - 1) * attendantCost.cost + selected.price;

      setTotal(result);
    }
  }, [attendantCost, numberOfAttendants, selected.price]);

  const periods = [
    { name: "Mensal", value: "monthly" },
    {
      name: "Anual",
      value: "yearly",
    },
  ];

  return (
    <Container>
      <Switch>
        <div>
          {periods.map((type) => (
            <ButtonPeriod
              key={type.value}
              onClick={() =>
                setPeriodSelected({ name: type.name, value: type.value })
              }
              periodSelected={periodSelect.value === type.value ? true : false}
            >
              {type.name}
            </ButtonPeriod>
          ))}
        </div>
      </Switch>
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
                <Button
                  onClick={() =>
                    setSelected({
                      id: plan.id,
                      name: plan.name,
                      price: plan.prices.monthly,
                    })
                  }
                  selected={selected.id === plan.id ? true : false}
                >
                  Selecionar
                </Button>
                {plan.features.map((item) => (
                  <PlanItem key={item}>
                    <div>
                      <GoCheck size={10} />
                    </div>
                    <p>{item}</p>
                  </PlanItem>
                ))}
              </div>
            </PlanBox>
          ))}
      </Plans>

      <SubFooter>
        <section>
          <h3>Atendentes</h3>
          <p>+R${attendantCost?.cost}/mês por atendente</p>
        </section>
        <div>
          <FiChevronLeft
            size={20}
            cursor="pointer"
            onClick={() => {
              if (numberOfAttendants > 0) {
                setNumberOfAttendants(numberOfAttendants - 1);
                calcTotalRemoveAttendant();
              }
            }}
          />
          <h3>{numberOfAttendants}</h3>
          <FiChevronRight
            size={20}
            cursor="pointer"
            onClick={() => {
              setNumberOfAttendants(numberOfAttendants + 1);
              calcTotalAddAttendant();
            }}
          />
        </div>
      </SubFooter>
      <Footer>
        <section>
          <h3>Total: R${total}/mês</h3>
          <p>Plano Selecionado: {selected.name} - Mensal</p>
        </section>
        <div>
          <button onClick={() => alert("Teste")}>Contratar</button>
        </div>
      </Footer>
    </Container>
  );
};

export default Monthly;
