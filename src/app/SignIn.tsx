
import { useAuthState } from '@/lib/hooks'

export default function SignIn(){
  const { signInGoogle } = useAuthState()
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="card max-w-sm w-full text-center">
        <h1 className="text-xl font-semibold mb-4">Trading Journal</h1>
        <button className="btn btn-primary w-full" onClick={signInGoogle}>Continue with Google</button>
      </div>
    </div>
  )
}
