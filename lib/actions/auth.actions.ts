
'use server'

import { auth, db } from "@/firebase/admin"
// import { User } from "firebase/auth"
import { cookies } from "next/headers"
const ONE_WEEK =60 * 60 * 24 * 7

 export async function signUp(params :SignUpParams){
        const {uid, name, email } = params
        try {
            const userRecord = await db.collection("users").doc(uid).get()

            if(userRecord.exists){
                return{
                    success:false,
                    message:"User already exist, please sign in instead."
                }
            }
            await db.collection("users").doc(uid).set({
            name, email 
            })

            return{
                success :true,
                message :"Account creates successfully.Please sign in."
            }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error creating a user", error)

            if(error.code === "auth/email-already-exist"){
                return {
                    success :false, 
                    message :"This emails is already in use."
                }
            }
            return {
                success: false,
                message :"Failed to create an account."
            }
        }
}
export async function signIn(params:SignInParams) {
    const {email,idToken} = params
    try{
        const userRecord= await auth.getUserByEmail(email)
        if(!userRecord){
            return {
                success :false,
                message :"User does not exist.Create an account instead."

            }
        }

        await setSessionCookie(idToken)

    }catch(error){
        console.error(error)
        return {
            success:false,
            message :"Failed to log into tha account."
        }
    }
    
}
export async function setSessionCookie(idToken: string){
        const cookieStore = await  cookies() 
        const sessionCookie =await auth.createSessionCookie(idToken ,{
            expiresIn:ONE_WEEK *1000 
        })

        cookieStore.set('session' , sessionCookie, {
            maxAge:ONE_WEEK ,
            httpOnly:true,
            secure :process.env.NODE_ENV === 'production',
            path :'/',
            sameSite:'lax'
        })
}
export async function getCurrentUSer():Promise<User | null>{
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')?.value

    if(!sessionCookie){
        return null
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true)

        const userRecord = await db.collection('users').doc(decodedClaims.uid).get()

        if(!userRecord) return null

        return {
        ...userRecord.data(),
        id : userRecord.id
        }  as User

    } catch (error) {
        console.log(error)
        return null
    }
}

export async function isAuthenticated(){
    const user = await getCurrentUSer()
    return !!user  // return true or false
}