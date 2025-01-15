import React, { useEffect, useState } from 'react';
import axios from 'axios'

const useResource = (baseUrl) => {

  const [resources, setResources] = useState([])

  useEffect(() => { 
    const getAll = async () => {
      try {
        const response = await axios.get(baseUrl)
        setResources(response.data)
      } catch (error) {
        console.error('Error fetching resources:', error)
      }
    }
    getAll()
  }, [baseUrl])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources(resources.concat(response.data))
  }

  const services = {
    create,
  }

  return [
    resources, services
  ]
}

export default useResource;