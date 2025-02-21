import { HStack, Flex, Text } from '@chakra-ui/react'
import { TaskPanel } from './components/TaskPanel'
import { TaskCard } from './components/TaskCard'
import { ChangeEvent, useState } from 'react'

export const App = () => {
  const [taskInput, setTaskInput] = useState('')
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
    setTaskInput(e.currentTarget.value)
  }

  return (
    <HStack
      flexDirection="column"
      alignItems="center"
      w="full"
      h="100vh"
      py="8"
      px={{ base: '4', md: '8' }}
    >
      <Flex w="full" maxWidth={650} direction="column">
        <Text as="h1" fontSize={36} fontWeight="bold" marginBottom={4}>
          Todo List
        </Text>
        <TaskPanel
          value={taskInput}
          changeInput={handleChangeInput}
          createTask={() => {
            console.log('Create task')
          }}
        />
        <Flex direction="column" w="full" gap={4}>
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </Flex>
      </Flex>
    </HStack>
  )
}
