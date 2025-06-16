// 1. Create a separate file for your workflow: /constants/workflow.ts
export const interviewGeneratorWorkflow = {
  "name": "ai mock demo  (Copy)",
  "nodes": [
    {
      "name": "introduction",
      "type": "conversation",
      "isStart": true,
      "metadata": {
        "position": {
          "x": -130.92663712648402,
          "y": -249.40261308722847
        }
      },
      "prompt": "say Hello {{username}} ! let's prepare your interview .i'll ask you a few questions and generate a perfect interview just for you ...Are you ready??",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 1000,
        "temperature": 0.7
      },
      "messagePlan": {
        "firstMessage": "Hello {{username}} ! let's prepare your interview .i'll ask you a few questions and generate a perfect interview just for you ...Are you ready??"
      }
    },
    {
      "name": "conversation_1750009995214",
      "type": "conversation",
      "metadata": {
        "position": {
          "x": -489.8898455195746,
          "y": -305.7178842493324
        }
      },
      "prompt": "now collect iformation from user like which role are you applying for {{role}} eg, software development or dataanylyst or product manager ,\nnext type {{tech}}of interview like technical or non-technical, level{{level}} senior or jounir or entry level , techstack{{techstack}} like react,etc.. on what tech stack bases should i interview , amount {{amount}} of questions for interview\nmake sure you get every information",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 1000,
        "temperature": 0.7
      },
      "variableExtractionPlan": {
        "output": [
          {
            "enum": [],
            "type": "string",
            "title": "role",
            "description": ""
          },
          {
            "enum": [],
            "type": "string",
            "title": "type",
            "description": ""
          },
          {
            "enum": [],
            "type": "string",
            "title": "level",
            "description": ""
          },
          {
            "enum": [],
            "type": "string",
            "title": "techstack",
            "description": ""
          },
          {
            "enum": [],
            "type": "string",
            "title": "amount",
            "description": ""
          }
        ]
      },
      "messagePlan": {
        "firstMessage": ""
      }
    },
    {
      "name": "apiRequest_1750010284080",
      "type": "tool",
      "metadata": {
        "position": {
          "x": -451.6004366243116,
          "y": 147.69460050675218
        }
      },
      "tool": {
        "url": "https://interview-mock-one.vercel.app/api/vapi/generate",
        "body": {
          "type": "object",
          "required": [
            "role",
            "level",
            "amount",
            "techstack",
            "userid"
          ],
          "properties": {
            "role": {
              "type": "string",
              "value": "{{role}}",
              "description": ""
            },
            "type": {
              "type": "string",
              "value": "{{type}}",
              "description": ""
            },
            "level": {
              "type": "string",
              "value": "{{level}}",
              "description": ""
            },
            "amount": {
              "type": "string",
              "value": "{{amount}}",
              "description": ""
            },
            "userid": {
              "type": "string",
              "value": "{{userid}}",
              "description": ""
            },
            "techstack": {
              "type": "string",
              "value": "{{techstack}}",
              "description": ""
            }
          }
        },
        "type": "apiRequest",
        "method": "POST",
        "function": {
          "name": "untitled_tool",
          "parameters": {
            "type": "object",
            "required": [],
            "properties": {}
          }
        }
      }
    },
    {
      "name": "conversation_1750010429449",
      "type": "conversation",
      "metadata": {
        "position": {
          "x": -451.6004366243116,
          "y": 397.6946005067522
        }
      },
      "prompt": "now say that interview has been generated",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 1000,
        "temperature": 0.7
      },
      "messagePlan": {
        "firstMessage": ""
      }
    },
    {
      "name": "hangup_1750010490897",
      "type": "tool",
      "metadata": {
        "position": {
          "x": -359.6004366243116,
          "y": 647.6946005067522
        }
      },
      "tool": {
        "type": "endCall"
      }
    }
  ],
  "edges": [
    {
      "from": "introduction",
      "to": "conversation_1750009995214",
      "condition": {
        "type": "ai",
        "prompt": "if the user said yes"
      }
    },
    {
      "from": "conversation_1750009995214",
      "to": "apiRequest_1750010284080",
      "condition": {
        "type": "ai",
        "prompt": "if the user said yes"
      }
    },
    {
      "from": "apiRequest_1750010284080",
      "to": "conversation_1750010429449",
      "condition": {
        "type": "ai",
        "prompt": "user said yes"
      }
    },
    {
      "from": "conversation_1750010429449",
      "to": "hangup_1750010490897",
      "condition": {
        "type": "ai",
        "prompt": "if the user said yes"
      }
    }
  ],
  "globalPrompt": ""
};
