import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const Agent = ({userName} : AgentProps) => {
    const callStatus = CallStatus.INACTIVE; // ✅ uses the enum value

    const isSpeaking = true;

    const messages = [
        'whats your name ',
        'my name is abhinav, nice to meet you'
    ];
    const lastMessage = messages[messages.length-1];

  return (
    <>
    {/* viewing Interview */}
    <div className=" call-view ">
      {/* AI Interviewer Container */}
      <div className=" card-interviewer">
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

      {/* User Container */}
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

    {
        messages.length>0 && (
            <div className="transcript-border">
                <div className="transcript">
                    <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
            </div>
            </div>
        )
    }

    {/* Showing buttons for start call end call etc... */}
    <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE"?(
            <button className="relative btn-call">
                <span className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}/>
              
                <span>
                {(callStatus === "INACTIVE"||callStatus === "FINISHED") ? 'call':'...' }
                </span>
            </button>
        ):(
            <button className="btn-disconnect">
                END
            </button>
        )}

    </div>
    </>
    
  );
};

export default Agent;
