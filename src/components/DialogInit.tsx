import { Button, Stack, Field, Input } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog'

interface DialogInitProps {
  open: boolean
  newLabel: string
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void
  handleCloseModal: () => void
  handleSaveTask: () => void
}

export const DialogInit = ({
  open,
  newLabel,
  handleInput,
  handleCloseModal,
  handleSaveTask,
}: DialogInitProps) => {
  return (
    <DialogRoot open={open} onOpenChange={handleCloseModal}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <Field.Root invalid={newLabel.length < 2}>
              <Field.Label>New name</Field.Label>
              <Input
                value={newLabel}
                onChange={handleInput}
                placeholder="Setup a new name for task"
              />
              <Field.ErrorText>
                Please use at least 2 characters to setup new name
              </Field.ErrorText>
            </Field.Root>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button onClick={handleSaveTask} disabled={newLabel.length < 2}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
