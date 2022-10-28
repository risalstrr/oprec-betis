import type { NextPage } from 'next'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Button, useToast, useDisclosure, } from '@chakra-ui/react'
import Modals from '../components/elements/Modals'
import Post from '../components/elements/Post'

const Home: NextPage = () => {
    const [posts, setPosts] = useState<any[]>([])
    const [status, setStatus] = useState(false)
    const tokenStr = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY5NDgyMTQxLCJpYXQiOjE2NjY4OTAxNDEsImp0aSI6ImJhNmE2Y2NiYTk1MDQxOTI4OTQzZTllZjQ3NzVmZjNlIiwidXNlcl9pZCI6Mn0.mAX6l50k5v1eu-k9uO__HQ02kdfqZtC9y6MWBimZF4g"
    const { isOpen, onOpen, onClose } = useDisclosure()
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

    const getFromAPI = () => {
        axios.get(`https://betis23-oprec.herokuapp.com/roti/`, {
            headers: {
                Authorization: `Bearer ${tokenStr}`,
            }
        })

        .then((result) => {
            var data = result.data.data
            console.log(data)
            setPosts(data)
        })
        .catch((error) => {
            console.log(error)
        })

    }

    function postToAPI(name: any, description: any, image: any, date: any){
        const data = new FormData()
  
        data.append("name", name)
        data.append("description", description)
        data.append("image", image)
        data.append("expired_date", date)

        axios.post("https://betis23-oprec.herokuapp.com/roti/", data, {
          headers:{
            Authorization: `Bearer ${tokenStr}`
          }
        })
  
        .then((result) => {
          console.log(result)
          setStatus(!status)
          showToast("Post Uploaded", "Post berhasil di upload!", "success", "top-center")
        })
  
        .catch((error) =>{
            showToast("Input Error / Server Error", "Input salah atau server tidak tersambung", "error", "top-center")
        })
    }

    const updateToAPI = (name: string, id: number, image: any, description: any, date: any) => {
        if(image === null){

            let payload = {
                name: name,
                description: description,
                expired_date: date,
            }

            const config = {
                method: "patch",
                url: `https://betis23-oprec.herokuapp.com/roti/${id}`,
                headers:{
                    Authorization: `Bearer ${tokenStr}`
                },
                data: payload,
            }
            
            axios(config)

            .then((result) => {
                setStatus(!status)
                showToast("Post Updated", "Post berhasil di update!", "success", "top-center")
            })

            .catch((error) => {
                showToast("Input Error / Server Error", "Input salah atau server tidak tersambung", "error", "top-center")
            })

        }else{  
            const data = new FormData()

            data.append("name", name)
            data.append("description", description)
            data.append("image", image)
            data.append("expired_date", date)

            const config = {
                method: "patch",
                url: `https://betis23-oprec.herokuapp.com/roti/${id}`,
                headers:{
                    Authorization: `Bearer ${tokenStr}`
                },
                data: data,
            }
            
            axios(config)

            .then((result) => {
                setStatus(!status)
                showToast("Post Updated", "Post berhasil di update!", "success", "top-center")
            })

            .catch((error) => {
                console.log(error)
                showToast("Input Error / Server Error", "Input salah atau server tidak tersambung", "error", "top-center")
            })
        }
    }
    const handleDeletePost = (id: Number) => {
        axios.delete(`https://betis23-oprec.herokuapp.com/roti/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenStr}`
            }
        })
        .then((result) => {
            setStatus(!status)
            showToast("Post deleted", "Post sudah berhasil dihilangkan!", "success", "top-center")
        })
        .catch((error) => {
            showToast("Failed to delete", "Post tidak berhasil untuk dihilangkan!", "error", "top-center")
        })

    }

    useEffect(() => {
        getFromAPI()
    }, [status])

    return (
        <div className = "font-bold">
            <div className = "mx-6 my-4 flex flex-col items-center">
                <h1 className = "text-3xl text-center text-[#fdfffe]"> Open Recruitement BETIS 2023 </h1> 

                <Button 
                    className = "my-4"
                    onClick={onOpen}
                    color = 'white' 
                    borderColor='#22c55e' 
                    bg = "#22c55e" 
                    variant='solid' 
                    borderRadius='6px' 
                    _hover={{ boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75)' }} 
                    _active={{bg: '#22c55e', transform: 'scale(1.03)', borderColor: '#bec3c9',}}
                > 
                    Upload Your Bread Here! 
                </Button>

                <Modals isOpen = {isOpen} onClose = {onClose} tokenStr = {tokenStr} postToAPI = {(name:any, description:any, image:any, date:any) => postToAPI(name, description, image, date)}/>

                {posts.length >= 1 ?
                    <div className = "max-w-screen-xl w-full flex md:flex-row flex-col flex-wrap justify-center items-center">
                        {posts.map((post) => {
                            return <Post key = {post.id} name = {post.name} description = {post.description}
                            image = {post.image} expired_date = {post.expired_date} handleDeletePost = {() => handleDeletePost(post.id)} showToast = {(name: any, error: any, status:any, position: any) => showToast(name, error, status, position)} updateToAPI = {updateToAPI} id = {post.id}/>
                        })}
                    </div>
                 : 
                    (<div> 
                        <h1 className = "text-3xl my-16 font-bold text-white"> Nothing to show Here </h1> 
                    </div>)
                }
            </div>

        </div>
    )

}

export default Home
 