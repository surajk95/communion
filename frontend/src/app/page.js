import Image from 'next/image'
import Communion from './communion'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <Communion />
    </main>
  )
}
