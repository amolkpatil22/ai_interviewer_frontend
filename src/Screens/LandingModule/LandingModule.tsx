import { Box, createListCollection, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../Components/ui/select";
import { Button } from "../../Components/ui/button";

export const LandingModule: React.FC = () => {
  const frameworks = createListCollection({
    items: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });
  return (
    <Box flex={1} mr={"5%"} ml={"5%"}>
      <Flex
        flexWrap={"wrap-reverse"}
        margin={"auto"}
        alignItems={"center"}
        flex={1}
        justifyContent={{ base: "left", sm: "center", md: "center" }}
        mt={"7%"}
        gap={"5%"}
        rowGap={"30px"}
      >
        <Box
          minW={{ base: "100%", sm: "100%", md: "50%", lg: "50%" }}
          maxW={{ base: "100%", sm: "100%", md: "90%", lg: "60%" }}
          borderRadius={"10px"}
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          flex={1}
        >
          <Image
            objectFit={"fill"}
            borderRadius={"10px"}
            height={"100%"}
            width={"100%"}
            flex={1}
            src={require("../../Assets/result.png")}
          ></Image>
        </Box>

        <Flex alignItems={"center"} flexDir={"column"}>
          <Flex flexDir={"column"} flexShrink={1}>
            <Heading color={"purple"} fontSize={"3xl"} fontFamily={"mono"} flexShrink={1} flexWrap={"wrap"}>
              Are You Ready<Text mt={"10px"}>For The Interview ?</Text>
            </Heading>
            <SelectRoot mt={"20px"} collection={frameworks}>
              <SelectLabel color={"#0fa4d3"} fontSize={"md"} fontWeight={"bold"}>
                Select Field
              </SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Select Field" />
              </SelectTrigger>
              <SelectContent>
                {frameworks.items.map((movie) => (
                  <SelectItem item={movie} key={movie.value}>
                    {movie.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <SelectRoot mt={"20px"} collection={frameworks}>
              <SelectLabel color={"#0fa4d3"} fontSize={"md"} fontWeight={"bold"}>
                Select Tech
              </SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Select Tech" />
              </SelectTrigger>
              <SelectContent>
                {frameworks.items.map((movie) => (
                  <SelectItem item={movie} key={movie.value}>
                    {movie.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Button mt={"10%"} maxW={"fit-content"} colorPalette={"purple"}>
              Start Interview
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
