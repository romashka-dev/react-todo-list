import { HStack, Flex, Text, Separator, Box } from '@chakra-ui/react'
import { TaskPanel } from './components/TaskPanel'
import { TaskCard } from './components/TaskCard'
import { ChangeEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface TaskProps {
  id: string
  label: string
  status: boolean
}

export const App = () => {
  const [taskInput, setTaskInput] = useState('')
  const [tasks, setTasks] = useState<TaskProps[]>([])

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
    setTaskInput(e.currentTarget.value)
  }

  const handleCreateTask = () => {
    const newTask = { id: uuidv4(), label: taskInput, status: false }
    setTasks((prev) => [...prev, newTask])
    setTaskInput('')
  }

  const handleCompleteTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: true } : task))
    )
  }

  const activeTask = tasks.filter((task) => task.status === false)
  const completeTask = tasks.filter((task) => task.status === true)

  const handleEditTask = (id: string) => {
    console.log(id)
  }

  const handleRemoveTask = (id: string) => {
    const removeTask = tasks.filter((task) => task.id !== id)
    setTasks(removeTask)
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
        <Text as="h1" fontSize={36} fontWeight="bold" mb={4}>
          Todo List
        </Text>
        <TaskPanel
          value={taskInput}
          changeInput={handleChangeInput}
          createTask={handleCreateTask}
        />
        <Flex direction="column" w="full" gap={4}>
          {activeTask.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              label={task.label}
              status={task.status}
              taskChangeStatus={() => {
                handleCompleteTask(task.id)
              }}
              editTask={() => handleEditTask(task.id)}
              removeTask={() => handleRemoveTask(task.id)}
            />
          ))}

          {completeTask.length > 0 ? (
            <Box>
              <Separator my={4} />
              <Text fontWeight="bold" textAlign="left">
                It's done!
              </Text>
            </Box>
          ) : (
            ''
          )}

          {completeTask.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              label={task.label}
              status={task.status}
              removeTask={() => handleRemoveTask(task.id)}
            />
          ))}
        </Flex>
      </Flex>
    </HStack>
  )
}
