// src/App.tsx
import { Box } from '@chakra-ui/react'
import React from 'react'
import Home from "./pages/Home"

const App: React.FC = () => {
  const handleClick = () => {
    alert('버튼이 클릭되었습니다!')
  }


    return (
      <Box w="100%" minH="100vh" bg="gray.50">
        <Home />
      </Box>
    );

}

export default App
