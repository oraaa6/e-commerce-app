import { Controller, useForm } from "react-hook-form";
import { Input } from "../input/input";

type ProductFiltersProps = {
  onChange: (name: string) => void;
};
export function ProductFilters({ onChange }: ProductFiltersProps) {
  return <Input onChange={onChange} name="name" label="Name" />;
}
