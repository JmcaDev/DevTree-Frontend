import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import DevTreeInput from '../components/DevTreeInput'
import { isValidUrl } from '../utils'
import { updateProfile } from '../api/DevTreeAPI'

import { social } from '../data/social'

import type { SocialNetwork, User } from '../types'

function LinkTreeView() {
  
  const queryClient = useQueryClient()
  //todo refactorizar al terminar el proyecto
  const user: User = queryClient.getQueryData(['user'])!
  
  const [devTreeLinks, setDevTreeLink] = useState(() => {
    const userLinks = JSON.parse(user.links)

    return social.map((item) => {
      const userLink = userLinks.find((link: SocialNetwork) => link.name === item.name)
      if(userLink){
        return {...item, url: userLink.url, enabled: userLink.enabled}
      }
      return item
    })
  })


  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Actualizado Correctamente')
    }
  })

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) => link.name === e.target.name ? {...link, url: e.target.value} : link)
    setDevTreeLink(updatedLinks)
  }

  const links: SocialNetwork[] = JSON.parse(user.links)

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if(link.name === socialNetwork){
        if(isValidUrl(link.url)){
          return {...link, enabled: !link.enabled}
        } else{
          toast.error('URL no valida')
          return link
        }
      }else{
        return link
      }
    })
    setDevTreeLink(updatedLinks)

    let updatedItems: SocialNetwork[] = []
    const selectedSocialNetwork = updatedLinks.find((link) => link.name === socialNetwork)
    if(selectedSocialNetwork?.enabled){
      const id = links.filter(link => link.id).length + 1
      if(links.some(link => link.name === socialNetwork)){
        updatedItems = links.map(link => {
          if(link.name === socialNetwork){
            return {
              ...link,
              enabled: true,
              id
            }
          }else{
            return link
          }
        })
      }else{
        const newItem = {
          ...selectedSocialNetwork,
          id
        }
        updatedItems = [...links, newItem]
      }
    }else{
      const indexToUpdate = links.findIndex((link: SocialNetwork) => link.name === socialNetwork)
      updatedItems = links.map(link => {
        if(link.name === socialNetwork){
          return {
            ...link,
            id: 0,
            enabled: false
          }
        }else if(link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)){
          return {
            ...link,
            id: link.id - 1
          }
        }else{
          return link
        }
      })
    }

    queryClient.setQueryData(['user'], (prevData: User) => {
      return{
        ...prevData,
        links: JSON.stringify(updatedItems)
      }
    })
  }

  return (
    <>
      <div className='space-y-5'>
        {devTreeLinks.map((item) => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
          />
        ))}
        <button
          className='bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold'
          onClick={() => mutate(queryClient.getQueryData(['user'])!)}
        >Guardar Cambios</button>
      </div>
    </>
  )
}

export default LinkTreeView