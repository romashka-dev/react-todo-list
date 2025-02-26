import { v4 as uuidv4 } from 'uuid'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  Stack,
  VStack,
  HStack,
  Heading,
  Box,
  Text,
  Separator,
  Alert,
} from '@chakra-ui/react'
import { TaskPanel } from '@/components/TaskPanel'
import { TaskCard } from '@/components/TaskCard'
import { DialogInit } from '@/components/DialogInit'
import { InitColorMode } from '@/components/InitColorMode'

interface TaskProps {
  id: string
  label: string
  status: boolean
  dataCreated: string
}

export const App = () => {
  const [taskInput, setTaskInput] = useState('')
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentTask, setCurrentTask] = useState<TaskProps | null>(null)
  const [newLabel, setNewLabel] = useState('')
  const [filterValue, setFilterValue] = useState('all')
  const [searchBarInput, setSearchBarInput] = useState('')

  // Save and load tasks via localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    if (storedTasks.length > 0) {
      setTasks(storedTasks)
    }

    const handleStorageState = (e: StorageEvent) => {
      if (e.key === 'tasks') {
        const updatedTasks = JSON.parse(e.newValue || '[]')
        setTasks(updatedTasks)
      }
    }

    window.addEventListener('storage', handleStorageState)

    return () => {
      window.addEventListener('storage', handleStorageState)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // Filter of tasks: incompleted/completed/via search bar
  const getFilteredTasks = () => {
    return tasks
      .sort(
        (prevDate, currentDate) =>
          new Date(currentDate.dataCreated).getTime() -
          new Date(prevDate.dataCreated).getTime()
      )
      .filter((task) => {
        if (filterValue === 'completed') return task.status === true
        if (filterValue === 'incompleted') return task.status === false
        return true
      })
      .filter((task) => {
        return (
          searchBarInput.toLowerCase() === '' ||
          task.label.toLowerCase().includes(searchBarInput.toLowerCase())
        )
      })
  }
  const filteredTasks = getFilteredTasks()
  const activeTasks = filteredTasks.filter((task) => task.status === false)
  const completedTasks = filteredTasks.filter((task) => task.status === true)

  // Handle event to get main input
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.currentTarget.value)
  }

  // Handle event to get filter menu input
  const handleChangeFilterInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBarInput(e.currentTarget.value)
  }

  // Create new task
  const handleCreateTask = () => {
    const newTask = {
      id: uuidv4(),
      label: taskInput,
      status: false,
      dataCreated: new Date().toISOString(),
    }

    setTasks((prev) => [newTask, ...prev])
    setTaskInput('')
  }

  // Handle of completed task
  const handleCompleteTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: true } : task))
    )
  }

  // Edit current task
  const handleEditTask = (task: TaskProps) => {
    setCurrentTask(task)
    setNewLabel(task.label)
    setIsEditing(true)
  }

  // Save current task
  const handleSaveTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === currentTask?.id ? { ...task, label: newLabel } : task
      )
    )
    setIsEditing(false)
    setCurrentTask(null)
  }

  // Remove current task
  const handleRemoveTask = (id: string) => {
    const removeTask = tasks.filter((task) => task.id !== id)

    setTasks(removeTask)
  }

  // Filter tasks by all, completed or incompleted
  const handleFilterTasks = (sortValue: string) => {
    setFilterValue(sortValue)
  }

  return (
    <Stack w="full" h="100vh">
      <HStack justifyContent="flex-end" p={{ base: 4, md: 8 }}>
        <InitColorMode />
      </HStack>
      <VStack m="0 auto" p={{ base: 4, md: 8 }} w="full" maxWidth={600} gap={4}>
        <Heading
          as="h1"
          w="full"
          fontSize={36}
          fontWeight="bolder"
          textTransform="capitalize"
        >
          todo list
        </Heading>
        <TaskPanel
          value={taskInput}
          filterValue={filterValue}
          searchBarInput={searchBarInput}
          changeInput={handleChangeInput}
          changeInputFilter={handleChangeFilterInput}
          createTask={handleCreateTask}
          filterTasks={handleFilterTasks}
        />
        <VStack alignItems="stretch" gap={4} w="full">
          {activeTasks.length > 0 ? (
            <Box>
              <Separator my={4} />
              <Text
                fontWeight="bold"
                textAlign="left"
                textTransform="capitalize"
              >
                incompleted
              </Text>
            </Box>
          ) : (
            ''
          )}

          {activeTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              label={task.label}
              status={task.status}
              dateCreated={task.dataCreated}
              taskChangeStatus={() => {
                handleCompleteTask(task.id)
              }}
              editTask={() => handleEditTask(task)}
              removeTask={() => handleRemoveTask(task.id)}
            />
          ))}

          {completedTasks.length > 0 ? (
            <Box>
              <Separator my={4} />
              <Text
                fontWeight="bold"
                textAlign="left"
                textTransform="capitalize"
              >
                completed
              </Text>
            </Box>
          ) : (
            ''
          )}

          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              label={task.label}
              status={task.status}
              dateCreated={task.dataCreated}
              removeTask={() => handleRemoveTask(task.id)}
            />
          ))}

          {filteredTasks.length === 0 && (
            <Alert.Root
              status="info"
              title="NO TODOS, YAY!!!"
              alignItems="center"
              width="fit-content"
              m="0 auto"
            >
              <Alert.Indicator />
              <Alert.Title>NO TODOS, YAY!!!</Alert.Title>
            </Alert.Root>
          )}

          {currentTask && (
            <DialogInit
              open={isEditing}
              newLabel={newLabel}
              handleInput={(e) => setNewLabel(e.target.value)}
              handleSaveTask={handleSaveTask}
              handleCloseModal={() => setIsEditing(false)}
            />
          )}
        </VStack>
      </VStack>
    </Stack>
  )
}
