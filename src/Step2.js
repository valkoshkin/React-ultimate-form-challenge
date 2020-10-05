import React from "react";
import { MainContainer } from "./components/MainContainer";
import { Typography } from "@material-ui/core";
import { Input } from "./components/Input";
import { Form } from "./components/Form";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "./components/PrimaryButton";

export const Step2 = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    history.push("/step3");
  };
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        🛸 Step 2
      </Typography>
      <Form>
        <Input id="email" type="email" label="Email" name="email" required />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
