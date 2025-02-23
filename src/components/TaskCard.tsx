import { Stack, Card, IconButton, Text } from '@chakra-ui/react'
import { Checkbox } from './Checkbox'
import { FaRegTrashCan, FaPen } from 'react-icons/fa6'

interface TaskCardProps {
  id: string
  label: string
  status: boolean
  taskChangeStatus?: () => void
  removeTask: () => void
  editTask?: () => void
}

export const TaskCard = ({
  id,
  label,
  status,
  taskChangeStatus,
  editTask,
  removeTask,
}: TaskCardProps) => {
  return (
    <Stack>
      <Card.Root
        size="sm"
        flexDirection="row"
        border={
          status
            ? '1px solid var(--chakra-colors-red-600)'
            : '1px solid var(--chakra-colors-border)'
        }
      >
        <Card.Body
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          gap={3}
        >
          <Checkbox
            w="full"
            cursor="pointer"
            variant="outline"
            id={id}
            checked={status}
            onChange={taskChangeStatus}
          >
            <Text
              as={status ? 'del' : 'p'}
              truncate
              display="block"
              maxW={{ base: '130px', md: '300px' }}
            >
              {label}
            </Text>
          </Checkbox>
        </Card.Body>
        <Card.Footer pb={0}>
          {!status && (
            <IconButton size="xs" aria-label="Edit task" onClick={editTask}>
              <FaPen />
            </IconButton>
          )}
          <IconButton
            size="xs"
            colorPalette="orange"
            aria-label="Delete task"
            onClick={removeTask}
          >
            <FaRegTrashCan />
          </IconButton>
        </Card.Footer>
      </Card.Root>
    </Stack>
  )
}
