"use client";

import { interviewer } from "@/constants";
import { interviewGeneratorWorkflow } from "@/constants/workflow";
import { cn } from "@/lib/utils";
import vapi from "@/lib/vapi.sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}


interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}
const Agent = ({userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions, }: AgentProps) => {

  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.error("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleGenerateFeedback = async (messages:
    SavedMessage [])=>{
      console.log('Generate feedback here.');
      const {success,id} = {
        success : true ,
        id:'feedback-id'
      }
      if(success && id){
        router.push(`/interview/${id}/feedback`)
      }else{
        console.log('Error in saving feed back');
        router.push('/')
      }
    }
  useEffect(() => {
    if(callStatus===CallStatus.FINISHED){
      if(type==='generate'){
        router.push('/');
      }
      else{
        handleGenerateFeedback(messages);
      }
    }
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      }
    }
  }, [callStatus, type, router]);

  
const handleCall = async () => {
  try {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      // Use the workflow object directly instead of workflow ID
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID, {
        variableValues: {
          username: userName,
          userid: userId,
        }
      });
    } else {
      let formattedQuestions = '';
      if (questions) {
        formattedQuestions = questions
          .map((question) => `${question}`)
          .join('\n');
      }
      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions
        }
      });
    }
  } catch (error) {
    console.error("Failed to start call:", error);
    setCallStatus(CallStatus.INACTIVE);
  }
};

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const latestMessage = messages[messages.length - 1]?.content;
  const isCallInactiveOrFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="AI Interviewer"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={latestMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {latestMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button onClick={handleCall} className="relative btn-call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== CallStatus.CONNECTING && "hidden"
              )}
            />
            <span>{isCallInactiveOrFinished ? "call" : ". . ."}</span>
          </button>
        ) : (
          <button onClick={handleDisconnect} className="btn-disconnect">
            END
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
