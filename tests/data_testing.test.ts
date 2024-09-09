import * as yup from "yup";
import { describe, test, expect } from "vitest";
import { sum } from "radash";
import {
  ExplorerFilterNames,
  ExplorerFilterSchema,
  FilterOptions,
} from "@/app/_forms/schemas/explorer_filters";
import full_data from "@/app/_model/full_data_v1.json";
import { filter_data } from "@/app/_plots/ExplorerPlot";

describe("Data filtering schemas", () => {
  test("Each row of the full data validates with the schemas", () => {
    full_data.data.map((row_with_total) => {
      const { total, ...row } = row_with_total;
      const valid = ExplorerFilterSchema.validateSync(row);
      expect(valid).toEqual(row);
    });
  });

  test.for(ExplorerFilterNames)("'All' is a valid value for %s", (field) => {
    const schema = yup.reach(ExplorerFilterSchema, field);
    expect(schema.validateSync("All")).toEqual("All");
  });

  test.for(ExplorerFilterNames)(
    "Every filter value returns some data for %s",
    (field) => {
      const options = FilterOptions[field];
      const has_data = options
        .map((value) => {
          const filters = {
            ...ExplorerFilterSchema.getDefault(),
            [field]: value,
          };
          expect(filters[field]).toEqual(value);
          // @ts-expect-error not bothering to jitter the data for this test
          const filtered = filter_data(full_data.data, filters);
          const n_included = sum(filtered.map((x) => +!x.excluded));
          return n_included > 0;
        })
        .every((x) => x);
      expect(has_data).toEqual(true);
    }
  );
});
