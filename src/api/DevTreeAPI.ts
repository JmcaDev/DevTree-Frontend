import { isAxiosError } from "axios"
import api from "../config/axios"
import type { ProfileForm, User } from "../types"

type MessageResponse = {
  message: string
}

export async function getUser(){
  try {
      const { data } = await api.get<User>('/user')
      return data
    } catch (error) {
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error, { cause: error })
      }
    }
}

export async function updateProfile(formData: ProfileForm){
  try {
      const { data } = await api.patch<MessageResponse>('/user', formData)
      return data.message
    } catch (error) {
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error, { cause: error })
      }
    }
}