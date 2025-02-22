import { v4 as uuidv4 } from 'uuid'
import { ChangeEvent, useEffect, useState } from 'react'
import { HStack, Flex, Text, Separator, Box } from '@chakra-ui/react'
import { TaskPanel } from '@/components/TaskPanel'
import { TaskCard } from '@/components/TaskCard'
import { DialogInit } from '@/components/DialogInit'

interface TaskProps {
  id: string
  label: string
  status: boolean
}

export const App = () => {
  const [taskInput, setTaskInput] = useState('')
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentTask, setCurrentTask] = useState<TaskProps | null>(null)
  const [newLabel, setNewLabel] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')

    if (storedTasks.length > 0) {
      setTasks(storedTasks)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.currentTarget.value)
  }

  const handleCreateTask = () => {
    const newTask = { id: uuidv4(), label: taskInput, status: false }

    setTasks((prev) => [...prev, newTask])
    setTaskInput('')
  }

  const handleSortTasks = (sortValue: string) => {
    setFilter(sortValue)
  }

  const handleCompleteTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: true } : task))
    )
  }

  const activeTask = tasks.filter((task) => task.status === false)
  const completeTask = tasks.filter((task) => task.status === true)

  const handleEditTask = (task: TaskProps) => {
    setCurrentTask(task)
    setNewLabel(task.label)
    setIsEditing(true)
  }

  const handleSaveTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === currentTask?.id ? { ...task, label: newLabel } : task
      )
    )
    setIsEditing(false)
    setCurrentTask(null)
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
          filter={filter}
          changeInput={handleChangeInput}
          createTask={handleCreateTask}
          sortTasks={handleSortTasks}
        />
        <Flex direction="column" w="full" gap={4}>
          {filter === 'all' && (
            <>
              {activeTask.length > 0 ? (
                <Box>
                  <Separator my={4} />
                  <Text fontWeight="bold" textAlign="left">
                    Incompleted
                  </Text>
                </Box>
              ) : (
                ''
              )}

              {activeTask.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  label={task.label}
                  status={task.status}
                  taskChangeStatus={() => {
                    handleCompleteTask(task.id)
                  }}
                  editTask={() => handleEditTask(task)}
                  removeTask={() => handleRemoveTask(task.id)}
                />
              ))}

              {completeTask.length > 0 ? (
                <Box>
                  <Separator my={4} />
                  <Text fontWeight="bold" textAlign="left">
                    Completed
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
            </>
          )}

          {filter === 'completed' && (
            <>
              {completeTask.length > 0 ? (
                <Box>
                  <Separator my={4} />
                  <Text fontWeight="bold" textAlign="left">
                    Completed
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
            </>
          )}

          {filter === 'incompleted' && (
            <>
              {activeTask.length > 0 ? (
                <Box>
                  <Separator my={4} />
                  <Text fontWeight="bold" textAlign="left">
                    Incompleted
                  </Text>
                </Box>
              ) : (
                ''
              )}

              {activeTask.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  label={task.label}
                  status={task.status}
                  taskChangeStatus={() => {
                    handleCompleteTask(task.id)
                  }}
                  editTask={() => handleEditTask(task)}
                  removeTask={() => handleRemoveTask(task.id)}
                />
              ))}
            </>
          )}
        </Flex>
      </Flex>

      {currentTask && (
        <DialogInit
          open={isEditing}
          newLabel={newLabel}
          handleInput={(e) => setNewLabel(e.target.value)}
          handleSaveTask={handleSaveTask}
          handleCloseModal={() => setIsEditing(false)}
        />
      )}
    </HStack>
  )
}
