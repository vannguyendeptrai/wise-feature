import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import CurrencyInput from "components/CurrencyInput";

export default function Form() {
  return (
    <Card className="w-96">
      <CardBody className="flex flex-col gap-6">
        <Input label="NAME" size="lg" />
        <CurrencyInput />
        <Input
          label="TARGET DATE"
          icon={<i className="fas fa-calendar" />}
          size="lg"
        />
        <div>
          <Select label="Select Version">
            <Option>Quarterly</Option>
            <Option>Monthly</Option>
            <Option>Bi-Weekly</Option>
            <Option>Weekly</Option>
            <Option>Daily</Option>
          </Select>
        </div>
      </CardBody>
    </Card>
  );
}
