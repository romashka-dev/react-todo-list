import { Stack, Card, Text, Badge } from '@chakra-ui/react'
import { Checkbox } from './Checkbox'
import { TaskMenu } from './TaskMenu'

interface TaskCardProps {
  id: string
  label: string
  status: boolean
  dateCreated: string
  taskChangeStatus?: () => void
  removeTask: () => void
  editTask?: () => void
}

export const TaskCard = ({
  id,
  label,
  status,
  dateCreated,
  taskChangeStatus,
  editTask,
  removeTask,
}: TaskCardProps) => {
  const date = new Date(dateCreated)
  const formattedDate = date.toLocaleDateString('en-us', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  })

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
            <Text as={status ? 'del' : 'p'}>{label}</Text>
          </Checkbox>
          <Badge variant="solid" size="xs" colorPalette="blue">
            {formattedDate}
          </Badge>
        </Card.Body>
        <Card.Footer pb={0}>
          <TaskMenu status={status} onEdit={editTask} onRemove={removeTask} />
        </Card.Footer>
      </Card.Root>
    </Stack>
  )
}
