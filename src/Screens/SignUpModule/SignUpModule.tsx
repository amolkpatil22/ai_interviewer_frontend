import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Field } from "../../Components/ui/field";
import { useSignUpModule } from "./hooks/SignUpModule.hook";

export const SignUpModule: React.FC = () => {
  const { errors, onSubmit, register, navigate } = useSignUpModule();

  return (
    <Flex flex={1} alignItems={"center"} height={"90vh"} justifyContent={"center"}>
      <Box
        padding={"3%"}
        boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}
        borderRadius={"3%"}
        margin={"4%"}
        alignItems={"center"}
      >
        <Text fontWeight={"semibold"} fontFamily={"sans-serif"} fontSize={"xl"} mb={"5%"}>
          Sign Up
        </Text>

        <form onSubmit={onSubmit}>
          <Stack gap="4" align="flex-start" maxW="sm">
            <Field label="Name" invalid={!!errors.email} errorText={errors.name?.message}>
              <Input borderRadius={"5px"} type="text" {...register("name", { required: "Name is required" })} />
            </Field>
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
              Create An Account
            </Button>
          </Stack>
        </form>
        <Flex width={"103%"} mt={"3%"} gap={"2%"} alignItems={"center"} justifyContent={"space-between"} flex={1}>
          <Text>Already have an account ?</Text>
          <Text color={"purple"} cursor={"pointer"} onClick={() => navigate("/login")} fontWeight={"bold"}>
            Sign In
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
