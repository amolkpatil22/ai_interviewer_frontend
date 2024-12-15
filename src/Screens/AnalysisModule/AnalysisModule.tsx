import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Button } from "../../Components/ui/button";
import { ProgressBar, ProgressRoot } from "../../Components/ui/progress";
import { useAnalysisModule } from "./hooks/AnalysisModule.hook";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
          <Flex flexDir={"column"} mt={"30px"} textAlign={"center"} ml={"5%"} mr={"5%"} alignItems={"center"}>
            <Text fontWeight={"bold"} color={"#9333E9"}>
              Your Overall Score: {score}
            </Text>
            <ProgressRoot
              key={score}
              mt={"20px"}
              width={"99.5%"}
              max={10}
              min={0}
              value={score}
              animated={true}
              colorPalette={getScoreColor(score)}
            >
              <ProgressBar
                border={"solid #9333E9 2px"}
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
              <Text fontWeight={"bold"} fontSize={"100%"} color={"red"}>
                0
              </Text>
              <Text fontWeight={"bold"} color={"#FF5733"}>
                Rejected
              </Text>
              <Text fontWeight={"bold"} fontSize={"100%"} color={"#FACC15"}>
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
            <Flex
              gridTemplateColumns={"repeat(auto-fit, minmax(200px, 1fr))"}
              width={"90%"}
              flexWrap={"wrap-reverse"}
              justifyContent={"space-around"}
              mt={"80px"}
              boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
              padding={"5%"}
              borderRadius={"30px"}
              gap={"5%"}
              rowGap={"20px"}
            >
              <Box maxWidth={"300px"} flex={1}>
                <Text
                  textDecor={"underline"}
                  flexWrap={"wrap"}
                  mb={"20px"}
                  minW={"120px"}
                  fontWeight={"bold"}
                  color={"purple"}
                >
                  Understanding
                </Text>
                <CircularProgressbar
                  maxValue={10}
                  minValue={0}
                  value={score}
                  strokeWidth={15}
                  text={`${score}/10`}
                  styles={buildStyles({
                    pathTransitionDuration: 3,
                    strokeLinecap: "butt",
                    pathColor: `#FE9A7A`,
                    textColor: "#9333E9",
                    textSize: "100%",
                    trailColor: "#F7F7F7",
                  })}
                />
              </Box>

              <Box maxWidth={"300px"} flex={1}>
                <Text textDecor={"underline"} mb={"20px"} fontWeight={"bold"} color={"purple"} minW={"120px"}>
                  Knowledge
                </Text>
                <CircularProgressbar
                  maxValue={10}
                  minValue={0}
                  value={score}
                  strokeWidth={15}
                  text={`${score}/10`}
                  styles={buildStyles({
                    pathTransitionDuration: 3,
                    strokeLinecap: "butt",
                    pathColor: `#60B1F5`,
                    textColor: "#9333E9",
                    textSize: "100%",
                    trailColor: "#F7F7F7",
                  })}
                />
              </Box>
              <Box maxWidth={"300px"} flex={1}>
                <Text textDecor={"underline"} mb={"20px"} fontWeight={"bold"} minW={"120px"} color={"purple"}>
                  Quality
                </Text>
                <CircularProgressbar
                  maxValue={10}
                  minValue={0}
                  value={score}
                  strokeWidth={15}
                  text={`${score}/10`}
                  styles={buildStyles({
                    pathTransitionDuration: 3,
                    strokeLinecap: "butt",
                    pathColor: `#94CF96`,
                    textColor: "#9333E9",
                    textSize: "100%",
                    trailColor: "#F7F7F7",
                  })}
                />
              </Box>
              <Box flex={1} maxWidth={"300px"}>
                <Text textDecor={"underline"} mb={"20px"} fontWeight={"bold"} minW={"120px"} color={"purple"}>
                  Accuracy
                </Text>
                <CircularProgressbar
                  maxValue={10}
                  minValue={0}
                  value={score}
                  strokeWidth={15}
                  text={`${score}/10`}
                  styles={buildStyles({
                    pathTransitionDuration: 3,
                    strokeLinecap: "butt",
                    pathColor: `#C37DCF`,
                    textColor: "#9333E9",
                    textSize: "100%",
                    trailColor: "#F7F7F7",
                  })}
                />
              </Box>
            </Flex>
          </Flex>
          <Box ml={"5%"} mr={"5%"} flex={1} mt={"40px"}>
            <Flex justifyContent={"center"} color={"purple"}>
              <Heading>Detailed analysis of your answers</Heading>
            </Flex>
            {Array.from({ length: 12 }).map((_, ind) => {
              return (
                <Box key={ind} mt={"30px"}>
                  <Flex gap={"10px"}>
                    <Text fontWeight={"bold"}>Q.{ind + 1}</Text>
                    <Text fontWeight={"bold"}>
                      What will be the output of the following code? let a = [1, 2]; let b = a; b.push(3);
                      console.log(a);
                    </Text>
                  </Flex>
                  <Box ml={"32px"} mt={"20px"}>
                    <Text color={"gray"} fontWeight={"bold"}>
                      Candidate Answer:
                    </Text>
                    <Text>
                      React Hooks are functions that allow functional components to manage state and side effects. The
                      primary difference between class components and functional components with hooks is that
                      functional components use hooks like 'useState' and 'useEffect' to handle state and lifecycle
                      events without the need for a class. Hooks improve maintainability by reducing boilerplate code
                      and making the codebase easier to read.
                    </Text>
                  </Box>
                  <Box ml={"32px"} mt={"20px"}>
                    <Text color={"gray"} fontWeight={"bold"}>
                      What Went Well:
                    </Text>
                    <Text>
                      React Hooks are functions that allow functional components to manage state and side effects. The
                      primary difference between class components and functional components with hooks is that
                      functional components use hooks like 'useState' and 'useEffect' to handle state and lifecycle
                      events without the need for a class. Hooks improve maintainability by reducing boilerplate code
                      and making the codebase easier to read.
                    </Text>
                  </Box>
                  <Box ml={"32px"} mt={"20px"}>
                    <Text color={"gray"} fontWeight={"bold"}>
                      What Can Be Improved:
                    </Text>
                    <Text>
                      React Hooks are functions that allow functional components to manage state and side effects. The
                      primary difference between class components and functional components with hooks is that
                      functional components use hooks like 'useState' and 'useEffect' to handle state and lifecycle
                      events without the need for a class. Hooks improve maintainability by reducing boilerplate code
                      and making the codebase easier to read.
                    </Text>
                  </Box>
                  <Box ml={"32px"} mt={"20px"} fontWeight={"bold"}>
                    <Text color={"#9333E9"}>Scores:</Text>
                    <Flex gap={"5px"} alignItems={"center"} justifyContent={"left"}>
                      <Text fontWeight={"normal"} color={"#0fa4d3"}>
                        Understanding of the question:
                      </Text>
                      <Text fontWeight={"normal"} color={"#9333E9"}>
                        8/10
                      </Text>
                    </Flex>
                    <Flex gap={"5px"} alignItems={"center"} justifyContent={"left"}>
                      <Text fontWeight={"normal"} color={"#0fa4d3"}>
                        Accuracy of the answer:
                      </Text>
                      <Text fontWeight={"normal"} color={"#9333E9"}>
                        8/10
                      </Text>
                    </Flex>
                    <Flex gap={"5px"} alignItems={"center"} justifyContent={"left"}>
                      <Text fontWeight={"normal"} color={"#0fa4d3"}>
                        Subject knowledge:
                      </Text>
                      <Text fontWeight={"normal"} color={"#9333E9"}>
                        8/10
                      </Text>
                    </Flex>
                    <Flex gap={"5px"} alignItems={"center"} justifyContent={"left"}>
                      <Text fontWeight={"normal"} color={"#0fa4d3"}>
                        Code/Answer Quality:
                      </Text>
                      <Text fontWeight={"normal"} color={"#9333E9"}>
                        8/10
                      </Text>
                    </Flex>
                    <Flex gap={"5px"} alignItems={"center"} justifyContent={"left"}>
                      <Text fontWeight={"normal"} color={"#0fa4d3"}>
                        Overall:
                      </Text>
                      <Text fontWeight={"normal"} color={"#9333E9"}>
                        8/10
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box ml={"5%"} mr={"5%"} mt={"30px"}></Box>
        </Box>
      )}
    </Box>
  );
};
