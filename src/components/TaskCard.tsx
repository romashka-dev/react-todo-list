import { Stack, Card, Text, Badge } from '@chakra-ui/react'
import { Checkbox } from './Checkbox'
import { TaskMenu } from './TaskMenu'

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
  const today = new Date().toLocaleDateString('en-us', { weekday: 'long' })
  const day = new Date().toLocaleDateString('en-us', { day: 'numeric' })
  const month = new Date().toLocaleDateString('en-us', { month: 'short' })

  console.log(id)

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
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
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
              display="block"
              maxW={{ base: '160px', md: '300px' }}
            >
              {label}
            </Text>
          </Checkbox>
          <Badge variant="solid" size="xs" colorPalette="blue">
            {today},&nbsp;{month}&nbsp;{day}
          </Badge>
        </Card.Body>
        <Card.Footer pb={0}>
          <TaskMenu status={status} onEdit={editTask} onRemove={removeTask} />
        </Card.Footer>
      </Card.Root>
    </Stack>
  )
}
