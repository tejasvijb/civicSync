
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../components/ui/form"
import { Input } from "../../../../components/ui/input"
import { Button } from "../../../../components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "../../../utils/validations"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ErrorResponse } from "../../../../api/api.types"
import Swal from "sweetalert2"
import { userRegister } from "../../../../api/authApi"
import { Shell } from "lucide-react"




export default function Register() {
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    const { mutate, isPending } = useMutation({
        mutationFn: userRegister,
        onSuccess: (data) => {
            console.log(data)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registered !",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/auth/login")
        },
        onError: (err: AxiosError<ErrorResponse>) => {
            console.log("err")
            Swal.fire({
                title: 'Error!',
                text: err.response?.data?.message || err.message || "Something Went wrong!",
                icon: 'error',
                confirmButtonText: 'Ok'
            })

        }

    })

    function onSubmit(data: z.infer<typeof registerSchema>) {
        mutate(data)
    }

    return (
        <div className="flex flex-col items-center justify-center h-full relative">
            <div className="mb-12">
                <h1 className="font-bold text-2xl text-center">
                    Register
                </h1>
                <p className="text-slate-500 mb-2 text-sm text-center" >
                    Join the community of civic enthusiasts and make a difference in your city.
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 space-y-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter Password" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Re-Enter Password" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center">
                        <Link to={`/auth/login`}>
                            <p className="text-sm text-blue-500"> Already have an account ? Login. </p>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center">
                        <Button disabled={isPending} style={{ background: "linear-gradient(90deg, rgba(0, 123, 255, 1) 0%, rgba(123, 31, 162, 1) 100%)" }} type="submit">
                            {isPending && <Shell className="mr-2 h-4 w-4 animate-spin" />}
                            Register
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
