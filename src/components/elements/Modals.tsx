import { Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalFooter, ModalBody, ModalCloseButton, Button, Input, Select, useToast, Textarea} from '@chakra-ui/react'
import axios from 'axios'
import { useState, } from 'react'

const Modals = (props: any) => {
    const [name, setname] = useState("")
    const [image, setImage] = useState("")
    const [imagePreview, setImagePreview] = useState(props.image)
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")

    const toast = useToast()

    const showToast = (name: any, error: any, status: any, position: any) => {
      toast({
        title: name,
        description: error,
        status: status,
        duration: 5000,
        isClosable: true,
        position: position,
      })
    }

    const handleSubmit = () => {
      if(name === "" || image === "" || date === "" || description === ""){
        showToast("Invalid Input", "Ada input yang belum terisi", "error", "top-center")
      }else{
        try{
          props.postToAPI(name, description, image, date)
          setname("")
          setImage("")
          setDescription("")
          setImagePreview("")
          setDate("")
        } catch(error){
          console.log(error)
        }
      }
    }

    const handleImageUpload = (e: any) => {
      try{
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]))
      } catch(error){
        setImagePreview("https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png")
      }
    }

    return(
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Upload Roti </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <div className = "flex flex-col">
                <label className = "font-bold"> Bread name </label>
                <Input className = "my-4" placeholder = "Masukkan nama roti ..." value = {name} onChange={(e) => setname(e.target.value)}/>
              </div>

              <div className = "flex flex-col">
                  <label className = "font-bold"> Bread Description </label>
                  <Textarea value = {description} className = "my-4" placeholder = "Masukkan deskripsi roti" onChange={(e) => setDescription(e.target.value)}/>
                </div>

              <div className = "flex flex-col">
                <label className = "font-bold"> Bread's Expiring Date  </label>
                <input  type="date" value = {date} className = "my-4" placeholder = "Masukkan nama roti" onChange={(e) => setDate(e.target.value)}/>
              </div>

              <div className = "flex flex-col">
                <label className = "font-bold"> Bread Image </label>
                {imagePreview && <img src = {imagePreview} alt = "gambar"/>}
                <input className = "my-4" type = "file" accept="image/jpeg, image/png" onChange = {handleImageUpload}/>
              </div>

          </ModalBody>

          <ModalFooter>
            <Button
              color = 'white' 
              variant='solid' 
              borderRadius='6px' 
              borderColor='#22c55e' 
              bg = "#22c55e"
              mr={3} 
              onClick={handleSubmit}
              _hover={{ boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75)'}} 
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default Modals 