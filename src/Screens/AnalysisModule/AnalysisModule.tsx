import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Button } from "../../Components/ui/button";
import { ProgressBar, ProgressRoot } from "../../Components/ui/progress";
import { useAnalysisModule } from "./hooks/AnalysisModule.hook";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const AnalysisModule: React.FC = () => {
  const { getScoreColor, categoryWiseScore, overallScore, interviewReport, isResultAvailable, getFeedback } =
    useAnalysisModule();

  return (
    <Box flex={1}>
      {!isResultAvailable && (
        <Flex height={"90vh"} flex={1} justifyContent={"center"} alignItems={"center"}>
          <Button
            onClick={getFeedback}
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
                TechStack: {interviewReport?.interview_data.tech}
              </Text>
              <Text fontWeight={"bold"} color={"#9333E9"}>
                MERN Stack
              </Text>
            </Flex>
            <Button colorPalette={"purple"}>Download Report</Button>
          </Flex>
          <Flex flexDir={"column"} mt={"30px"} textAlign={"center"} ml={"5%"} mr={"5%"} alignItems={"center"}>
            <Text fontWeight={"bold"} color={"#9333E9"}>
              Your Overall Score: {overallScore}
            </Text>
            <ProgressRoot
              key={overallScore}
              mt={"20px"}
              width={"99.5%"}
              max={10}
              min={0}
              value={overallScore}
              animated={true}
              colorPalette={getScoreColor(overallScore)}
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
                  value={categoryWiseScore?.understanding_of_question}
                  strokeWidth={15}
                  text={`${categoryWiseScore?.understanding_of_question}/10`}
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
                  value={categoryWiseScore?.subject_knowledge}
                  strokeWidth={15}
                  text={`${categoryWiseScore?.subject_knowledge}/10`}
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
                  value={categoryWiseScore?.quality_of_answer}
                  strokeWidth={15}
                  text={`${categoryWiseScore?.quality_of_answer}/10`}
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
                  value={categoryWiseScore?.accuracy_of_answer}
                  strokeWidth={15}
                  text={`${categoryWiseScore?.accuracy_of_answer}/10`}
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
            {interviewReport?.feedback.map((item, ind) => {
              return (
                <Box key={ind} mt={"30px"}>
                  <Flex gap={"10px"}>
                    <Text fontWeight={"bold"}>Q.{ind + 1}</Text>
                    <Text fontWeight={"bold"}>
                      {item.question.split("\n").map((str) => (
                        <Text>{str}</Text>
                      ))}
                    </Text>
                  </Flex>
                  <Box ml={"32px"} mt={"20px"}>
                    <Text color={"gray"} fontWeight={"bold"}>
                      Candidate Answer:
                    </Text>
                    <Text>
                      {!item.candidate_answer && <Text>Candidate did not Answer</Text>}
                      {item.candidate_answer && item.candidate_answer.split("\n").map((str) => <Text>{str}</Text>)}
                    </Text>
                  </Box>
                  <Box ml={"32px"} mt={"20px"}>
                    <Text color={"gray"} fontWeight={"bold"}>
                      What Went Well:
                    </Text>
                    <Text>{item.what_went_well}</Text>
                  </Box>
                  <Box ml={"32px"} mt={"20px"}>
                    <Text color={"gray"} fontWeight={"bold"}>
                      What Can Be Improved:
                    </Text>
                    <Text>{item.what_went_wrong}</Text>
                  </Box>
                  <Box ml={"32px"} mt={"20px"} fontWeight={"bold"}>
                    <Text color={"#9333E9"}>Scores:</Text>
                    <Flex gap={"5px"} alignItems={"center"} justifyContent={"left"}>
                      <Text fontWeight={"normal"} color={"#0fa4d3"}>
                        Understanding of the question:
                      </Text>
                      <Text fontWeight={"normal"} color={"#9333E9"}>
                        {item.understanding_of_question} / 10
                      </Text>
                    </Flex>
                    <Flex gap={"5px"} alignItems={"center"} justifyContent={"left"}>
                      <Text fontWeight={"normal"} color={"#0fa4d3"}>
                        Accuracy of the answer:
                      </Text>
                      <Text fontWeight={"normal"} color={"#9333E9"}>
                        {item.accuracy_of_answer} / 10
                      </Text>
                    </Flex>
                    <Flex gap={"5px"} alignItems={"center"} justifyContent={"left"}>
                      <Text fontWeight={"normal"} color={"#0fa4d3"}>
                        Subject knowledge:
                      </Text>
                      <Text fontWeight={"normal"} color={"#9333E9"}>
                        {item.subject_knowledge} / 10
                      </Text>
                    </Flex>
                    <Flex gap={"5px"} alignItems={"center"} justifyContent={"left"}>
                      <Text fontWeight={"normal"} color={"#0fa4d3"}>
                        Code/Answer Quality:
                      </Text>
                      <Text fontWeight={"normal"} color={"#9333E9"}>
                        {item.quality_of_answer} / 10
                      </Text>
                    </Flex>
                    <Flex gap={"5px"} alignItems={"center"} justifyContent={"left"}>
                      <Text fontWeight={"normal"} color={"#0fa4d3"}>
                        Overall:
                      </Text>
                      <Text fontWeight={"normal"} color={"#9333E9"}>
                        {(
                          (item.accuracy_of_answer +
                            item.understanding_of_question +
                            item.quality_of_answer +
                            item.subject_knowledge) /
                          4
                        ).toFixed(1)}
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
