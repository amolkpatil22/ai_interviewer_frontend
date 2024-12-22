import { Box, Flex, Heading, Image, Show, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useInterviewModule } from "./hooks/Interview.hook";
import { Button } from "../../Components/ui/button";
import "./Styles/Interview.style.css";
import MonacoEditor from "@monaco-editor/react";
import Webcam from "react-webcam";
import { formatTime } from "../../Common/Utils/FormatTime";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../Components/ui/dialog";
import { QuestionTypes } from "../../Redux/QuestionsSlice/QuestionsSlice";
import { BotModes } from "../../Common/Interfaces/BotModes.interface";

export const InterviewModule: React.FC = () => {
  const {
    browserSupportsSpeechRecognition,
    endInterview,
    currentQuestion,
    currentQuestionIndex,
    botMode,
    hasPermission,
    timeLeft,
    listening,
    question_id,
    startInterview,
    questions,
    candidateAnswer,
    isCodeWriterOpen,
    requestMediaPermission,
    submitAnswer,
    setCandidateAnswer,
    setIsCodeWriterOpen,
  } = useInterviewModule();

  return (
    <Box backgroundColor={"#F5F5F5"} minH={"100vh"} padding={"1%"}>
      <Show when={!browserSupportsSpeechRecognition}>
        <Flex textAlign={"center"} flex={1} flexDir={"column"} alignItems={"center"}>
          <Image width={"100%"} flex={1} maxW={"300px"} flexShrink={1} src={require("../../Assets/bot.png")}></Image>
          <Heading>Browser doesn't support speech recognition. Please try different browser</Heading>
        </Flex>
      </Show>

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
              <Show when={botMode === BotModes.Speaking}>
                <Text
                  mt={-30}
                  className="blinking-text"
                  opacity={1}
                  fontWeight={"bold"}
                  color={"purple"}
                  fontSize={"lg"}
                >
                  Speaking...
                </Text>
              </Show>
              <Show when={botMode === BotModes.Listening}>
                <Text
                  mt={-30}
                  className="blinking-text"
                  opacity={1}
                  fontWeight={"bold"}
                  color={"purple"}
                  fontSize={"lg"}
                >
                  Listening...
                </Text>
              </Show>
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
          {currentQuestion && (
            <Text fontWeight={"bold"} textAlign={"center"} ml={"10%"} mr={"10%"}>
              Q. {currentQuestion.question}
            </Text>
          )}
          {/* <MonacoEditor saveViewState={true} height="400px" defaultLanguage="" defaultValue="// write your code" /> */}
          <Flex mt={"10%"} flexWrap={"wrap"} gap={"20px"} justifyContent={"center"}>
            <Show when={!question_id}>
              <Button onClick={startInterview} colorPalette={"black"} minW={"120px"}>
                Start Interview
              </Button>
            </Show>
            <Show when={question_id}>
              <Button onClick={submitAnswer}>Submit Answer</Button>
            </Show>
            <Show
              when={currentQuestion?.type === QuestionTypes.CODING || currentQuestion?.type === QuestionTypes.OUTPUT}
            >
              <Button colorPalette={"purple"} onClick={() => setIsCodeWriterOpen((prev) => !prev)}>
                Code Writer
              </Button>
            </Show>
            <Show when={question_id && currentQuestionIndex && currentQuestionIndex < questions.length - 1}>
              <Button onClick={submitAnswer} colorPalette={"black"} minW={"120px"}>
                Skip
              </Button>
            </Show>
            <Show when={question_id}>
              <Button onClick={endInterview} colorPalette={"red"} minW={"120px"}>
                End Interview
              </Button>
            </Show>
          </Flex>
        </Flex>
        {/* jhi */}
      </Show>

      <DialogRoot lazyMount open={isCodeWriterOpen} size={"cover"} onOpenChange={(e) => setIsCodeWriterOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Q.
              {currentQuestion?.type === QuestionTypes.CODING
                ? "Achieve below step through coding"
                : "Determine the output of the below code"}
            </DialogTitle>
            <Text>
              {currentQuestion?.question.split("\n").map((q, index) => (
                <Text key={index}>{q}</Text>
              ))}
            </Text>
          </DialogHeader>
          <DialogBody padding={0}>
            <Box flex={1} width={"100%"} height={"100%"}>
              <MonacoEditor
                value={candidateAnswer}
                options={{ wordWrap: "on", wordBasedSuggestions: "allDocuments" }}
                onChange={(val) => setCandidateAnswer(val ? val : "")}
                loading={true}
              ></MonacoEditor>
            </Box>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Minimize</Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};
