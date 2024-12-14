import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Button } from "../../Components/ui/button";
import { ProgressBar, ProgressRoot } from "../../Components/ui/progress";
import { useAnalysisModule } from "./hooks/AnalysisModule.hook";

export const AnalysisModule: React.FC = () => {
  const { getScoreColor, isResultAvailable, score } = useAnalysisModule();

  return (
    <Box flex={1}>
      {!isResultAvailable && (
        <Flex height={"90vh"} flex={1} justifyContent={"center"} alignItems={"center"}>
          <Button
            fontWeight={"bold"}
            marginLeft={"5%"}
            mr={"5%"}
            maxW={"100%"}
            colorPalette={"purple"}
            flexShrink={1}
            whiteSpace={"wrap"}
          >
            Generate Report
          </Button>
        </Flex>
      )}
      {isResultAvailable && (
        <Box>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            ml={"5%"}
            mr={"5%"}
            mt={"30px"}
            rowGap={"10px"}
            flexWrap={"wrap"}
          >
            <Flex maxW={"100%"} flex={1} alignItems={"center"}>
              <Text color={"#0fa4d3"} fontWeight={"bold"}>
                TechStack:
              </Text>
              <Text fontWeight={"bold"} color={"#9333E9"}>
                MERN Stack
              </Text>
            </Flex>
            <Button colorPalette={"purple"}>Download Report</Button>
          </Flex>
          <Flex flexDir={"column"} mt={"20px"} textAlign={"center"} ml={"5%"} mr={"5%"} alignItems={"center"}>
            <Text fontWeight={"bold"} color={"#9333E9"}>
              Your Overall Score: {score}
            </Text>
            <ProgressRoot
              mt={"20px"}
              width={"99.5%"}
              max={10}
              min={0}
              value={score}
              animated={true}
              colorPalette={getScoreColor(score)}
            >
              <ProgressBar
                border={"solid purple 2px"}
                borderRadius={"10px"}
                height={"20px"}
                width={"100%"}
              ></ProgressBar>
              <Flex justifyContent={"space-between"} width={"100%"} mt={"5px"}>
                <Box height={"20px"} width={"1px"} border={"solid 1px"} borderColor={"purple"}></Box>
                <Box height={"20px"} width={"1px"} border={"solid 1px"} borderColor={"purple"}></Box>
                <Box height={"20px"} width={"1px"} border={"solid 1px"} borderColor={"purple"}></Box>
                <Box height={"20px"} width={"1px"} border={"solid 1px"} borderColor={"purple"}></Box>
                <Box height={"20px"} width={"1px"} border={"solid 1px"} borderColor={"purple"}></Box>
                <Box height={"20px"} width={"1px"} border={"solid 1px"} borderColor={"purple"}></Box>
              </Flex>
            </ProgressRoot>
            <Flex justifyContent={"space-between"} width={"100%"} margin={"auto"} flex={1}>
              <Text fontWeight={"bold"} color={"#FF5733"}>
                0
              </Text>
              <Text fontWeight={"bold"} color={"#FF5733"}>
                Rejected
              </Text>
              <Text fontWeight={"bold"} color={"#FACC15"}>
                Waiting List
              </Text>
              <Text fontWeight={"bold"} color={"green"}>
                Hire
              </Text>
              <Text fontWeight={"bold"} color={"#9333E9"}>
                Strong Hire
              </Text>
              <Text fontWeight={"bold"} color={"#9333E9"}>
                10
              </Text>
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
