import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalFooter, ModalBody, ModalCloseButton, Button, Input, Select, useToast, useDisclosure, Textarea, } from '@chakra-ui/react'
import { useState, } from 'react'

const Post = (props:any) => {
    let hour, day
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setname] = useState(props.name)
    const [image, setImage] = useState("")
    const [imagePreview, setImagePreview] = useState(props.image)
    const [description, setDescription] = useState(props.description)
    const [date, setDate] = useState(props.expired_date)

    var trimmedString = props.name.substr(0, 16)
    var desc = props.description.slice(0, 20) + (props.description.length > 20 ? "..." : "");    
    if(props.name.length > trimmedString.length){ /* Apabila jumlah huruf > 21 maka akan ditambahkan ... */
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + " ..."
    }else{ /* Apabila lebih kecil dari 21 maka name nya akan seperti itu*/
        trimmedString = props.name
    }
    
    const createdTimeStamp = props.expired_date.substring(0, 10) + " WIB "

    
    const handleImageUpload = (e: any) => {
      try{
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]))
      } catch(error){
        setImagePreview("https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png")
      }
    }

    const handleUpdate = () => {
      if(name === "" && description === "" && date === ""){
        props.showToast("Invalid Input", "Ada input yang belum terisi", "error", "top-center")
      }else{  
        if(image === ""){
          props.updateToAPI(name, props.id, null, description, date)
        }else{
          props.updateToAPI(name, props.id, image, description, date)
          setImage("")
        }
      }
    }

    return (
      <>
        <div className="mx-8 my-12 hover:scale-105 duration-100 flex">
            <div className="flex bg-white border border-gray-300 rounded-xl md:flex-row flex-col overflow-hidden items-center justify-start">                     
                <div className="relative w-64 h-64 md:w-32 md:h-32 flex-shrink-0">                      
                    <div className="absolute left-0 top-0 w-full h-full block">                                    
                        <img className = "w-full block max-w-full h-full object-cover" alt = "gambar" src = {props.image}/>
                    </div>
                </div>
                                        
              <div className="px-4 flex flex-col md:mt-0 mt-2 md:text-left text-center">                         
                  <p className="text-xl capitalize text-ellipsis"> {trimmedString} </p>        
                  <p className="text-xl text-gray-300 text-[10px]"> {desc} </p>                                            
                  <p className="text-xs text-green-500"> {createdTimeStamp} </p>
                  <div className = "flex mt-4 justify-evenly">
                    <div className = "flex flex-col items-center">
                      <EditIcon _hover={{ color: "#48BB78"}} color= "green" className = "cursor-pointer mb-1 duration-700" onClick={onOpen}/>
                      <p className = "text-xs"> Edit </p> 
                    </div>
                    <div className = "flex flex-col items-center justify-center md:mb-0 mb-4">
                      <DeleteIcon _hover={{ color: "#F56565"}} onClick = {props.handleDeletePost} color= "red" className = "cursor-pointer mb-1 duration-700"/>
                      <p className = "text-xs"> Delete </p> 
                    </div>
                  </div>             
              </div>
            </div>
        </div>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> Update Roti </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <div className = "flex flex-col">
                  <label className = "font-bold"> Bread name </label>
                  <Input value = {name} className = "my-4" placeholder = "Masukkan nama roti" onChange={(e) => setname(e.target.value)}/>
                </div>
                <div className = "flex flex-col">
                  <label className = "font-bold"> Bread Description </label>
                  <Textarea value = {description} className = "my-4" placeholder = "Masukkan deskripsi roti" onChange={(e) => setDescription(e.target.value)}/>
                </div>

                <div className = "flex flex-col">
                  <label className = "font-bold"> Bread's Expiring Date  </label>
                  <input  type="date" value = {date} className = "my-4" placeholder = "Masukkan nama roti" onChange={(e) => setDate((e.target.value))}/>
                </div>

                <div className = "flex flex-col">
                  <label className = "font-bold"> Bread Image </label>
                  <img alt = "gambar" src = {imagePreview} />
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
                onClick={handleUpdate}
                _hover={{ boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75)'}} 
              >
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default Post
 