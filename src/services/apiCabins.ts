import supabase, { supabaseUrl } from "./supabase.ts"

function getImagePath(newCabin) {
	console.log(newCabin)
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
	if (hasImagePath) return newCabin.image

	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		"",
	)
	return `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
}

export async function createEditCabin(newCabin, id) {
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		"",
	)
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

	// 1. Create/edit cabin
	let query = supabase.from("cabins")

	// A) CREATE
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }])

	// B) EDIT
	if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id)

	const { data, error } = await query.select().single()

	if (error) {
		console.error(error)
		throw new Error("Cabin could not be created")
	}

	// 2. Upload image
	if (hasImagePath) return data

	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image)

	// 3. Delete the cabin IF there was an error uplaoding image
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id)
		console.error(storageError)
		throw new Error(
			"Cabin image could not be uploaded and the cabin was not created",
		)
	}

	return data
}

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*")

	if (error) {
		console.error(error)
		throw new Error("Cabins could not be loaded")
	}

	return data
}

export async function getCabinById(id: number) {
	const { data, error } = await supabase
		.from("cabins")
		.select("*")
		.eq("id", id)
		.single()

	if (error) {
		console.error(error)
		throw new Error("Cabin could not be loaded")
	}

	return data
}

export async function createCabin(newCabin) {
	const imagePath = getImagePath(newCabin)

	const { data, error } = await supabase
		.from("cabins")
		.insert([{ ...newCabin, image: imagePath }])
		.select()
		.single()

	if (error) {
		console.error(error)
		throw new Error("Cabin could not be created")
	}

	if (!newCabin.image.startsWith(supabaseUrl)) {
		const { error: storageError } = await supabase.storage
			.from("cabin-images")
			.upload(imagePath, newCabin.image)

		if (storageError) {
			await supabase.from("cabins").delete().eq("id", data.id)
			console.error(storageError)
			throw new Error(
				"Cabin image could not be uploaded and the cabin was not created",
			)
		}
	}

	return data
}

export async function editCabin(updatedCabin, id: string) {
	const imagePath = getImagePath(updatedCabin)

	const { data, error } = await supabase
		.from("cabins")
		.update({ ...updatedCabin, image: imagePath })
		.eq("id", id)
		.select()
		.single()

	if (error) {
		console.error(error)
		throw new Error("Cabin could not be edited")
	}

	return data
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id)

	if (error) {
		console.error(error)
		throw new Error("Cabin could not be deleted")
	}

	return data
}
