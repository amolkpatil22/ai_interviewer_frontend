import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";

export const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex
      flex={1}
      justifyContent={"space-between"}
      paddingLeft={"5%"}
      paddingRight={"5%"}
      alignItems={"center"}
      boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
      borderRadius={"10px"}
      height={"60px"}
      gap={"10%"}
    >
      <Image minW={"10%"} maxW={"100%"} maxHeight={"100%"} src={require("../../Assets/logo.png")} />
      <Flex height={"100%"} alignItems={"center"} flex={1} gap={"5%"} justifyContent={"right"}>
        <Text fontWeight={"bold"} color={"#0fa4d3"} flexShrink={0}>
          How do we Work
        </Text>
        <Text fontWeight={"bold"} color={"#0fa4d3"} flexShrink={0}>
          About Us
        </Text>
        <Text fontWeight={"bold"} color={"#0fa4d3"} flexShrink={0}>
          Our Achievements
        </Text>
        <Link to={"/login"}>
          <Button fontWeight={"bold"} colorPalette={"purple"}>
            Sign In
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

// color={"#11ccf5"}
