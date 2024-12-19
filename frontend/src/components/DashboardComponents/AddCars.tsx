import React, {useState} from "react";
import API from "../../config/apiClient.ts";

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const handleUpload = async (file) => {
   return  await getBase64(file).then((base64) => {return base64;})
}

const handleSubmit = (e, carDetails) => {
    e.preventDefault();
    API.post('/car/create', carDetails)
    console.log(carDetails)
}

const handleChange = (value: string | number, name: string, setterFunction: React.SetStateAction<object>) => {
    const number = parseInt(value);
    if (isNaN(number)) {
        setterFunction((prevState) => ({...prevState, [name]: value}));
    } else {
        setterFunction((prevState) => ({...prevState, [name]: number}));
    }

}

const addImage = (newImage: string, setCarDetails) => {
    setCarDetails(prevState => ({
        ...prevState, images: [...prevState.images, newImage]
    }));
};

const AddCars = (props) => {

    const user = props.user
    const imageArray: string[] = [];

    const [carDetails, setCarDetails] = useState({
        name: '',
        description: '',
        images: [] as string[],
        type: 'Sport',
        capacity: 1,
        transmission: 'Manual',
        fuelCapacity: 50,
        price: 0,
        reviews: [{}]
    })

    return (<div className="bg-gray-300 w-full">
        <div
            className="w-full pt-12 gap-x-12 px-6 pb-12 flex flex-row items-center justify-center lg:justify-start">
            <div className="flex flex-col items-center justify-center lg:justify-start gap-y-4">
                <div className="flex flex-row items-center justify-start gap-x-3 w-full">
                    <label htmlFor="name" className="min-w-[100px]">Name: </label>
                    <input type="text" id="name" className="name w-full text-center"
                           onChange={(e) => handleChange(e.target.value, 'name', setCarDetails)}/>
                </div>
                <div className="flex flex-row gap-x-3 w-full">
                    <label htmlFor="description" className="min-w-[100px]">Description: </label>
                    <input type="text" id="description" className="description w-full text-center"
                           onChange={(e) => handleChange(e.target.value, 'description', setCarDetails)}/>
                </div>
                <div className="flex flex-row gap-x-3 w-full">
                    <label htmlFor="type" className="min-w-[100px]">Type: </label>
                    <select name="type" id="type" className="w-full text-center"
                            onChange={(e) => handleChange(e.target.value, 'type', setCarDetails)}>
                        <option value="Sport">Sport</option>
                        <option value="Suv">Suv</option>
                        <option value="MPV">MPV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Hatchback">Hatchback</option>
                    </select>
                </div>
                <div className="flex flex-row gap-x-3 w-full">
                    <label htmlFor="capacity" className="min-w-[100px]">Capacity: </label>
                    <input type="capacity" id="capacity" defaultValue={1} min={1} className="capacity w-full text-center"
                           onChange={(e) => handleChange(e.target.value, 'capacity', setCarDetails)}/>
                </div>
                <div className="flex flex-row gap-x-3 w-full">
                    <label htmlFor="transmission" className="min-w-[100px]"> Transmission: </label>
                    <select name="transmission" id="transmission" className="w-full text-center"
                            onChange={(e) => handleChange(e.target.value, 'transmission', setCarDetails)}>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                    </select>
                </div>
                <div className="flex flex-row gap-x-3 w-full">
                    <label htmlFor="fuelCapacity" className="min-w-[100px]">FuelCapacity: </label>
                    <input type="number" id="fuelCapacity" min={50} defaultValue={50} className="capacity w-full text-center"
                           onChange={(e) => handleChange(e.target.value, 'fuelCapacity', setCarDetails)}/>
                </div>
                <div className="flex flex-row gap-x-3 w-full">
                    <label htmlFor="price" className="min-w-[100px]">Price: </label>
                    <input type="number" id="price" min={0} className="price w-full text-center"
                           onChange={(e) => handleChange(e.target.value, 'price', setCarDetails)}/>
                </div>
            </div>
            <form className="flex flex-col items-center justify-center lg:justify-start gap-y-4">
                <label htmlFor="coverImage" className="font-bold text-black text-xl">Cover Photo:</label>
                <input type="file" id="coverImage" name="coverImage" alt="coverImage" accept="image/png, image/jpeg"
                       onInput={async (e) => {
                           addImage(await handleUpload(e.target.files[0], imageArray) as string, setCarDetails);
                       }}/>
                <label htmlFor="interiorImage1" className="font-bold text-black text-xl">Cover Photo:</label>
                <input type="file" id="interiorImage1" name="interiorImage1" alt="interiorImage1"
                       accept="image/png, image/jpeg" onInput={async (e) => {
                    await addImage(await handleUpload(e.target.files[0], imageArray) as string, setCarDetails);

                }}/>
                <label htmlFor="interiorImage2" className="font-bold text-black text-xl">Cover Photo:</label>
                <input type="file" id="interiorImage2" name="interiorImage2" alt="interiorImage2"
                       accept="image/png, image/jpeg" onInput={async (e) => {
                    await addImage(await handleUpload(e.target.files[0], imageArray) as string, setCarDetails);
                }}/>
            </form>

        </div>
        <div className="flex flex-row items-center justify-center py-4">
            <button
                className="flex flex-row items-center justify-center text-white text-xl font-bold bg-blue-500 rounded-xl w-[120px] h-[40px]"
                onClick={(e) => {
                    handleSubmit(e, carDetails)
                }}> Add
                Car
            </button>
        </div>
    </div>)

}

export default AddCars;