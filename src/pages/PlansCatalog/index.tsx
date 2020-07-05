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
  priceSelected: number;
  period: string;
  prices: {
    yearly: number;
    monthly: number;
  };
}

interface IAttendantCoast {
  cost: number;
}

interface IPeriod {
  name: string;
  value: string;
}

const PlansCatalog: React.FC = () => {
  const [plans, setPlans] = useState<IPlans[]>([]);
  const [attendantCost, setAttendantCost] = useState<IAttendantCoast>();
  const [planSelected, setPlanSelected] = useState<IPlanSelected>(
    {} as IPlanSelected
  );
  const [periodSelect, setPeriodSelected] = useState<IPeriod>({} as IPeriod);
  const [numberOfAttendants, setNumberOfAttendants] = useState<number>(0);
  const [total, setTotal] = useState<number>();

  const loadData = useCallback(async () => {
    const attendant = await api.get("attendant");
    setAttendantCost(attendant.data);

    const responsePlans = await api.get("plans");
    const dataPlans: IPlans[] = responsePlans.data;
    setPlans(dataPlans);

    setPlanSelected({
      id: dataPlans[1].id,
      name: dataPlans[1].name,
      priceSelected: dataPlans[1].prices.monthly,
      period: "monthly",
      prices: {
        monthly: dataPlans[1].prices.monthly,
        yearly: dataPlans[1].prices.yearly,
      },
    });
    setTotal(dataPlans[1].prices.monthly);
    setPeriodSelected({ name: "Mensal", value: "monthly" });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const calcTotal = useCallback(
    (newValue: number) => {
      if (attendantCost) {
        const result = numberOfAttendants * attendantCost.cost + newValue;

        setTotal(result);
      }
    },
    [attendantCost, numberOfAttendants]
  );

  const calcTotalAddAttendant = useCallback(
    (newValue: number) => {
      if (attendantCost) {
        const result =
          newValue * attendantCost.cost + planSelected.priceSelected;

        setTotal(result);
      }
    },
    [attendantCost, planSelected.priceSelected]
  );

  const calcTotalRemoveAttendant = useCallback(
    (newValue: number) => {
      if (attendantCost) {
        const result =
          newValue * attendantCost.cost + planSelected.priceSelected;

        setTotal(result);
      }
    },
    [attendantCost, planSelected.priceSelected]
  );

  const periods = [
    { name: "Mensal", value: "monthly" },
    {
      name: "Anual",
      value: "yearly",
    },
  ];

  console.log(planSelected);

  return (
    <Container>
      <Switch>
        <div>
          {periods.map((type) => (
            <ButtonPeriod
              key={type.value}
              onClick={() => {
                setPeriodSelected({ name: type.name, value: type.value });
                if (type.value === "monthly") {
                  setPlanSelected({
                    ...planSelected,
                    priceSelected: planSelected.prices.monthly,
                    period: type.value,
                  });
                  calcTotal(planSelected.prices.monthly);
                } else {
                  setPlanSelected({
                    ...planSelected,
                    priceSelected: planSelected.prices.yearly,
                    period: type.value,
                  });
                  calcTotal(planSelected.prices.yearly);
                }
              }}
              periodSelected={periodSelect.value === type.value ? true : false}
            >
              {type.name}
            </ButtonPeriod>
          ))}
        </div>
      </Switch>
      <Plans>
        {plans &&
          plans.map((plan) => {
            return (
              <PlanBox key={plan.id}>
                <div>
                  <Title>
                    <img src={dialog} alt="Balão" />

                    <h1>{plan.name}</h1>
                  </Title>
                  <h6>{plan.description}</h6>
                  <h3>
                    R$
                    {periodSelect.value === "monthly"
                      ? plan.prices.monthly
                      : plan.prices.yearly}
                    /mês
                  </h3>
                  <Button
                    onClick={async () => {
                      if (periodSelect.value === "monthly") {
                        setPlanSelected({
                          ...planSelected,
                          id: plan.id,
                          name: plan.name,
                          priceSelected: plan.prices.monthly,
                          prices: plan.prices,
                        });
                        calcTotal(plan.prices.monthly);
                      } else {
                        setPlanSelected({
                          ...planSelected,
                          id: plan.id,
                          name: plan.name,
                          priceSelected: plan.prices.yearly,
                          prices: plan.prices,
                        });
                        calcTotal(plan.prices.yearly);
                      }
                    }}
                    selected={planSelected.id === plan.id ? true : false}
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
            );
          })}
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
                calcTotalRemoveAttendant(numberOfAttendants - 1);
              }
            }}
          />
          <h3>{numberOfAttendants}</h3>
          <FiChevronRight
            size={20}
            cursor="pointer"
            onClick={() => {
              setNumberOfAttendants(numberOfAttendants + 1);
              calcTotalAddAttendant(numberOfAttendants + 1);
            }}
          />
        </div>
      </SubFooter>
      <Footer>
        <section>
          <h3>Total: R${total}/mês</h3>
          <p>
            Plano Selecionado: {planSelected.name} - {periodSelect.name}
          </p>
        </section>
        <div>
          <button
            onClick={() =>
              alert(
                `Você conratou o plano ${planSelected.name} - ${periodSelect.name}`
              )
            }
          >
            Contratar
          </button>
        </div>
      </Footer>
    </Container>
  );
};

export default PlansCatalog;
