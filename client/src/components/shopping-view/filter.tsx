import { Fragment } from "react";
import { filterOptions } from "../config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

interface ProductFilterProps {
  filters: { [key: string]: string[] }; // Adjust as per the actual filter structure
  handleFilter: (key: string, option: string) => void;
}

function ProductFilter({ filters, handleFilter }: ProductFilterProps) {
  return (
    <div className="bg-background rounded-lg shadow-sm ">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment>
            <div>
              <h3 className="text-base font-bold ">{keyItem}</h3>
              <div className="grid gap-2 mt-2 ">
                {filterOptions[keyItem as keyof typeof filterOptions].map(
                  (option) => (
                    <Label
                      className="flex font-medium items-center gap-2 "
                      key={option.id}
                    >
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[keyItem] &&
                          filters[keyItem].indexOf(option.id) > -1
                        }
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                      />
                      {option.label}
                    </Label>
                  )
                )}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
