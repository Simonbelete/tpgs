import React, { useEffect } from "react";
import * as yup from "yup";
import { Hatchery, HatcheryEgg } from "@/models";
import { FormLayout } from "@/lib/crud";
import { hatcheryEggApi } from "../services";
import { hatcheryApi } from "@/features/hatchery/services";
import dayjs from "dayjs";
import { eggApi } from "@/features/eggs/services";
import _ from "lodash";

const schema = yup.object({
  hatchery: yup.object().required(),
  egg: yup.object().required(),
  no_eggs: yup.number().min(1).required(),
  canndle_date: yup.string().nullable(),
  candled_eggs: yup.number().min(0).nullable(),
  infertile_egg: yup.number().min(0).nullable(),
  no_of_hatched: yup.number().min(0).nullable(),
  no_dead: yup.number().min(0).nullable(),
  no_culled: yup.number().min(0).nullable(),
});

export const HatcheryEggForm = ({
  data,
  shallowRoute = true,
}: {
  data?: HatcheryEgg;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<HatcheryEgg>
        title={"Candling"}
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={hatcheryEggApi.endpoints.createHatcheryEgg}
        updateEndpoint={hatcheryEggApi.endpoints.updateHatcheryEgg}
        deleteEndpoint={hatcheryEggApi.endpoints.deleteHatcheryEgg}
        summaryEndpoint={hatcheryEggApi.endpoints.getHatcheryEggSummary}
        beforeSubmit={(values: Partial<HatcheryEgg>) => {
          const cleaned_data: Partial<HatcheryEgg> = {
            id: values.id,
            canndle_date: dayjs(values.canndle_date).format(
              process.env.NEXT_PUBLIC_API_DATE_FORMAT
            ),
            hatchery: (values.hatchery as Hatchery).id || 0,
            egg: _.get(values.egg, "id", 0),
            no_eggs: values.no_eggs,
            candled_eggs: values.candled_eggs,
            infertile_egg: values.infertile_egg,
            no_of_hatched: values.no_of_hatched,
            no_dead: values.no_dead,
            no_culled: values.no_culled,
          };

          return cleaned_data;
        }}
        fields={{
          hatchery: {
            label: "Hatchery",
            placeholder: "Hatchery",
            endpoint: hatcheryApi.endpoints.getHatchery,
          },
          egg: {
            label: "Egg",
            placeholder: "Egg",
            endpoint: eggApi.endpoints.getEggs,
            dataKey: "display_available_eggs",
          },
          no_eggs: {
            label: "No Eggs",
            placeholder: "No Eggs",
          },
          canndle_date: {
            label: "Candling Date",
            placeholder: "Candling Date",
            type: "date",
          },
          candled_eggs: {
            label: "Candling Eggs",
            placeholder: "Candling Eggs",
          },
          infertile_egg: {
            label: "Infertile Eggs",
            placeholder: "Infertile Eggs",
          },
          no_of_hatched: {
            label: "No of hatched",
            placeholder: "No of hatched",
          },
          no_dead: {
            label: "No Dead",
            placeholder: "Candling Eggs",
          },
          no_culled: {
            label: "No of culled",
            placeholder: "No of culled",
          },
        }}
      />
    </>
  );
};
