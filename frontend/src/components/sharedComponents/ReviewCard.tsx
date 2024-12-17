interface Ireview {
    userName: string;
    text: string;
}


const ReviewCard = (review:Ireview) => {


    return (
        <div className="flex flex-row w-full gap-x-4">
            <div>
                <div className="size-14 bg-blue-400 rounded-full flex items-center justify-center uppercase font-bold">{review?.userName.slice(0, 1)}</div>
            </div>
            <div className="flex flex-col gap-y-4">
                <p className="font-bold text-xl">{review?.userName}</p>
                <p className="text-gray-400 max-h-12 overflow-clip">{review?.text}</p>
            </div>
        </div>
    )

}

export default ReviewCard;