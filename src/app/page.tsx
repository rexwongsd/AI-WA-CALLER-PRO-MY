'use client'

import { useState, useEffect } from 'react'
import QRLoginView from '@/components/QRLoginView'
import MainDashboard from '@/components/MainDashboard'
import { socket } from '@/lib/socket'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    socket.on('auth-successful', () => {
      setIsAuthenticated(true)
      setIsConnecting(false)
    })

    socket.on('connect', () => {
      console.log('Connected to server')
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
      setIsAuthenticated(false)
    })

    return () => {
      socket.off('auth-successful')
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  const handleQRScan = () => {
    setIsConnecting(true)
    socket.emit('simulate-qr-scan')
  }

  const handleDisconnect = () => {
    setIsAuthenticated(false)
    socket.disconnect()
    socket.connect()
  }

  if (isAuthenticated) {
    return <MainDashboard onDisconnect={handleDisconnect} />
  }

  return (
    <QRLoginView 
      onQRScan={handleQRScan} 
      isConnecting={isConnecting}
    />
  )
}