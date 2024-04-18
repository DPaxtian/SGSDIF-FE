import { useState } from 'react'
import { Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";


function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Drawer</Button>

      <Drawer 
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >

      </Drawer>
    </>
  )
}

export default App
