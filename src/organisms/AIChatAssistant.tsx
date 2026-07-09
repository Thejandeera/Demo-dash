"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";


import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";
import ForumIcon from "@mui/icons-material/Forum";

export default function AIChatAssistant() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, setMessages, status } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const isLoading = status === 'submitted' || status === 'streaming';

 
  const suggestions = [
    { text: "Say hello! 👋", prompt: "Hello! Introduce yourself as my casual assistant." },
    { text: "Tell me a fun fact 💡", prompt: "Tell me an interesting fun fact that most people don't know!" },
    { text: "Write a short poem 📝", prompt: "Write a short, creative 4-line poem about artificial intelligence." },
    { text: "Suggest a brain teaser 🧠", prompt: "Give me a quick riddle or brain teaser to solve!" }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSuggestionClick = (promptText: string) => {
    sendMessage({ text: promptText });
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        height: "600px", 
        width: "100%", 
        borderRadius: 4,
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 8px -1px rgba(0, 0, 0, 0.03)",
        overflow: "hidden"
      }}
    >
   
      <Box 
        sx={{ 
          p: 2, 
          borderBottom: "1px solid #e2e8f0", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          background: "linear-gradient(to right, #ffffff, #f8fafc)",
          px: 3
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar 
            sx={{ 
              width: 38, 
              height: 38, 
              background: "linear-gradient(135deg, #4f46e5, #6366f1)",
              boxShadow: "0 2px 8px rgba(79, 70, 229, 0.25)"
            }}
          >
            <SmartToyIcon sx={{ fontSize: "1.2rem", color: "white" }} />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ color: "#0f172a", fontWeight: 700, lineHeight: 1.2 }}>
              Sync AI Chatbot
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.2 }}>
              <Box sx={{ width: 6, height: 6, bgcolor: "#10b981", borderRadius: "50%" }} />
              <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 500 }}>
                gemma3:4b (Ollama)
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {messages.length > 0 && (
          <Tooltip title="Clear Conversation">
            <IconButton 
              onClick={handleClearChat} 
              size="small" 
              sx={{ 
                color: "#94a3b8",
                "&:hover": { color: "#ef4444", bgcolor: "#fef2f2" }
              }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

    
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3, display: "flex", flexDirection: "column", gap: 3, bgcolor: "#fafafa" }}>
        {messages.length === 0 ? (
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center", 
              height: "100%", 
              textAlign: "center",
              p: 2,
              gap: 2
            }}
          >
            <Avatar 
              sx={{ 
                width: 56, 
                height: 56, 
                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                mb: 1,
                boxShadow: "0 8px 24px rgba(79, 70, 229, 0.15)"
              }}
            >
              <ForumIcon sx={{ fontSize: "1.8rem", color: "white" }} />
            </Avatar>
            <Box sx={{ mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f172a", mb: 0.5 }}>
                Sync AI Chatbot
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b", maxWidth: 300, mx: "auto" }}>
                Powered by Gemma 3. Ask me anything, or select a prompt below to get started!
              </Typography>
            </Box>
            
            <Grid container spacing={1.5} sx={{ maxWidth: 450, mt: 1 }}>
              {suggestions.map((item, index) => (
                <Grid size={{ xs: 6 }} key={index}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleSuggestionClick(item.prompt)}
                    sx={{
                      py: 1.5,
                      px: 2,
                      height: "100%",
                      borderRadius: 3,
                      textTransform: "none",
                      borderColor: "#e2e8f0",
                      color: "#475569",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      transition: "all 0.2s ease-in-out",
                      bgcolor: "#ffffff",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                      "&:hover": {
                        borderColor: "#6366f1",
                        bgcolor: "#f5f3ff",
                        color: "#4f46e5",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(79, 70, 229, 0.08)"
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          messages.map((message) => {
            const isUser = message.role === 'user';
            return (
              <Box 
                key={message.id} 
                sx={{ 
                  display: "flex",
                  gap: 1.5,
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  flexDirection: isUser ? 'row-reverse' : 'row',
                  maxWidth: '85%' 
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    background: isUser 
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : "linear-gradient(135deg, #4f46e5, #6366f1)",
                    boxShadow: isUser 
                      ? "0 2px 8px rgba(16, 185, 129, 0.2)"
                      : "0 2px 8px rgba(79, 70, 229, 0.2)"
                  }}
                >
                  {isUser ? (
                    <PersonIcon sx={{ fontSize: "1rem", color: "white" }} />
                  ) : (
                    <SmartToyIcon sx={{ fontSize: "1rem", color: "white" }} />
                  )}
                </Avatar>

                <Box 
                  sx={{ 
                    display: "flex", 
                    flexDirection: "column",
                    alignItems: isUser ? "flex-end" : "flex-start"
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#94a3b8", mb: 0.5, fontWeight: 500 }}>
                    {isUser ? 'You' : 'AI Assistant'}
                  </Typography>
                  
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderRadius: isUser ? "18px 18px 2px 18px" : "18px 18px 18px 2px",
                      bgcolor: isUser ? "#4f46e5" : "#ffffff",
                      color: isUser ? "white" : "#1e293b",
                      border: isUser ? "none" : "1px solid #e2e8f0",
                      boxShadow: isUser 
                        ? "0 4px 12px rgba(79, 70, 229, 0.12)"
                        : "0 2px 4px rgba(0, 0, 0, 0.02)",
                      position: "relative"
                    }}
                  >
                    {message.parts.map((part, i) => {
                      if (part.type === 'text') {
                        return (
                          <Typography key={`${message.id}-${i}`} variant="body2" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
                            {part.text}
                          </Typography>
                        );
                      }
                      return null;
                    })}
                  </Box>
                </Box>
              </Box>
            );
          })
        )}

       
        {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
          <Box 
            sx={{ 
              display: "flex", 
              gap: 1.5, 
              alignSelf: "flex-start", 
              maxWidth: "85%" 
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                boxShadow: "0 2px 8px rgba(79, 70, 229, 0.2)"
              }}
            >
              <SmartToyIcon sx={{ fontSize: "1.0rem", color: "white" }} />
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption" sx={{ color: "#94a3b8", mb: 0.5, fontWeight: 500 }}>
                AI Assistant
              </Typography>
              <Box 
                sx={{ 
                  p: 1.8, 
                  borderRadius: "18px 18px 18px 2px",
                  bgcolor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)"
                }}
              >
                <Box 
                  sx={{ 
                    width: 6, 
                    height: 6, 
                    bgcolor: "#6366f1", 
                    borderRadius: "50%", 
                    animation: "typing-bounce 1.4s infinite ease-in-out",
                    "@keyframes typing-bounce": {
                      "0%, 80%, 100%": { transform: "translateY(0)", opacity: 0.4 },
                      "40%": { transform: "translateY(-5px)", opacity: 1 }
                    }
                  }} 
                />
                <Box 
                  sx={{ 
                    width: 6, 
                    height: 6, 
                    bgcolor: "#6366f1", 
                    borderRadius: "50%", 
                    animation: "typing-bounce 1.4s infinite ease-in-out 0.2s",
                    "@keyframes typing-bounce": {
                      "0%, 80%, 100%": { transform: "translateY(0)", opacity: 0.4 },
                      "40%": { transform: "translateY(-5px)", opacity: 1 }
                    }
                  }} 
                />
                <Box 
                  sx={{ 
                    width: 6, 
                    height: 6, 
                    bgcolor: "#6366f1", 
                    borderRadius: "50%", 
                    animation: "typing-bounce 1.4s infinite ease-in-out 0.4s",
                    "@keyframes typing-bounce": {
                      "0%, 80%, 100%": { transform: "translateY(0)", opacity: 0.4 },
                      "40%": { transform: "translateY(-5px)", opacity: 1 }
                    }
                  }} 
                />
              </Box>
            </Box>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>


      <Box 
        component="form" 
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput('');
        }}
        sx={{ 
          p: 2.5, 
          bgcolor: "#ffffff", 
          borderTop: "1px solid #e2e8f0", 
          display: "flex", 
          gap: 1.5,
          alignItems: "center"
        }}
      >
        <TextField
          fullWidth
          size="medium"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "#f8fafc",
              "& fieldset": { borderColor: "#e2e8f0" },
              "&:hover fieldset": { borderColor: "#cbd5e1" },
              "&.Mui-focused fieldset": { borderColor: "#6366f1" },
            }
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          disabled={!input.trim() || isLoading}
          sx={{ 
            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)",
            borderRadius: 3,
            height: 48,
            minWidth: 48,
            width: 48,
            p: 0,
            transition: "all 0.2s",
            "&:hover": {
              background: "linear-gradient(135deg, #4338ca, #4f46e5)",
              transform: "translateY(-1px)",
              boxShadow: "0 6px 16px rgba(79, 70, 229, 0.3)"
            },
            "&:disabled": {
              background: "#e2e8f0",
              color: "#94a3b8",
              boxShadow: "none"
            }
          }}
        >
          <SendIcon sx={{ fontSize: "1.1rem" }} />
        </Button>
      </Box>
    </Paper>
  );
}