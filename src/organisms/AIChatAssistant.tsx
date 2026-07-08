"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function AIChatAssistant() {
  
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Paper 
      elevation={12} 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        height: "600px", 
        width: "100%", 
        borderRadius: 4,
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        overflow: "hidden"
      }}
    >
     
      <Box sx={{ p: 2, borderBottom: "1px solid rgba(255, 255, 255, 0.1)", bgcolor: "rgba(0,0,0,0.2)" }}>
        <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
          Support Sync AI
        </Typography>
      </Box>

   
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
        {messages.map((message) => (
          <Box 
            key={message.id} 
            sx={{ 
              alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%' 
            }}
          >
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", mb: 0.5, display: "block" }}>
              {message.role === 'user' ? 'User' : 'AI'}
            </Typography>
            
            <Box 
              sx={{ 
                p: 2, 
                borderRadius: 3,
                bgcolor: message.role === 'user' ? '#3b82f6' : 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                border: message.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)'
              }}
            >
            
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return <Typography key={`${message.id}-${i}`} variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{part.text}</Typography>;
                  
                  case 'tool-weather':
                  case 'tool-convertFahrenheitToCelsius':
                    return (
                      <Box key={`${message.id}-${i}`} sx={{ mt: 1, p: 1.5, bgcolor: "rgba(0,0,0,0.3)", borderRadius: 2 }}>
                        <Typography variant="caption" sx={{ color: "#a78bfa", fontWeight: 600, display: "block", mb: 0.5 }}>
                          Tool Call: {part.type.replace('tool-', '')}
                        </Typography>
                        <pre style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8", overflowX: "auto", whiteSpace: "pre-wrap" }}>
                          {JSON.stringify(part, null, 2)}
                        </pre>
                      </Box>
                    );
                  default:
                    return null;
                }
              })}
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      
      <Box 
        component="form" 
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
        sx={{ p: 2, bgcolor: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", gap: 1 }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Ask about the weather in Celsius..."
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
              "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.4)" },
              "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
            }
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          disabled={!input.trim()}
          sx={{ bgcolor: "#3b82f6", fontWeight: 600, textTransform: "none", px: 2, minWidth: 50 }}
        >
          <SendIcon fontSize="small" />
        </Button>
      </Box>
    </Paper>
  );
}