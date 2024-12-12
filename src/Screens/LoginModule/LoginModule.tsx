import { Box, Button, Flex, Input, Stack, StatLabel, TagLabel, Text } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Field } from "../../Components/ui/field";

interface FormValues {
  email: string;
  password: string;
}
export const LoginModule: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Flex flex={1} alignItems={"center"} height={"90vh"} justifyContent={"center"}>
      <Box
        padding={"3%"}
        boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}
        borderRadius={"20px"}
      >
        <Text fontWeight={"semibold"} fontFamily={"sans-serif"} fontSize={"xl"} mb={"15px"}>
          Sign In
        </Text>
        <Text color={"grey"} mb={"15px"}>
          Enter your email and password to Sign In.
        </Text>

        <form onSubmit={onSubmit}>
          <Stack gap="4" align="flex-start" maxW="sm">
            <Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
              <Input borderRadius={"5px"} type="email" {...register("email", { required: "Email is required" })} />
            </Field>
            <Field label="Password" invalid={!!errors.password} errorText={errors.password?.message}>
              <Input
                borderRadius={"5px"}
                type="password"
                {...register("password", { required: "Password is required" })}
              />
            </Field>
            <Button borderRadius={"5px"} colorPalette={"purple"} type="submit" width={"100%"}>
              Sign In
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};
