import {useState} from 'react'
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {useMutation} from '@tanstack/react-query'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert"
import api from  "../lib/axios"
import { Spinner } from './ui/spinner';

interface UserInformation{
  firstName:string,
  lastName :string,
  emailAddress: string,
  username:string,
  password:string
}

const RegisterForm = ()=>{
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [emailAddress, setEmailAddress]=useState("");
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("");
    const [cpassword, setCPassword]=useState("");
    const [errorMsg, setErrorMsg]=useState("");
  
    const registerMutation = useMutation<any,any,UserInformation>({
      mutationKey:[`register-user-key`],
      mutationFn: async (payload:UserInformation)=>{
        const res = await api.post("/auth/register",payload);
        return res.data;
      },
      onSuccess: (data)=>{
        setFirstName("");
        setLastName("");
        setEmailAddress("");
        setUsername("");
        setPassword("");
        setCPassword("");
        
      },
      onError: (error:any)=>{
        const serverMessage = error?.response?.data;
        const derivedMessage =
          serverMessage?.message ||
          serverMessage?.error ||
          serverMessage?.errors?.[0]?.message ||
          error?.message;
        setErrorMsg(derivedMessage || `Something Went Wrong During Registration`)
      },
    });
   



    const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!firstName || ! lastName || ! emailAddress || !username || !password || ! cpassword){
          setErrorMsg(`Please Privide All Data `)
          return
        }
        if(password !== cpassword){
          setErrorMsg("Password Don't Match")
          return
        }
        setErrorMsg("");

        registerMutation.mutate({
          firstName,
          lastName,
          emailAddress,
          username,
          password
        });

    };



    return (
    <>
  
    <div className='mt-10'>
    <Card className="w-full max-w-sm mx-auto">
        <form onSubmit={handleSubmit}>
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-2xl font-semibold" >Register User</CardTitle>
          <CardDescription>
            {errorMsg && (
              <Alert className="text-red-600 text-2xl text-center mb-2.5">
                <AlertTitle>Oh no!</AlertTitle>
                <AlertDescription className="text-red-600 text-xl text-center mb-2.5">
                  {errorMsg}
                </AlertDescription>
              </Alert>
            )}
        {registerMutation.isPending && (
          <div className="flex justify-center items-center">
        <Spinner className="size-10" />
         </div>
         )}

         {registerMutation.isSuccess && (
          <div className="flex justify-center items-center">
        <Alert className="text-green-600 text-xl text-center mb-2.5">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription className="text-green-600 text-lg text-center mb-2.5">
            Registration Successful
          </AlertDescription>
        </Alert>
         </div>
         )}
          </CardDescription>
        </CardHeader>

        <CardContent>
      <div className="flex flex-col gap-3">
      <Input type="text" value={firstName} onChange={(e)=>(setFirstName(e.target.value))}  placeholder="First Name"  />
      <Input type="text" value={lastName} onChange={(e)=>(setLastName(e.target.value))} placeholder="Last Name" />
      <Input type="email" value={emailAddress} onChange={(e)=>(setEmailAddress(e.target.value))} placeholder="Email" />
      <Input type="text" value={username} onChange={(e)=>(setUsername(e.target.value))} placeholder="Your Username" />
      <Input type="password"  value={password} onChange={(e)=>(setPassword(e.target.value))}placeholder="Choose a strong Password" />
      <Input type="password"  value={cpassword} onChange={(e)=>(setCPassword(e.target.value))}placeholder="Confirm Password" />
      </div>
       </CardContent>

        <CardFooter>
  <Button className='w-full py-2 mt-5' type='submit' disabled={registerMutation.isPending}>
  {registerMutation.isPending ? "Registering..." : "Register User"}
</Button>

        </CardFooter>
        </form>
      </Card>
    </div>   
    </>
    )

}

export default RegisterForm;