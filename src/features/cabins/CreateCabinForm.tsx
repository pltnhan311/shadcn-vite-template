"use client"

import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCreateCabin } from "@/features/cabins/use-create-cabin"
import {
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Dispatch, SetStateAction, useEffect } from "react"
import { Cabin } from "@/features/cabins/columns"
import { useEditCabin } from "@/features/cabins/use-edit-cabin"

export function CreateCabinForm({
	cabin,
	cabinId,
	setIsOpen,
}: {
	cabin?: Cabin
	cabinId?: number
	setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
	const form = useForm()
	const fileRef = form.register("image")
	console.log(cabinId)
	const isEditing = Boolean(cabinId)

	useEffect(() => {
		if (!isEditing || !cabin) return

		const { name, maxCapacity, regularPrice, discount } = cabin || {}
		form.setValue("name", name ?? undefined)
		form.setValue("maxCapacity", maxCapacity ?? undefined)
		form.setValue("regularPrice", regularPrice ?? undefined)
		form.setValue("discount", discount ?? undefined)
	}, [form, isEditing, cabin])

	const dialogClose = () => {
		document.getElementById("closeDialog")?.click()
	}

	const { isCreating, createCabin } = useCreateCabin()
	const { editCabin } = useEditCabin()
	// 2. Define a submit handler.
	function onSubmit(data: any) {
		const image = typeof data.image === "string" ? data.image : data.image[0]
		const formData = { ...data, image: image }

		if (isEditing && cabinId) {
			editCabin(
				{ newCabinData: formData, id: cabinId },
				{
					onSuccess: () => {
						form.reset()
						dialogClose()
						setIsOpen(false) // Close the dialog/form
					},
				},
			)
		} else {
			createCabin(formData, {
				onSuccess: () => {
					form.reset()
					dialogClose()
				},
			})
		}
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle className="text-2xl">
					{!isEditing && "Create Cabin"}
				</DialogTitle>
				<DialogDescription>
					{isEditing ? "Edit this cabin" : "Create a new cabin"}
				</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="Cabin name..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="maxCapacity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Capacity</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Maximum capacity..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="regularPrice"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Regular price..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="discount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Discount</FormLabel>
								<FormControl>
									<Input type="input" placeholder="Discount..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="image"
						render={() => (
							<FormItem>
								<FormLabel>Cabin photo</FormLabel>
								<FormControl>
									<Input
										className="text-muted-foreground file:mr-3 file:rounded-md file:bg-muted-foreground"
										type="file"
										placeholder="Cabin photo..."
										accept="image/*"
										{...fileRef}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<DialogFooter className="mt-14 sm:justify-end">
						<DialogClose asChild>
							<Button type="button" variant="secondary">
								Cancel
							</Button>
						</DialogClose>
						<Button variant="primary" type="submit" disabled={isCreating}>
							{isEditing ? "Save changes" : "Create Cabin"}
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</>
	)
}
