import { Box, Flex, Heading, Image, Show, Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useInterviewModule } from "./hooks/Interview.hook";
import { Button } from "../../Components/ui/button";
import "./Styles/Interview.style.css";
import MonacoEditor from "@monaco-editor/react";
import Webcam from "react-webcam";
import { formatTime } from "../../Common/Utils/FormatTime";

export const InterviewModule: React.FC = () => {
  const { currentQuestionIndex, isSpeaking, hasPermission, timeLeft, question_id, startInterview, questions } =
    useInterviewModule();

  return (
    <Box backgroundColor={"#F5F5F5"} minH={"100vh"} padding={"1%"}>
      <Show when={hasPermission === null}>
        <Flex textAlign={"center"} flex={1} flexDir={"column"} alignItems={"center"}>
          <Image width={"100%"} flex={1} maxW={"300px"} flexShrink={1} src={require("../../Assets/bot.png")}></Image>
          <Heading>Allow camera and mic access</Heading>
        </Flex>
      </Show>

      <Show when={hasPermission === false}>
        <Flex textAlign={"center"} flex={1} flexDir={"column"} alignItems={"center"}>
          <Image width={"100%"} flex={1} maxW={"300px"} flexShrink={1} src={require("../../Assets/bot.png")}></Image>
          <Heading>Camera and mic permission required.</Heading>
          <Heading>Give permission and reload the page to proceed..</Heading>
        </Flex>
      </Show>

      <Show when={hasPermission === true}>
        <Text fontWeight={"bold"}>{`TimeLeft: ${formatTime(timeLeft)}`}</Text>
        <Flex height={"100%"} flexDir={"column"} justifyContent={"space-between"}>
          <Flex flexShrink={1} flexWrap={"wrap"} gap={"5%"} flex={1} justifyContent={"center"} alignItems={"center"}>
            <Flex flexDir={"column"} alignItems={"center"} flexShrink={1}>
              <Image
                width={"100%"}
                flex={1}
                maxW={"300px"}
                flexShrink={1}
                mb={0}
                src={require("../../Assets/bot.png")}
              ></Image>
              <Text mt={-30} className="blinking-text" opacity={1} fontWeight={"bold"} color={"purple"} fontSize={"lg"}>
                Listening...
              </Text>
            </Flex>
            <Box
              display={{ base: "none", sm: "none", md: "block" }}
              h={"fit-content"}
              padding={"5px"}
              borderRadius={"20px"}
              maxWidth={"350px"}
              boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
            >
              <Webcam style={{ borderRadius: "20px" }} audio={false} height={"100%"} width={"100%"} />
            </Box>
          </Flex>
          {currentQuestionIndex !== null && (
            <Text textAlign={"center"} ml={"10%"} mr={"10%"}>
              Q. {questions[currentQuestionIndex].question}
            </Text>
          )}
          {/* <MonacoEditor saveViewState={true} height="400px" defaultLanguage="" defaultValue="// write your code" /> */}
          <Flex mt={"10%"} flexWrap={"wrap"} gap={"20px"} justifyContent={"center"}>
            {!isSpeaking && !question_id && (
              <Button onClick={startInterview} colorPalette={"black"} minW={"120px"}>
                Start Interview
              </Button>
            )}
            {/*  */}
            <Button colorPalette={"black"} minW={"120px"}>
              Skip
            </Button>
            <Button colorPalette={"red"} minW={"120px"}>
              End Interview
            </Button>
          </Flex>
        </Flex>
        {/* jhi */}
      </Show>
    </Box>
  );
};
