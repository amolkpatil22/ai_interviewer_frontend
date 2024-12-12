import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Button } from "../ui/button";
import { Link, Route, useLocation, useNavigate, useRoutes } from "react-router-dom";

export const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex
      flex={1}
      justifyContent={"space-between"}
      paddingLeft={"5%"}
      paddingRight={"5%"}
      alignItems={"center"}
      boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
      borderRadius={"10px"}
      height={"70px"}
      gap={"10%"}
    >
      <Image
        onClick={() => navigate("/")}
        minW={"10%"}
        maxW={"100%"}
        maxHeight={"100%"}
        src={require("../../Assets/logo.png")}
        cursor="pointer"
        _hover={{
          opacity: 0.9,
          transform: "scale(1.05)",
        }}
        transition="all 0.3s ease-in-out"
      />

      <Flex height={"100%"} alignItems={"center"} flex={1} gap={"5%"} justifyContent={"right"}>
        <Text
          cursor={"pointer"}
          _hover={{ color: "purple" }}
          transition="all 0.4s ease-in-out"
          display={{ base: "none", sm: "none", md: "block" }}
          fontWeight={"bold"}
          color={"#0fa4d3"}
          flexShrink={0}
        >
          How do we Work
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ color: "purple" }}
          transition="all 0.4s ease-in-out"
          display={{ base: "none", sm: "none", md: "block" }}
          fontWeight={"bold"}
          color={"#0fa4d3"}
          flexShrink={0}
        >
          About Us
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ color: "purple" }}
          transition="all 0.4s ease-in-out"
          display={{ base: "none", sm: "none", md: "block" }}
          fontWeight={"bold"}
          color={"#0fa4d3"}
          flexShrink={0}
        >
          Our Achievements
        </Text>
        <Link to={location.pathname === "/login" ? "/signup" : "/login"}>
          <Button fontWeight={"bold"} colorPalette={"purple"} display={{ base: "none", sm: "none", md: "block" }}>
            {location.pathname === "/login" ? "Sign Up" : "Sign In"}
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

// color={"#11ccf5"}
