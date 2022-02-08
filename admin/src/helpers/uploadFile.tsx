import axios from "axios"

export const uploadFile = async (file: File): Promise<{url: string}> => {
    let formData = new FormData()

    formData.append('file', file)
    const { data } = await axios.post('/api/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    const { url } = data 
    return url
}