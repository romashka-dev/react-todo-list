import { Box, Button } from '@chakra-ui/react'
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components/Menu'
import { LuEllipsisVertical, LuPencil, LuDelete } from 'react-icons/lu'

interface TaskMenuProps {
  status: boolean
  onEdit?: () => void
  onRemove?: () => void
}

export const TaskMenu = ({ status, onEdit, onRemove }: TaskMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="surface" size="xs" p={0}>
          <LuEllipsisVertical />
        </Button>
      </MenuTrigger>
      <MenuContent>
        {!status ? (
          <>
            <MenuItem value="edit" onClick={onEdit}>
              <Box flex="1">Edit</Box>
              <LuPencil />
            </MenuItem>
            <MenuItem value="remove" onClick={onRemove}>
              <Box flex="1">Remove</Box>
              <LuDelete />
            </MenuItem>
          </>
        ) : (
          <MenuItem value="remove" onClick={onRemove}>
            <Box flex="1">Remove</Box>
            <LuDelete />
          </MenuItem>
        )}
      </MenuContent>
    </MenuRoot>
  )
}
