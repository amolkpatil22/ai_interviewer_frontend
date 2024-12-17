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
import { useLandingModule } from "./Hooks/LandingModule.hook";

export const LandingModule: React.FC = () => {
  const {
    isStartInterviewLoading,
    startInterview,
    handleDifficulty,
    difficultyList,
    getSubCategory,
    handleSelectedSubCategory,
    subCategoriesList,
    handleSelectedCategory,
    getCategories,
    categories,
  } = useLandingModule();

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

            <SelectRoot mt={"20px"} collection={categories} onValueChange={handleSelectedCategory}>
              <SelectLabel color={"#0fa4d3"} fontSize={"md"} fontWeight={"bold"}>
                Category
              </SelectLabel>
              <SelectTrigger onClick={getCategories}>
                <SelectValueText placeholder="Select Field" />
              </SelectTrigger>
              <SelectContent>
                {categories.items.map((item) => (
                  <SelectItem item={item} key={item._id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

            <SelectRoot mt={"20px"} collection={subCategoriesList} onValueChange={handleSelectedSubCategory}>
              <SelectLabel color={"#0fa4d3"} fontSize={"md"} fontWeight={"bold"}>
                Sub-Category
              </SelectLabel>
              <SelectTrigger onClick={getSubCategory}>
                <SelectValueText placeholder="Select Sub-Category" />
              </SelectTrigger>
              <SelectContent>
                {subCategoriesList.items.map((item) => (
                  <SelectItem item={item} key={item._id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

            <SelectRoot mt={"20px"} collection={difficultyList} onValueChange={handleDifficulty}>
              <SelectLabel color={"#0fa4d3"} fontSize={"md"} fontWeight={"bold"}>
                Difficulty
              </SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficultyList.items.map((item) => (
                  <SelectItem item={item} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Button
              onClick={startInterview}
              loadingText={"Start Interview"}
              mt={"10%"}
              loading={isStartInterviewLoading}
              maxW={"fit-content"}
              colorPalette={"purple"}
            >
              Start Interview
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
