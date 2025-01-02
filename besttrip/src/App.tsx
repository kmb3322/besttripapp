// src/App.tsx
import { Box, Button, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const App: React.FC = () => {
  const handleClick = () => {
    alert('버튼이 클릭되었습니다!')
  }

  return (
    <VStack spacing={4} align="center" justify="center" height="100vh" bg="gray.100">
      <Box bg="white" p={6} rounded="md" shadow="md">
        <Text fontSize="2xl" mb={4} textAlign="center">
          Chakra UI와 함께하는 간단한 예제
        </Text>
        <Button colorScheme="teal" onClick={handleClick}>
          클릭하세요
        </Button>
      </Box>
    </VStack>
  )
}

export default App
