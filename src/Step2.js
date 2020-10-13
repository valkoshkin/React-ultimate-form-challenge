import React from "react";
import { MainContainer } from "./components/MainContainer";
import { Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { Input } from "./components/Input";
import { Form } from "./components/Form";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "./components/PrimaryButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is required field"),
});

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) {
    return value;
  }

  return phoneNumber.formatInternational();
};

export const Step2 = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    history.push("/step3");
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="email"
          type="email"
          label="Email"
          name="email"
          required
          error={!!errors.email}
          helperText={errors?.email?.message}
        />

        <FormControlLabel
          control={
            <Checkbox name="hasPhone" inputRef={register} color="primary" />
          }
          label="Do you have a phone?"
        />

        {hasPhone && (
          <Input
            ref={register}
            id="phoneNumber"
            type="tel"
            label="Phone number"
            name="phoneNumber"
            onChange={(event) => {
              event.target.value = normalizePhoneNumber(event.target.value);
            }}
          />
        )}
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
